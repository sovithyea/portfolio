# Phase 1: the Work table

**Status:** Approved by Vith, 27 Oct 2026 ("yes"). Draft v2 with Open Questions answered (D022). v1 (the same day) described a plain air-hockey table and is superseded by D012–D021. No code may be written for this phase until Vith approves it (hard rule 1).

## Context

The site is a showcase of Vith's projects with real pictures (D001, D002). Its home page, Work, is a table of project cards that drift, bump and can be thrown (D009, D014). An opened card lifts to the top-left and shows its details as a store listing (D008, D011). The cards float over one of three scenes (Space, Pond, Sky), each built from real, licensed photos cut out into moving elements (D018). A visitor can switch scenes; every visit opens on a random one (D015). Cards and the cursor stir the scene (D016, D019). Sound is optional, off by default, and uses the sounds Vith picked (D020, D021).

Everything here was tried by Vith in a working prototype, saved at `~/Desktop/projects/portfolio-prototype/` (`visual/cards.html`, `scenes-real.js`, `sfx.js`, `soundboard.html`; D022). The prototype is the **behavioural reference**: this phase rebuilds it as clean, reviewed site code. It does not copy the prototype, which was written to test feel and carries test hooks and dead variants.

## Current State

- `src/`, `journey/`, `vite.config.ts`, `tsconfig.json`, `package.json` and `package-lock.json` hold the old brief's code. D006 clears it. Nothing is committed (V001).
- **Prototype assets in the scratchpad:**
  - cut-out sprites (`visual/sprites/`): 12 koi, lily pads, 4 planets, the Moon, 5 day and 5 night clouds;
  - backdrops: pebble bottom, Hubble Ultra Deep Field, starfield;
  - sound clips (`visual/sfx/`);
  - six Yummers screens (`visual/shots/`).
  - Per-scene weight as prototyped: pond 1.6 MB, space 1.9 MB, sky 3.2 MB (PNG sprites, large backdrops).
- **Verified facts:** Yummers' stack (V006) and commit count (V007), Prompt Polish (V009), SongRaccoon's URL (V010), the photo licences (V012). Commit counts and one-line descriptions for the other projects were read from their repos this session but aren't yet recorded in VERIFIED (plan Step 3).
- **Facts from Vith:** names, roles, status words and dates (D005, D013).

## Proposed Change

One static page, `index.html`, in plain HTML, CSS and JavaScript (ES modules, no build step, no dependencies; D006).

1. **Top bar:** "Sovithyea Prach" and a WORK link. No other nav until those pages exist (D014).
2. **Nine cards** in D005 order, as `<button>`s. Each card front shows:
   - a real screen, or a labelled "screens to come" slot;
   - the "No." badge and the status word (D013);
   - the name in slab capitals on a band in the project's colour.
3. **Card physics (D009, D014):**
   - **On their own:** cards drift at a floor speed and never leave the table.
   - **When handled:** they can be dragged and thrown, and they bump each other and the walls with a tiny squash.
   - **Behaviour states:**
     - the scatter is fresh each visit;
     - TIDY UP lines the cards up in rows, which hold still until a card is touched (D015);
     - shaking a phone re-deals, after a one-time permission on iPhone.
4. **Opening a card (D009, D011):**
   - the card springs to the top-left and keeps hovering;
   - the store-listing panel beside it shows a title block with links, the fact strip, the numbered screen shelf, and Prev/Next;
   - Small tools shows two mini cards instead of a shelf (D013);
   - the other cards fade and keep drifting, and the scene keeps going.
5. **Scenes (D015, D018, D019), one at a time, drawn on a canvas under the cards:**
   - **Pond:**
     - four real koi swim slowly over a real pebble bottom under tinted water, with real lily pads;
     - waves come only from cards and the cursor, cross each other, and reflect off the edges, cards and pads;
     - koi follow a dragged card and flee splashes.
   - **Space:**
     - NASA planets sit over the Hubble Ultra Deep Field and shift slightly with the cursor, by depth;
     - hits, clicks and fast cursor moves release fine dust that fades.
   - **Sky:**
     - by day, real clouds drift over a blue gradient, and moving cards and the cursor push them aside;
     - at night (after 6 pm local or in dark mode), a starfield photo, the real Moon and dimmed clouds.
   - A switcher (SPACE · POND · SKY) changes scene. The first scene is random.
6. **Sound (D020, D021):** off until the visitor presses SOUND.

   | Moment | Sound |
   |---|---|
   | Card hit | soft thud |
   | Throw | whoosh |
   | Pond landing | bloop |
   | Space dust | sparkle |
   | Sky click | air puff |
   | Open | two-note chime |
   | Close | soft click back (recording) |
   | TIDY UP | card shuffle |
   | Sound on | singing bowl (recording) |
7. **Credits:** each scene's photo credits sit on a small chip, and the sound credits sit beside the sound toggle's help. A full list goes in `assets/CREDITS.md`.
8. **The hint** "Drag and throw a card · tap one to open it · touch the background too" shows until the first touch.

