# Risks

What reading the code won't tell you. Ordered by severity. Each has a mitigation. When one is resolved, it moves to DECISIONS.

---

## R1 — A screenshot leaks a real person's data into a public repo

**Severity: high.** The site's pictures come from real projects (D002), and some of those projects hold real people's data: Yummers has beta testers, and Athena holds a student's chats and scores. The repo and the site are both public, and git keeps history, so an image committed once stays readable even after it's deleted.

**Mitigation:** hard rule 5. Every picture is checked for names, faces, emails, chats, locations and account details before it's committed, and the check is recorded in VERIFIED. Screens are captured with demo data or Vith's own account. Nothing is pushed until Vith says so (hard rule 8), which leaves a window to rewrite local history if something slips through.

## R2 — Screenshots go stale while the projects keep changing

**Severity: medium.** Yummers and Athena are under active development. A screenshot taken today can show a screen that no longer exists, which breaks "show, don't claim" (`PRODUCT.md`).

**Mitigation:** each picture's capture date and source (build, commit or URL) is recorded in VERIFIED. The phase spec decides whether captions show a date.

## R3 — The old brief's code steers the new design by inertia

**Status:** resolved by D006: the old code is cleared (Phase 1 plan, Step 1).

**Severity: low.** `src/` already has a grid, a lightbox, five palettes and GSAP wiring. It's tempting to keep building on it because it exists, even where D001–D003 point elsewhere.

**Mitigation:** the first phase spec says, file by file, what survives and why (PROGRESS, Q3). Until then nothing in `src/` is assumed to stay.

## R4 — Share-alike photos make the cut-out sprites share-alike too

**Status:** resolved by D022. Vith keeps the sprites and they're published CC BY-SA with credits. The mitigation below is now the plan (Step 2).

**Severity: medium.** The koi, pebble, cloud and Moon sprites come from CC BY-SA photos (D018). Cutting them out is an adaptation, so [Assumption] the published sprites must also be licensed CC BY-SA, with credit and a link to the licence. The site's own code doesn't become BY-SA, but the image files do. Ignoring this would breach the licence on a public site.

**Mitigation:** before launch, list each sprite's licence beside it in the repo (an `assets/CREDITS.md`) and keep the on-page credits. Or swap in CC0 or CC BY sources where they exist. Owner: the phase that ships the scenes.

## R5 — Running real projects for screenshots can expose real people's data

**Severity: high.** Phase 2 runs the projects to capture screens (D032), and several point at real data:
- Athena's `.env` has a `DATABASE_URL` that may be the live database holding Vith's sister's chats;
- FoodRaccoon's `.env.local` points at a Supabase project, and v1's production project holds real user data (Yummers' own hard rule 3);
- Karina's `meetings/` may hold real team recordings;
- Gmail Sorter reads a real inbox.

A screenshot or recording of any of them would publish that data.

**Mitigation:** hard rule 5, plus the Phase 2 spec's Open Questions 2–4. Use demo accounts or non-production databases, capture logged-out or empty states, or skip. Every image and video gets a privacy check recorded in VERIFIED before it's committed.
