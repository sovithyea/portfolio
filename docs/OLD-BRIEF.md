> **Superseded 27 Oct 2026 by D001–D003 (`docs/DECISIONS.md`).** Kept as the record of the first brief and of what Phases 1–2 built against. Not binding.

# Portfolio Rebuild — CLAUDE.md

> **This is a starting brief, not a locked spec.** It reflects decisions made through prototyping in chat, validated against the real implementation mechanics of a reference site (spencergabor.work — inspected via rendered source, not guessed). Expect this document to change as the build surfaces real constraints. Update it as decisions change; don't treat anything here as immutable.

## What this replaces

This is a **new, separate repo** — it replaces the previous scroll-driven "timeline portfolio" concept entirely. Do not evolve the old `lib/timeline-data.ts` codebase; that project's IA (chronological personal+project mix in one scroll) has been abandoned in favor of a project-gallery model with a separate journey section. Old timeline content is salvageable as raw copy, not as code.

The map-based portfolio (separate repo, MapLibre/Zustand/paper-sepia identity) is untouched by this work. No shared code, no shared visual identity between the two.

## Stack

- **Vite + vanilla TypeScript. No frontend framework** — no React, Vue, or Svelte. This is a deliberate choice: this site is animation- and interaction-heavy (drag physics, scroll velocity, arc math), and every framework adds a layer between the code and the DOM that has to be worked around for exactly that kind of work. Plain DOM/CSS/TS gives direct control with nothing hidden.
- **GSAP** (core) + **ScrollTrigger** + **Draggable** + **InertiaPlugin** for animation. As of GSAP 3.13 (April 2025), the entire plugin set is free including these — `npm install gsap` gets everything, no Club GreenSock membership needed. Register plugins once in a shared setup module.
- No CMS. Project and milestone data are hand-edited TypeScript modules, same pattern as the old timeline repo.
- No state library. The only global state is the active palette — a plain module-level object with a small subscribe/notify pattern is enough; don't reach for anything heavier.

Before starting the build, consider adding GSAP's official Claude Skill (`npx skills add https://github.com/greensock/gsap-skills`) — it covers plugin registration, ScrollTrigger, and Draggable/Inertia patterns and should make Claude Code's GSAP code more idiomatic.

## Site structure

Multi-page Vite app — no client-side router:
- `index.html` → Home. Hero poster → Featured work (carousel) → All projects (grid). Pure project content, no personal/life material.
- `journey/index.html` → Journey. Reached via the avatar icon top-right. Chronological personal/high-school-to-now milestones. Different card treatment from the gallery (no lightbox, no cover images required — narrative + optional photo).
- Contact is not a page — it's the fixed-reveal footer, present under every page.

**Theme persistence across pages:** since this is a real multi-page app (full navigation between `index.html` and `journey/index.html`, not an SPA), persist the selected theme in `localStorage` and apply it via a small **blocking inline script in `<head>`, before any stylesheet or content renders**. This is the standard pattern for avoiding a flash-of-wrong-theme on page load with a multi-page site (the same technique dark-mode toggles use).

*Resolved in Phase 1 — supersedes the original wording of this section:*

- **Colours live in CSS, not in `theme.ts`.** All five palettes are `:root[data-theme="…"]` blocks in `src/styles/theme.css`; bare `:root` carries Daylight so a missing attribute still renders. The earlier plan (palettes as objects in `theme.ts`, `setTheme` calling `setProperty` nine times) forces the boot script to carry a duplicated copy of the whole colour table in *both* HTML files — two copies guaranteed to drift. `theme.ts` now knows theme **ids**, not colours.
- **The boot script only sets an attribute**, so it stays one line and is genuinely identical in both entry points. It validates against the known id list so corrupt storage can't stamp a bogus attribute, and is wrapped in `try/catch` for storage-disabled browsers:
  ```html
  <script>try{var t=localStorage.getItem('pf-theme');if(t&&/^(daylight|nightshift|arcade|terminal|bloom)$/.test(t))document.documentElement.dataset.theme=t}catch(e){}</script>
  ```
- **Persistence stores the theme id slug** under the key `pf-theme` — *not* the palette index. An index silently repoints every saved theme if the palette order ever changes, and the slug is what `data-theme` needs anyway.
- `main.css` is linked from the HTML rather than imported from TS, so it is a real render-blocking stylesheet and the theme is correct on first paint even before (or without) the module script.
- `surface`, `ink`, `sub`, and `accent-ink` are **not** specified by the table below — they were derived in Phase 1 and are open to revision.

## Visual identity

Five curated palettes, each with `bg`, `surface`, `ink`, `sub`, `accent`, `accentInk`, plus hero-specific `heroBg`, `heroWord`, `heroDeep` (the hero poster uses a fully saturated background per theme, distinct from the neutral `bg` used elsewhere):

| Theme | bg | accent | heroBg | heroWord | heroDeep |
|---|---|---|---|---|---|
| Daylight | `#EFEDE6` | `#FF4433` | `#E8461F` | `#FFF2C9` | `#5C1B0A` |
| Nightshift | `#121316` | `#6EF2C0` | `#0E3B2E` | `#7CFFC7` | `#03110C` |
| Arcade | `#F5F0FF` | `#FFB900` | `#3A2170` | `#FFD65C` | `#180F38` |
| Terminal | `#0A0B08` | `#C6FF00` | `#131408` | `#C6FF00` | `#3A4310` |
| Bloom | `#FDF1F6` | `#E8317F` | `#E8317F` | `#FFE3EE` | `#4A0B22` |

None of these should read as sepia/terracotta (that's the map portfolio's identity) or as JetBrains-Mono-flavored AI-default.

