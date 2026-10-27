// The Work table: drag and throw the cards, run the physics, draw them, and lift a tapped card into the
// top-left corner where it keeps hovering while its details are open (D009). The cards also stir the scene
// under them (D016, D019): `scene` gets their outlines, wakes, hits and landings. `?debug` shows the live numbers.
import { createBodies, scatter, step, release, rows } from './physics.js';

const TAP = 6; // px: a press that moves less than this is a tap, not a drag

export function mountTable(list, { onOpen, onClose, scene, sound } = {}) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cards = [...list.querySelectorAll('.card')];
  const bodies = createBodies(cards.length);
  let w, h, bounds, narrow, openB = null, t = 0, resting = false; // resting: tidied rows hold still until a card is touched (D015)
  const openScale = () => (narrow ? 1 : 1.3);

  function measure() {
    narrow = innerWidth <= 760; w = Math.round(Math.min(190, Math.max(96, innerWidth / 8.5))); h = w * 1.4;
    bounds = { l: 12, t: 80, r: innerWidth - 12, b: innerHeight - (narrow ? 118 : 12) }; // on phones, keep cards above the tools and credits
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
    sound?.play('open');
    onOpen?.(i);
  }
  function close(restoreFocus) {
    if (!openB) return;
    const b = openB; openB = null;
    b.tilt.tx = b.tilt.ty = 0; cards[b.i].style.setProperty('--px', '0px'); cards[b.i].style.setProperty('--py', '0px');
    cards.forEach(c => { c.inert = false; c.classList.remove('open'); });
    document.body.classList.remove('dim');
    const a = Math.random() * Math.PI / 2; b.vx = reduce ? 0 : Math.cos(a) * 6; b.vy = reduce ? 0 : Math.sin(a) * 6; // back out onto the table
    onClose?.(b.i, restoreFocus);
    if (restoreFocus) { cards[b.i].focus({ preventScroll: true }); sound?.play('close'); }
  }

  // TIDY UP: neat rows that stay put until a card is touched
  function tidy() {
    close(false);
    rows(bodies.length, bounds, w, h).forEach((slot, k) => { bodies[k].tidy = slot; bodies[k].vx = bodies[k].vy = 0; });
    resting = true; sound?.play('tidy');
  }
  // Shake (phones): throw every card in a random direction
  function shake() {
    close(false); resting = false;
    for (const b of bodies) { b.tidy = null; const a = Math.random() * Math.PI * 2, s = 12 + Math.random() * 14; b.vx = Math.cos(a) * s; b.vy = Math.sin(a) * s; b.vr += (Math.random() - 0.5) * 6; }
  }

  cards.forEach((card, i) => {
    const b = bodies[i];
    let g = null;
    // the sheen follows the cursor across the card (D026); ultra-rare cards also lean toward a mouse (D028)
    const ultra = card.classList.contains('ultra');
    b.tilt = { x: 0, y: 0, tx: 0, ty: 0 };
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect(), fx = (e.clientX - r.left) / r.width - 0.5, fy = (e.clientY - r.top) / r.height - 0.5;
      card.style.setProperty('--sx', `${50 - fx * 100}%`);
      card.style.setProperty('--sy', `${50 - fy * 100}%`);
      if (ultra && !reduce && e.pointerType === 'mouse' && !g) {
        b.tilt.hover = performance.now();
        b.tilt.tx = -fy * 14; b.tilt.ty = fx * 14;
        card.style.setProperty('--px', `${-fx * 10}px`); card.style.setProperty('--py', `${-fy * 10}px`);
      }
    });
    card.addEventListener('pointerleave', () => { b.tilt.tx = b.tilt.ty = 0; card.style.setProperty('--px', '0px'); card.style.setProperty('--py', '0px'); });
    card.addEventListener('pointerdown', e => {
      if (openB === b) return;
      if (resting) { resting = false; for (const o of bodies) o.tidy = null; }
      card.setPointerCapture(e.pointerId);
      g = { ox: e.clientX - b.x, oy: e.clientY - b.y, sx: e.clientX, sy: e.clientY, lx: e.clientX, ly: e.clientY, lt: performance.now(), moved: 0 };
      if (!reduce) b.s = 0.94; // the card gives a little under your finger, then springs back (D030)
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
      if (g.moved < TAP) { log.taps++; open(i); }
      else { scene?.splash(b.x, b.y, w, h, 3); const s = Math.hypot(b.vx, b.vy); if (s > 6) sound?.play('throw', s * 0.3); else if (scene?.get() === 'water') sound?.play('land', 3); }
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
  if (debug) { panel = document.createElement('pre'); panel.className = 'debug mono'; document.body.append(panel); window.__table = { bodies, log, bounds: () => bounds, size: () => ({ w, h }), open, close, tidy, slots: () => rows(bodies.length, bounds, w, h) }; }
  const onHit = (b, axis, s, x, y) => { log.hits++; scene?.impact(x, y, s); sound?.play('hit', s); };

  const ultra = b => cards[b.i].classList.contains('ultra');
  let last = performance.now();
  function frame(now) {
    const dt = Math.min(2, (now - last) / 16.67); last = now; t += dt;
    for (const b of bodies) if (b.tidy && b !== openB) { // spring into the row slot
      const k = reduce ? 1 : 1 - Math.pow(0.88, dt);
      b.x += (b.tidy.x - b.x) * k; b.y += (b.tidy.y - b.y) * k; b.rot += -b.rot * k;
      if (Math.abs(b.tidy.x - b.x) < 0.5 && Math.abs(b.tidy.y - b.y) < 0.5) { b.x = b.tidy.x; b.y = b.tidy.y; b.rot = 0; b.tidy = null; }
    }
    const live = bodies.filter(b => b !== openB && !b.tidy);
    step(live, { dt, bounds, w, h, drift: !reduce && !resting, reduce, onHit });
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
      if (isOpen && ultra(b) && !reduce && performance.now() - (b.tilt.hover || 0) > 600) { // open ultra-rare cards keep leaning gently on their own
        b.tilt.tx = Math.sin(t / 70) * 7; b.tilt.ty = Math.cos(t / 90) * 9;
        el.style.setProperty('--px', `${-b.tilt.ty * 0.7}px`); el.style.setProperty('--py', `${b.tilt.tx * 0.7}px`);
      }
      b.tilt.x += (b.tilt.tx - b.tilt.x) * 0.25; b.tilt.y += (b.tilt.ty - b.tilt.y) * 0.25;
      const lean = Math.abs(b.tilt.x) + Math.abs(b.tilt.y) > 0.05 ? ` perspective(900px) rotateX(${b.tilt.x}deg) rotateY(${b.tilt.y}deg)` : '';
      el.style.transform = `translate3d(${b.x}px, ${b.y + bob}px, 0) rotate(${b.rot + tilt}deg) scale(${s * sx}, ${s * sy})${lean}`;
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
  return { open, close, tidy, shake, isOpen: () => openB !== null };
}
