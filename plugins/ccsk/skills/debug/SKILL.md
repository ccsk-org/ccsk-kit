---
name: debug
description: Find and fix the root cause of a defect — reproduce, isolate, hypothesize, prove, then fix at the source. Use for errors, stack traces, failing tests, regressions, or "it's broken" reports. Fixes the cause, never masks the symptom.
when_to_use: Invoke when something is broken and the cause is unknown. Triggers — "error", "stack trace", "failing test", "regression", "why is this happening", "it crashes".
allowed-tools: Read, Glob, Grep, Bash, Edit, Write, Task
---

# /ccsk:debug — root cause, not symptom

> A distinct cognitive mode from building: reproduce → isolate → hypothesize → prove → fix. Don't change behavior until you can demonstrate the cause.

Contract: `.claude/rules/primary-workflows.md` (reproduce before you fix), `.claude/rules/common-rules.md` (two-strike rule).

## Announce
On activation, announce yourself first per the `announce-style` reference — emit this inside a fenced code block (adjust the `─` fill so the box looks tidy; fill the second line with one concise clause):

```
╭─ 🐛 DEBUG ─ /ccsk:debug ─────────────────────────────────╮
│  {one concise line — what this stage is doing}           │
╰──────────────────────────────────────────────────────────╯
```

## Method
1. **Reproduce.** Get a deterministic repro (a failing test, a command, exact inputs). If you can't reproduce it, say so and gather more signal — don't guess-fix.
2. **Isolate.** Narrow the blast radius: bisect (`git bisect` if useful), add targeted logging, read the failing path. Find the smallest input that triggers it.
3. **Hypothesize → prove.** State the suspected cause as a falsifiable claim, then confirm it (the fix prediction must match observed behavior). Don't accept a coincidence as a cause.
4. **Fix at the source.** Change the actual cause; don't paper over it with a catch-all or a weakened test. Add/adjust a focused test that fails before and passes after (Red/Green).
5. **Verify no regression** in the blast radius (Prove beat). For deep/cross-module cases, delegate to `ccsk:debugger`.

## Rules
- Prove the cause before changing behavior. Two failed hypotheses → change approach (common-rules).
- Capture the lesson: append what hurt + the root cause to the journal (`memory-protocol`); add an ADR if the bug revealed a design flaw.

## Output
Root cause (one line), the fix, the test that now guards it, and verification evidence.