## Design brief (impeccable `shape`, updated)

1. **Job and audience.** Uni staff, peers, anyone curious, arriving from a link, often on a phone (PRODUCT.md). Visitor mode is **Experience**.
2. **Outcome and proof.** In one visit someone can name two projects and what they do. The proof is real screens and checked facts. What no template has: you handle the work like objects in a real place.
3. **Direction.**
   - **The world:** trading cards floating in a real photographed place.
   - **Focal moment:** a card lifting into the corner and opening as a store listing.
   - **Signature interaction:** throwing a card into the pond.
4. **Anti-goals:** a template look, anything drawn standing in for a real thing (D017/D018), overstimulation (Vith on the drawn pond), long text, sound that plays before the visitor asks.
5. **States.**
   - **Cards:** resting, dragged, thrown, colliding, open, tidied, reduced motion.
   - **Scenes:** day, night, loading (until the scene's images arrive, the backdrop colour shows), and LITE (phones and slow machines get fewer elements).
6. **Layout.**
   - **Desktop:** the panel sits right of the open card.
   - **Phone (below 760 px):** the panel is a bottom sheet under the card, and the tools wrap into a row at the bottom.

## Implementation Details

**Files** (all new, at the repo root):

| File | Holds |
|---|---|
| `index.html` | Top bar, canvas, card list, panel, tools, credit chip, hint |
| `css/site.css` | UI tokens for light-ink and dark-ink scenes, fonts, cards, panel, tools, chips, phone layout |
| `js/projects.js` | The nine projects: name, colour, status, line, facts, screens with alt text, links, mini cards |
| `js/table.js` | Card physics, drag/throw, collisions, open/close, Prev/Next, TIDY UP and rest, shake, keyboard, hint |
| `js/scenes.js` | The three scenes with the prototype's API: `set`, `step`, `impact`, `splash`, `wake`, `solids`, `lure`, `pointer`, `poke`, `credit`, `isDark`, plus the pond's wave field |
| `js/sound.js` | The nine picked sounds only: seven made in the browser, two clips |
| `js/main.js` | Wires the modules, the switcher, the random first scene, and the frame loop |
| `assets/scenes/{pond,space,sky}/` | Backdrops and sprites as WebP with alpha, in 2 sizes (desktop and LITE) |
| `assets/sfx/` | `ui-back.mp3`, `bowl.mp3` |
| `assets/shots/yummers/` | The six Yummers screens |
| `assets/fonts/` | Zilla Slab 600/700, Martian Mono 400/600, Hanken Grotesk 400/500/600 (SIL OFL) |
| `assets/CREDITS.md` | Every photo and sound: title, author, licence, source URL, and what was changed (R4) |

**Physics tuning** (carried from the prototype, which Vith accepted):
- Friction is 0.992 per 60 fps frame, restitution 0.9, the floor speed 0.35 px/frame, throws are capped at 45 px/frame, and the tap threshold is 6 px.
- Collisions use axis-aligned boxes. Cards never tilt past ±8°.
- The squash is up to 10% and decays.
- `?debug` logs each card's position, speed and collisions. Plan Step 4 stops for Vith to sign off those values before styling (the old brief's lesson about position maths).

**Pond waves:**
- A 2D wave equation on a grid of 4 px cells (6 px under LITE), damped by 0.976.
- Cards and lily pads are solid cells, so waves reflect off them.
- Shading is by slope, light and soft (crests at most 110/255 alpha).

**Asset budget:**
- Only the active scene's assets load. The others load when the visitor switches.
- At most **1 MB per scene on desktop and 500 KB under LITE**, after converting PNG sprites to WebP and resizing backdrops to the largest drawn size.
- The page shell (HTML, CSS, JS and fonts) is at most 200 KB.

**Facts:** a fact appears only if it has a VERIFIED row (hard rule 3). Unknown facts are left out, never shown as "to confirm".

**Accessibility:**
- **Cards:** each card is a `<button>` named "No. N, Name, status: open details".
- **Panel:** the panel is `role="dialog"` named by its title. The other cards are `inert` while it's open. Focus moves to Close and returns to the card afterwards.
- **Controls:** the scene switcher is a group of `aria-pressed` buttons, and the sound toggle is `aria-pressed`.
- **Canvas:** the canvas is `aria-hidden`.
- **Reduced motion:** the cards rest in a grid and stay draggable, the scenes are drawn still, and there are no ripples, dust or bob.

**Running it:** `python3 -m http.server 8000` from the repo root, then `http://localhost:8000`. It must be served over HTTP, not opened as a file, because ES modules and audio decoding need it.

## Acceptance Criteria

Checked in **headed** Chrome driven over CDP with trusted input. Headless Chrome on this Mac barely runs animation frames (V011), so it's used only for still states and canvas exports. "Both sizes" means 1440×900 and 390×844; "both modes" means emulated light and dark.

