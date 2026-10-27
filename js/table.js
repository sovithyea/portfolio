// The Work table: drag and throw the cards, run the physics, draw them, and lift a tapped card into the
// top-left corner where it keeps hovering while its details are open (D009). The cards also stir the scene
// under them (D016, D019): `scene` gets their outlines, wakes, hits and landings. `?debug` shows the live numbers.
import { createBodies, scatter, step, release } from './physics.js';

const TAP = 6; // px: a press that moves less than this is a tap, not a drag

export function mountTable(list, { onOpen, onClose, scene } = {}) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cards = [...list.querySelectorAll('.card')];
  const bodies = createBodies(cards.length);
  let w, h, bounds, narrow, openB = null, t = 0;
  const openScale = () => (narrow ? 1 : 1.3);

  function measure() {
    w = Math.round(Math.min(190, Math.max(96, innerWidth / 8.5))); h = w * 1.4; narrow = innerWidth <= 760;
    bounds = { l: 12, t: 80, r: innerWidth - 12, b: innerHeight - 12 };
    const root = document.documentElement.style;
    list.style.setProperty('--cw', w + 'px');
    root.setProperty('--panel-left', narrow ? '0px' : 24 + w * openScale() + 32 + 'px');
    root.setProperty('--panel-top', narrow ? 80 + h * openScale() + 16 + 'px' : '80px');
  }
  measure();
  list.classList.add('live');
  scatter(bodies, bounds, w, h, Math.random, reduce);
  for (const b of bodies) b.s = 1;
  addEventListener('resize', () => { measure(); step(bodies, { dt: 0, bounds, w, h, drift: false }); });

  function open(i) {
    if (openB?.i === i) return;
    if (openB) close(false);
    openB = bodies[i];
    cards.forEach((c, k) => { c.inert = k !== i; c.classList.toggle('open', k === i); });
    document.body.classList.add('dim');
    onOpen?.(i);
  }
  function close(restoreFocus) {
    if (!openB) return;
    const b = openB; openB = null;
    cards.forEach(c => { c.inert = false; c.classList.remove('open'); });
    document.body.classList.remove('dim');
    const a = Math.random() * Math.PI / 2; b.vx = reduce ? 0 : Math.cos(a) * 6; b.vy = reduce ? 0 : Math.sin(a) * 6; // back out onto the table
    onClose?.(b.i, restoreFocus);
    if (restoreFocus) cards[b.i].focus({ preventScroll: true });
  }

  cards.forEach((card, i) => {
    const b = bodies[i];
    let g = null;
    card.addEventListener('pointerdown', e => {
      if (openB === b) return;
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
      scene?.lure(b.x + w / 2, b.y + h / 2); // koi follow the card you're holding
    });
    const up = () => {
      if (!g) return;
      b.drag = false; card.classList.remove('drag');
      release(b, performance.now() - g.lt);
      scene?.lure(null);
      if (g.moved < TAP) { log.taps++; open(i); } else scene?.splash(b.x, b.y, w, h, 3);
      g = null;
    };
    card.addEventListener('pointerup', up);
    card.addEventListener('pointercancel', up);
    card.addEventListener('click', e => { if (e.detail === 0) open(i); }); // Enter or Space from the keyboard
  });

  // ?debug: per-card numbers on screen and in window.__table, for signing off the physics (plan Step 4)
  const debug = new URLSearchParams(location.search).has('debug');
  const log = { frames: 0, hits: 0, taps: 0, outOfBounds: 0, minSpeed: Infinity, maxSpeed: 0 };
  let panel;
  if (debug) { panel = document.createElement('pre'); panel.className = 'debug mono'; document.body.append(panel); window.__table = { bodies, log, bounds: () => bounds, size: () => ({ w, h }), open, close }; }
  const onHit = (b, axis, s, x, y) => { log.hits++; scene?.impact(x, y, s); };

  let last = performance.now();
  function frame(now) {
    const dt = Math.min(2, (now - last) / 16.67); last = now; t += dt;
    const live = openB ? bodies.filter(b => b !== openB) : bodies;
    step(live, { dt, bounds, w, h, drift: !reduce, reduce, onHit });
    if (scene) { // cards on the table are solid to the pond's waves; moving ones push water and cloud
      scene.solids(live.filter(b => !b.drag).map(b => [b.x, b.y, w, h]));
      for (const b of live) if (!b.drag && Math.abs(b.vx) + Math.abs(b.vy) > 1.2) scene.wake(b.x, b.y, b.vx, b.vy, w, h);
    }
    if (openB) { // spring to the corner, then hover there
      const b = openB, k = reduce ? 1 : 1 - Math.pow(0.88, dt), tx = narrow ? 16 : 24;
      b.x += (tx - b.x) * k; b.y += (80 - b.y) * k; b.rot += (-2 - b.rot) * k; b.s += (openScale() - b.s) * k;
    }
    for (const b of bodies) {
      if (b !== openB) b.s += (1 - b.s) * (reduce ? 1 : 0.2);
      const isOpen = b === openB, bob = isOpen && !reduce ? Math.sin(t / 28) * 5 : 0, tilt = isOpen && !reduce ? Math.sin(t / 41) * 0.8 : 0;
      const sx = b.sqAxis === 'x' ? 1 - b.sq : 1 + b.sq * 0.6, sy = b.sqAxis === 'x' ? 1 + b.sq * 0.6 : 1 - b.sq, s = b.s * (b.drag ? 1.04 : 1);
      const el = cards[b.i];
      el.style.transformOrigin = isOpen ? '0 0' : '50% 50%';
      el.style.transform = `translate3d(${b.x}px, ${b.y + bob}px, 0) rotate(${b.rot + tilt}deg) scale(${s * sx}, ${s * sy})`;
    }
    if (debug) {
      log.frames++;
      for (const b of bodies) {
        if (b === openB) continue;
        const s = Math.hypot(b.vx, b.vy); if (!b.drag) { log.minSpeed = Math.min(log.minSpeed, s); log.maxSpeed = Math.max(log.maxSpeed, s); }
        if (b.x < bounds.l - 0.5 || b.y < bounds.t - 0.5 || b.x + w > bounds.r + 0.5 || b.y + h > bounds.b + 0.5) log.outOfBounds++;
      }
      if (log.frames % 10 === 0) panel.textContent = `frames ${log.frames}  hits ${log.hits}  taps ${log.taps}  out-of-bounds ${log.outOfBounds}  speed ${log.minSpeed.toFixed(2)}–${log.maxSpeed.toFixed(2)} px/frame\n` +
        bodies.map(b => `No.${b.i + 1}  x ${b.x.toFixed(0).padStart(5)}  y ${b.y.toFixed(0).padStart(4)}  v ${Math.hypot(b.vx, b.vy).toFixed(2).padStart(5)}  rot ${b.rot.toFixed(1).padStart(5)}°`).join('\n');
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  return { open, close, isOpen: () => openB !== null };
}
