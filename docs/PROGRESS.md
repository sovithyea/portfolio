# Progress

Running ledger. Updated at the end of every working session so state survives across sessions.

**Last updated:** 28 Oct 2026, end of session (Phase 3: Vith picked the card look for About/Journey, D044; skills as drifting app icons, D045; skills from GitHub wait for cards, D046)

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
| 2 | Pages for the big four, plus screens for every card (`specs/2-project-pages/`) | Approved (D034). Step 1: Lavender, Small tools, Hermes, Karina done; SongRaccoon and Athena waiting |
| 3 | About, Journey, the CV and contact (`specs/3-about-journey/`) | Approved (D041). Step 1 (About copy) done, V040. CV live in the top bar (D042). Look chosen: cards (D044), skills as drifting app icons (D045). Journey interview (Step 2) next |
| 4 | Hosting and domain | Not specced ("Decide later", D006) |

### Waiting on Vith

1. **SongRaccoon:** the live site loads (V032). Say whether to go further: a playlist needs your Spotify login and one paid call.
2. **An Athena demo account.** Athena's screens and recording wait for it (D033, R5).
3. **Real-device checks of Phase 1:** sound, iPhone shake, reduced motion, the phone feel.
4. **Pushed:** `main` went to GitHub (public, `sovithyea/portfolio`) on 28 Oct 2026, with Vith's OK, to continue on another device. Before the first push the full history was scanned for private details, and V039's search terms (phone prefix, suburb, postcode) were rewritten out of the three commits that held them. Later pushes still need Vith's say-so (hard rule 8).
5. **For Phase 3:** photos, into `~/Desktop/portfolio-photos/` (empty). LinkedIn photos can't be fetched (V038, below). The player card's colour (graphite mocked). Which projects become cards for TensorFlow, Kotlin and Go (D046). The Journey interview (plan Step 2).

### For the next session

- **New card to add (D043):** the World Cup 2026 Match Predictor, as a tenth card with real screens. Needs its repo found and a capture with Vith's OK; not yet specced into a phase.

- **Plan Step 1 is waiting on SongRaccoon and Athena only.** FoodRaccoon is skipped (D033). Step 2 (recordings) can start with Yummers and Rocket.
- **Capture scripts** for Phase 2 are in `~/Desktop/projects/portfolio-prototype/captures/` (Lavender controller, Gmail Sorter dry run, Hermes and Karina launchers, the made-up meeting).

- **Run the site:** `python3 -m http.server 8000`, then open `http://localhost:8000`.
- **Tests:** `node --test tests/*.test.mjs` runs the physics tests.
- **Browser checks:** the CDP harness is saved in `~/Desktop/projects/portfolio-prototype/harness/`. `cdp.mjs` is the driver; `check-*.mjs` are the Phase 1 checks (open, tidy, sound, scenes, waves, final), and they expect the site on :8000.
- **Today's mocks** (finishes, game cards, ultra rare, page styles) are in `~/Desktop/projects/portfolio-prototype/mocks/`. They load assets from a server rooted at the old scratchpad, so they need the repo's `css/` and `assets/` beside them to render.

## 2026-10-28 (evening, Windows machine) — Phase 3: three mocks, the card look, app-icon skills

- **Setup:** worked on a second computer (Windows). The clone was empty (`git init` plus remote only); `git pull origin main` brought `a520158`. Physics tests 4/4. The mock folder is `../portfolio-mocks/p3/` beside the clone, with directory junctions to the repo's `css/`, `assets/` and `js/` (Git Bash's `ln -s` copies instead of linking here). Served on :8766, the site on :8000. The CDP driver is `../portfolio-mocks/cdp.mjs` (Chrome at `C:/Program Files/Google/Chrome/Application/chrome.exe`, profile in the session scratchpad); `shoot.mjs`, `w360.mjs`, `drag.mjs`, `tap.mjs` and `contrast.mjs` sit beside it. None of it is in the repo (hard rule 4).
- **Mocks:** A cards, B scenes, C editorial, each About and Journey, with the approved About copy (V040) and the draft Journey dotted and tagged. All 24 captures (6 pages × 1440/390 × dark/light) have no sideways scroll; all six pages also pass at 360 px with every tap target ≥ 44 px. Contrast computed analytically over the worst-case backdrop (C004): every text pair ≥ 4.5:1 once the cards' set line is at full opacity (below).
- **Vith chose A · Cards** (D044), with project pages following the same shell. Then four rounds on the skills: word blocks, logo tiles, card tiles / bare logos, and finally **app icons that drift**, tap for projects (D045). DESIGN-SYSTEM rule 6, hard rule 4 (`CLAUDE.md`), both specs and D033/D040/D041's status lines updated to match.
- **GitHub skills:** Vith asked for other skills from GitHub. Candidates from repo languages and requirements files (V041); Vith wants all four groups, each **when its project has a card** (D046).
- **Not done:** no real pages (the Journey interview comes first). The `impeccable` skill isn't installed on this machine, so no finish review ran.
- **Found, out of scope:** the cards' set line is white at 80% opacity (`css/site.css`, `.card .set`). Over the SongRaccoon band (`#9A5230`) that is about 4.35:1, under 4.5:1 [Inference: from the colours, not measured on the page]. Yummers' set line sits on the ultra card's dark fade, not the band, so it's fine there.
- **Unpushed.** Nothing pushed this session.