1. **The old code is gone:** `src/`, `journey/`, `vite.config.ts`, `tsconfig.json`, `package.json`, `package-lock.json` and `node_modules/`. The page runs from `python3 -m http.server` with no build.
2. **Layout:** at both sizes, in both modes and in each scene, all nine cards are inside the viewport 2 s after load, and `scrollWidth` equals the viewport width.
3. **Bounds:** over a logged 60 s run with 20 scripted throws, no card's box leaves the table on any frame.
4. **Drift:** with no input, every card's speed stays between 0.3 and 45 px/frame from 10 s to 20 s after load.
5. **Drag versus tap:** a drag of 6 px or more moves a card without opening it. A press under 6 px opens it.
6. **Opening:**
   - after 1 s, the open card is within 2 px of its top-left target;
   - the panel is visible and named by its title;
   - every other card is `inert` with opacity 0.3 or less;
   - Esc, Close and a tap on empty background each close it, and `document.activeElement` is then that card.
7. **Keyboard:** Tab reaches the nine cards in number order, Enter opens, and Prev/Next step through all nine and wrap.
8. **TIDY UP:**
   - within 2 s every card is within 1 px of its row slot;
   - the cards hold still for 10 s without input;
   - touching any card releases them.
9. **Scenes:**
   - each of the three renders its backdrop and every element (canvas export checked against the asset list);
   - the first scene varies across 10 loads;
   - the switcher changes the scene and its credit chip.
10. **Night sky:** with `?h=22` or emulated dark mode, the sky shows the starfield, the Moon and the night clouds. With `?h=12` in light mode it shows the day sky.
11. **Waves:** a scripted splash beside a card produces a wave field (canvas export) that is non-zero beyond the card, and zero inside the card's cells.
12. **Reduced motion:**
    - with emulated reduced motion, no card or scene element moves for 10 s without input;
    - a drag still moves a card;
    - an opened card reaches its target on the first frame.
13. **Sound:**
    - no `AudioContext` is created before SOUND is pressed;
    - after it is pressed, each of the nine moments triggers its picked sound once (logged by the module);
    - only `ui-back.mp3` and `bowl.mp3` are requested.
14. **Assets:** network logs per scene show the weight limits held (1 MB desktop, 500 KB LITE), no request to another host, and no asset for a scene that isn't showing.
15. **Contrast:**
    - UI text over every scene is at least 4.5:1 against its chip or scrim, measured from screenshots at the text's position;
    - the white card names are at least 4.5:1 on every card colour.
16. **Pictures:** every screen has non-empty `alt`, `width` and `height`. Every empty slot reads "screens to come".
17. **Facts:** every fact on the page matches a VERIFIED row, and the page contains no "to confirm" or "TBD".
18. **Credits:** every photo and sound used has a row in `assets/CREDITS.md` with its licence and source, and its scene's chip names it.
19. **Privacy:** each Yummers screen has a hard rule 5 check recorded in VERIFIED.
20. **impeccable:** `detect.mjs --json` runs over the changed files, with each finding fixed or recorded. The finish reviewer returns `ship`, or its fixes are resolved.

## Testing Plan

- **A CDP harness in the scratchpad** (Node's global `WebSocket`, trusted `Input.dispatch*`), run against **headed** Chrome for anything that moves. It logs per-frame card state and network requests and saves screenshots. Canvas state is checked by exporting the canvas (`toDataURL`), which works when the page is served over HTTP.
- **Vith checks by hand:** desktop, a real phone (iPhone for the shake permission), dark mode and reduced motion, plus listening to the sounds, which the harness can't judge.

## Rollback Plan

Nothing is pushed or hosted. Rolling back means `git revert` of the phase's commits. The prototype stays in the scratchpad until this phase is approved.

## Files Reference

`index.html`, `css/site.css`, `js/{projects,table,scenes,sound,main}.js`, `assets/{scenes,sfx,shots,fonts}/`, `assets/CREDITS.md`. Docs touched: `CLAUDE.md`, `README.md`, `docs/VERIFIED.md`, `docs/DESIGN-SYSTEM.md`, `docs/PROGRESS.md`.

## Out of Scope

- Pages for the big four, and capturing screenshots other than Yummers' (Phase 2).
- About, Journey (interviewing Vith), the CV, LinkedIn (Phase 3).
- Hosting and a domain (Phase 4).
- The sound board and the other recorded clips. They were a picking tool, not part of the site.

## Open Questions

All answered by Vith on 27 Oct 2026 (D022):
1. **Card colours.** Yummers, Athena, Rocket and SongRaccoon use their brand colours (D022 table). SongRaccoon's name band uses `#9A5230` for contrast, to confirm at Step 3. Claude proposes the other five at Step 3, and Vith picks.
2. **Share-alike sprites.** Kept and licensed CC BY-SA, with credits.
3. **Rocket's card.** A screen is captured in Phase 1 (plan Step 2), with demo data, no student data and no paid model calls.

## Related

D005–D021 · `PRODUCT.md` · `docs/DESIGN-SYSTEM.md` · R1, R2, R4 · V004–V012
