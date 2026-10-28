// Journey (D048): a satellite map is the page. The milestone cards sit in a hand over it; stepping through them flies
// the camera to each place and draws the route there (roads in town, arcs for flights). Tapping a card opens it,
// like a card on the Work page. The visitor can also move the map themselves and come back to the story.
import { journey, PLACES, memorabilia } from './journey-data.js';

// MapTiler's key is public by nature (it runs in the browser); it is locked to the site's addresses in MapTiler (D049)
const MAPTILER_KEY = 'SPFn9uxJOoy0Pijc7Kjx';
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const wide = matchMedia('(min-width: 761px)').matches;
const token = v => getComputedStyle(document.body).getPropertyValue(v).trim();
const colourVar = m => m.p ? `var(--p-${m.p})` : `var(--t-${m.type.toLowerCase()})`;
const colourOf = m => token(m.p ? `--p-${m.p}` : `--t-${m.type.toLowerCase()}`);
const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const n = journey.length;

function kmFromPP(at) {
  const a = PLACES.pp, b = PLACES[at], R = 6371, r = x => x * Math.PI / 180;
  const h = Math.sin(r(b.lat - a.lat) / 2) ** 2 + Math.cos(r(a.lat)) * Math.cos(r(b.lat)) * Math.sin(r(b.lng - a.lng) / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.sqrt(h)));
}
// how many milestones happened at this place, and which one this is
function memories(i) {
  const here = journey.map((m, k) => m.at === journey[i].at ? k : -1).filter(k => k >= 0);
  return { n: here.length, k: here.indexOf(i) + 1 };
}

// ---- the map ----
const { legs } = await fetch('../assets/journey/route.json').then(r => r.json());
const fc = features => ({ type: 'FeatureCollection', features });
const feat = (coords, c) => ({ type: 'Feature', properties: { c }, geometry: { type: 'LineString', coordinates: coords } });
const legColour = l => colourOf(journey[l.i]);
const legsBy = i => journey[i].at === 'world' ? legs.length : legs.filter(l => l.i <= i).length;
const pad = wide ? { left: 460, bottom: 60 } : { bottom: 420 };
const start = PLACES[journey[0].at];

const map = new maplibregl.Map({ container: 'map', style: 'https://tiles.openfreemap.org/styles/positron', center: [start.lng, start.lat], zoom: start.zoom,
  pitch: reduce ? 0 : 50, attributionControl: false, fadeDuration: 400, maxPitch: 70 });
const pinEl = Object.assign(document.createElement('span'), { className: 'pin' });
const marker = new maplibregl.Marker({ element: pinEl, pitchAlignment: 'viewport' }).setLngLat([start.lng, start.lat]).addTo(map);
let ready = false, pending = null, drawn = 0, raf, ticket = 0, bearing = -20, prevAt = null;

