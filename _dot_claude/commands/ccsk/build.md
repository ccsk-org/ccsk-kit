---
name: ccsk:build
description: Implement a plan or a clear task end-to-end — survey, forge slice by slice, prove with tests + review, then sign off. The kit's implementation pipeline.
argument-hint: [path to a .ccsk/plans/<dir>, or a natural-language task]
allowed-tools: Read, Glob, Grep, Bash, Task, Write, Edit, MultiEdit, AskUserQuestion, WebSearch, WebFetch
---

# `/ccsk:build`

> The **Forge → Prove → Sign-off** beats of the Build Cadence. Execute a plan (or a clear task) end-to-end, with verification, review, and finalize as mandatory gates — not optional extras.

---

## Pre-flight rules (non-negotiable)

1. **Plan before code — HARD GATE.** Do not write implementation code until a reviewed plan exists. If handed a non-trivial raw task with no plan, defer to `/ccsk:plan` or produce a lightweight inline plan and get approval first. The only override: the user explicitly says "just code it."
2. **Survey before touching — HARD GATE** (skipped only when the input is a plan dir, which already encodes the Survey).
3. **Delegate the gates.** Testing, review, and finalize MUST run via `Task` subagents — a `/ccsk:build` run that ends with zero `Task` calls is incomplete.
4. **No branch, no commit without approval** (common-rules Gotcha).

---

## Flow

### 1. Intent detection
If `$ARGUMENTS` points at a `.ccsk/plans/<dir>` or an `01-PLAN.md`, **load it** — the plan already encodes Survey + requirements, so skip steps 2–3. Otherwise treat `$ARGUMENTS` as a task and run the Frame gates inline (Survey + a brief Clarify).

### 2. Survey — **HARD GATE** (raw-task mode only)
Per `primary-workflows.md`. State the 3–6 bullet summary.

### 3. Confirm scope — **HARD GATE** (raw-task mode only)
For non-trivial work, produce a lightweight inline plan (phases + acceptance criteria) and get approval before forging.

### 4. Forge
Implement **phase by phase** via the **`senior-fullstack-engineer`** agent. Each phase is a delegation packet (`orchestration-protocols.md` — task, read set, write set, acceptance, constraints, context). Parallelize phases **only** when their write sets are disjoint and the contracts between them are fixed; otherwise run sequentially. Frontend phases pull in **`designer`** for UI specs first.

### 5. Simplify (conditional)
If a slice grew sprawling or duplicative, run **`code-simplifier`** (quality-only, behavior-preserving) before review.

### 6. Prove — testing (MANDATORY unless `--no-test`)
Spawn **`tester`** to run focused + contract tests for the touched behavior. On failure, spawn **`debugger`** for root cause, fix, and a regression test. 100% pass required before proceeding.

### 7. Prove — review (MANDATORY, never skippable)
Spawn **`code-reviewer`** with the Survey summary + acceptance criteria as context. It verifies: every acceptance criterion met; no regression in the blast radius; no breaking public-contract change unless scoped; patterns match the Survey; no new lint/type/build errors. A **REJECTED** report triggers the side-effects gate — surface the failure + 2–4 options and let the user decide (`orchestration-protocols.md`).

### 8. Sign-off (MANDATORY)
- **`docs-manager`** → sync `./docs` if the `documentation-management.md` triggers fired.
- Update the plan: mark phase/plan status in `01-PLAN.md`; write a progress note to `{plan-dir}/reports/`.
- **`git-manager`** → offer a commit (conventional commits, no AI references — development-rules pre-commit rules). Never branch/commit without approval.
- **`journal-writer`** → record decisions, trade-offs, and what hurt.

### 9. Report
Files changed, gates passed, plan status, and the suggested next step.

---

## Relation to `/ccsk:plan`

`build` is the consumer of `plan`. The plan's `01-CLARIFY.md` acceptance criteria are loaded **verbatim** as the test/review gate spec — that's what closes the loop between Frame and Prove.

## Anti-patterns (rejected)

- Implementing before a plan exists (outside the explicit "just code it" override).
- Skipping the review gate.
- Running the gates inline instead of delegating via `Task`.
- Committing without approval.
- Weakening a test to make the suite pass.
