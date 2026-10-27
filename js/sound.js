// The sounds Vith picked (D020, D021, D031): seven made in the browser, one recording (assets/CREDITS.md).
// Turning sound on or off is silent (D031).
// Nothing is created, fetched or played until the visitor turns sound on.

const CLIPS = { close: 'assets/sfx/ui-back.mp3' };

export function createSound() {
  let ac = null, out = null, on = false;
  const buffers = {}, last = {}, played = [];

  const noise = dur => {
    const b = ac.createBuffer(1, Math.ceil(ac.sampleRate * dur), ac.sampleRate), d = b.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const s = ac.createBufferSource(); s.buffer = b; return s;
  };
  const env = (node, v, dur, at = 0) => {
    const g = ac.createGain(), T = ac.currentTime + at;
    g.gain.setValueAtTime(0.0001, T); g.gain.exponentialRampToValueAtTime(v, T + 0.006); g.gain.exponentialRampToValueAtTime(0.0001, T + dur);
    node.connect(g).connect(out); return T;
  };
  const tone = (type, f0, f1, v, dur, at = 0) => {
    const o = ac.createOscillator(); o.type = type; const T = env(o, v, dur, at);
    o.frequency.setValueAtTime(f0, T); o.frequency.exponentialRampToValueAtTime(f1, T + dur * 0.8); o.start(T); o.stop(T + dur + 0.02);
  };
  const filtered = (type, f0, f1, v, dur, at = 0, q = 1) => {
    const n = noise(dur + 0.05), f = ac.createBiquadFilter(); f.type = type; f.Q.value = q; n.connect(f);
    const T = env(f, v, dur, at); f.frequency.setValueAtTime(f0, T); f.frequency.exponentialRampToValueAtTime(f1, T + dur); n.start(T);
  };
  const MADE = {
    hit: v => tone('triangle', 190, 70, v, 0.14),                                     // soft thud
    throw: v => filtered('bandpass', 400, 2400, v * 0.7, 0.35, 0, 1.2),              // airy whoosh
    land: v => tone('sine', 280, 900, v * 0.6, 0.14),                                // bloop
    dust: v => [2400, 3150, 4200].forEach((f, i) => tone('sine', f, f * 0.98, v * 0.25, 0.5 + i * 0.2, i * 0.045)), // sparkle
    puff: v => filtered('lowpass', 700, 200, v * 0.8, 0.32),                          // air puff
    open: v => { tone('sine', 880, 880, v * 0.35, 0.9); tone('sine', 1318.5, 1318.5, v * 0.3, 1.1, 0.12); }, // two-note chime
    tidy: v => { for (let i = 0; i < 7; i++) filtered('bandpass', 2200, 1800, v * 0.45, 0.045, i * 0.036, 2); }, // card shuffle
  };

  function clip(m, v) {
    const b = buffers[m]; if (!b) return;
    const s = ac.createBufferSource(), g = ac.createGain(); s.buffer = b; g.gain.value = v; s.connect(g).connect(out); s.start();
  }

  return {
    played, // ?debug evidence: which moments actually sounded
    get on() { return on; },
    toggle() {
      on = !on;
      if (on && !ac) {
        ac = new AudioContext(); out = ac.createGain(); out.gain.value = 0.8; out.connect(ac.destination);
        for (const [m, url] of Object.entries(CLIPS)) fetch(url).then(r => r.arrayBuffer()).then(a => ac.decodeAudioData(a)).then(b => { buffers[m] = b; }).catch(() => {});
      } else if (on) ac.resume();
      return on;
    },
    play(m, strength = 5) {
      if (!on) return;
      const now = performance.now(); if (now - (last[m] || 0) < 45) return; last[m] = now; // one per moment per 45 ms
      if (ac.state === 'suspended') ac.resume();
      const v = Math.min(1, 0.3 + strength * 0.06);
      played.push(m);
      if (MADE[m]) MADE[m](v); else clip(m, v);
    },
  };
}
