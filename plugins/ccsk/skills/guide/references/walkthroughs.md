# Walkthroughs — ccsk end-to-end

Four worked examples with the actual commands and what each beat produces. All paths are project-root-relative. The kit self-drives between beats; you only act at the human-owned gates.

---

## A. New feature — `/ccsk:plan` → `/ccsk:build`
The full cadence for non-trivial, multi-step work.

```
/ccsk:plan add rate limiting to the public API
```
**Frame produces** a self-contained plan dir under `.ccsk/plans/<YYMMDD-HHMM-rate-limiting>/`:
- `01-PROMPT.md` — your request verbatim.
- `01-CLARIFY.md` — the answers to the clarify gate (acceptance criteria, scope/files, success metric). The kit asks via `AskUserQuestion` **only** what a grep can't answer.
- `01-RESEARCH.md` — cited findings if external facts were needed (`ccsk:researcher`).
- `01-PLAN.md` — the authoritative ledger: `## Phase NN` sections, each with `[ ]` success-criteria checkboxes + a `status:` field.
- `STATUS.md` — active-plan / active-phase / next-action pointer.

It pauses at the **clarify gate** and again at handoff: *proceed to build, refine, or stop?*

```
/ccsk:build .ccsk/plans/260630-1015-rate-limiting
```
**Forge** — rehydrates first, hydrates each open `[ ]` into a working task, branches off `main`, then `ccsk:executor` implements one slice at a time, journaling continuously to `.ccsk/journals/`.
**Prove** — focused tests for the touched behavior; captures the exact command + exit code + output.
**Sign-off (HARD GATE)** — a **separate** `ccsk:code-reviewer` subagent reads the real diff and writes a verdict to the plan's `reports/`; the ledger boxes flip `[ ]`→`[x]`; a journal entry + MEMORY pointer are written. Then it **offers** the commit (never pushes).

---

## B. Quick bugfix — straight to `/ccsk:build`
Scope is clear and small. Skip planning; build rehydrates for you.

```
/ccsk:build fix the off-by-one in pagination — last page drops a row
```
- Rehydrates `.ccsk/MEMORY.md` + recent journals, branches if on `main`.
- **Reproduce → prove cause → fix** (Red/Green where the stack supports it) via `ccsk:executor` / `ccsk:debugger`.
- Prove: re-run the failing test, now green.
- Sign-off: separate-reviewer verdict (scaled to risk), ledger/journal write-back, offer commit.

If, once it surveys, the change turns out multi-phase or risky, build **stops and routes you to `/ccsk:plan`** rather than guessing.

---

## C. Optimization run — `/ccsk:loop`
Drive one measurable number without re-prompting. Runs in-session (no subagents); memory is git history + `loop-log.tsv`.

```
/ccsk:loop
Goal: Get the main client bundle under 200 KB
Scope: src/**/*.ts | src/**/*.tsx
Verify: vite build >/dev/null 2>&1 && du -k dist/assets/index-*.js | awk '{print $1}'
Guard: tsc --noEmit
Direction: lower
Min-Delta: 1
```
Each iteration: propose **one** atomic change → commit → measure → keep iff Guard passes AND it beats `Min-Delta`, else `git revert`. Stops at the iteration cap, a numeric target, or a discard streak. Final report: baseline → best, kept commits, outcome. It commits but **never pushes** and never targets `main`.

---

## D. Resume after compaction — `/ccsk:rehydrate`
Context was lost (long session, `/compact`, new day). Pull state back before doing anything.

```
/ccsk:rehydrate
```
In order: read the most recent in-progress `STATUS.md` → read `MEMORY.md` and **dereference** its top pointers (open the ADRs/journals, don't just list them) → read the active `01-PLAN.md` ledger → skim recent journals → **reconcile against the code** (`git status`/`git diff`; for `[x]` phases, check files exist and tests pass; flag any box that doesn't match reality). Output is a short briefing — active plan + phase, done vs remaining, key decisions, discrepancies — then hand control to `/ccsk:build`.

---

## A realistic Sign-off evidence block
`/ccsk:build` may **not** declare DONE without citing all four:

```
Tests:   pytest tests/test_ratelimit.py -q → exit 0 ; 14 passed in 1.8s
Review:  .ccsk/plans/260630-1015-rate-limiting/reports/review-phase-02.md → PASS
No-regr: git diff --stat a1b2c3d  (4 files changed, +112 −7)
Memory:  journal .ccsk/journals/260630-rate-limiting.md ; MEMORY pointer L42 ; ADR 0007
```
A `REJECTED` reviewer verdict **halts** the cadence — the kit surfaces 2–4 options (revert + re-plan / update dependents / add a shim / accept the risk) and lets you decide.
