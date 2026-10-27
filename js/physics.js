// Card physics (D009, D014): cards drift, bounce off the table's edges and each other, and squash a
// little on impact. No DOM here, so tests/physics.test.mjs can run it without a browser.
// Units are CSS px and 60 fps frames; dt is elapsed frames (1 at 60 fps).

export const TUNING = { friction: 0.992, restitution: 0.9, minSpeed: 0.35, maxThrow: 45, maxTilt: 8, squash: 0.1 };

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

export function createBodies(n) {
  return Array.from({ length: n }, (_, i) => ({ i, x: 0, y: 0, vx: 0, vy: 0, rot: 0, vr: 0, sq: 0, sqAxis: 'x', drag: false }));
}

// Spread cards over a grid of cells with some jitter, moving slowly in random directions.
export function scatter(bodies, bounds, w, h, rand = Math.random, still = false) {
  const aspect = (bounds.r - bounds.l) / (bounds.b - bounds.t);
  const cols = Math.ceil(Math.sqrt(bodies.length * aspect)), rows = Math.ceil(bodies.length / cols);
  const cellW = (bounds.r - bounds.l) / cols, cellH = (bounds.b - bounds.t) / rows;
  for (const b of bodies) {
    b.x = bounds.l + (b.i % cols) * cellW + rand() * Math.max(0, cellW - w);
    b.y = bounds.t + Math.floor(b.i / cols) * cellH + rand() * Math.max(0, cellH - h);
    const a = rand() * Math.PI * 2, s = still ? 0 : TUNING.minSpeed * 2;
    b.vx = Math.cos(a) * s; b.vy = Math.sin(a) * s;
    b.rot = still ? 0 : (rand() - 0.5) * 8;
  }
}

// Neat centred rows; returns each card's target slot (TIDY UP, D014).
export function rows(n, bounds, w, h, gap = 24) {
  const cols = Math.max(1, Math.min(n, Math.floor((bounds.r - bounds.l + gap) / (w + gap)))), r = Math.ceil(n / cols);
  const x0 = (bounds.l + bounds.r - (cols * w + (cols - 1) * gap)) / 2;
  const y0 = Math.max(bounds.t, (bounds.t + bounds.b - (r * h + (r - 1) * gap)) / 2);
  return Array.from({ length: n }, (_, i) => ({ x: x0 + (i % cols) * (w + gap), y: Math.min(bounds.b - h, y0 + Math.floor(i / cols) * (h + gap)) }));
}

function hit(b, axis, v, x, y, reduce, onHit) {
  const s = Math.abs(v); if (s < 1.5 || b.drag) return;
  if (!reduce) { b.sq = Math.min(TUNING.squash, s * 0.012); b.sqAxis = axis; }
  onHit?.(b, axis, s, x, y);
}

function walls(b, bounds, w, h, reduce, onHit) {
  const e = TUNING.restitution;
  if (b.x < bounds.l) { hit(b, 'x', b.vx, b.x, b.y + h / 2, reduce, onHit); b.x = bounds.l; b.vx = Math.abs(b.vx) * e; b.vr += b.vy * 0.15; }
  if (b.x + w > bounds.r) { hit(b, 'x', b.vx, b.x + w, b.y + h / 2, reduce, onHit); b.x = bounds.r - w; b.vx = -Math.abs(b.vx) * e; b.vr -= b.vy * 0.15; }
  if (b.y < bounds.t) { hit(b, 'y', b.vy, b.x + w / 2, b.y, reduce, onHit); b.y = bounds.t; b.vy = Math.abs(b.vy) * e; b.vr -= b.vx * 0.15; }
  if (b.y + h > bounds.b) { hit(b, 'y', b.vy, b.x + w / 2, b.y + h, reduce, onHit); b.y = bounds.b - h; b.vy = -Math.abs(b.vy) * e; b.vr += b.vx * 0.15; }
}

// Cards never tilt past ±8°, so axis-aligned boxes are a fair collision shape.
// A card being dragged acts like a mallet: infinite mass.
function collide(a, b, w, h, reduce, onHit, rand) {
  const dx = b.x - a.x, dy = b.y - a.y, px = w - Math.abs(dx), py = h - Math.abs(dy);
  if (px <= 0 || py <= 0) return;
  const ax = px < py ? 'x' : 'y', v = ax === 'x' ? 'vx' : 'vy', s = Math.sign(ax === 'x' ? dx : dy) || 1, pen = ax === 'x' ? px : py, e = TUNING.restitution;
  if (a.drag) b[ax] += s * pen; else if (b.drag) a[ax] -= s * pen; else { a[ax] -= s * pen / 2; b[ax] += s * pen / 2; }
  const rel = (b[v] - a[v]) * s;
  if (rel >= 0) return;
  if (a.drag) b[v] = a[v] + (a[v] - b[v]) * e;
  else if (b.drag) a[v] = b[v] + (b[v] - a[v]) * e;
  else { const t = a[v]; a[v] = b[v] * e; b[v] = t * e; }
  a.vr += (rand() - 0.5) * 1.2; b.vr += (rand() - 0.5) * 1.2;
  const cx = (a.x + b.x + w) / 2, cy = (a.y + b.y + h) / 2;
  hit(a, ax, rel, cx, cy, reduce, onHit); hit(b, ax, rel, cx, cy, reduce, onHit);
}

// Advance the given cards by dt frames. `drift: false` holds them still (reduced motion, or tidied rows at rest).
export function step(bodies, { dt, bounds, w, h, drift = true, reduce = false, onHit, rand = Math.random }) {
  const f = Math.pow(TUNING.friction, dt);
  for (const b of bodies) {
    if (!b.drag) {
      b.x += b.vx * dt; b.y += b.vy * dt; b.vx *= f; b.vy *= f;
      const sp = Math.hypot(b.vx, b.vy);
      if (drift && sp < TUNING.minSpeed) { // they never quite stop, as if on air
        const a = sp > 0.01 ? Math.atan2(b.vy, b.vx) : rand() * Math.PI * 2, ns = sp + (TUNING.minSpeed - sp) * 0.03 * dt;
        b.vx = Math.cos(a) * ns; b.vy = Math.sin(a) * ns;
      }
    }
    b.rot = clamp(b.rot + b.vr * dt, -TUNING.maxTilt, TUNING.maxTilt); b.vr *= Math.pow(0.94, dt);
    b.sq *= Math.pow(0.8, dt);
    walls(b, bounds, w, h, reduce, onHit);
  }
  for (let i = 0; i < bodies.length; i++) for (let j = i + 1; j < bodies.length; j++) collide(bodies[i], bodies[j], w, h, reduce, onHit, rand);
  for (const b of bodies) walls(b, bounds, w, h, reduce, onHit);
}

// Velocity on release: capped, and nothing if the card was held still before letting go.
export function release(b, msSinceLastMove) {
  if (msSinceLastMove > 80) { b.vx *= 0.2; b.vy *= 0.2; }
  const s = Math.hypot(b.vx, b.vy);
  if (s > TUNING.maxThrow) { b.vx *= TUNING.maxThrow / s; b.vy *= TUNING.maxThrow / s; }
}
