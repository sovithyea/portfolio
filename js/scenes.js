// The three scenes behind the cards (D015, D018, D019), drawn on one canvas from real, licensed photos cut out
// into sprites (assets/CREDITS.md): koi and lily pads on a pebble pond, NASA planets over the Hubble Ultra
// Deep Field with dust, real clouds in a day or night sky. Calm by default; most motion answers a card or the
// cursor. Only the scene on screen is loaded, in lighter files on phones and slow machines (spec, asset budget).
export function createScenes(cv) {
  const TAU = Math.PI * 2, rnd = (a, b) => a + Math.random() * (b - a);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sysDark = () => matchMedia('(prefers-color-scheme: dark)').matches;
  const hp = new URLSearchParams(location.search).get('h'); // ?h= previews another hour
  const night = () => { const h = hp !== null ? +hp : new Date().getHours(); return (hp === null && sysDark()) || h < 6 || h >= 18; };
  const LITE = Math.min(innerWidth, innerHeight) < 600 || (navigator.hardwareConcurrency || 8) <= 4;
  const IMG = {}, load = (dir, n) => { const src = `assets/scenes/${dir}/${n}${LITE ? '-lite' : ''}.webp`; return IMG[src] || (IMG[src] = Object.assign(new Image(), { src, decoding: 'async' })); };
  const ok = im => im.complete && im.naturalWidth > 0;
  let g, W = 0, H = 0, t = 0, name = null, S = {}, solids = [], wakes = [], lure = null, ptr = null;

  function cover(im, ox = 0, oy = 0, over = 1.04) {
    if (!ok(im)) return;
    const s = Math.max(W / im.naturalWidth, H / im.naturalHeight) * over, w = im.naturalWidth * s, h = im.naturalHeight * s;
    g.drawImage(im, (W - w) / 2 + ox, (H - h) / 2 + oy, w, h);
  }
  function sprite(im, x, y, w, rot = 0, alpha = 1, shadow = 0) {
    if (!ok(im)) return; const h = w * im.naturalHeight / im.naturalWidth;
    g.save(); g.translate(x, y); g.rotate(rot); g.globalAlpha = alpha;
    if (shadow) { g.shadowColor = 'rgba(0,15,20,.45)'; g.shadowBlur = shadow; g.shadowOffsetX = shadow * .5; g.shadowOffsetY = shadow * .7; }
    g.drawImage(im, -w / 2, -h / 2, w, h); g.restore();
  }
  // gentle parallax toward the cursor, per depth
  const par = { x: 0, y: 0, tx: 0, ty: 0 };
  function easePar(dt) { par.x += (par.tx - par.x) * .04 * dt; par.y += (par.ty - par.y) * .04 * dt; }

  // ---------------------------------------------------------------- pond
  const water = {
    dark: () => true,
    credit: 'Koi: <a href="https://commons.wikimedia.org/wiki/File:Koi-fish.png">Paul Botha</a>, CC BY-SA 3.0 · Lily pads: <a href="https://commons.wikimedia.org/wiki/File:Nymphaea_capensis_leaf4_(14692932191).jpg">Harry Rose</a>, CC BY 2.0 · Pebbles: <a href="https://commons.wikimedia.org/wiki/File:Small_clear_pool_at_Myrstigen_2.jpg">W.carter</a>, CC BY-SA 4.0',
    init() {
      const c = LITE ? 6 : 4, gw = Math.ceil(W / c) + 2, gh = Math.ceil(H / c) + 2, cc = document.createElement('canvas'); cc.width = gw; cc.height = gh;
      const pick = [0, 2, 5, 6].slice(0, LITE ? 3 : 4);
      return {
        c, gw, gh, cur: new Float32Array(gw * gh), prev: new Float32Array(gw * gh), mask: new Uint8Array(gw * gh), cc, cx: cc.getContext('2d'), img: cc.getContext('2d').createImageData(gw, gh),
        bg: load('pond', 'bottom'), padImg: load('pond', 'pads'),
        fish: pick.map(k => ({ im: load('pond', `koi${k}`), x: rnd(0, W), y: rnd(100, H), a: rnd(0, TAU), turn: 0, sp: rnd(.3, .5), boost: 0, len: rnd(110, 150), ph: rnd(0, TAU) })),
        pads: Array.from({ length: LITE ? 3 : 4 }, (_, i) => { const x = rnd(W * .1, W * .9), y = rnd(H * .2, H * .9); return { x, y, hx: x, hy: y, vx: 0, vy: 0, r: rnd(80, 130), rot: rnd(0, TAU), ph: rnd(0, TAU) }; }),
        ripples: [],
      };
    },
    cell(x, y) { return (Math.round(y / S.c) + 1) * S.gw + Math.round(x / S.c) + 1; },
    height(x, y) { const i = this.cell(x, y); return i > 0 && i < S.cur.length ? S.cur[i] : 0; },
    drop(x, y, amp, rad) {
      const { c, gw, gh, cur } = S, cx = x / c + 1, cy = y / c + 1, R = Math.max(2, rad);
      for (let j = Math.max(1, Math.floor(cy - R)); j <= Math.min(gh - 2, Math.ceil(cy + R)); j++)
        for (let i = Math.max(1, Math.floor(cx - R)); i <= Math.min(gw - 2, Math.ceil(cx + R)); i++) {
          const d = Math.hypot(i - cx, j - cy); if (d < R) cur[j * gw + i] -= amp * (Math.cos(d / R * Math.PI) + 1) / 2;
        }
    },
    buildMask() {
      const { c, gw, gh, mask } = S; mask.fill(0);
      for (const [x, y, w, h] of solids) for (let j = Math.max(0, Math.floor(y / c) + 1); j <= Math.min(gh - 1, Math.ceil((y + h) / c) + 1); j++)
        mask.fill(1, j * gw + Math.max(0, Math.floor(x / c) + 1), j * gw + Math.min(gw, Math.ceil((x + w) / c) + 2));
      for (const p of S.pads) { const R = p.r * .45 / c, px = p.x / c + 1, py = p.y / c + 1;
        for (let j = Math.max(0, Math.floor(py - R)); j <= Math.min(gh - 1, Math.ceil(py + R)); j++) for (let i = Math.max(0, Math.floor(px - R)); i <= Math.min(gw - 1, Math.ceil(px + R)); i++) if (Math.hypot(i - px, j - py) < R) mask[j * gw + i] = 1; }
    },
    // waves: the 2D wave equation on a coarse grid; they pass through each other and reflect off edges, cards and pads
    waves(dt) {
      const { gw, gh, mask, img, cx, cc, c } = S, d = img.data;
      if (!reduce) {
        this.buildMask();
        for (let n = dt > 1.5 ? 2 : 1; n > 0; n--) {
          const cur = S.cur, nx = S.prev;
          for (let y = 1; y < gh - 1; y++) for (let x = 1, i = y * gw + 1; x < gw - 1; x++, i++) {
            if (mask[i]) { nx[i] = 0; continue; }
            nx[i] = ((cur[i - 1] + cur[i + 1] + cur[i - gw] + cur[i + gw]) * .5 - nx[i]) * .976;
          }
          S.prev = cur; S.cur = nx;
        }
      }
      const cur = S.cur, k = sysDark() ? .3 : .45; // soft: light catches the crests, troughs darken a little
      for (let y = 1; y < gh - 1; y++) for (let x = 1, i = y * gw + 1; x < gw - 1; x++, i++) {
        const s = (cur[i - 1] - cur[i + 1]) + (cur[i - gw] - cur[i + gw]), o = i * 4;
        if (s > 0) { d[o] = 235; d[o + 1] = 250; d[o + 2] = 255; d[o + 3] = Math.min(110, s * k); }
        else { d[o] = 0; d[o + 1] = 15; d[o + 2] = 20; d[o + 3] = Math.min(90, -s * k * .8); }
      }
      cx.putImageData(img, 0, 0); g.imageSmoothingEnabled = true; g.drawImage(cc, -c, -c, gw * c, gh * c);
      for (const p of S.pads) {
        const e = p.r * .5 + c * 2, hl = this.height(p.x - e, p.y), hr = this.height(p.x + e, p.y), hu = this.height(p.x, p.y - e), hd = this.height(p.x, p.y + e);
        p.vx += ((hl - hr) * .0008 + (p.hx - p.x) * .0015) * dt; p.vy += ((hu - hd) * .0008 + (p.hy - p.y) * .0015) * dt;
        p.vx *= Math.pow(.95, dt); p.vy *= Math.pow(.95, dt); if (!reduce) { p.x += p.vx * dt; p.y += p.vy * dt; }
      }
    },
    koi(f, dt) {
      f.turn += rnd(-.006, .006) * dt; f.turn *= .97;
      const m = 120; if (f.x < m || f.x > W - m || f.y < 110 || f.y > H - m) f.turn += Math.sin(Math.atan2(H / 2 - f.y, W / 2 - f.x) - f.a) * .01 * dt;
      if (lure) { const d = Math.hypot(lure.x - f.x, lure.y - f.y); if (d < 420) { f.turn += Math.sin(Math.atan2(lure.y - f.y, lure.x - f.x) - f.a) * .015 * dt; f.boost = Math.max(f.boost, d > 80 ? .5 : 0); } }
      else if (ptr && performance.now() - ptr.at < 2500) { const d = Math.hypot(ptr.x - f.x, ptr.y - f.y); if (d < 360 && d > 60) f.turn += Math.sin(Math.atan2(ptr.y - f.y, ptr.x - f.x) - f.a) * .006 * dt; }
      for (const r of S.ripples) if (r.r < 60) { const dx = f.x - r.x, dy = f.y - r.y; if (Math.hypot(dx, dy) < 180) { f.boost = 1.8; f.turn += Math.sin(Math.atan2(dy, dx) - f.a) * .04; } }
      f.a += f.turn * dt; f.boost *= Math.pow(.97, dt);
      const sp = (f.sp + f.boost) * (reduce ? 0 : 1); f.x += Math.cos(f.a) * sp * dt; f.y += Math.sin(f.a) * sp * dt;
      // a photo can't bend, so swimming is a slow sway of the whole fish
      const sway = reduce ? 0 : Math.sin(t * (.06 + sp * .05) + f.ph) * .08;
      sprite(f.im, f.x, f.y, f.len, f.a + sway, .95, 10);
    },
    draw(dt) {
      cover(S.bg); g.fillStyle = sysDark() ? 'rgba(4,22,28,.62)' : 'rgba(10,52,58,.38)'; g.fillRect(0, 0, W, H); // water over the pebbles
      for (const f of S.fish) this.koi(f, dt);
      for (const k of wakes) { const sp = Math.hypot(k.vx, k.vy); if (sp > 2) this.drop(k.x + k.w / 2 + k.vx / sp * (k.w / 2 + 10), k.y + k.h / 2 + k.vy / sp * (k.h / 2 + 10), -Math.min(30, sp * 3), 5); }
      this.waves(dt);
      for (const r of S.ripples) r.r += 1.6 * dt; S.ripples = S.ripples.filter(r => r.r < 60);
      for (const p of S.pads) sprite(S.padImg, p.x, p.y, p.r * 2, p.rot + (reduce ? 0 : Math.sin(t * .01 + p.ph) * .03), 1, 14);
    },
    impact(x, y, s) { if (reduce) return; S.ripples.push({ x, y, r: 4 }); this.drop(x, y, Math.min(600, 90 + s * 30), 5 + Math.min(5, s * .3)); },
    splash(x, y, w, h, s) {
      if (reduce) return; const o = S.c * 3, amp = Math.min(320, 70 + s * 20);
      for (let k = 0; k <= 4; k++) { const fx = x + w * k / 4, fy = y + h * k / 4; this.drop(fx, y - o, amp, 5); this.drop(fx, y + h + o, amp, 5); this.drop(x - o, fy, amp, 5); this.drop(x + w + o, fy, amp, 5); }
      S.ripples.push({ x: x + w / 2, y: y + h / 2, r: 4 });
    },
    pointer(x, y, vx, vy) { const sp = Math.hypot(vx, vy); if (sp > .8) this.drop(x, y, Math.min(90, sp * 6), 4); },
    poke(x, y) { this.impact(x, y, 8); },
  };

  // ---------------------------------------------------------------- space
  const space = {
    dark: () => true,
    credit: 'Hubble Ultra Deep Field, Saturn (Cassini), Jupiter (Hubble OPAL), Mars, Neptune (Voyager 2): NASA, ESA, JPL, SSI, STScI',
    init() {
      const m = Math.min(W, H);
      return {
        bg: load('space', 'deepfield'), dust: [],
        bodies: [ // x, y as screen fractions; depth drives parallax
          { im: load('space', 'saturn'), x: .83, y: .78, w: m * .62, rot: -.2, depth: 1 },
          { im: load('space', 'jupiter'), x: .12, y: .28, w: m * .2, rot: 0, depth: .55 },
          { im: load('space', 'mars'), x: .58, y: .16, w: m * .07, rot: 0, depth: .3 },
          { im: load('space', 'neptune'), x: .3, y: .86, w: m * .1, rot: 0, depth: .4 },
        ],
      };
    },
    draw(dt) {
      easePar(dt); cover(S.bg, par.x * .15, par.y * .15, 1.08);
      g.fillStyle = 'rgba(0,0,8,.25)'; g.fillRect(0, 0, W, H);
      for (const b of S.bodies) sprite(b.im, W * b.x + par.x * b.depth, H * b.y + par.y * b.depth, b.w, b.rot, 1);
      // dust: tiny warm and cool motes that drift, twinkle and fade
      g.globalCompositeOperation = 'lighter';
      for (const p of S.dust) {
        p.x += p.vx * dt; p.y += p.vy * dt; p.vx *= Math.pow(.985, dt); p.vy *= Math.pow(.985, dt); p.life -= dt;
        const a = Math.min(1, p.life / 50) * (.55 + .45 * Math.sin(p.life * .3 + p.tw)), R = p.r * 3.2; // a sharp bright speck with a faint glow
        const gr = g.createRadialGradient(p.x, p.y, 0, p.x, p.y, R); gr.addColorStop(0, `rgba(255,255,255,${a})`); gr.addColorStop(.14, `rgba(${p.c},${a * .9})`); gr.addColorStop(.4, `rgba(${p.c},${a * .12})`); gr.addColorStop(1, `rgba(${p.c},0)`);
        g.fillStyle = gr; g.fillRect(p.x - R, p.y - R, R * 2, R * 2);
      }
      g.globalCompositeOperation = 'source-over';
      S.dust = S.dust.filter(p => p.life > 0);
    },
    burst(x, y, n, speed) {
      if (reduce) return;
      for (let i = 0; i < n && S.dust.length < 220; i++) { const a = rnd(0, TAU), sp = rnd(.15, speed);
        S.dust.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, r: rnd(.8, 2.2), life: rnd(60, 160), tw: rnd(0, TAU), c: Math.random() < .6 ? '255,236,200' : '200,220,255' }); }
    },
    impact(x, y, s) { if (s > 2) this.burst(x, y, Math.min(18, 3 + s), Math.min(3, .5 + s * .12)); },
    pointer(x, y, vx, vy) { if (reduce) return; par.tx = (x / W - .5) * -40; par.ty = (y / H - .5) * -26; if (Math.hypot(vx, vy) > 2) this.burst(x, y, 1, .4); },
    poke(x, y) { this.burst(x, y, 26, 2.2); },
  };

  // ---------------------------------------------------------------- sky
  const sky = {
    dark: () => night(),
    credit: () => night()
      ? 'Stars: <a href="https://commons.wikimedia.org/wiki/File:Starry_sky2.jpg">TBOE PC Ohm</a>, CC0 · Moon: <a href="https://commons.wikimedia.org/wiki/File:Full_Moon_Luc_Viatour.jpg">Luc Viatour</a>, CC BY-SA 3.0 · Clouds: <a href="https://commons.wikimedia.org/wiki/File:White_Cumulus_Clouds_against_Blue_Sky_(2).jpg">Lance Vanlewen</a> and <a href="https://commons.wikimedia.org/wiki/File:Cumulus_clouds_in_Russia._img_064.jpg">Dmitry Makeev</a>, CC BY-SA 4.0'
      : 'Clouds: <a href="https://commons.wikimedia.org/wiki/File:White_Cumulus_Clouds_against_Blue_Sky_(2).jpg">Lance Vanlewen</a> and <a href="https://commons.wikimedia.org/wiki/File:Cumulus_clouds_in_Russia._img_064.jpg">Dmitry Makeev</a>, CC BY-SA 4.0',
    init() {
      const n = night(), sfx = n ? '-night' : '';
      return {
        n, stars: n && load('sky', 'stars'), moon: n && load('sky', 'moon'), // night photos only at night
        clouds: Array.from({ length: LITE ? 4 : 6 }, (_, i) => ({ im: load('sky', `cloud${i % 5}${sfx}`), x: rnd(-200, W), y: rnd(70, H * .75), w: rnd(260, 520), vx: 0, vy: 0, sp: rnd(.08, .2), flip: Math.random() < .5, depth: rnd(.3, 1) })),
      };
    },
    draw(dt) {
      easePar(dt);
      if (S.n) { cover(S.stars, par.x * .1, par.y * .1, 1.06); g.fillStyle = 'rgba(5,8,25,.35)'; g.fillRect(0, 0, W, H);
        const m = Math.min(W, H) * .16; sprite(S.moon, W * .78 + par.x * .3, H * .24 + par.y * .3, m);
        const gl = g.createRadialGradient(W * .78, H * .24, m * .4, W * .78, H * .24, m * 2.2); gl.addColorStop(0, 'rgba(220,230,255,.18)'); gl.addColorStop(1, 'rgba(220,230,255,0)'); g.fillStyle = gl; g.fillRect(0, 0, W, H); }
      else { const bg = g.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#3d7fd0'); bg.addColorStop(.65, '#8fc0ec'); bg.addColorStop(1, '#cfe5f7'); g.fillStyle = bg; g.fillRect(0, 0, W, H);
        const sun = g.createRadialGradient(W * .85, H * .12, 0, W * .85, H * .12, 380); sun.addColorStop(0, 'rgba(255,250,225,.7)'); sun.addColorStop(1, 'rgba(255,250,225,0)'); g.fillStyle = sun; g.fillRect(0, 0, W, H); }
      for (const c of S.clouds) {
        const h = c.w * .55;
        for (const k of wakes) if (k.x + k.w > c.x && k.x < c.x + c.w && k.y + k.h > c.y && k.y < c.y + h) { c.vx += k.vx * .015; c.vy += k.vy * .015; }
        if (!reduce) { c.x += (c.sp + c.vx) * dt; c.y += c.vy * dt; } c.vx *= Math.pow(.97, dt); c.vy *= Math.pow(.97, dt);
        c.y = Math.max(40, Math.min(H - h * .5, c.y)); if (c.x > W + 40) c.x = -c.w - rnd(0, 300); if (c.x < -c.w - 400) c.x = W;
        if (!ok(c.im)) continue; g.save(); g.translate(c.x + par.x * c.depth * .5, c.y + par.y * c.depth * .5); if (c.flip) { g.translate(c.w, 0); g.scale(-1, 1); }
        g.globalAlpha = .95; g.drawImage(c.im, 0, 0, c.w, c.w * c.im.naturalHeight / c.im.naturalWidth); g.restore();
      }
    },
    impact() {},
    pointer(x, y, vx, vy) { if (reduce) return; par.tx = (x / W - .5) * -24; par.ty = (y / H - .5) * -14; if (Math.hypot(vx, vy) > 1) wakes.push({ x: x - 50, y: y - 50, w: 100, h: 100, vx: vx * 1.2, vy: vy * 1.2 }); },
    poke(x, y) { for (const a of [0, 1.57, 3.14, 4.71]) wakes.push({ x: x - 140, y: y - 140, w: 280, h: 280, vx: Math.cos(a) * 10, vy: Math.sin(a) * 10 }); },
  };

  const scenes = { space, water, sky };
  function size() { const dpr = Math.min(2, devicePixelRatio || 1); W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; g.setTransform(dpr, 0, 0, dpr, 0, 0); if (name) S = scenes[name].init(); } // no scene loads until one is chosen
  g = cv.getContext('2d'); size();
  addEventListener('resize', size);
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', size);
  return {
    names: Object.keys(scenes),
    set(n) { name = n; par.tx = par.ty = 0; S = scenes[n].init(); },
    get: () => name,
    isDark: () => scenes[name].dark(),
    credit: () => { const c = scenes[name].credit; return typeof c === 'function' ? c() : c; },
    step(dt) { t += dt; if (name) scenes[name].draw(dt); wakes = []; },
    impact(x, y, s) { scenes[name].impact(x, y, s); },
    splash(x, y, w, h, s) { const sc = scenes[name]; if (sc.splash) sc.splash(x, y, w, h, s); else sc.impact(x + w / 2, y + h / 2, s); },
    wake(x, y, vx, vy, w, h) { wakes.push({ x, y, vx, vy, w, h }); },
    solids(list) { solids = list; },
    lure(x, y) { lure = x === null ? null : { x, y }; },
    pointer(x, y, vx, vy) { ptr = { x, y, at: performance.now() }; scenes[name].pointer(x, y, vx, vy); },
    poke(x, y) { if (!reduce) scenes[name].poke(x, y); },
  };
}
