# Progress

Running ledger. Updated at the end of every working session so state survives across sessions.

**Last updated:** 27 Oct 2026, late (Phase 1 built and verified; waiting on Vith's review)

## Front page — 27 Oct 2026 (evening)

**Work is a set of project cards floating over a real photographed scene** (D008–D021):
- **The cards:** they drift, bump, can be thrown and tidied, and open into a store-listing panel.
- **The scenes:** Space (NASA planets over the Hubble Deep Field, with dust), Pond (real koi and lily pads, with waves from the cards) and Sky (real clouds; starfield and Moon at night). A random one opens each visit.
- **Sound:** off by default, using Vith's nine picks.
- **The prototype:** saved at `~/Desktop/projects/portfolio-prototype/` (D022). Serve it with `python3 -m http.server 8765` there and open `/visual/cards.html`.

**Phase 1 (`specs/1-work-table/`) is built, verified and passed by Vith (27 Oct 2026).** Run `python3 -m http.server 8000` and open `http://localhost:8000`. Nothing is pushed. `src/` still holds the old brief's code; plan Step 1 clears it.

### Phases

| # | Phase | Status |
|---|---|---|
| 1 | Work page (`specs/1-work-table/`) | Done: passed by Vith 27 Oct |
| 2 | Pages for the big four (Yummers, Athena, Rocket, SongRaccoon), plus capturing their screenshots | Not specced |
| 3 | About, Journey (interviewing Vith, D007), the CV PDF, contact links | Not specced |
| 4 | Hosting and domain | Not specced ("Decide later", D006) |

### Waiting on Vith

0. **Review Phase 1** on desktop and on a real phone. Only a person can judge four things:
   - how the sounds sound;
   - shake on an iPhone;
   - stillness with reduced motion on;
   - the overall feel.

   Also decide whether to fund a third reviewer verdict on the last two fixes (V027), and whether to add the reviewer's optional sheen and printed keyline.
1. **The "10 photos"** mentioned earlier never came through.
2. **LinkedIn URL and the CV PDF** (Phase 3).

## 2026-10-27 (late) — Phase 1 built

- **Plan steps 0–10 done, in eleven commits.** Docs; old code cleared; assets; static page; physics (Vith signed off the numbers); open card; scenes; cards stir the scenes; sound; tidy, shake and phones; verification.
- **Rocket:** seven screens captured from Rocket's local demo with the stub model and LEGO lesson fixtures. Vith chose all seven (D024).
- **Corrections:**
  - **C002:** Lavender is TypeScript, not C#.
  - **C003:** idle cards drift at about 0.28 px/frame; criterion 4 corrected.
  - **C004:** contrast is computed against the worst-case photo; the top bar got a scrim.
- **Bugs the checks caught and fixed:**
  - the pond loaded in every scene;
  - the day sky loaded the night photos;
  - background taps lost focus, then both closed a card and poked the scene;
  - the shelf stretched desktop frames;
  - the credit chip collapsed on phones;
  - the two recorded sounds weren't credited on the page.
- **Finish review:** two rounds (V027). D025 logged: the Work page doesn't introduce Vith; About does.
- **Not verifiable headless; Vith checks:** sound quality, iPhone shake, reduced-motion stillness, real-phone feel.

## 2026-10-27 (evening) — scenes, real photos, sounds, spec v2

- **Card details:** the open card's details took the store-listing layout (D011). Card facts and status words came from Vith (D013), and behaviour round two from D014.
- **Scenes:** the air-hockey look was dropped. The first version was drawn scenes (D012) with real waves (D016). Vith found the pond "overstimulating" and the drawing "too ai generated". A detour into flat photos (D017) was not what Vith meant, so the scenes were rebuilt from real photos cut out into sprites (D018). Space dust replaced comets (D019).
- **Sources:** all photos and sounds come from Wikimedia Commons and NASA, with their licences recorded (V012 and the scratchpad's credits files). R4 opened for the share-alike photos.
- **Sounds:** a sound board let Vith pick nine (D020, D021).
- **Headless limit:** headless Chrome barely runs animation frames here (V011). Moving behaviour was judged by Vith in a real browser, and stills were checked by exporting the canvas.
- **Spec and plan rewritten** as draft v2.
- Nothing committed.

## 2026-10-27 — direction, decisions and the Phase 1 spec

- Ran impeccable `shape`. Its discovery came from several rounds of questions. The direction roll is seed 152f2cee.
- Mocked four directions with the real Yummers screens (`visual/directions.html` in the session scratchpad). Vith chose B + C, fused as D008 (`visual/fusion.html`).
- Vith described the air-hockey table. A working prototype (`visual/puck-table.html`) was tried, and Vith settled collisions, the others' behaviour, phones and drift speed (D009). The open card's details were then restyled to the store layout (D011).
- Logged D005–D011, amended DESIGN-SYSTEM rule 6 for the table's drift, and added V006–V008. Added Vith's image rule to hard rule 4 (D010).
- Drafted `specs/1-work-table/spec.md` and `plan.md`.
- Nothing committed yet.

## 2026-10-27 — redo, docs and hard rules

- Read the Yummers and Athena docs to copy their organisation: `CLAUDE.md` with hard rules, `AGENTS.md`, `PRODUCT.md`, `docs/` (PROGRESS, DECISIONS, VERIFIED, RISKS, WORKFLOW, DESIGN-SYSTEM) and `specs/N-name/`.
- Vith's answers became D001–D004.
- Wrote `CLAUDE.md`, `AGENTS.md`, `README.md`, `PRODUCT.md` and every `docs/` file. The old `CLAUDE.md` moved to `docs/OLD-BRIEF.md`, marked superseded.
- Added `.claude/settings.json` with an empty commit attribution (hard rule 8).
- C001: VS Code Live Server can't run the old TypeScript site.
