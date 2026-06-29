---
name: ccsk:plan
description: Design before code — survey the repo, research, and write a phased, reviewed implementation plan into .ccsk/plans/. No implementation.
argument-hint: [task description, or a path to an existing .ccsk/plans/<dir> to refine]
allowed-tools: Read, Glob, Grep, Bash, Task, WebSearch, WebFetch, AskUserQuestion, Write, Edit
---

# `/ccsk:plan`

> The **Frame** beat of the Build Cadence. Turn an intent into a reviewed, phased, self-contained plan under `.ccsk/plans/` — with zero code written. This is the disciplined front door before `/ccsk:build`.

---

## Pre-flight rules (non-negotiable)

1. **Don't assume. Don't guess. Surface concerns.** Anything not derivable from the codebase or the user's words — ask.
2. **Use `AskUserQuestion` for every decision the user owns.** Ground the options in what the Survey actually found.
3. **If a step is genuinely impossible, name it and stop.** Never fabricate to keep the flow moving.
4. **Token discipline.** Glob/Grep before Read; read in slices; don't dump whole files into your reply.
5. **Verify version claims.** Any concrete version/feature you write into a plan must be checked via `context7` / `docs-seeker`, or marked `TODO: verify`.
6. **This command writes Markdown only — never code.** Implementation belongs to `/ccsk:build`.

---

## Flow

### 1. Compute the plan directory
Run `date "+%y%m%d-%H%M"` once and build the path `.ccsk/plans/{YYMMDD}-{HHMM}-{slug}/` (slug = kebab-case of the task). First, **scan `.ccsk/plans/` for an unfinished, overlapping plan** — if one exists, offer to extend it instead of starting fresh. If `$ARGUMENTS` is already a plan dir, load it and skip to step 6 (refine mode).

### 2. Frame / Survey — **HARD GATE**
Survey the codebase per `primary-workflows.md` (project type, framework, touched modules, existing conventions, public contracts, overlapping plans). State the **3–6 bullet survey summary** before going further. Skip only when refining an existing plan dir.

### 3. Capture intent
Write `01-PROMPT.md` = the user's original request, **verbatim**, no rewrite (documentation-management: save the original prompt).

### 4. Clarify — **HARD GATE**
Before designing, pin down — in one sentence each — the expected output, acceptance criteria, scope boundary, non-negotiable constraints, and the touchpoints. Use `AskUserQuestion` with options grounded in Survey findings. Record answers in `01-CLARIFY.md`. Don't proceed below 95% confidence.

### 5. Research (skip when trivial)
Spawn the **`researcher`** agent (read-only, parallel-safe) for external/library/best-practice questions; it writes `01-RESEARCH.md`. For genuinely open design questions, optionally spawn the **`brainstormer`** first to surface 2–3 approaches and pick one before planning.

### 6. Design + decompose
Spawn the **`planner`** agent (opus) to produce the architecture and the phase breakdown. Each phase = **Context · Goal · Acceptance criteria · Steps · Related files (Create/Modify/Delete) · Risks**. For frontend work, spawn **`designer`** to produce `01-UI_UX.md`.

### 7. Write the plan
Reuse the repo's existing convention (see `.ccsk/plans/260525-...-example/`):
- `01-PLAN.md` — index + phases as `## Phase NN` sections. **Default to a single file.**
- For large plans (5+ phases), split phases into `01-PHASE-NN-{slug}.md` and keep `01-PLAN.md` as a < 100-line index.
- `01-UI_UX.md` — only when frontend work is involved.

### 8. Review gate (scope-driven)
For security / payments / data / public-API plans, run one adversarial pass (planner or brainstormer wearing a red-team hat) and reconcile findings before handoff.

### 9. Handoff
`AskUserQuestion`: proceed to `/ccsk:build {plan-dir}`, refine the plan, or stop. Return the absolute plan path and a one-paragraph summary of what was decided.

---

## Delegation

When spawning `researcher` / `planner` / `brainstormer` / `designer`, follow `orchestration-protocols.md`: give each a complete delegation packet (task, read set, write set, acceptance criteria, constraints, summarized context, report path = `{plan-dir}/reports/`). They are read-only except for writes into the plan dir.

## Anti-patterns (rejected)

- Asking a question grep would answer in five seconds.
- Writing code (that's `/ccsk:build`).
- An `01-PLAN.md` index over 100 lines.
- A version number you didn't verify this session.
- "I'll create a comprehensive plan…" — show structure, not adjectives.

## Output

The plan dir it produces is the exact input `/ccsk:build` consumes — the acceptance criteria written here become build's Prove-beat gates.
