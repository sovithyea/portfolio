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

From `css/site.css` as built in Phase 1. The scene sets the UI ink (rule 2): `ui-dark` over Space, Pond and the night sky; `ui-light` over the day sky. Contrast is checked against the worst case behind each surface (V025, C004).

| Token | `ui-dark` | `ui-light` | Role | Worst-case contrast |
|---|---|---|---|---|
| `--ink` | `#f1f0ec` | `#141414` | Text, borders, focus ring | — |
| `--sub` | `#c0c2cc` | `#4d4b47` | Secondary text in the panel | 9.48 / 7.78:1 on `--panel` |
| `--panel` | `#1b1d24` | `#f4f2ee` | The open card's details | ink 14.76 / 16.48:1 |
| `--chip` | `rgb(15 17 24 / .7)` | `rgb(255 255 255 / .7)` | Credits, hint, scene switch, tool buttons, blurred | ink 6.19:1 over white / 8.74:1 over black |
| `--scrim` | `8 10 16` at 82% | `255 255 255` at 82% | Gradient behind the top bar | ink 10.58 / 12.08:1 |
| `--paper` | `#ffffff` | same | Card face | — |
| `--empty-ink` on the stripes | `#6f6c66` on `#f4f2ee` / `#fff` | same | "screens to come" | 4.68 / 5.23:1 |
| Card colours | per project (D023) | same | Border and name band; white name | 5.54–11.67:1 |

## Typography

| Face | Weights | Use |
|---|---|---|
| Zilla Slab | 600, 700 | Names and headings, uppercase, +0.02em tracking |
| Martian Mono | 400–600 | Badges, labels, buttons, facts, uppercase |
| Hanken Grotesk | 400–600 | Body text and lines |

All three are self-hosted, Latin subset, with `font-display: swap` (`assets/fonts/`, OFL). Fallbacks: Rockwell/Georgia, ui-monospace/Menlo, system-ui.

## Layout patterns

- **Work (Phase 1):** cards float over the scene. An opened card hovers in the top-left at 1.3× (1× on phones), and its details panel fills the rest: beside the card on desktop, a bottom sheet under it below 760 px.
- **Store-listing panel (D011):** a title block with links, a fact strip between two 2 px rules, then a horizontal shelf of numbered screens. Phone shots sit in a 5 px device frame; desktop shots in a browser frame with three dots.
- **Controls:** scene switch, Sound and Tidy up on chips at the bottom right (one row on phones); credits bottom-left; the hint centred (top on narrow screens).