map.on('load', () => {
  // satellite imagery under OpenFreeMap's country and city names and building heights; the vector land and roads are hidden
  map.addSource('sat', { type: 'raster', tileSize: 256, maxzoom: 20, tiles: [`https://api.maptiler.com/tiles/satellite-v2/{z}/{x}/{y}.jpg?key=${MAPTILER_KEY}`] });
  map.setPaintProperty('background', 'background-color', token('--bg'));
  map.addLayer({ id: 'sat', type: 'raster', source: 'sat' }, map.getStyle().layers.find(l => l.type !== 'background').id);
  for (const l of map.getStyle().layers) {
    if (l.type === 'fill' || l.type === 'line') map.setLayoutProperty(l.id, 'visibility', 'none');
    else if (l.type === 'symbol') {
      if (!/label_(city_capital|country)/.test(l.id)) map.setLayoutProperty(l.id, 'visibility', 'none');
      else { map.setPaintProperty(l.id, 'text-color', token('--map-label')); map.setPaintProperty(l.id, 'text-halo-color', token('--map-halo')); }
    }
  }
  map.addLayer({ id: 'buildings', type: 'fill-extrusion', source: 'openmaptiles', 'source-layer': 'building', minzoom: 13.5,
    paint: { 'fill-extrusion-color': token('--map-building'), 'fill-extrusion-opacity': .55,
      'fill-extrusion-height': ['coalesce', ['get', 'render_height'], 6], 'fill-extrusion-base': ['coalesce', ['get', 'render_min_height'], 0] } });
  map.addSource('future', { type: 'geojson', data: fc(legs.map(l => feat(l.coords, legColour(l)))) });
  map.addSource('past', { type: 'geojson', data: fc([]) });
  const round = { 'line-cap': 'round', 'line-join': 'round' };
  map.addLayer({ id: 'future', type: 'line', source: 'future', layout: round, paint: { 'line-color': ['get', 'c'], 'line-width': 2.5, 'line-opacity': .45, 'line-dasharray': [1.5, 2] } });
  map.addLayer({ id: 'past-glow', type: 'line', source: 'past', layout: round, paint: { 'line-color': ['get', 'c'], 'line-width': 12, 'line-opacity': .22, 'line-blur': 5 } });
  map.addLayer({ id: 'past', type: 'line', source: 'past', layout: round, paint: { 'line-color': ['get', 'c'], 'line-width': 4.5 } });
  ready = true;
  if (pending != null) show(pending, true);
});
// the visitor's own drag, zoom or turn offers a way back to the story
for (const ev of ['dragstart', 'zoomstart', 'rotatestart', 'pitchstart']) map.on(ev, e => { if (e.originalEvent) back.hidden = false; });

// the solid route runs from where it was, along the roads or the flight arc, to the new place
function grow(to, dur) {
  cancelAnimationFrame(raf);
  const from = drawn; drawn = to;
  const whole = k => legs.slice(0, k).map(l => feat(l.coords, legColour(l)));
  if (reduce || !dur || to <= from) { map.getSource('past').setData(fc(whole(to))); return; }
  const add = legs.slice(from, to), total = add.reduce((s, l) => s + l.coords.length, 0), t0 = performance.now();
  const frame = now => {
    const t = ease(Math.min(1, (now - t0) / dur)), parts = [];
    let left = t * total;
    for (const l of add) {
      if (left <= 0) break;
      const c = l.coords, k = Math.min(c.length - 1, left), j = Math.floor(k), f = k - j;
      const tip = j + 1 < c.length ? [c[j][0] + (c[j + 1][0] - c[j][0]) * f, c[j][1] + (c[j + 1][1] - c[j][1]) * f] : c[j];
      parts.push(feat([...c.slice(0, j + 1), tip], legColour(l)));
      left -= c.length;
    }
    map.getSource('past').setData(fc([...whole(from), ...parts]));
    if (t < 1) raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);
}

function show(i, now) {
  if (!ready) { pending = i; return; }
  const m = journey[i], p = PLACES[m.at], mine = ++ticket, same = prevAt === m.at;
  prevAt = m.at;
  pinEl.style.setProperty('--c', colourVar(m));
  pinEl.classList.toggle('off', !!p.bounds);
  if (!p.bounds) marker.setLngLat([p.lng, p.lat]);
  if (now || reduce) {
    grow(legsBy(i), 0);
    if (p.bounds) map.fitBounds(p.bounds, { padding: 60, pitch: 0, bearing: 0, duration: 0 });
    else map.jumpTo({ center: [p.lng, p.lat], zoom: p.zoom, pitch: reduce ? 0 : 55, bearing: 0, padding: pad });
    return;
  }
  if (p.bounds) {
    grow(legsBy(i), 2400);
    map.fitBounds(p.bounds, { padding: { top: 60, bottom: 60, left: 60, right: 60, ...pad }, pitch: 0, bearing: 0, duration: 3000, easing: ease });
    return;
  }
  if (same) { // another memory in the same place: circle it, a little closer
    bearing += 75;
    map.easeTo({ center: [p.lng, p.lat], zoom: p.zoom + .4, pitch: 62, bearing, padding: pad, duration: 3200, easing: ease });
    return;
  }
  bearing = bearing > 0 ? -20 : 20;
  const land = { center: [p.lng, p.lat], zoom: p.zoom, pitch: 55, bearing, padding: pad };
  const c = map.getCenter();
  if (Math.hypot(c.lng - p.lng, c.lat - p.lat) > 5) {
    // a big move: pull out over both places, draw the flight, then drop in. Timed, because 'moveend' doesn't come
    // when the camera is already framed, which left it stranded.
    map.fitBounds(new maplibregl.LngLatBounds([c.lng, c.lat], [c.lng, c.lat]).extend([p.lng, p.lat]),
      { padding: { top: 90, bottom: 90, left: 90, right: 90, ...pad }, pitch: 0, bearing: 0, duration: 1800, easing: ease });
    setTimeout(() => { if (mine === ticket) grow(legsBy(i), 1600); }, 1800);
    setTimeout(() => { if (mine === ticket) map.flyTo({ ...land, duration: 2600, curve: 1.5, easing: ease }); }, 3300);
    return;
  }
  grow(legsBy(i), 1800);
  map.flyTo({ ...land, duration: 2400, curve: 1.3, easing: ease });
}

