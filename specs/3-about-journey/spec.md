# Phase 3: About, Journey, the CV and contact

**Status:** Approved by Vith, 28 Oct 2026 (D041). Open Question 1 answered.

## Context

The Work page shows the projects and only Vith's name (D025). Who Vith is, how Vith got here, and how to get in touch belong on their own pages (D007). Phase 3 adds them: About, Journey, a CV link and the contact links (D040).

## Current State

- **Pages:** only the Work page exists (`index.html`). Its top bar has one link, `WORK`. Phase 2 plans four project pages on a calm, still backdrop (D033), not built yet.
- **What's on hand:** the email and GitHub address (D007). The facts already in VERIFIED for each card's "Built with" (V006, V007, V017). D025 records Vith studies Computer Science (AI) at Swinburne, said in passing and not yet confirmed for the page.
- **Missing, from Vith:** the CV PDF, the LinkedIn URL, any photos, and every word about Vith's life. Nothing is drafted from other sources (D007).

## Proposed Change

1. **Top bar on every page:** `WORK · ABOUT · JOURNEY · CV` (D040). The current page is marked. `CV` opens the PDF in a new tab.
2. **About (`/about/`):**
   - **Intro:** 2–3 lines on who Vith is: study, what Vith builds, what Vith is after.
   - **Photo:** one real photo of Vith, supplied by Vith. Until then, a labelled empty slot (hard rule 4).
   - **Skills and tools:** languages and tools, each one linking to a card on Work that uses it. A skill with no project behind it isn't listed.
   - **A short timeline:** 4–5 key moments from Journey, then a "Full journey" link.
   - **Contact:** email, GitHub, LinkedIn and the CV, as plain links. No form (D007).
3. **Journey (`/journey/`):** a timeline of dated milestones from Vith's life, oldest first, each a heading and one or two lines. Some have a real photo; the rest have none and no stand-in.
4. **Words:** interviews in chat, one topic at a time (D040). Claude drafts only from Vith's answers. Vith approves every line, and every place and date is checked as safe to publish (R6).

## Implementation Details

- **Files:** `about/index.html` and `journey/index.html`, written as plain HTML: the content is fixed and approved line by line, so it needs no data module and no JavaScript. Page styles go in `css/site.css`. The top bar's links are added to `index.html` too.
- **The reading shell** (top bar plus the calm backdrop, D033) is shared with Phase 2's project pages. Whichever phase is built first makes it, and the other reuses it.
- **Photos:** `assets/photos/`, WebP, each with alt text. Each gets a hard rule 5 check for other people's faces and for places (R6), recorded in VERIFIED.
- **CV:** `assets/cv.pdf`, supplied by Vith. Checked for a phone number, home address or birth date before it's committed, since the repo is public (R6). The `CV` link is shown only once the file exists; the same goes for LinkedIn and its URL. No placeholder links.
- **Skills:** each skill has a VERIFIED source, either a project's "Built with" fact or Vith's answer, and names the projects that use it. The big four link to their Phase 2 pages; the rest link to Work (D041).

## Acceptance Criteria

1. **Pages:** `/about/` and `/journey/` load directly, and every page's top bar shows `WORK · ABOUT · JOURNEY · CV` with the current page marked (`aria-current`).
2. **Words:** every sentence on both pages has a VERIFIED row recording Vith's approval. No placeholder text.
3. **Skills:** every skill names the projects that use it, links each one (its Phase 2 page, or Work), and has a VERIFIED source.
4. **Timeline:** About's moments are a subset of Journey's, word for word, and "Full journey" goes to `/journey/`.
5. **Photos:** each has alt text, a hard rule 5 and R6 check in VERIFIED, and Vith's approval. A slot without a photo is labelled empty.
6. **Links:** email, GitHub, LinkedIn and CV open the right targets. None is shown before its target exists.
7. **CV:** the PDF has a privacy check in VERIFIED (no phone number, home address or birth date unless Vith says so).
8. **Layout:** both pages work at 360, 390 and 1440 px in light and dark mode, with no sideways scroll; text contrast at least 4.5:1; tap targets at least 44 px.
9. **Phase 1 unchanged:** the Phase 1 regression scripts still pass with the new top bar.
10. **impeccable:** the finish reviewer returns `ship` on About and Journey.

## Testing Plan

The CDP harness: load each page at the three widths in both modes, check the links, `aria-current`, alt text and contrast, then rerun the Phase 1 scripts. Vith reads every line and looks on a phone.

## Rollback Plan

Nothing is pushed or hosted. Revert the phase's commits.

## Out of Scope

A contact form, a blog, a CMS or analytics (D007). Hosting and domain (Phase 4). Rewriting the CV itself.

## Open Questions

1. **Skill links:** answered by Vith (D041): "Name the projects". No change to the Work page.

Also waiting on Vith, but only for the steps that use them: the CV PDF, the LinkedIn URL and the photos ("Later", D040).

## Related

D003, D007, D025, D033, D040 · R1, R6 · `specs/2-project-pages/`
