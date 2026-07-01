---
name: rehydrate
description: Restore working context from durable memory at the start or continuation of a session — read STATUS, MEMORY (dereferencing its pointers), the active plan ledger, and recent journals, then reconcile against the actual code. Use when resuming work, after compaction, or before /ccsk:build. Auto-activates when starting or continuing a task.
when_to_use: Invoke at session start/continuation and before building. Triggers — "continue", "resume", "where were we", "pick up", starting work in a repo that has a .ccsk/ memory.
allowed-tools: Read, Glob, Grep, Bash
---

# /ccsk:rehydrate — pull memory before working

> The kit has no session-start hook, so this is the pull-based substitute. It is a **precondition of `/ccsk:build`** and should run whenever you start or continue work. Cheap, and it's what makes work compound instead of starting cold.

Contract: `.claude/rules/memory-protocol.md`.

## Announce
On activation, announce yourself first per the `announce-style` reference — emit this inside a fenced code block (adjust the `─` fill so the box looks tidy; fill the second line with one concise clause):

```
╭─ 🧭 REHYDRATE ─ /ccsk:rehydrate ─────────────────────────╮
│  {one concise line — what this stage is doing}           │
╰──────────────────────────────────────────────────────────╯
```

## Steps (in order)
1. **STATUS first.** Find the most recent in-progress plan: `ls -t .ccsk/plans/*/STATUS.md` → read it. It tells you the active plan, active phase, and the next action.
2. **MEMORY + dereference.** Read `.ccsk/MEMORY.md`. Then **open the top relevant pointers** it names (the ADRs in `.ccsk/adrs/`, the journals in `.ccsk/journals/`) — listing them is not reading them. Pull in the few that bear on the current task.
3. **Ledger.** Read the active plan's `01-PLAN.md`: what's `[x]` (done), what's `[ ]` (remaining). Recreate working tasks from the open items.
4. **Recent journals.** Skim the last 1–3 `.ccsk/journals/<date>-*.md` for fresh lessons / what hurt.
5. **Reconcile — don't trust the checkboxes.** Compare the ledger to reality:
   - `git status` / `git diff` for uncommitted work.
   - For phases marked done, sanity-check that their files exist and (cheaply) that their tests pass. If a `[x]` doesn't match the code → mark it **suspect** and re-verify before building on it.
   - Self-check the artifacts: no conflict markers (`<<<<<<<`), timestamps parse, progress %∈[0,100]. Repair or flag.

## Output
A short briefing: active plan + phase, what's done vs remaining, key facts/decisions pulled from memory, any reconciliation discrepancies found. Then hand control back (usually to `/ccsk:build`).

## Notes
- Run `date +%y%m%d-%H%M` if you need a timestamp; never infer.
- If there is no `.ccsk/` memory yet (fresh project), say so and skip — nothing to rehydrate.
