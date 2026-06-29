---
name: planning
description: How to structure a phased implementation plan — acceptance criteria, phase decomposition, risk surfacing, and what makes a phase independently verifiable. Use when decomposing non-trivial work into phases, running `/ccsk-plan`, or acting as the planner agent.
---

# Planning

How to turn a fuzzy request into a phased, verifiable plan. The plan is a contract, not prose — every phase must be checkable.

## When this applies

- Scope is broad, ambiguous, multi-phase, or risky and needs a design before code.
- You are running `/ccsk-plan` or operating as the planner agent.
- Work touches public contracts (exports, routes, schemas, env vars) or several modules.

| When NOT to use | Reach for instead |
|---|---|
| Single-step edit or direct factual answer | `/ccsk-build` (Forge) |
| Improving one measurable metric repeatedly | `../optimization-loop/SKILL.md` (`/ccsk-loop`) |
| Need design options before any plan exists | `brainstormer` agent |

## Core guidance

**Frame first.** Survey the repo and the relevant `./docs` before writing a single phase. State a 3–6 bullet survey summary. Never plan from memory (see primary-workflows Frame).

**Acceptance criteria are the spine.** Write them before phases. Each criterion is observable and binary — "users can reset password via emailed token", not "improve auth". If you can't say how you'd verify it, it isn't a criterion yet.

**Decompose into phases that each stand alone.** A good phase:
- Is independently verifiable — it ends in a runnable check (test, build, manual step), not "code written".
- Leaves the repo coherent — backward-compatible unless scope says otherwise.
- Maps to one logical concern (KISS / single responsibility), small enough to hold in one context.
- Has explicit inputs (what must exist before) and outputs (what's true after).

**Order by dependency and risk.** Sequence so each phase builds on a proven one. Front-load the riskiest unknown (a spike) so failure is cheap and early.

**Surface risk explicitly.** Every plan carries a risk section: unknowns, blast radius (which contracts/modules can break), rollback story, and assumptions that would invalidate the plan if wrong.

**Right-size.** Too many micro-phases = ceremony; one mega-phase = unverifiable. Aim for phases a reviewer can reason about in one sitting.

**Persist it.** Capture the plan under `.ccsk/plans/` (e.g. `.../01-PLAN.md`) and keep its status current through Sign-off.

## Checklist

- [ ] Survey summary (3–6 bullets) precedes the plan; relevant `./docs` read.
- [ ] Acceptance criteria written, observable, and binary.
- [ ] Each phase is independently verifiable with a concrete check.
- [ ] Phases ordered by dependency; riskiest unknown front-loaded.
- [ ] Risk section: unknowns, blast radius, rollback, invalidating assumptions.
- [ ] Public contracts the work could disturb are named.
- [ ] Plan saved under `.ccsk/plans/` with a status field.

## References

- `../../rules/primary-workflows.md` — Frame and the Build Cadence.
- `../../rules/development-rules.md` — KISS / YAGNI / DRY, file-size discipline.
- `../optimization-loop/SKILL.md` — the metric-driven alternative.
