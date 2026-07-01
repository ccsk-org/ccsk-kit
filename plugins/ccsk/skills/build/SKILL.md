---
name: build
description: Implement a plan or a clear task end-to-end through Forge → Prove → Sign-off, with mandatory tests, a separate-reviewer gate, and memory write-back. Use to build a feature, execute a .ccsk/plans/ plan, or make a scoped change with verification.
when_to_use: Invoke to implement against an agreed design or clear scope. Triggers — "build", "implement", "make the change", executing an existing plan dir.
argument-hint: "[path to a .ccsk/plans/<dir>, or a clear task description]"
allowed-tools: Read, Glob, Grep, Bash, Task, Edit, Write, MultiEdit, AskUserQuestion
---

# /ccsk:build — Forge → Prove → Sign-off

> Implement against an agreed design, prove it side-effect free, and leave the repo coherent. Self-drives under gated autonomy; pauses only at the human-owned gates.

Contract: `.claude/rules/primary-workflows.md` · `.claude/rules/memory-protocol.md` · `.claude/rules/orchestration-protocols.md` · `.claude/rules/development-rules.md` · `.claude/rules/common-rules.md`.

## Announce
On activation, announce yourself first per the `announce-style` reference — emit this inside a fenced code block (adjust the `─` fill so the box looks tidy; fill the second line with one concise clause):

```
╭─ 🔨 FORGE ─ /ccsk:build ─────────────────────────────────╮
│  {one concise line — what this stage is doing}           │
╰──────────────────────────────────────────────────────────╯
```

## Pre-flight (non-negotiable)
1. **Rehydrate FIRST** (precondition — memory-protocol): read `.ccsk/MEMORY.md`, the plan's `STATUS.md`, recent journals; **reconcile the ledger against the actual code** (don't trust checkboxes). If no plan dir was given and scope is unclear/multi-phase → stop and route to `/ccsk:plan`.
2. **Hydrate the ledger:** each open `[ ]` in `01-PLAN.md` → a working task.
3. **Branch if on main/master** before any commit (common-rules).

## Forge (per phase)
- Write `STATUS.md` at phase start (active-phase, next-action).
- Implement **one slice at a time** against the phase's acceptance criteria. Edit existing files; create only for real boundaries (development-rules — no `*-v2` duplicates). Match surrounding style + naming.
- For bugs: reproduce → prove cause → fix (Red/Green where supported).
- **Journal continuously** (memory-protocol): append the decision + why + what hurt to `.ccsk/journals/<date>-<slug>.md` as you go — not batched at the end.

## Prove
- Run **focused** tests for the touched behavior; broaden to lint/typecheck/build when you changed a shared contract. Capture the exact command + exit code + key output (needed at Sign-off).
- Fix regressions at the source — never weaken/delete a test.

## Sign-off — **HARD GATE**
- **Cross-context review:** spawn a **separate `ccsk:code-reviewer` subagent** to read the real diff and write a verdict to `.ccsk/plans/{dir}/reports/` (orchestration-protocols). The executor may not attest to its own work. A `REJECTED` verdict halts — surface options.
- **Sync-back:** flip completed `[ ]`→`[x]` in `01-PLAN.md` (only for work in the tree), update `status:`/progress %, update `STATUS.md`.
- **Memory write-back:** write the journal entry + a `MEMORY.md` pointer (+ an ADR via `.ccsk/adrs/` if a real decision was made; respect the MEMORY cap).
- **Docs:** run `docs-sync` only if a documentation-management trigger actually fired.
- **You may NOT declare DONE** without a Sign-off block citing ALL of:
  ```
  Tests:    <cmd> → exit <code> ; <key output>
  Review:   <path to ccsk:code-reviewer verdict> → PASS
  No-regr:  git diff --stat <baseline>
  Memory:   journal <path> ; MEMORY pointer <line> ; ADR <id|none>
  ```
- **Offer** the commit (auto-allowed on a non-default branch). **Never `push`** without explicit approval.

## Safety — never-auto denylist (inlined so it survives compaction)
Always confirm with the user before: `git push`/`--force`/`reset --hard`/`clean`/history-rewrite, `rm -rf`/mass-delete, publish/release/deploy/tag-push, network mutations or `curl|sh` installs, reading/printing secrets (`.env`), writing outside the repo, operating on `main`/`master`. Auto-allowed: edit-in-scope, tests/lint/typecheck/build, read, local `commit`. When unsure → treat as destructive, confirm. (Full list: common-rules.)

## Close
Plain-language summary: what changed, what was verified (with the evidence), what's left.
