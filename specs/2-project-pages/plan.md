# Phase 2: build plan

**Status:** Approved by Vith, 28 Oct 2026 (D034). Being built.

Tick a box only against evidence. Keep the spending tally in VERIFIED as each paid call happens (cap $5, D032).

## Step 1: Screens for the cards
- [ ] Run each project with demo data, as the spec's table lists, and capture screenshots. Check each for private data (hard rule 5).
- [ ] **Stop: Vith picks and approves the screens** per project, as with Rocket (D024).
- Commit: `feat(assets): screens for the other cards` (`Refs: D032, R5`)

## Step 2: Recordings
- [ ] Record Yummers (simulator), Athena (demo account), Rocket (stub demo) and, if it works, SongRaccoon. Encode as silent H.264 MP4 of at most 2 MB each, with a poster frame. Tally the cost.
- [ ] **Stop: Vith approves each recording.**
- Commit: `feat(assets): screen recordings for the big four` (`Refs: D032`)

## Step 3: Interviews
- [ ] Interview Vith about each of the four projects (format per Open Question 5) and draft each page's sections from the answers and the repo.
- [ ] **Stop: Vith approves every line.** Rocket's are approved one by one. Record the approvals in VERIFIED.
- Commit: `docs: approved copy for the four project pages` (`Refs: D032`)

## Step 4: The pages
- [ ] Move the card markup and finishes into a shared `js/card.js` and keep the Work page unchanged (criterion 8).
- [ ] Add `js/page.js`, the four page shells and the page styles; add the "Full story" button in the panel; add click-to-play video.
- [ ] Check criteria 1, 3, 7 and 9.
- Commit: `feat(pages): case-study pages for the big four` (`Refs: D032`)

## Step 5: Verification pass
- [ ] Rerun criteria 1–9 and record each in VERIFIED, then run the finish reviewer (criterion 10).
- [ ] Add a PROGRESS session entry.
- Commit: `docs: phase 2 verification`

## Stop for review

Vith reviews the four pages on desktop and on a phone. Nothing is pushed until Vith says so.
