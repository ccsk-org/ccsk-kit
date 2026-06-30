---
name: project-organization
description: The single source of truth for where ccsk artifacts live and how they are named under .ccsk/. Auto-activates whenever a skill or agent needs to create a plan, journal, retro, ADR, milestone, report, or STATUS file so paths and timestamps stay consistent.
when_to_use: Reference whenever writing any generated artifact, to compute its correct path and filename.
user-invocable: false
allowed-tools: Read, Bash
---

# project-organization — paths & naming (the glue)

> Every writing skill/agent references this so artifacts land in the right place with consistent names. This replaces the reference kit's hook-injected naming. Contract: `.claude/rules/memory-protocol.md`.

## Timestamps — always compute, never infer
Run **`date +%y%m%d-%H%M`** for the `YYMMDD-HHMM` stamp and **`date +%y%m%d`** for `YYMMDD`. Fabricated dates mis-sort plan dirs and break `rehydrate` reconciliation.

## Canonical paths

| Artifact | Path | Naming |
|---|---|---|
| Plan dir | `.ccsk/plans/<YYMMDD-HHMM-slug>/` | slug = kebab of the task |
| Plan ledger | `.ccsk/plans/<dir>/01-PLAN.md` | the single source of truth ([ ]/[x]) |
| Prompt / clarify / phases / ui | `.ccsk/plans/<dir>/01-{PROMPT,CLARIFY,PHASE-NN-slug,UI_UX}.md` | iteration prefix `01-` |
| Status (write-ahead) | `.ccsk/plans/<dir>/STATUS.md` | one block, overwritten each phase |
| Subagent reports / verdicts | `.ccsk/plans/<dir>/reports/<agent>-<YYMMDD-HHMM>-<slug>.md` | |
| Journal | `.ccsk/journals/<YYMMDD>-<slug>.md` | append-only; one file per day-topic |
| Retro | `.ccsk/retros/<YYMMDD>-<slug>.md` | |
| ADR | `.ccsk/adrs/<NNNN>-<slug>.md` | NNNN = next zero-padded number |
| Milestone | `.ccsk/milestones/<vN>/MILESTONE.md` | |
| Durable facts | `.ccsk/MEMORY.md` | pointers, capped ~200 lines |
| Evergreen docs | `./docs/<name>.md` | the reconciled skeleton (documentation-management) |

## Rules
- **Names are descriptive kebab-case** (long is fine — self-documenting for grep/glob/LLM tools). No `temp`, `final`, `v2`.
- Compute the next ADR number by listing `.ccsk/adrs/` and incrementing.
- Never write process memory outside `.ccsk/`; never write evergreen docs outside `./docs/`.
- `.ccsk/` is gitignored by default — write freely; durability is local (memory-protocol).
