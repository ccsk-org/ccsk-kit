# Primary Workflows

**IMPORTANT**: Reach for this rhythm whenever a task is more than a one-line answer. For a direct factual answer or a trivial edit, skip the ceremony — use judgment.

The kit runs on one rhythm, the **Build Cadence**:

```
Frame  →  Forge  →  Prove  →  Sign-off
```

Commands (`/ccsk:plan`, `/ccsk:execute`, `/ccsk:loop`) are entry points into the cadence. Specialist agents execute its beats (see `orchestration-protocols.md`). Rules are the contract. Skills are on-demand domain knowledge the model activates by description match. Memory is maintained per `memory-protocol.md`.

---

## Frame — understand before you touch anything

- Read the request, the relevant `./docs`, and the nearby code **first**. Never plan from memory.
- **Rehydrate first** (memory-protocol): before any non-trivial work, read `.ccsk/MEMORY.md`, the active plan's `STATUS.md`, and recent journals. This is mandatory before `/ccsk:execute`.
- **Survey** the codebase before asking the user anything: project type, language, framework, package manager; the modules the task touches; the conventions similar features already follow; in-flight plans under `.ccsk/plans/` that overlap; the public contracts (exports, routes, schemas, env vars) the task could disturb.
- State a **3–6 bullet survey summary** back to the user before proposing work.
- **Clarify gate (HARD):** before designing, the answer to all of these must be YES — *acceptance criteria defined? scope/files bounded? success metric stated?* If any is no, ask (prefer `AskUserQuestion`, grounded in Survey findings). Don't ask what a `grep` would answer in five seconds.
- For broad, ambiguous, multi-phase, or risky work, capture the design as a plan under `.ccsk/plans/` via `/ccsk:plan` before writing code.

## Forge — implement against an agreed design

- **Default: delegate the slice to a `ccsk:executor` subagent** via the delegation packet (orchestration-protocols); act inline only on trivial, one-slice work.
- Change existing files when that fits the design. Create files only for real boundaries — never spawn an `*-enhanced` / `*-v2` duplicate of a file that already exists (development-rules).
- Work **one slice at a time**. Keep behavior backward-compatible unless the accepted scope explicitly says otherwise.
- Prefer existing helpers, patterns, and test utilities over new abstractions (KISS / DRY / YAGNI).
- For bugs, reproduce and prove the cause before changing behavior — Red/Green where the stack supports it.
- Match the surrounding code's style, naming, and comment density.

## Prove — verification is part of "done", not optional

- **Default: delegate to a `ccsk:tester` subagent** to author and run the focused tests (orchestration-protocols); run inline only for a trivial one-slice change.
- Run **focused** tests for the behavior you touched. Broaden to lint / typecheck / build when you changed a shared contract.
- Fix regressions at the source — never weaken or delete a test to make the suite green.
- A change is not done until it is shown side-effect free: every acceptance criterion met; no regression in the blast radius; no new lint / type / build error; public contracts intact unless explicitly scoped to alter them.

## Sign-off — leave the repo coherent

- Run a reviewer for cross-module, security-sensitive, or public-contract changes. The reviewer verdict must come from a **separate `ccsk:code-reviewer` subagent** reading the real diff — not self-authored (orchestration-protocols).
- **Sign-off gate (HARD):** you may not declare a task DONE without a Sign-off block that cites: the test command + its exit code + key output, the reviewer-verdict file path, a `git diff --stat` baseline, AND the journal entry + MEMORY pointer written this session (memory-protocol). Missing any field ⇒ not done.
- Sync `./docs` **only** when user-facing behavior, workflows, or architecture actually changed (documentation-management triggers). Don't churn docs for no-op edits.
- Update the plan ledger (`.ccsk/plans/.../01-PLAN.md`) and `STATUS.md`, then **offer** the commit. `commit` is auto-allowed; **`push` is never-auto** (common-rules denylist).
- Close with a plain-language summary: what changed, what was verified, what's left.

---

## Autonomy posture — "approve once, then run"

The cadence self-drives. Auto-advance Frame → Forge → Prove → Sign-off and self-drive sub-steps **without re-prompting**, pausing only at the three human-owned gates:

1. **Clarify gate** at Frame (scope/criteria/metric unresolved).
2. **Destructive / outward-facing ops** — always confirm (common-rules never-auto denylist).
3. **Push** — never push without explicit approval. (Local `commit` is auto.)

An inline `autonomy: auto` directive may skip *non-destructive* confirmations only; it can **never** bypass the denylist or push. When unsure whether something is destructive, treat it as destructive and confirm.

## Choosing the entry point

| Situation | Enter at | Use |
|---|---|---|
| Scope unclear, multi-phase, or risky | **Frame** | `/ccsk:plan` |
| A plan already exists, or scope is clear | **Forge** | `/ccsk:execute` |
| Improving one measurable metric repeatedly | **Loop** | `/ccsk:loop` |
| Need options before committing to a design | pre-Frame | `ccsk:brainstormer` agent |

This file is the stable contract — it carries no tool/CLI mechanics. The commands carry the mechanics; the agents carry the execution; `memory-protocol.md` carries the learning loop.
