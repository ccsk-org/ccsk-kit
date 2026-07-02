---
name: status
description: Show where the work stands — render the milestone → plans → phases → recent journals/retros tree from .ccsk/ at a glance. Read-only; writes nothing. Use to see progress without opening the ledger. Triggers — "status", "where are we", "show progress", "what's in flight", "current phase".
when_to_use: Invoke for a quick read-only picture of active work. Triggers — "status", "where do things stand", "show me the phases", "what's the milestone progress", "what's in flight".
argument-hint: "[--plans | --milestone <vN>]"
user-invocable: true
allowed-tools: Read, Glob, Grep
---

# /ccsk:status — where the work stands

> A read-only glance at the cadence state: milestones, their plans, each plan's phases and progress, and the latest journals/retros. It **never writes** — for the full pull-before-working briefing use `/ccsk:rehydrate`; to change state use `/ccsk:plan` / `/ccsk:execute` / `/ccsk:retro`.

Contract: `.claude/rules/memory-protocol.md` (artifacts + the milestone/phase model); the `project-organization` skill (`.ccsk/` paths + naming).

## Announce
On activation, emit one inline line first (per the `announce-style` reference — advisory, no box):

> 📊 **Status** · status — {one concise clause on what you're reporting}

## Scope (parse from `$ARGUMENTS`)
- no arg → full tree (milestones + plans + recent memory).
- `--plans` → plans + phases only (skip the milestone section).
- `--milestone <vN>` → one milestone and only its linked plans.

## Method (read-only — writes nothing)
1. **Milestones.** Glob `.ccsk/milestones/*/MILESTONE.md`; for each read goal, exit criteria (met/total), rolling progress, and status (open/closed) + its linked plans.
2. **Plans.** Glob `.ccsk/plans/*/01-PLAN.md`; for each read the `status:`/`progress:` header and parse phases (`## Phase NN` + `[x]`/`[ ]` counts → % done). Read the sibling `STATUS.md` for `active-phase` / `active-milestone` / `next-action`. A plan's `milestone: vN` field links it upward.
3. **Recent memory.** List the newest few `.ccsk/journals/<date>-*.md` and `.ccsk/retros/<date>-*.md` (names + one-line gist).
4. **Reconcile lightly (don't trust blindly).** Flag anything suspect: a `[x]` phase whose files/tests are absent, a stale `STATUS.md`, progress %∉[0,100], conflict markers. Report — never repair (that's not status's job).

## Render (compact tree)
```
📊 Status — {N} milestone(s) · {M} plan(s)

▸ Milestone v2 — <goal>            [open · 2/5 exit criteria · 40%]
  ├─ plan 260702-0921-… <name>     [in-progress · phase 02/03 · 66%]
  │    ✓ 01 <phase>   ◔ 02 <phase>   ☐ 03 <phase>
  └─ plan 260701-1925-… <name>     [done · 100%]
▸ Unlinked plans
  └─ plan 260630-… <name>          [blocked · phase 01/04 · 10%]  ⚠ STATUS stale

Recent: journal 260702-… · retro 260701-…
Next:   <active plan's next-action>
```
Keep it terse; adjust glyphs (`✓` done · `◔` in-progress · `☐` todo) to what renders cleanly. If no milestone exists, show the plans/phases tree and omit the milestone section (don't imply emptiness). When a milestone's exit criteria are all met, note: *"exit criteria met → close with `/ccsk:retro`."*

## Output
The rendered tree + the one-line `Next:` pointer. No files changed. Hands off to `/ccsk:execute` (continue a plan), `/ccsk:plan` (new work), or `/ccsk:retro` (close a milestone).