## 2026-10-28 (later) — Phase 3: spec, LinkedIn, the CV, About copy

- **Spec:** `specs/3-about-journey/` drafted from Vith's answers (D040, R6) and approved (D041). Skills name their projects; no card deep link.
- **Mock:** About and Journey mocked outside the repo, `~/Desktop/projects/portfolio-prototype/mocks/p3/` (served on :8766), first with placeholders, then with LinkedIn leads (dotted, "to confirm"). **Vith's verdict: "the design needs work"** — doesn't feel like the site, too much text and too flat, weak hierarchy, dull timeline. Vith asked for **3 mocks** to pick from.
- **LinkedIn:** public view hits the sign-in wall. Logged-in read via Agent Reach's `mcp-server-linkedin` 4.28.0 (pinned, auto-import off, Vith's own login), one read-only call; contents kept outside the repo (V038, R6). Fetching LinkedIn photos with a copied session was blocked by the permission check and then failed (authwall); the copies were deleted. Photos must come from Vith.
- **CV:** revised from Vith's `.docx` in two versions (D042); Vith settled every fact (Rocket from Jul 2026, degree Mar 2025 – Nov 2026, SCSA president to Jun 2026). The public PDF is `assets/cv.pdf`, linked from the top bar (`WORK · CV`), privacy-checked (V039).
- **About copy approved** line by line: intro, fact strip, skills (V040). "Beyond code" kept; the World Cup 2026 Predictor is to become a card (D043).
- **Harness:** `check-open.mjs` now starts from the last top-bar link.
- **Pushed** to GitHub at the end of the session (front page, item 4).

## 2026-10-28 — Phase 2 approved; screens for the cards

- **Approved:** Vith approved the Phase 2 spec and plan as written, screens first (D034). Hermes is captured without ElevenLabs; SongRaccoon only had a liveness check.
- **Screens committed, each picked by Vith:**
  - **Lavender** (4, cover the box exercise): a scripted controller flew the drone so the QR code and network address never showed (D035, V033).
  - **Small tools:** a shelf now sits under the two minis (D036). Prompt Polish uses 3 of Vith's store shots (V034); the message sites were skipped. Gmail Sorter is a dry run of its real pipeline on made-up mail (D037, V035).
  - **Hermes** (4, cover Chapter III): Pride and Prejudice only, ElevenLabs off (D038, V036).
  - **Karina** (3, cover decisions): a made-up meeting in system voices, on an empty data folder; frames that name HungryRaccoon left out (D039, V037).
- **Real data untouched:** Gmail Sorter's state and logs (md5), Karina's `data/` and `vocab.txt`, Hermes's library. None were opened.
- **Spending:** about $0.03 (Gmail Sorter, estimate) plus Karina's notes call, whose cost is unknown (V035, V037).
- **Slip, fixed:** a commit edited D035 in place; restored in `6c1cc68` (hard rule 7).
- **Open, out of scope:** on phones the panel's Close button overlaps the "No. N of 9" badge (seen on Lavender and Small tools). The title block is Phase 1 code.
- **Checks:** every new cover and shelf loads over CDP at 1440×900 and 390×844; `check-open.mjs` passes; physics 4/4.
- **Unpushed:** all commits.

## 2026-10-27 (late) — after Phase 1: card finishes, animations, sound

- **Card finishes after Vith's pass, each from a mock Vith chose:**
  - sheen and printed keyline (D026);
  - types, rarity and stat lines (D027);
  - full art, metal border and tilt for the ultra-rare cards (D028);
  - press animations (D029);
  - a special card opening, plus the rainbow foil on ultra rare (D030).
- **Toggle sound:** turning sound on or off is now silent; the singing bowl is removed (D031).
- **Finish review:** passed (`ship`) after a third round (V027). Evidence for these changes is V028–V031.
- **Unpushed:** all commits; the repo is public.

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
