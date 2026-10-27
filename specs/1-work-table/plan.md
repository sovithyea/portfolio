# Phase 1: build plan

**Status:** Approved with the spec, 27 Oct 2026. In progress. The spec's questions are answered (D022). The prototype to copy from is `~/Desktop/projects/portfolio-prototype/`.

Run every step against `python3 -m http.server 8000`, and check moving behaviour in headed Chrome (V011). Tick a box only against evidence (a commit, a log, a screenshot path).

## Step 0: Commit the docs as they stand
- [ ] Commit `CLAUDE.md`, `AGENTS.md`, `README.md`, `PRODUCT.md`, `docs/`, `specs/` and `.claude/settings.json`. Not pushed (hard rule 8).
- Commit: `docs: process docs, hard rules and decisions D001–D021` (body: why the redo; `Refs: D001, D004`)

## Step 1: Clear the old code (D006)
- [ ] Delete `src/`, `journey/`, `vite.config.ts`, `tsconfig.json`, `package.json`, `package-lock.json`, `node_modules/` and the old `index.html`. Stop the Vite dev server.
- [ ] Change the commands in CLAUDE.md and README to `python3 -m http.server 8000`.
- Commit: `chore: clear the old brief's code` (`Refs: D006`)

## Step 2: Assets
- [x] Copy the used sprites and backdrops from the scratchpad into `assets/scenes/`. Convert them to WebP with alpha in a desktop and a LITE size, and check each scene against the budget (criterion 14).
- [x] Copy `ui-back.mp3` and `bowl.mp3` into `assets/sfx/`, and the six Yummers screens into `assets/shots/yummers/`. Check each screen for private data (hard rule 5, criterion 19).
- [x] **Rocket screen (D022).** Seven screens captured from `athena-119-main` via `npm run demo` (stub model, no keys). Vith chose all seven, with the program read-out as the cover (D024, V018).
  - Run Rocket's Athena locally (`~/Desktop/projects/rocket/athena-demo` or `athena-119-main`, whichever its README says is current) with demo data.
  - Capture one or two screens without sending any message that calls a paid model (hard rule 10).
  - Check them for student data (hard rule 5) and get Vith's approval.
  - Save them to `assets/shots/rocket/`.
- [x] Self-host the three fonts.
- [x] Write `assets/CREDITS.md`, handling the share-alike files as Vith chose (R4), and record the licences in VERIFIED.
- Commit: `feat(assets): scene photos, sounds, Yummers screens and fonts, with credits` (`Refs: D018, D020, D021, R4`)

## Step 3: Static page, no motion
- [x] `index.html` and `css/site.css`: the top bar and the nine cards in a still grid. The panel, tools and chips are added in the steps that make them work, so no dead UI ships.
- [x] `js/projects.js` with VERIFIED facts only. Record each project's commit count, one-line description and link in VERIFIED.
- [x] Confirm Yummers' `#B8401E` in its CSS (V017).
- [x] **Stop:** show Vith the four brand colours (D022) and a proposed set for the other five on the cards, including SongRaccoon's `#9A5230` band, and take the picks. Check contrast (criterion 15).
- Commit: `feat(work): static Work page with the nine cards` (`Refs: D005, D008, D013`)

## Step 4: Physics, then stop for sign-off
- [x] `js/physics.js` (pure, tested in Node) and `js/table.js`: drift, walls, collisions, squash, drag and throw, and the `?debug` log.
- [x] Run criteria 3, 4 and 5 and save the logs (V019). Criterion 4 was corrected by C003.
- [x] **Stop: show Vith the logged speeds, bounds and collision counts, and get a sign-off before Step 5.** Vith: "niceee lets continu", 27 Oct 2026.
- Commit: `feat(work): card physics` (`Refs: D009, D014`)

## Step 5: Open a card
- [x] The spring to the top-left, the hover, the store-listing panel (`js/panel.js`), the mini cards for Small tools, Prev/Next, `inert`, focus handling, and Esc / Close / background tap.
- [x] Check criteria 6 and 7 (V020).
- Commit: `feat(work): open a card into its store listing` (`Refs: D011, D013`)

## Step 6: Scenes
- [x] `js/scenes.js`: Pond, Space and Sky (day and night); the random first scene; the switcher; credit chips; loading on demand; LITE; reduced motion.
- [x] Check criteria 9, 10 and 14 (V021). 12 (scene part) is left to Vith's hand check, because headless can't show stillness.
- Commit: `feat(scenes): pond, space and sky from real photos` (`Refs: D015, D018`)

## Step 7: Cards and cursor stir the scene
- [x] Pond waves (solid cards and pads), splashes, bow waves, koi lure and flee; space dust; clouds pushed by cards and the cursor; parallax.
- [x] Check criterion 11 (V022).
- Commit: `feat(scenes): cards and cursor stir the scene` (`Refs: D016, D019`)

## Step 8: Sound
- [ ] `js/sound.js` with the nine picks, off until SOUND is pressed.
- [ ] Check criterion 13. Vith listens.
- Commit: `feat(sound): the nine picked sounds` (`Refs: D020, D021`)

## Step 9: TIDY UP, shake, hint, phones
- [ ] TIDY UP with rest-until-touched, shake with iPhone permission, the fading hint, and the phone layout (bottom-sheet panel, wrapped tools).
- [ ] Check criteria 2, 8 and 12 (cards part). Vith checks on a real phone.
- Commit: `feat(work): tidy up, shake to deal and phone layout` (`Refs: D014, D015`)

## Step 10: Verification pass
- [ ] Rerun criteria 1–19 and record each in VERIFIED with its evidence.
- [ ] Run impeccable `detect.mjs` once, then the finish reviewer (criterion 20), and fix what it returns.
- [ ] Write the token table and type into `docs/DESIGN-SYSTEM.md` from the built CSS.
- [ ] Add a PROGRESS session entry.
- Commit: `docs: phase 1 verification` (`Refs:` the V and C numbers added)

## Stop for review

Vith reviews the page on desktop and on a phone, with sound on. Nothing is pushed until Vith says so.
