---
name: code-review
description: Review the current diff for correctness, regressions, security, and contract drift via a separate reviewer, and report findings. Use to review changes before commit/merge, or on request. Read-only — reports findings, does not edit.
when_to_use: Invoke to review a diff. Triggers — "review this", "check my changes", "is this safe to merge", before Sign-off on risky changes.
allowed-tools: Read, Glob, Grep, Bash, Task
---

# /ccsk:code-review — evidence-based review

> Reviews the real diff and reports findings ranked by severity. For Sign-off, the verdict must come from a **separate** reviewer (cross-context attestation) — this skill drives `ccsk:code-reviewer`.

Contract: `.claude/rules/orchestration-protocols.md` (cross-context attestation, status), `.claude/rules/development-rules.md` (quality bar).

## Method
1. Establish scope: `git diff` (and `git diff --stat`) for the working change, or a named range/PR.
2. **Delegate to `ccsk:code-reviewer`** with a delegation packet (diff scope, acceptance criteria, report path `.ccsk/plans/<dir>/reports/` or `.ccsk/reports/`). The reviewer reads the actual code, not a description.
3. Reviewer checks in priority order: correctness → regressions/blast-radius → security → contract integrity (exports/routes/schemas/env/flags) → quality (KISS/DRY/YAGNI, naming, dead code).
4. Collect the verdict: findings as `file:line` + severity + a clear PASS / REJECT.

## Rules
- Evidence over opinion; cite `file:line`. No style nitpicks dressed as blockers.
- A real correctness/security/contract problem ⇒ REJECT — surface it; don't smooth it over.
- This skill does not edit code. To apply fixes, hand findings to `/ccsk:build`.

## Output
Ranked findings + the PASS/REJECT verdict + the verdict file path (this is what Sign-off cites).
