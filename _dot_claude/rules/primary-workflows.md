# Primary Workflows

**IMPORTANT**: Reach for this rhythm whenever a task is more than a one-line answer. For a direct factual answer or a trivial edit, skip the ceremony — use judgment.

The kit runs on one rhythm, the **Build Cadence**:

```
Frame  →  Forge  →  Prove  →  Sign-off
```

Commands are entry points into the cadence. Specialist agents execute its beats (see `orchestration-protocols.md`). Rules are the contract. Skills are on-demand domain knowledge the model activates by description match.

---

## Frame — understand before you touch anything

- Read the request, the relevant `./docs`, and the nearby code **first**. Never plan from memory.
- **Survey** the codebase before asking the user anything:
  - project type, language, framework, package manager;
  - the existing modules and files the task will touch;
  - the conventions similar features already follow (don't invent new ones);
  - in-flight plans under `.ccsk/plans/` that overlap this work;
  - the public contracts (exports, routes, schemas, env vars) the task could disturb.
- State a **3–6 bullet survey summary** back to the user before proposing work.
- Clarify only what the repo cannot answer. Prefer `AskUserQuestion` (common-rules Rule 4). Don't ask what a `grep` would answer in five seconds.
- For broad, ambiguous, multi-phase, or risky work, capture the design as a plan under `.ccsk/plans/` via `/ccsk-plan` before writing code.

## Forge — implement against an agreed design

- Change existing files when that fits the design. Create files only for real boundaries — never spawn an `*-enhanced` / `*-v2` duplicate of a file that already exists (development-rules).
- Work **one slice at a time**. Keep behavior backward-compatible unless the accepted scope explicitly says otherwise.
- Prefer existing helpers, patterns, and test utilities over new abstractions (KISS / DRY / YAGNI).
- For bugs, reproduce and prove the cause before changing behavior — Red/Green TDD where the stack supports it (common-rules Rule 3).
- Match the surrounding code's style, naming, and comment density. Read like the code already there.

## Prove — verification is part of "done", not optional

- Run **focused** tests for the behavior you touched. Broaden to lint / typecheck / build when you changed a shared contract.
- Fix regressions at the source — never weaken or delete a test to make the suite green.
- A change is not done until it is shown side-effect free:
  - every acceptance criterion met;
  - no regression in the blast radius of the change;
  - no new lint / type / build error;
  - public contracts intact unless the change was explicitly scoped to alter them.

## Sign-off — leave the repo coherent

- Run a reviewer for cross-module, security-sensitive, or public-contract changes.
- Sync `./docs` **only** when user-facing behavior, workflows, or architecture actually changed (see `documentation-management.md` triggers). Don't churn docs for no-op edits.
- Update the plan's status (`.ccsk/plans/.../01-PLAN.md`), then **offer** the commit — never branch or commit without approval (common-rules Gotcha).
- Close with a plain-language summary: what changed, what was verified, what's left.

---

## Choosing the entry point

| Situation | Enter at | Use |
|---|---|---|
| Scope unclear, multi-phase, or risky | **Frame** | `/ccsk-plan` |
| A plan already exists, or scope is clear | **Forge** | `/ccsk-build` |
| Improving one measurable metric repeatedly | **Loop** | `/ccsk-loop` |
| Need options before committing to a design | pre-Frame | `brainstormer` agent |

This file is the stable contract — it deliberately carries no tool/CLI mechanics. The commands carry the mechanics; the agents carry the execution.
