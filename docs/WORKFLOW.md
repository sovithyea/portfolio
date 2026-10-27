# Workflow

How work gets picked up, written up, committed and recorded. Vith and AI agents both work here, so the process is written down rather than assumed.

> The key words **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT** and **MAY** are to be read as in [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119). **MUST** is a rule a reviewer can reject a change over. **SHOULD** is the default, and departing from it needs a stated reason. **MAY** is genuinely your call.

## The core rule

**No application code before that phase's `spec.md` and `plan.md` are written and reviewed by Vith.** A phase without an approved spec is not ready to build, however obvious it looks. If you find yourself writing code for a phase whose spec is a draft, stop and finish the spec.

## Commits, not PRs (D004)

- Work is committed straight to `main`. There are no GitHub issues, project board or pull requests.
- Commits MUST NOT be pushed until Vith says so. The remote (`sovithyea/portfolio`) is public, so a push publishes.
- [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/): `<type>[(scope)][!]: <description>`.
  - Types: `feat`, `fix`, `docs`, `test`, `chore`, `refactor`.
  - A commit carrying a decision, a reversal, a defect or a non-obvious trade-off MUST have a body explaining **why**, plus `Refs:` footers: `Refs: D002, R1`.
  - Commits MUST NOT carry a Claude signature (`.claude/settings.json`).
- One step of a plan SHOULD be one commit, using the message the plan gives it.

## Writing a phase's spec and plan

Same shape every time.

`specs/N-name/spec.md`:
- **Status** (Draft / Approved by Vith on date / Built)
- **Context**
- **Current State** (verified, with file references)
- **Proposed Change**
- **Implementation Details**
- **Acceptance Criteria** (numbered, pass/fail, nothing subjective)
- **Testing Plan**
- **Rollback Plan**
- **Files Reference**
- **Out of Scope**
- **Open Questions** (for Vith; never answered on Vith's behalf)
- **Related**

`specs/N-name/plan.md`: ordered steps with checkboxes and a commit message per step, ending with a verification pass and a **stop for review**. Tick a box only against evidence (a commit, a run, a screenshot), never against a commit message.

Acceptance criteria are where specs go wrong. "The showcase looks good" is not a criterion. "At 360 px and 1440 px, in light and dark, every project section shows its screenshots with no horizontal scroll, and every `<img>` has non-empty `alt`, `width` and `height`" is.

## Verifying UI

Typechecking and building prove almost nothing for a visual site. A phase's UI criteria MUST be checked in a real browser against the Vite dev server or `vite preview`, at phone and desktop widths, in light and dark. Screenshots of that check are the evidence and go in VERIFIED (by path; screenshots of the site itself are not committed).

## Before a phase is called done

- [ ] Every acceptance criterion checked, with evidence in `docs/VERIFIED.md`
- [ ] Every picture checked for private data (hard rule 5), recorded in VERIFIED
- [ ] Every project fact on the page traced to a source in VERIFIED (hard rule 3)
- [ ] `npm run build` passes
- [ ] `docs/PROGRESS.md` updated
- [ ] New calls logged in `docs/DECISIONS.md`
- [ ] Vith reviews it

## Keeping the docs honest

| File | Update it when |
|---|---|
| `docs/PROGRESS.md` | Every working session: status, what happened, open questions |
| `docs/DECISIONS.md` | Any scope, design, stack or content call. Append-only |
| `docs/VERIFIED.md` | You observe something directly, or find a doc was wrong (C-number) |
| `docs/RISKS.md` | A risk appears, or one is resolved (it moves to DECISIONS) |
| `docs/DESIGN-SYSTEM.md` | A design decision lands (after its D-number) |
| `PRODUCT.md` | Vith answers an open question about audience or purpose |

If you notice a doc is wrong, fixing it is in scope for whatever you're doing.
