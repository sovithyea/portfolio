// An opened card's details, laid out like a store listing (D011): title block with links, the fact strip,
// the numbered screen shelf (or mini cards for Small tools), and Prev/Next.

const frame = (s, k) => s.kind === 'desktop'
  ? `<figure class="frame desktop"><span class="bar" aria-hidden="true"><i></i><i></i><i></i></span><img src="${s.src}" alt="${s.alt}" width="1600" height="1000" loading="lazy" decoding="async"><figcaption class="mono">${k + 1} · ${s.label}</figcaption></figure>`
  : `<figure class="frame phone"><img src="${s.src}" alt="${s.alt}" width="828" height="1792" loading="lazy" decoding="async"><figcaption class="mono">${k + 1} · ${s.label}</figcaption></figure>`;

export function panelHTML(p, i, n) {
  const role = p.facts.find(([k]) => k === 'Role')?.[1];
  const links = (p.links || []).map(([text, href]) => `<a class="btn mono" href="${href}"${href.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${text}</a>`).join('');
  const body = p.minis
    ? `<div class="minis">${p.minis.map(m => `<article class="mini"><div class="mini-in"><p class="tag mono">${m.tag}</p><h3 class="slab">${m.name}</h3><p>${m.line}</p><a class="mono" href="${m.link}" target="_blank" rel="noopener">Code ↗</a></div></article>`).join('')}</div>`
    : `<div class="shelf">${p.shots?.length ? p.shots.map(frame).join('') : '<figure class="frame phone none mono">screens to come</figure>'}</div>`;
  return `<button class="close mono" type="button" data-close>Close ✕</button>
    <div class="head">
      <div>
        <p class="kick mono">No. ${i + 1} of ${n} · ${p.status}</p>
        <h2 class="slab" id="panel-title">${p.name}</h2>
        <p class="line">${p.line}</p>
        ${role ? `<p class="role mono">${role}</p>` : ''}
      </div>
      ${links ? `<div class="links">${links}</div>` : ''}
    </div>
    ${p.facts.length ? `<dl class="facts mono">${p.facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>` : ''}
    ${body}
    <nav class="steps" aria-label="Other projects"><button class="btn mono" type="button" data-step="-1">← Prev</button><button class="btn mono" type="button" data-step="1">Next →</button></nav>`;
}
