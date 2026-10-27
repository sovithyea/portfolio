import { projects } from './projects.js';

const cards = document.getElementById('cards');

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
    cover ? `<img class="shot" src="${cover.src}" alt="" width="828" height="1792">` : `<span class="empty mono">${p.name}<br>screens to come</span>`
  }<span class="name slab">${p.name}</span></span>`;
  li.append(card);
  cards.append(li);
}