// ---- the hand of cards ----
const hand = document.getElementById('hand'), scrub = document.getElementById('scrub'), back = document.getElementById('back');
const panel = document.getElementById('panel'), stage = document.getElementById('stage'), where = document.getElementById('where');
const art = m => m.pic ? `<img class="shot${m.pic.kind === 'desktop' ? ' desk' : ''}" src="../assets/${m.pic.src}" alt="${esc(m.pic.alt)}">`
  : m.slot ? '<span class="empty"><span class="mono">Photo to come</span></span>' : `<span class="yr slab">${m.year}</span>`;
hand.innerHTML = journey.map((m, i) => `<button type="button" data-i="${i}" aria-label="${esc(`${m.when}: ${m.title}`)}. Open">
  <span class="card ${m.r}" style="--c:${colourVar(m)}; --band:${colourVar(m)}"><span class="card-in">
  <span class="no mono">No. ${i + 1}/${n}</span><span class="type mono">${m.type}</span>${art(m)}
  <span class="name slab"><span class="set mono">${m.when}</span>${m.title}</span></span></span></button>`).join('');
const cards = [...hand.children];

// every finish answers the pointer; ultra rare cards also lean in 3D, the art sitting deeper than the name (D048)
cards.forEach(b => {
  const c = b.firstElementChild;
  b.addEventListener('pointermove', e => {
    const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    c.style.setProperty('--sx', `${110 - x * 120}%`); c.style.setProperty('--sy', `${y * 100}%`); c.style.setProperty('--so', 1);
    if (!reduce && c.classList.contains('ultra')) {
      c.classList.add('hov');
      c.style.setProperty('--ry', `${(x - .5) * 32}deg`); c.style.setProperty('--rx', `${(.5 - y) * 32}deg`);
      c.style.setProperty('--px', `${(.5 - x) * 22}px`); c.style.setProperty('--py', `${(.5 - y) * 22}px`);
    }
  });
  b.addEventListener('pointerleave', () => { c.classList.remove('hov'); ['--so', '--rx', '--ry', '--px', '--py'].forEach(v => c.style.removeProperty(v)); });
});

scrub.innerHTML = journey.map((m, i) => `<button type="button" data-i="${i}" style="--c:${colourVar(m)}" aria-label="${esc(`${m.when}: ${m.title}`)}"><span>${i === 0 || journey[i - 1].year !== m.year ? m.year : ''}</span><i></i></button>`).join('');
const ticks = [...scrub.children];
scrub.addEventListener('click', e => { const b = e.target.closest('button'); if (b) go(+b.dataset.i); });

document.getElementById('memo-list').innerHTML = memorabilia.map(x => `<li><span class="empty"><span class="mono">Photo to come</span></span><span>${x.title}</span></li>`).join('');

