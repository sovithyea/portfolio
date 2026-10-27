# Verified

Evidence log. A claim goes here only when something was actually run, read or observed, not when it was assumed or planned. Each phase's acceptance criteria are checked off here with the evidence that closed them.

Status key: **VERIFIED** (observed directly) · **ASSUMED** (taken from documentation, not yet confirmed) · **PENDING** (not yet attempted).

---

## Groundwork — 27 Oct 2026

| # | Claim | Status | Evidence |
|---|---|---|---|
| V001 | The repo has no commits; everything is untracked | **VERIFIED** | `git status` at session start: branch `main`, no commits, all files `??` |
| V002 | The remote `sovithyea/portfolio` is public and empty | **VERIFIED** | `gh repo view sovithyea/portfolio --json visibility,isEmpty` → `"visibility":"PUBLIC"`, `"isEmpty":true` |
| V003 | The old brief's Phases 1–2 code builds | **VERIFIED** | `npm run build` → `✓ built in 120ms`, typecheck clean |
| V004 | yummersapp.com shows real app screenshots in device frames, three to a row, each with a title and one line | **VERIFIED** | `~/Desktop/projects/Yummers/yummersapp.com/index.html` lines 117–163 (`assets/app-*.webp`, `width="828" height="1792"`, written `alt` on each); headless Chrome screenshot of https://yummersapp.com/ |
| V005 | The site renders fully on the Vite dev server | **VERIFIED** | Headless Chrome screenshots of `http://localhost:5173/` and `/journey/`: grid of 8 monogram cards and the theme buttons render |
| V006 | Yummers' app is Expo + React Native with Supabase | **VERIFIED** | `~/Desktop/projects/Yummers/yummers/apps/mobile/package.json`: `expo ~57.0.22`, `react-native 0.86.3`, `@supabase/supabase-js 2.108.2` (repo at `1c5e6f7`, 25 Oct 2026) |
| V007 | Yummers has 852 commits | **VERIFIED** | `git -C ~/Desktop/projects/Yummers/yummers rev-list --count HEAD` → 852 (27 Oct 2026). Counts every author's commits, not only Vith's |
| V008 | The puck-table prototype drifts, bounces, opens a card to the top-left and shows the store-style details | **VERIFIED** (desktop, light) · **PENDING** (phone) | Headless Chrome captures `visual/puck-table.png` and `visual/puck-open4.png` in the session scratchpad, 1440×900; Vith's own capture of the dark mode. Headless Chrome froze CSS transitions mid-fade, so the open state was captured with transitions off. The 390 px capture was cropped (headless minimum window width, [Inference]), so the phone layout is unchecked |
| V009 | The repo `prompt-engineer-ai-agent` is a browser extension called Prompt Polish | **VERIFIED** | `~/Desktop/projects/prompt-engineer-ai-agent/manifest.json`: `"name": "Prompt Polish"`, description "Rewrites rough prompts on AI chat sites, and polishes draft messages on Discord, Slack, LinkedIn and Gmail before you send." |
| V010 | SongRaccoon is deployed at https://songraccoon.vercel.app | **VERIFIED** (reachable) · **ASSUMED** (that it's the current deploy) | URL found in `~/Desktop/projects/songraccoon` source; `curl -L` → HTTP 200, 27 Oct 2026 |
| V011 | Headless Chrome on this Mac barely runs `requestAnimationFrame`: 11 frames in 3.3 s | **VERIFIED** | `cards.html` frame counter via `--dump-dom`; logs show `CVDisplayLinkCreateWithCGDisplay failed`. A `setTimeout`-driven copy runs about 50 fps for state checks, but its canvas doesn't appear in screenshots. Animation evidence needs the CDP harness or a real browser |
| V012 | The four scene photos are licensed for reuse with credit | **VERIFIED** | Licence and author read from each file's Wikimedia Commons metadata (`extmetadata.LicenseShortName`, `Artist`) and the NASA Images API, 27 Oct 2026. The pond is CC BY 3.0, the day sky CC BY-SA 4.0, the evening sky CC0, and space a NASA image. Sources and download URLs are in the scratchpad's `photos/full/credits.json`. The NASA terms were not re-read this session [Assumption: standard NASA media guidelines apply to this STScI/Webb image] |
| V013 | Every scene sprite and sound in `assets/` has the licence in `assets/CREDITS.md` | **VERIFIED** | Licence and author read from each file's Wikimedia Commons `extmetadata` (`LicenseShortName`, `Artist`) via the Commons API, 27 Oct 2026; the credits JSON files are kept in `~/Desktop/projects/portfolio-prototype/{photos,sounds}/` |
| V014 | The scenes are within the spec's asset budget | **VERIFIED** | Sizes summed from `assets/scenes/` after the WebP conversion. Desktop / LITE: pond 629 / 255 KB, space 243 / 110 KB, day sky 224 / 129 KB, night sky 386 / 173 KB. Limits 1 MB / 500 KB (criterion 14, file part). Fonts total 92 KB |
| V015 | The six Yummers screens show no private data | **VERIFIED** | Contact sheet of `assets/shots/yummers/*.webp`, checked by Claude 27 Oct 2026: cities, districts, a map, filter chips, sign-in buttons and restaurant listings. No user names, faces, emails, chats or accounts. The search-results screen includes third-party restaurant thumbnails; the same image is already published on yummersapp.com (V004) |
| V016 | The three fonts are under the SIL Open Font License | **ASSUMED** | Google Fonts lists all three as OFL; the licence files were not read this session |
| V017 | The card facts in `js/projects.js` | **VERIFIED** | Read 27 Oct 2026 from each repo under `~/Desktop/projects/`. **Commits:** `git rev-list --count HEAD`; Rocket's 525 counts only Vith's own of 528, via `git log --format=%ae`. **Stack:** `package.json` / `pyproject.toml` / imports. **Public or private:** `gh repo view --json visibility`. **One-line descriptions:** each README's opening lines. **Years:** first-commit dates, all in 2026. **Roles, status words and Rocket's dates:** Vith (D005, D013). **Yummers' colour:** `apps/web/src/app/globals.css` `--primary-strong: #B8401E` |
| V018 | The seven Rocket screens show no student data and cost nothing to make | **VERIFIED** | `~/Desktop/projects/rocket/athena-119-main`, `npm run demo` with no `.env` and API keys unset. The server printed `stub model, "grounded" mode`. Project uploaded: `data/fixtures/break-dance.llsp3`, whose README records a privacy pass showing every fixture is a LEGO lesson title. Captured over CDP 27 Oct 2026 and checked by eye. The chat replies come from the stub, not a live model |
| V019 | Phase 1 criteria 3, 4 and 5 pass | **VERIFIED** | `node --test tests/physics.test.mjs`, 4 of 4 passing, 27 Oct 2026. **Criterion 3:** 60 s with 20 throws of up to 70 px/frame (capped at 45), no card past an edge (worst ≤ 0.5 px), more than 20 collisions. **Criterion 4:** idle speed 0.227–0.289 px/frame from 10 s to 20 s (C003). **Criterion 5:** `check-drag.mjs` (scratchpad) with trusted CDP mouse input on `/?debug`. A 3.6 px press counted 1 tap; a 134 px drag moved card 2 from (447, 124) to (582, 192) and counted no tap |

