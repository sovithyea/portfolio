// Criteria 3 and 4 (spec): cards never leave the table, and with no input they keep drifting.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createBodies, scatter, step, release, TUNING } from '../js/physics.js';

const W = 1440, H = 900, w = 169, h = w * 1.4, bounds = { l: 12, t: 80, r: W - 12, b: H - 12 };
function seeded(seed) { return () => (seed = (seed * 16807) % 2147483647) / 2147483647; } // repeatable runs

test('60 s with 20 hard throws: no card ever leaves the table', () => {
  const rand = seeded(42), bodies = createBodies(9); scatter(bodies, bounds, w, h, rand);
  let worst = 0, hits = 0;
  for (let f = 0; f < 3600; f++) {
    if (f % 180 === 0) { const b = bodies[Math.floor(rand() * 9)], a = rand() * Math.PI * 2, s = 10 + rand() * 60; b.vx = Math.cos(a) * s; b.vy = Math.sin(a) * s; release(b, 0); }
    step(bodies, { dt: 1, bounds, w, h, rand, onHit: () => hits++ });
    for (const b of bodies) worst = Math.max(worst, bounds.l - b.x, bounds.t - b.y, b.x + w - bounds.r, b.y + h - bounds.b);
  }
  assert.ok(worst <= 0.5, `a card went ${worst.toFixed(2)} px past an edge`);
  assert.ok(hits > 20, `expected collisions, got ${hits}`);
});

// The drift top-up and friction balance near 0.28 px/frame (about 17 px/s): the speed Vith approved in the prototype (C003).
test('with no input, every card drifts between 0.2 and 45 px/frame from 10 s to 20 s', () => {
  const rand = seeded(7), bodies = createBodies(9); scatter(bodies, bounds, w, h, rand);
  let lo = Infinity, hi = 0;
  for (let f = 0; f < 1200; f++) {
    step(bodies, { dt: 1, bounds, w, h, rand });
    if (f >= 600) for (const b of bodies) { const s = Math.hypot(b.vx, b.vy); lo = Math.min(lo, s); hi = Math.max(hi, s); }
  }
  assert.ok(lo >= 0.2 && hi <= 45, `speed range ${lo.toFixed(3)}–${hi.toFixed(3)}`);
});

test('a throw is capped, and a card held still before release barely moves', () => {
  const b = createBodies(1)[0];
  b.vx = 300; b.vy = 0; release(b, 0); assert.equal(Math.round(Math.hypot(b.vx, b.vy)), TUNING.maxThrow);
  b.vx = 20; b.vy = 0; release(b, 200); assert.equal(b.vx, 4);
});

test('with drift off (reduced motion, tidied rows) a still card stays still', () => {
  const bodies = createBodies(9); scatter(bodies, bounds, w, h, seeded(3), true);
  const before = bodies.map(b => [b.x, b.y]);
  for (let f = 0; f < 600; f++) step(bodies, { dt: 1, bounds, w, h, drift: false });
  bodies.forEach((b, i) => assert.ok(Math.hypot(b.x - before[i][0], b.y - before[i][1]) < 0.5, `card ${i + 1} moved`));
});