let cur = 0;
function go(i) {
  if (!panel.hidden) return;
  cur = Math.max(0, Math.min(n - 1, i));
  const m = journey[cur], mem = memories(cur);
  cards.forEach((c, k) => { const d = k - cur; c.dataset.d = d < 0 ? 'past' : d > 2 ? 'far' : d; c.tabIndex = d === 0 ? 0 : -1; });
  ticks.forEach((t, k) => t.toggleAttribute('aria-current', k === cur));
  back.hidden = true;
  show(cur);
  document.getElementById('count').textContent = `${cur + 1} / ${n}`;
  where.innerHTML = `<small>${m.when}</small>${PLACES[m.at].name}${mem.n > 1
    ? `<span class="mem">${Array.from({ length: mem.n }, (_, k) => `<i class="${k < mem.k ? 'on' : ''}"></i>`).join('')} Memory ${mem.k} of ${mem.n} here</span>` : ''}`;
}
document.getElementById('prev').onclick = () => go(cur - 1);
document.getElementById('next').onclick = () => go(cur + 1);
back.onclick = () => { back.hidden = true; prevAt = null; show(cur); };

// ---- opening a card: it lifts into the corner and the chapter opens beside it ----
const CARD_LINK = { yummers: 'Yummers', rocket: 'Rocket', songraccoon: 'SongRaccoon' };
function open(i) {
  const m = journey[i], p = PLACES[m.at], before = journey[i - 1], after = journey[i + 1], r = stage.getBoundingClientRect();
  stage.style.setProperty('--ox', `${(wide ? 24 : (innerWidth - r.width * .82) / 2) - r.left - r.width * .09}px`);
  stage.style.setProperty('--oy', `${(wide ? 80 : 64) - r.top - r.height * .09}px`);
  const picture = m.pic ? `<img src="../assets/${m.pic.src}" alt="${esc(m.pic.alt)}">` : '<span class="empty"><span class="mono">Photo to come</span></span>';
  panel.innerHTML = `<button type="button" class="close mono" id="close">Close</button>
    <div class="chapter">
      <div class="read"><span class="big slab" aria-hidden="true">${m.year}</span><p class="mono kick">${m.type} · ${m.when} · ${p.name}</p>
        <h2 class="slab" id="panel-title">${m.title}</h2>${m.line ? `<p class="line">${m.line}</p>` : ''}${m.note ? `<p class="line">${m.note}</p>` : ''}
        ${m.p ? `<div class="links"><a class="btn" href="../">Open the ${CARD_LINK[m.p]} card</a></div>` : ''}</div>
      <aside class="rail">${before ? `<button type="button" class="nb" data-go="${i - 1}"><small>← Before</small>${before.title}</button>` : ''}
        <div class="margin">${picture}</div>
        ${after ? `<button type="button" class="nb" data-go="${i + 1}"><small>After →</small>${after.title}</button>` : ''}</aside>
    </div>`;
  panel.hidden = false; document.body.classList.add('opened');
  panel.querySelectorAll('[data-go]').forEach(b => b.onclick = () => step(+b.dataset.go));
  document.getElementById('close').onclick = close;
  document.getElementById('close').focus();
}
function close() { panel.hidden = true; document.body.classList.remove('opened'); cards[cur].focus(); }
// inside an opened card, the arrow keys (and Before / After) move to the next card and open it there
function step(k) { if (k < 0 || k >= n) return; close(); go(k); requestAnimationFrame(() => open(k)); }
addEventListener('keydown', e => {
  if (!panel.hidden) { if (e.key === 'Escape') close(); else if (e.key === 'ArrowRight') step(cur + 1); else if (e.key === 'ArrowLeft') step(cur - 1); return; }
  if (e.key === 'ArrowRight') go(cur + 1); else if (e.key === 'ArrowLeft') go(cur - 1);
});
let sx, swiped = false;
hand.addEventListener('pointerdown', e => { sx = e.clientX; swiped = false; });
hand.addEventListener('pointerup', e => { if (Math.abs(e.clientX - sx) > 40) { swiped = true; go(cur + (e.clientX < sx ? 1 : -1)); } });
hand.addEventListener('click', e => { const b = e.target.closest('button[data-i]'); if (b && !swiped && +b.dataset.i === cur && panel.hidden) open(cur); });

go(+(location.hash.match(/^#m(\d+)$/)?.[1] || 0));