Type: **Bricolage Grotesque** for display/headings, **Inter** for body/UI, **Space Mono** for small labels/tags/eyebrows. No JetBrains Mono anywhere.

Project and milestone "cover" placeholders are typographic monograms (large letter in a bordered color block), not broken-image icons — carried forward deliberately from the old timeline portfolio's placeholder-image problem. Real screenshots/GIFs replace these once Vith supplies them; don't let Claude Code source or generate substitute imagery on its own.

## Key interactions (validated mechanics, mapped to GSAP)

1. **Hero poster** — full-viewport flat-color section per active theme. Headline text enters word-by-word (not a block fade) via a staggered GSAP timeline (scaleY or y + opacity, staggered per word, a snappy back/elastic ease). A row of 4 project-cover tiles enters with a bouncy scale-in, staggered. The tiles' rotation responds to **scroll velocity** — use `ScrollTrigger`'s `onUpdate` callback and `self.getVelocity()` rather than hand-rolling a scroll listener; map velocity to an extra rotation offset on top of each tile's base rotation, clamped to a sane range.

2. **Featured work carousel** — a **horizontal filmstrip that curves**, not a circular ring. Use `Draggable` (with `InertiaPlugin` for momentum on release) on the track. On drag/update, compute each slide's distance from the stage center and derive rotation and vertical offset from a cosine curve of that distance (bulges up in the middle, droops and fades toward the edges) — apply via `gsap.set` or `gsap.to` per slide inside the drag callback, not literal circular placement.

3. **All-projects grid + lightbox** — straightforward grid, click opens a modal (simple GSAP fade/scale-in timeline, reverse on close) with prev/next navigation. This is the lowest-risk piece — build it first as the safe foundation.

   *Resolved in Phase 2:*
   - The modal is a **native `<dialog>` opened with `showModal()`**, not a hand-rolled overlay: focus trapping, background inertness, top-layer stacking, Esc and focus restoration all come for free. Esc's `cancel` event is intercepted with `preventDefault()` so the exit timeline runs instead of the dialog snapping shut. Caveat worth knowing: Chrome's close watcher only makes `cancel` cancelable when the dialog was opened **with user activation** — a real click qualifies, a scripted `element.click()` does not, so automated checks must drive trusted input or Esc will appear to bypass the animation.
   - Any author-set `display` on the dialog element must be **scoped to `[open]`** (`.lightbox[open] { display: grid }`). Author rules outrank the UA's `dialog:not([open]) { display: none }`, so an unscoped `display` leaves the closed dialog laid out invisibly over the whole page, swallowing every click on the content behind it.
   - The scrim is a **child element, not `::backdrop`** — GSAP cannot tween a pseudo-element, and this way scrim and panel share one timeline. The dialog itself centres the panel and owns the scroll; the scrim is a fixed sibling beneath it, so any click off the panel lands on the scrim. Dismissal requires the `mousedown` **and** the `click` to land on the scrim, so a drag that starts inside the panel does not close it.
   - **Monogram variants are hashed from the project slug**, not from `index % 3`: a positional cycle paints every column of a 3-up grid one flat colour, and the grid is responsive so the code cannot know the column count. The lightbox derives the same value from the same slug, so a card and its detail view always match. The three treatments are quiet (`surface`) / accent / **ink** — the original hero-bg tile was a near-duplicate of accent in Daylight and nearly invisible against the page in Terminal.
   - Reduced motion is handled for now by collapsing durations to `0` via a `motion()` helper in `src/anim/setup.ts` (the shared GSAP registration module). Phase 9 still owns the `gsap.matchMedia()` pass for the scroll- and drag-driven work.

4. **Palette switcher** — fixed bottom-right icon button. On click, 5 swatches fan out along an arc using sin/cos positioning around the toggle, animated in with a staggered GSAP timeline. Selecting a swatch applies the theme (updates CSS custom properties + localStorage) and closes the menu.

5. **Footer reveal** — the footer is `position: fixed`, sits behind the normal-flow page content, and is only exposed as a phantom spacer element at the end of the page scrolls into view. Drive the footer title's `scaleY` with a `ScrollTrigger` using `scrub: true` pinned to the phantom spacer — this is exactly what `scrub` is designed for. Not a height-expanding accordion.

## Regression risk / build order

Two pieces involve custom physics and are the most likely source of regressions: the **carousel curve math** and the **velocity-reactive hero tiles**. For both: log the actual computed values (drag offset, distance, rotation, velocity) before touching styling, and get explicit sign-off on the math before layering visual polish on top. This mirrors the marker-regression lesson from the map portfolio — don't blind-patch anything position-dependent.

Suggested phase order:
1. Scaffold (Vite + TS, multi-page entry points) + theme system (5 palettes, localStorage, blocking inline script) + data modules with placeholder content — **done**
2. Grid + lightbox (safe foundation) — **done**
3. Hero poster — static first (no animation), confirm layout and copy
4. Hero word-by-word entrance + velocity-reactive tiles (GSAP + ScrollTrigger)
5. Featured carousel (Draggable + InertiaPlugin, curved filmstrip math)
6. Palette arc-fan menu
7. Footer fixed-reveal (ScrollTrigger scrub)
8. Journey page + milestone rail
9. Responsiveness, reduced-motion handling (`gsap.matchMedia` for `prefers-reduced-motion`), polish pass

## Explicit non-goals

- No frontend framework (React, Vue, Svelte, etc.) — stay vanilla TS + GSAP
- No CMS or headless data source
- No state management library
- No literal circular/360° carousel — it's a curved filmstrip
- No sourcing or generating placeholder images — monogram covers stay until real assets are supplied
- No touching the map portfolio or FoodRaccoon repos
- No mixing personal/journey content into the home gallery, or vice versa