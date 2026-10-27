# Phase 3: build plan

**Status:** Approved by Vith, 28 Oct 2026 (D041). Being built.

Tick a box only against evidence.

## Step 1: About interview
- [ ] Interview Vith in chat: study, what Vith builds, what Vith is after, and the skills Vith wants listed. Draft the intro and the skills list from the answers and the VERIFIED "Built with" facts.
- [ ] **Stop: Vith approves every line.** Record the approvals in VERIFIED.
- Commit: `docs: approved copy for About` (`Refs: D040`)

## Step 2: Journey interview
- [ ] Interview Vith one period at a time, oldest first. For each place and date, ask whether it's fine to publish (R6). Draft the milestones, and mark the 4–5 for About.
- [ ] **Stop: Vith approves every line.** Record the approvals in VERIFIED.
- Commit: `docs: approved copy for Journey` (`Refs: D040, R6`)

## Step 3: The reading shell and the top bar
- [ ] If Phase 2 hasn't built it yet: the calm backdrop and the page shell in `css/site.css` (D033).
- [ ] The `WORK · ABOUT · JOURNEY · CV` top bar on `index.html` and the new pages; `CV` hidden until `assets/cv.pdf` exists.
- [ ] Rerun the Phase 1 scripts (criterion 9).
- Commit: `feat(pages): reading shell and the four-link top bar` (`Refs: D040, D033`)

## Step 4: About and Journey
- [ ] `about/index.html` and `journey/index.html` with the approved words, labelled empty photo slots, skills linked to their cards, and the contact links on hand.
- [ ] Check criteria 1–4, 6 and 8.
- Commit: `feat(pages): About and Journey` (`Refs: D040`)

## Step 5: Photos, CV and LinkedIn, as they arrive
- [ ] Each photo: hard rule 5 and R6 check, Vith's approval, alt text. Each into its slot.
- [x] The CV: privacy check, then `assets/cv.pdf` and the `CV` link (V039, D042). LinkedIn: the URL into the contact block (confirmed, V038; waits for About).
- Commit per item: `feat(assets): …` (`Refs: D040, R6`)

## Step 6: Verification pass
- [ ] Rerun criteria 1–9 and record each in VERIFIED, then run the finish reviewer (criterion 10).
- [ ] Add a PROGRESS session entry.
- Commit: `docs: phase 3 verification`

## Stop for review

Vith reviews About and Journey on desktop and on a phone. Nothing is pushed until Vith says so.
