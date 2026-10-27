# Product

<!-- impeccable:product-schema 1 -->

The decisions behind this are D001–D011 in `docs/DECISIONS.md`. Phase 1 is `specs/1-work-table/` (draft).

## Platform

web

## Stack

Plain HTML, CSS and JavaScript, no build step, no dependencies (D006). Hosting is decided later.

## Users

Uni staff, classmates and anyone curious about what Vith has built (Vith, 27 Oct 2026). They arrive from a link (a CV, a profile or a message), skim on a laptop or phone, and decide in under a minute whether to look closer at a project.

## Product Purpose

Show Vith's relevant projects as they really are:
- each project gets real screenshots or a demo, a plain description and Vith's role;
- a visitor can tell at a glance what each project does and whether it's live.

Success: a visitor can name two of Vith's projects and what they do after one visit.

## Positioning

Real pictures of real work. Not a template portfolio with stock art and claims nobody can check.

## Operating Context

- **From a link, on a phone:** the first screen has to say who Vith is and show work right away.
- **On a laptop, looking closer:** a project's screens are big enough to read.

## Capabilities and Constraints

- One palette in light and dark, following the system setting. No switcher (D003).
- Pictures are real and free of private data (hard rules 4 and 5).
- The repo is public.
- Pages: Work (the card table, D009), one page per big project, About, Journey, and a CV PDF (D007).
- Contact: email, GitHub and LinkedIn links (D007). No contact form, no CMS, no blog.

## Brand Commitments

- Name shown: **Sovithyea Prach** (D005).
- The look: trading cards in each project's own colour, floating over a real photographed scene (D008, D018).
- Sound: off by default; the nine picked sounds (D020, D021).
- No logo or other assets exist yet.

## Evidence on Hand

No screenshots are in the repo yet. The nine projects are listed in D005. Six real Yummers screens exist on yummersapp.com (V004). Never describe a project from memory (hard rule 3).

## Product Principles

1. **Show, don't claim.** A real screen beats a sentence about it.
2. **Honest about state.** Live, in beta, prototype or coursework, said plainly.
3. **Quick to read.** One headline and one line per screen, as on yummersapp.com.
4. **Quiet frame, loud work.** The site's design stays out of the way of the projects' own looks.

## Accessibility & Inclusion

Text contrast at least 4.5:1 in light and dark mode; tap targets at least 44 px; every image has alt text describing what's on screen; motion respects reduced-motion; colour is never the only signal.
