# CLAUDE.md

Guidance for Claude Code in this repo. Humans should start at [`README.md`](README.md).

## What this repo is

Vith's personal portfolio site: a showcase of Vith's relevant projects, each shown with **real pictures or demos of the project itself** (D001, D002).
- **For:** uni staff, peers and anyone curious. A broad, honest record of what Vith has built.
- **The picture model is yummersapp.com:** real app screenshots in device frames, a short headline, a line of copy under each screen.
- **One palette, light and dark, following the visitor's system setting.** No theme switcher (D003).
- **Work is a table of project cards floating over a real photographed scene** (Space, Pond or Sky), which the visitor can throw, open and switch (D008–D021). Plain HTML/CSS/JS, no build step (D006).
- **The repo is public** (`sovithyea/portfolio`). Treat everything committed as published.

**`docs/PROGRESS.md` is the only current record of where things stand.** Read its front page before doing anything. If this file disagrees with PROGRESS, trust PROGRESS and fix this file.

**Phase 1 (`specs/1-work-table/`) is approved and being built.** A working prototype of it is saved at `~/Desktop/projects/portfolio-prototype/` (D022), outside the public repo. The code in `src/` was built against the superseded first brief (`docs/OLD-BRIEF.md`). It is unreviewed against the new direction, and nothing in it is assumed to survive.

## Commands

```bash
python3 -m http.server 8000   # from the repo root, then open http://localhost:8000
```

No build step and no dependencies (D006). Serve it over HTTP rather than opening the file, because ES modules and audio decoding need it. VS Code Live Server works too, but it was the cause of C001 under the old Vite setup, so check the URL.

## Read before doing anything

| File | What it gives you |
|---|---|
| `docs/PROGRESS.md` | Where things stand, open questions, what's next |
| `docs/DECISIONS.md` | Every settled call, append-only (D-numbers) |
| `docs/VERIFIED.md` | Observed facts with sources, and the correction log (C-numbers) |
| `docs/RISKS.md` | What reading the code won't tell you (R-numbers) |
| `docs/WORKFLOW.md` | Commits, specs, keeping the docs honest |
| `docs/DESIGN-SYSTEM.md` | The binding design rules and, once set, the real token values |
| `PRODUCT.md` | Who the site is for and what it must do |
| `docs/OLD-BRIEF.md` | The superseded first brief. History only, not binding |

## Before you start a task

Answering a question needs none of this. Changing anything does.

1. **Read PROGRESS** and check the task isn't blocked by an open question there.
2. **Check it's ready.** Application code needs its phase's spec and plan approved (hard rule 1).
3. **Take numbers carefully.** Check `DECISIONS`, `RISKS` and `VERIFIED` for the next free D, R or C number.
4. **Stay in scope.** Anything else you notice goes in PROGRESS's open list, not into this change.
5. **Finish properly:** commit with evidence in the body, and add a PROGRESS session entry.

## Hard rules

**1. No application code before that phase's spec and plan are reviewed by Vith.** If asked to build something whose spec is still a draft, finish the spec and stop for review. Docs and specs are not application code.

**2. Documentation is a lead, not evidence.** That includes this repo's docs and other projects' READMEs. Read the source or run the thing. Record what you observed in `docs/VERIFIED.md` with the file, command or URL that showed it. When a doc turns out wrong, fix it and log a C-number.

**3. Never write a project fact from memory.** Everything the site says about a project (what it does, its stack, who uses it, dates, numbers, Vith's role) comes from that project's repo, its live site, or Vith, and is recorded in VERIFIED. Anything unchecked goes in VERIFIED's Unverified section and stays off the site.

**4. Every picture is real.** Images on the site are screenshots, screen recordings or photos of the actual project, either supplied by Vith or captured from the running project with Vith's OK.
- No stock images, no AI-generated imagery, no illustrations standing in for a project, no mockups of features that don't exist. The one exception is the Work page's scenes: real, licensed photos of real things (koi, lily pads, planets, clouds), cut out and moving (D018). They are credited on the page and in `assets/CREDITS.md`, and recorded in VERIFIED. Sounds follow the same rule (D020).
- A project without a picture yet shows a labelled empty slot, never a substitute.
- Don't generate images unless they're for a demo or a visualisation (Vith, 27 Oct 2026), such as a mock used to choose a direction. Those stay out of the site and out of the repo.
- Every image has written alt text describing what's on screen.

**5. No private data in a picture.** Before any screenshot is committed, it is checked for real people's names, faces, emails, chats, locations or account details (R1). Use demo or Vith's own data. Yummers' beta testers and Athena's student chats are never shown.

**6. The design rules in `docs/DESIGN-SYSTEM.md` are binding.**
- Colours are tokens, never hex in components.
- Light and dark follow `prefers-color-scheme`. No toggle, no switcher, no stored preference (D003).
- Text contrast is at least 4.5:1 in both modes.
- Motion respects `prefers-reduced-motion`.
- Layouts work from 360 px wide.
- A change to the design system is a decision (D-number) before it is code.

**7. Append to `docs/DECISIONS.md`, never rewrite it.** A reversal gets a new entry, and the old one gains a `**Status:**` line. Fixing a stale pointer isn't a rewrite.

**8. Commits follow Conventional Commits 1.0.0.**
- A commit carrying a decision, a reversal, a defect or a non-obvious trade-off MUST have a body explaining *why*, plus `Refs:` footers naming D/R/C numbers.
- No Claude signature in commits (`.claude/settings.json`).
- Commits go straight to `main` (D004). **Nothing is pushed until Vith says so**, because the remote is public.

**9. Write the least code that does the job well.** No dead code, no speculative options, no abstraction with one caller, no handling for cases that can't happen. Reread the diff and delete what the task doesn't need.

**10. No spending without Vith's yes.** That covers paid hosting, domains, paid APIs and paid assets. State the expected cost first.

**11. Say what you verified and what you assumed.** Label reasoning **[Inference]** or **[Assumption]**. Say "I cannot verify this" when that's the case.

Process docs use RFC 2119 keywords: MUST is rejectable at review, and SHOULD needs a stated reason to depart from.

## Layout

```
docs/            progress, decisions, verified facts, risks, workflow, design system, old brief
specs/N-name/    spec.md + plan.md per phase
index.html       the Work page (Phase 1)
css/  js/        site styles and ES modules
assets/          scene photos and sprites, sounds, screenshots, fonts; CREDITS.md lists every source
```

## Working here

- **When an open question blocks you, stop and ask Vith.** Never pick an answer on Vith's behalf. Work that doesn't depend on the answer may continue.
- **Report back in detail:** what changed and why, file by file, the evidence, what's unverified, and what you need from Vith.
- **At the end of a session,** add an entry to `docs/PROGRESS.md` and update its "Last updated" line.
- **Don't invent effort estimates.**
- **Reference projects:** Yummers (`~/Desktop/projects/Yummers/yummers`) and Athena (`~/Desktop/projects/Athena-Parent/athena`) are the origin of this process. `~/Desktop/projects/Yummers/yummersapp.com` is the model for how pictures are shown. Read their source, not their prose.
