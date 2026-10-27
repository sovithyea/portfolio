# Design System

The binding design rules for the site (hard rule 6). The rules hold now. The **values** (palette, type, spacing) are not chosen yet. The first phase spec proposes them, and once Vith approves they are written here verbatim from the CSS, never re-derived.

A change to anything in this file is a decision: it gets a D-number first, then code.

## Rules

1. **Tokens, not hex.** Every colour is a CSS custom property. Components and component CSS never contain a hex, `rgb()` or named colour.
2. **One palette, two modes (D003).**
   - Light is the default on `:root`. Dark redefines the same tokens under `@media (prefers-color-scheme: dark)`.
   - The page declares `<meta name="color-scheme" content="light dark">`, so form controls and scrollbars match.
   - No JavaScript decides the theme. There is no theme switcher, no toggle, no `data-theme` attribute and no `localStorage` key.
   - On the Work page, the scene sets the UI ink (light ink over dark scenes, dark over the day sky), and text sits on a chip or scrim so it reads over photos (D012, D017). The scene switcher picks a place, not a colour theme.
3. **Contrast.** Body and UI text is at least 4.5:1 on its background in both modes; large text (24 px+, or 19 px+ bold) is at least 3:1. Each token pair is checked and the ratio written in the token table below.
4. **The work is the colour.** The site's palette is quiet, so the projects' own screenshots carry the colour. Accent colour is for links, focus and one highlight per section at most.
5. **Pictures (D002, hard rules 4 and 5).**
   - Real screenshots, recordings or demos only.
   - Every `<img>` has written `alt` describing what's on screen, plus `width` and `height` so the layout doesn't jump. Images below the first screen use `loading="lazy"`.
   - Phone screens sit in a device frame, as on yummersapp.com. Desktop screens sit in a plain browser frame or none (the phase spec decides).
   - A missing picture is a labelled empty slot, never a substitute image.
6. **Motion.**
   - Motion explains or responds. It never decorates for its own sake.
   - The one exception is the Work page (D009, D018): the cards' drift and the scene's slow life (koi, clouds, dust). It stays calm: few elements, slow, and most motion answers a card or the cursor. No other page has ambient motion.
   - Everything respects `prefers-reduced-motion`: with it set, nothing moves except what the visitor directly drags or scrolls.
   - Nothing autoplays with sound.
7. **Responsive.** Layouts work from 360 px to 1920 px with no horizontal page scroll. Tap targets are at least 44 px.
8. **Focus is visible.** Every interactive element shows a focus ring in both modes, built from a token.
9. **Fonts are self-hosted** (bundled packages, not a third-party font CDN), with a system fallback that keeps the layout steady while they load.

## Tokens

*Not set. Phase 1 writes them here from the built CSS (`specs/1-work-table/plan.md`, Step 6).*

| Token | Light | Dark | Role | Contrast |
|---|---|---|---|---|

## Typography

*Proposed in `specs/1-work-table/`:* Zilla Slab (names, headings), Martian Mono (facts, labels, buttons), Hanken Grotesk (body), all self-hosted. The first brief's fonts don't carry over.

## Layout patterns

*Set by the phase spec.* The reference for project sections is yummersapp.com: a headline on one side, and on the other three device-framed screens, each with a short title and one line under it (VERIFIED, V004).
