// The Work table: drag and throw the cards, run the physics, draw them. `?debug` shows the live numbers.
import { createBodies, scatter, step, release } from './physics.js';

const TAP = 6; // px: a press that moves less than this is a tap, not a drag

export function mountTable(list, { onTap } = {}) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cards = [...list.querySelectorAll('.card')];
  const bodies = createBodies(cards.length);
  let w, h, bounds;

  function measure() {
    w = Math.round(Math.min(190, Math.max(96, innerWidth / 8.5))); h = w * 1.4;
    bounds = { l: 12, t: 80, r: innerWidth - 12, b: innerHeight - 12 };
    list.style.setProperty('--cw', w + 'px');
  }
  measure();
  list.classList.add('live');
  scatter(bodies, bounds, w, h, Math.random, reduce);
  addEventListener('resize', () => { measure(); step(bodies, { dt: 0, bounds, w, h, drift: false }); });

  cards.forEach((card, i) => {
    const b = bodies[i];
    let g = null;
    card.addEventListener('pointerdown', e => {
      card.setPointerCapture(e.pointerId);
      g = { ox: e.clientX - b.x, oy: e.clientY - b.y, sx: e.clientX, sy: e.clientY, lx: e.clientX, ly: e.clientY, lt: performance.now(), moved: 0 };
      b.drag = true; card.classList.add('drag');
    });
    card.addEventListener('pointermove', e => {
      if (!g) return;
      const now = performance.now(), frames = Math.max(1, (now - g.lt) / 16.67);
      b.vx = b.vx * 0.5 + ((e.clientX - g.lx) / frames) * 0.5; b.vy = b.vy * 0.5 + ((e.clientY - g.ly) / frames) * 0.5;
      g.lx = e.clientX; g.ly = e.clientY; g.lt = now;
      g.moved = Math.max(g.moved, Math.hypot(e.clientX - g.sx, e.clientY - g.sy));
      b.x = Math.min(bounds.r - w, Math.max(bounds.l, e.clientX - g.ox)); b.y = Math.min(bounds.b - h, Math.max(bounds.t, e.clientY - g.oy));
    });
    const up = () => {
      if (!g) return;
      b.drag = false; card.classList.remove('drag');
      release(b, performance.now() - g.lt);
      if (g.moved < TAP) { log.taps++; onTap?.(i); }
      g = null;
    };
    card.addEventListener('pointerup', up);
    card.addEventListener('pointercancel', up);
  });

  // ?debug: per-card numbers on screen and in window.__table, for signing off the physics (plan Step 4)
  const debug = new URLSearchParams(location.search).has('debug');
  const log = { frames: 0, hits: 0, taps: 0, outOfBounds: 0, minSpeed: Infinity, maxSpeed: 0 };
  let panel;
  if (debug) { panel = document.createElement('pre'); panel.className = 'debug mono'; document.body.append(panel); window.__table = { bodies, log, bounds: () => bounds, size: () => ({ w, h }) }; }
  const onHit = () => { log.hits++; };

  let last = performance.now();
  function frame(now) {
    const dt = Math.min(2, (now - last) / 16.67); last = now;
    step(bodies, { dt, bounds, w, h, drift: !reduce, reduce, onHit });
    for (const b of bodies) {
      const sx = b.sqAxis === 'x' ? 1 - b.sq : 1 + b.sq * 0.6, sy = b.sqAxis === 'x' ? 1 + b.sq * 0.6 : 1 - b.sq, lift = b.drag ? 1.04 : 1;
      cards[b.i].style.transform = `translate3d(${b.x}px, ${b.y}px, 0) rotate(${b.rot}deg) scale(${sx * lift}, ${sy * lift})`;
    }
    if (debug) {
      log.frames++;
      for (const b of bodies) {
        const s = Math.hypot(b.vx, b.vy); if (!b.drag) { log.minSpeed = Math.min(log.minSpeed, s); log.maxSpeed = Math.max(log.maxSpeed, s); }
        if (b.x < bounds.l - 0.5 || b.y < bounds.t - 0.5 || b.x + w > bounds.r + 0.5 || b.y + h > bounds.b + 0.5) log.outOfBounds++;
      }
      if (log.frames % 10 === 0) panel.textContent = `frames ${log.frames}  hits ${log.hits}  out-of-bounds ${log.outOfBounds}  speed ${log.minSpeed.toFixed(2)}–${log.maxSpeed.toFixed(2)} px/frame\n` +
        bodies.map(b => `No.${b.i + 1}  x ${b.x.toFixed(0).padStart(5)}  y ${b.y.toFixed(0).padStart(4)}  v ${Math.hypot(b.vx, b.vy).toFixed(2).padStart(5)}  rot ${b.rot.toFixed(1).padStart(5)}°`).join('\n');
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  return { bodies };
}
