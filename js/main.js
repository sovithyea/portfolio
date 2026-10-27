import { projects } from './projects.js';
import { mountTable } from './table.js';
import { panelHTML } from './panel.js';
import { createScenes } from './scenes.js';

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

const table = mountTable(cards, {
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
// a tap on empty background closes; preventDefault stops the browser moving focus to the background afterwards
document.addEventListener('pointerdown', e => { if (table.isOpen() && !e.target.closest('.card, .panel')) { e.preventDefault(); table.close(true); } });

// Scenes (D015, D018): a random one each visit (or ?s=space|water|sky), switchable, credited on a chip
const scenes = createScenes(document.getElementById('scene'));
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
if (new URLSearchParams(location.search).has('debug')) window.__scenes = scenes;

let last = performance.now();
requestAnimationFrame(function draw(now) { scenes.step(Math.min(2, (now - last) / 16.67)); last = now; requestAnimationFrame(draw); });
