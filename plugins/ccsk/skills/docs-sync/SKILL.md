---
name: docs-sync
description: Update the evergreen ./docs set when (and only when) real user-facing behavior, workflows, or architecture changed — evidence-based, no churn. Also checks for doc drift (stale symbols, broken links, missing env keys). Use at Sign-off after a meaningful change.
when_to_use: Invoke at Sign-off when a documentation trigger fired, or on request. Triggers — "update the docs", after a feature/contract/architecture change, "are the docs current".
allowed-tools: Read, Glob, Grep, Bash, Edit, Write, Task
---

# /ccsk:docs-sync — keep ./docs honest

> Updates evergreen docs **only on a real change** (never churn), and flags drift. Process memory is not its job (that's `.ccsk/`).

Contract: `.claude/rules/documentation-management.md` (the skeleton + triggers).

## When to run
Only if a trigger actually fired: phase/milestone status change · major feature added/removed · significant bug/security fix changing behavior · timeline/scope change · breaking dependency/contract change · architecture/public-contract change. No trigger ⇒ do nothing.

## Method
1. Identify which evergreen doc(s) the change touches (`project-overview-pdr`, `system-architecture`, `code-standards`, `codebase-summary`, `design-guidelines`, `project-roadmap`).
2. **Update in place**, evidence-based: write what the code does now, verified; cite `file:line`. Don't append a parallel "v2" doc.
3. **Drift check** (report-only, no blocking): backticked code symbols still exist in source; internal markdown links resolve; documented `$ENV` keys appear in `.env.example`.
4. For substantial doc work, delegate to `ccsk:docs-manager`.

## Rules
- No aspirational docs — only verified current behavior.
- Keep `./docs` readable; depth/working-state belongs in `.ccsk/`.

## Output
Which docs changed and why (the trigger), plus any drift findings.
