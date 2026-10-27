import { projects } from './projects.js';
import { mountTable } from './table.js';
import { panelHTML } from './panel.js';

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
