# Phase 2: pages for the big four, and screens for every card

**Status:** Draft, 27 Oct 2026. Waiting on Vith's review. No code until Vith approves it (hard rule 1).

## Context

Phase 1 built the Work page: nine cards that open into a store-listing panel (`specs/1-work-table/`). Phase 2 gives the four big projects, Yummers, Athena, Rocket and SongRaccoon, a page each that tells their story (D005, D032). It also fills the six "screens to come" slots with real screenshots.

## Current State

- **Screens on hand:** Yummers has 6 (V004, V015). Rocket has 7 (V018, D024). Athena, SongRaccoon, FoodRaccoon, Lavender, Karina, Hermes and the two small tools have none.
- **What each project needs to run locally** (read 27 Oct 2026; V032 after the build):

  | Project | How it runs | Watch out for |
  |---|---|---|
  | Yummers | Expo app; iPhone 17 Pro simulators are installed | Use the dev project with demo data, never production (Yummers hard rule 3) |
  | Athena | Python app; `.env` has `GEMINI_API_KEY`, `ANTHROPIC_API_KEY`, `DATABASE_URL` | `DATABASE_URL` may point at the live database with Vith's sister's chats (R5) |
  | Rocket | `npm run demo`: stub model, no keys (V018) | Student data, already handled with fixtures |
  | SongRaccoon | Live at songraccoon.vercel.app (HTTP 200); uses `@anthropic-ai/sdk` and Spotify | Each playlist is a paid call (D032 cap); needs a Spotify login |
  | FoodRaccoon | `npm run dev`; `.env.local` points at a Supabase project | v1's production project holds real user data (R5) |
  | Lavender | `npm run dev`, `/sim/` | none |
  | Karina | `uv run app.py`, port 4747 | `meetings/` may hold real team recordings (R5) |
  | Hermes | Ollama `qwen3:14b`, local; `.env` has `ELEVENLABS_API_KEY` | ElevenLabs is paid; the local voice is free |
  | Prompt Polish, Gmail Sorter | browser extension; Python script | Gmail Sorter would show real mail: capture its output on demo data only, or skip |

- **The page code:** the cards, finishes and panel live in `js/main.js`, `js/table.js`, `js/panel.js` and `css/site.css`.

## Proposed Change

1. **Four pages:** `/yummers/`, `/athena/`, `/rocket/` and `/songraccoon/`, each a real address that can be shared.
   - **Top:** the project's card (with its finish, and the tilt for ultra rare), then the title block, links and fact strip, as in the panel.
   - **Body:** 3–4 story sections, each with its own heading (D032), beside a screen or recording. They follow the rhythm of the problem, what was built, a hard part, what came of it. Each section is 2–4 sentences (Vith's "too much text" anti-goal).
   - **End:** a strip of the project's other screens, then "Back to work" and Prev/Next between the four.
2. **"Full story" button** in the open card's panel for the big four, linking to the page.
3. **Screen recordings:** silent MP4 (H.264) with a poster frame, `preload="none"`, played only on click (D032). One per big project where it can run:
   - **Yummers:** rating a place, from the simulator.
   - **Athena:** a question answered, on a demo account.
   - **Rocket:** reading a program, from the stub demo.
   - **SongRaccoon:** a mood becoming a playlist, if it still works.
4. **Screens for the other cards:** every project that can be run is captured with demo data and Vith approves each image. Each card then gets a cover and its panel gets a shelf.
5. **Words:** Claude interviews Vith one project at a time. Claude then drafts each section from those answers and the repo, and Vith approves every line. Rocket's lines are approved one by one (D032).

## Implementation Details

- **Files:** `yummers/index.html`, `athena/index.html`, `rocket/index.html`, `songraccoon/index.html`, each a thin shell that loads `js/page.js`. `js/page.js` renders the page from `projects.js`, plus a new `story` field per big project (sections: heading, text, screen). It reuses the card markup and finishes from `main.js`, moved into a shared `js/card.js`. `css/site.css` gains the page styles.
- **Backdrop:** pages are for reading, so they get a calm static backdrop, not the live scene (Open Question 1).
- **Recordings:** each is about 10–20 s, 1280 px wide (desktop) or 828 px (phone), H.264 without audio, and at most 2 MB. Stored in `assets/recordings/<project>/`.
- **Capture:** screenshots and recordings via the CDP driver (screencast frames, then `ffmpeg` to MP4), or `xcrun simctl io booted recordVideo` for the iPhone simulator.
- **Spending:** a tally of every paid call (model, count, estimated cost) goes in VERIFIED. Work stops before the total could pass $5 (D032).

## Acceptance Criteria

1. **Pages:** `/yummers/`, `/athena/`, `/rocket/` and `/songraccoon/` each load directly (deep link) and from the panel's "Full story" button. Each shows the card, title block, links, fact strip, 3–4 sections and the screen strip.
2. **Words:** every sentence on the four pages is in a VERIFIED row recording Vith's approval. Rocket's are approved line by line. No placeholder text.
3. **Recordings:** each recording has a poster image and a visible play control, and doesn't load (network log) or play until clicked. Each is ≤ 2 MB and has no audio track. Under reduced motion nothing autoplays (it never does).
4. **Privacy:** every new screenshot and recording has a hard rule 5 check in VERIFIED. None shows real users' or students' data, real meetings or real mail.
5. **Cards:** every card that can be captured shows a real cover, and its panel has a numbered shelf. Any that can't be captured keep "screens to come", with the reason recorded.
6. **Spending:** the tally in VERIFIED totals ≤ $5.
7. **Layout:** pages work at 390 and 1440 px in both modes, with no sideways scroll. Contrast is at least 4.5:1, with the Phase 1 method (C004).
8. **Phase 1 unchanged:** the Phase 1 regression scripts still pass (open, Esc, Tab, TIDY UP, layouts, physics, sound).
9. **Budget:** each page loads at most 1.5 MB before any video is played.
10. **impeccable:** the finish reviewer returns `ship` on the pages.

## Testing Plan

The Phase 1 CDP harness, extended to the pages and the video gate. Vith reads every line, listens and looks on a phone.

## Rollback Plan

Nothing is pushed or hosted. Revert the phase's commits.

## Out of Scope

About, Journey, CV and contact (Phase 3); hosting (Phase 4); pages for the five smaller cards; audio in recordings.

## Open Questions

For Vith. None will be answered on Vith's behalf.

1. **Page backdrop:** a calm static backdrop, the same live scene as Work, or a still frame of the scene the visitor came from?
2. **Athena's demo account:** is there a test login and a non-production database Claude can use, or should Vith make one first? (R5)
3. **FoodRaccoon:** capture it logged out with no user content, or skip it? Its database holds real users (R5).
4. **Karina and Gmail Sorter:** is there a demo meeting or demo inbox, or should those cards keep "screens to come"?
5. **Interview format:** one project per session in chat, or a written list of questions per project that Vith answers in one go?

## Related

D005, D013, D022, D024, D032 · R1, R5 · `specs/1-work-table/`
