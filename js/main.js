import { projects } from './projects.js';
import { mountTable } from './table.js';
import { panelHTML } from './panel.js';
import { createScenes } from './scenes.js';
import { createSound } from './sound.js';

const cards = document.getElementById('cards'), panel = document.getElementById('panel');

for (const [i, p] of projects.entries()) {
  const li = document.createElement('li');
  const card = document.createElement('button');
  card.className = 'card';
  card.type = 'button';
  card.style.setProperty('--c', p.colour);
  card.style.setProperty('--band', p.band || p.colour);
  card.setAttribute('aria-label', `No. ${i + 1}, ${p.name}, ${p.status.toLowerCase()}: open details`);
  const cover = p.shots?.[p.cover ?? 0];
  card.innerHTML = `<span class="card-in"><span class="no mono">No. ${i + 1}</span><span class="status mono">${p.status}</span>${
    cover ? `<img class="shot" src="${cover.src}" alt="" width="${cover.kind === 'desktop' ? 1600 : 828}" height="${cover.kind === 'desktop' ? 1000 : 1792}"${p.coverPos ? ` style="object-position:${p.coverPos}"` : ''}>` : `<span class="empty mono">${p.name}<br>screens to come</span>`
  }<span class="name slab">${p.name}</span></span>`;
  li.append(card);
  cards.append(li);
}

// Scenes (D015, D018): a random one each visit (or ?s=space|water|sky), switchable, credited on a chip
const scenes = createScenes(document.getElementById('scene'));
const sound = createSound(); // off until the visitor presses Sound (D016)

const table = mountTable(cards, {
  scene: scenes, sound,
  onOpen(i) {
    panel.innerHTML = panelHTML(projects[i], i, projects.length);
    panel.style.setProperty('--c', projects[i].colour);
    panel.hidden = false;
    panel.scrollTop = 0;
    panel.querySelector('[data-close]').addEventListener('click', () => table.close(true));
    for (const b of panel.querySelectorAll('[data-step]')) b.addEventListener('click', () => table.open((i + +b.dataset.step + projects.length) % projects.length));
    panel.querySelector('[data-close]').focus({ preventScroll: true });
  },
  onClose() { panel.hidden = true; panel.innerHTML = ''; },
});

addEventListener('keydown', e => { if (e.key === 'Escape' && table.isOpen()) table.close(true); });

const LABELS = { space: 'Space', water: 'Pond', sky: 'Sky' }, seg = document.getElementById('scene-switch'), credit = document.getElementById('credit');
function setScene(n) {
  scenes.set(n);
  document.body.classList.toggle('ui-dark', scenes.isDark()); document.body.classList.toggle('ui-light', !scenes.isDark());
  for (const b of seg.children) b.setAttribute('aria-pressed', String(b.dataset.s === n));
  credit.innerHTML = 'Photos: ' + scenes.credit();
}
for (const n of scenes.names) {
  const b = document.createElement('button'); b.type = 'button'; b.className = 'mono'; b.textContent = LABELS[n]; b.dataset.s = n;
  b.addEventListener('click', () => setScene(n)); seg.append(b);
}
const asked = new URLSearchParams(location.search).get('s');
setScene(scenes.names.includes(asked) ? asked : scenes.names[Math.floor(Math.random() * scenes.names.length)]);
if (new URLSearchParams(location.search).has('debug')) Object.assign(window, { __scenes: scenes, __sound: sound });

const soundBtn = document.getElementById('sound');
soundBtn.addEventListener('click', () => { const on = sound.toggle(); soundBtn.setAttribute('aria-pressed', String(on)); soundBtn.textContent = on ? 'Sound on' : 'Sound off'; });

// The cursor stirs the background too (D016): a wake on the pond, dust in space, clouds pushed aside
const onBackground = e => !e.target.closest('.card, .panel, .tools, .top, .credit');
let lastP = null;
addEventListener('pointermove', e => {
  if (!onBackground(e)) { lastP = null; return; }
  const now = performance.now();
  if (lastP) { const f = Math.max(1, (now - lastP.t) / 16.67); scenes.pointer(e.clientX, e.clientY, (e.clientX - lastP.x) / f, (e.clientY - lastP.y) / f); }
  lastP = { x: e.clientX, y: e.clientY, t: now };
});
// A tap on the background closes an open card (preventDefault keeps focus from moving to the page), or else pokes the scene
document.addEventListener('pointerdown', e => {
  if (table.isOpen()) { if (!e.target.closest('.card, .panel')) { e.preventDefault(); table.close(true); } }
  else if (onBackground(e)) { scenes.poke(e.clientX, e.clientY); sound.play({ water: 'land', space: 'dust', sky: 'puff' }[scenes.get()], 6); }
});

let last = performance.now();
requestAnimationFrame(function draw(now) { scenes.step(Math.min(2, (now - last) / 16.67)); last = now; requestAnimationFrame(draw); });
