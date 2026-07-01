---
name: plan
description: Design before code — survey the repo, clarify scope, research, and write a phased, reviewed implementation plan into .ccsk/plans/. Use when scope is unclear, multi-phase, or risky, when starting a feature, or before /ccsk:build. Writes Markdown only, never code.
when_to_use: Invoke to turn an intent into a reviewed, phased plan before any implementation. Triggers — "plan this", "design", "how should we build", feature requests, multi-step work.
argument-hint: "[task description, or a path to an existing .ccsk/plans/<dir> to refine]"
allowed-tools: Read, Glob, Grep, Bash, Task, WebSearch, WebFetch, AskUserQuestion, Write, Edit
---

# /ccsk:plan — the Frame beat

> Turn an intent into a reviewed, phased, self-contained plan under `.ccsk/plans/` — **zero code written**. This is the disciplined front door before `/ccsk:build`.

Contract: `.claude/rules/primary-workflows.md` (cadence + clarify gate + autonomy), `.claude/rules/memory-protocol.md` (artifacts + paths), `.claude/rules/orchestration-protocols.md` (delegation), `.claude/rules/common-rules.md` (denylist, token discipline).

## Announce
On activation, announce yourself first per the `announce-style` reference — emit this inside a fenced code block (adjust the `─` fill so the box looks tidy; fill the second line with one concise clause):

```
╭─ 🧭 FRAME ─ /ccsk:plan ──────────────────────────────────╮
│  {one concise line — what this stage is doing}           │
╰──────────────────────────────────────────────────────────╯
```

## Pre-flight (non-negotiable)
1. **Rehydrate first.** Read `.ccsk/MEMORY.md` + the most recent in-progress `STATUS.md` + recent journals before surveying (memory-protocol). Skip only on a brand-new repo.
2. **Don't assume. Don't guess. Surface concerns.** Ask the user for decisions the user owns (`AskUserQuestion`), grounded in Survey findings.
3. **Markdown only — never code.** Implementation belongs to `/ccsk:build`.

## Flow

### 1. Compute the plan dir
Run `date "+%y%m%d-%H%M"` once (never infer the timestamp) → `.ccsk/plans/{YYMMDD}-{HHMM}-{slug}/` (slug = kebab of the task). First **scan `.ccsk/plans/` for an unfinished overlapping plan** — offer to extend it instead of starting fresh. If `$ARGUMENTS` is already a plan dir, load it and skip to step 6 (refine mode).

### 2. Frame / Survey — **HARD GATE**
Survey per primary-workflows (project type, framework, touched modules, existing conventions, public contracts, overlapping plans). State the **3–6 bullet survey summary** before going further.

### 3. Capture intent
Write `01-PROMPT.md` = the user's original request **verbatim** (memory-protocol: keep the original prompt).

### 4. Clarify — **HARD GATE**
All three must be YES before designing: *acceptance criteria defined? scope/files bounded? success metric stated?* Pin each down in one sentence; use `AskUserQuestion` with options grounded in Survey. Record in `01-CLARIFY.md`. Don't proceed below 95% confidence.

### 5. Research (skip when trivial)
Spawn `ccsk:researcher` (read-only) for external/library/best-practice questions → writes `01-RESEARCH.md`. For genuinely open design questions, optionally spawn `ccsk:brainstormer` first to surface 2–3 approaches and pick one.

### 6. Design + decompose
Spawn `ccsk:planner` to produce the architecture and phase breakdown. Each phase = **Context · Goal · Acceptance criteria · Steps · Related files (Create/Modify/Delete) · Risks**. For frontend work, spawn `ccsk:designer` → `01-UI_UX.md`. Follow the delegation packet (orchestration-protocols).

### 7. Write the plan (the ledger)
- `01-PLAN.md` — index + phases as `## Phase NN` sections, each with `[ ]` success-criteria checkboxes + a `status:` field. **This is the single source of truth ledger** (memory-protocol). **Default to one file.**
- For large plans (5+ phases): split into `01-PHASE-NN-{slug}.md` (detail only, no duplicated checkboxes) and keep `01-PLAN.md` a < 100-line index.
- `01-UI_UX.md` only when frontend work is involved.

### 8. Review gate (scope-driven)
For security / payments / data / public-API plans, run one adversarial pass (`ccsk:planner` or `ccsk:brainstormer` wearing a red-team hat) and reconcile findings before handoff.

### 9. Handoff
Write `STATUS.md` (active-plan, phase 01, next-action). `AskUserQuestion`: proceed to `/ccsk:build {plan-dir}`, refine, or stop. Return the absolute plan path + a one-paragraph summary of what was decided.

## Anti-patterns (rejected)
- Asking what a `grep` answers in five seconds.
- Writing code (that's `/ccsk:build`).
- An `01-PLAN.md` index over 100 lines, or duplicated checkbox state in phase files.
- A version number you didn't verify this session.
- A fabricated timestamp (always run `date`).

## Output
The plan dir is the exact input `/ccsk:build` consumes — the acceptance criteria written here become build's Prove-beat gates.
