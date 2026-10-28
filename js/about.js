// About (D044, D045): the player card leans toward the pointer, and the skill icons drift on their own small
// table with the Work page's physics. Tapping an icon (not dragging it) shows its projects.
import { createBodies, scatter, step, release } from './physics.js';

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

// The player card leans and its sheen follows a mouse pointer (D028); not for touch or reduced motion
const card = document.querySelector('.player');
if (!reduce && matchMedia('(hover: hover)').matches) {
  card.addEventListener('pointermove', e => {
    const r = card.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    card.style.setProperty('--sx', `${110 - x * 120}%`); card.style.setProperty('--sy', `${y * 100}%`); card.style.setProperty('--so', 1);
    card.style.transform = `rotateY(${(x - .5) * 14}deg) rotateX(${(.5 - y) * 14}deg)`;
  });
  card.addEventListener('pointerleave', () => { card.style.transform = ''; card.style.removeProperty('--so'); });
}

const tray = document.getElementById('apps'), items = [...tray.children], buttons = items.map(li => li.querySelector('.app'));
let open = null;

// Each icon's info sits under it (or above, near the bottom), kept inside the table and level while the icon tilts
function place(li) {
  const info = li.querySelector('.app-info'), s = li.offsetWidth, x = li._b ? li._b.x : li.offsetLeft, y = li._b ? li._b.y : li.offsetTop;
  const w = info.offsetWidth, h = info.offsetHeight;
  info.style.left = `${Math.max(8 - x, Math.min(tray.clientWidth - x - w - 8, s / 2 - w / 2))}px`;
  info.style.top = `${y + s + 8 + h < tray.clientHeight ? s + 8 : -h - 8}px`;
  info.style.transform = li._b ? `rotate(${-li._b.rot}deg)` : '';
}
function toggle(li) {
  if (open && open !== li) toggle(open);
  const info = li.querySelector('.app-info'), show = info.hidden;
  info.hidden = !show; li.querySelector('.app').setAttribute('aria-expanded', show);
  li.style.zIndex = show ? 30 : ''; open = show ? li : null;
  if (show) place(li);
}
document.addEventListener('pointerdown', e => { if (open && !open.contains(e.target)) toggle(open); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && open) { const b = open.querySelector('.app'); toggle(open); b.focus(); } });

let dragged = false;
buttons.forEach((b, i) => b.addEventListener('click', () => { if (dragged) { dragged = false; return; } toggle(items[i]); }));

// Under reduced motion the icons stay a still grid; otherwise they drift (D045, DESIGN-SYSTEM rule 6)
if (!reduce) {
  tray.classList.add('live');
  const bodies = createBodies(items.length);
  let size = buttons[0].offsetWidth, bounds;
  const measure = () => { size = buttons[0].offsetWidth; bounds = { l: 8, t: 8, r: tray.clientWidth - 8, b: tray.clientHeight - 8 }; };
  measure();
  scatter(bodies, bounds, size, size);
  items.forEach((li, i) => { li._b = bodies[i]; });
  addEventListener('resize', measure);

  let last = performance.now();
  const tick = now => {
    step(bodies, { dt: Math.min(3, (now - last) / 16.67), bounds, w: size, h: size });
    last = now;
    items.forEach(li => {
      const b = li._b, sx = b.sqAxis === 'x' ? 1 - b.sq : 1 + b.sq / 2, sy = b.sqAxis === 'x' ? 1 + b.sq / 2 : 1 - b.sq;
      li.style.transform = `translate(${b.x}px, ${b.y}px) rotate(${b.rot}deg)`;
      li.firstElementChild.style.transform = `scale(${sx}, ${sy})`;
    });
    if (open) place(open);
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  // Drag and throw, as on the Work table; a press that barely moves stays a tap
  buttons.forEach((el, i) => {
    const b = bodies[i];
    let ox, oy, x0, y0, lt, lx, ly, moved;
    el.addEventListener('pointerdown', e => {
      const r = tray.getBoundingClientRect();
      ox = e.clientX - r.left - b.x; oy = e.clientY - r.top - b.y; x0 = e.clientX; y0 = e.clientY;
      lt = performance.now(); lx = b.x; ly = b.y; moved = false; dragged = false; b.drag = true; b.vx = b.vy = 0;
      el.setPointerCapture(e.pointerId); el.classList.add('drag');
    });
    el.addEventListener('pointermove', e => {
      if (!b.drag) return;
      if (!moved && Math.hypot(e.clientX - x0, e.clientY - y0) < 6) return;
      moved = true;
      const r = tray.getBoundingClientRect(), t = performance.now(), dt = Math.max(1, (t - lt) / 16.67);
      b.x = Math.max(bounds.l, Math.min(bounds.r - size, e.clientX - r.left - ox));
      b.y = Math.max(bounds.t, Math.min(bounds.b - size, e.clientY - r.top - oy));
      b.vx = (b.x - lx) / dt; b.vy = (b.y - ly) / dt; lx = b.x; ly = b.y; lt = t;
    });
    const up = () => {
      if (!b.drag) return;
      b.drag = false; el.classList.remove('drag');
      if (moved) { release(b, performance.now() - lt); dragged = true; } else { b.vx = b.vy = 0; }
    };
    el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
  });
}