## Corrections

| # | What was wrong | What's true | Evidence |
|---|---|---|---|
| C001 | Opening the site with VS Code Live Server (`127.0.0.1:5500`) looked like the site was broken | Live Server serves the files raw. The browser can't run `/src/main.ts`, so the grid and theme buttons never mount, and the `@fontsource` fonts don't resolve. Use `npm run dev` and `http://localhost:5173` | Vith's screenshot of `127.0.0.1:5500`, 27 Oct 2026: heading in a fallback font, no grid; same page complete on :5173 (V005) |
| C002 | The prototype described Lavender as "a RePL practical flight trainer, in C#" | Lavender is a Vite + TypeScript drone simulator for the CASA RePL multi-rotor VLOS practical test; the iPhone is the remote control. "c#" was a stray character before the README's `# Lavender` heading, misread as the language | `head -c 60 ~/Desktop/projects/lavender/README.md \| od -c` shows `c #  L a v e n d e r`; `lavender/package.json` lists `vite` and `typescript` |
| C003 | The spec said idle cards drift at 0.3 px/frame or more, and D009 said "about 20 px/s" | The drift top-up (aiming at 0.35) and friction (0.992) balance near **0.28 px/frame, about 17 px/s**. The prototype Vith approved behaved the same way, so criterion 4's lower bound moved to 0.2 rather than the physics changing | `node --test tests/physics.test.mjs`: speed range 0.227–0.289 px/frame from 10 s to 20 s, seeded run, 27 Oct 2026 |

## Unverified

Facts that may be true but have not been checked. They MUST NOT appear on the site until they move up.

- Which projects in `~/Desktop/projects/` are Vith's own work, and which are coursework, employer work or someone else's.
