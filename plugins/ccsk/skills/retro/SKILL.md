---
name: retro
description: Run a data-driven retrospective over a timeframe using git metrics and plan-ledger completion, then compact MEMORY.md. Use at milestone close or on request to capture what worked, what didn't, and prune stale memory. Read-only on source.
when_to_use: Invoke at milestone/sprint close or on request. Triggers — "retro", "retrospective", "what did we learn", "wrap up the milestone".
allowed-tools: Read, Glob, Grep, Bash, Write
---

# /ccsk:retro — data-driven retrospective + memory compaction

> Looks back using real signals (git, the ledger), not vibes, and is the owner of `MEMORY.md` upkeep so the durable memory stays small and useful.

Contract: `.claude/rules/memory-protocol.md` (owns MEMORY compaction), `.claude/rules/documentation-management.md`.

## Announce
On activation, emit one highlighted line first per the `announce-style` reference:

> 📓 **Retro** · retro — {one concise clause on what you're doing}

## Method
1. **Pick the window** (since a date/tag/milestone). Gather signals:
   - `git log --since=<date> --oneline`, `git diff --stat <range>` → churn, hotspots, commit cadence.
   - Plan ledgers: phases completed vs planned, slippage.
   - Journals in the window: recurring "what hurt".
2. **Synthesize** (terse): what worked, what didn't, surprises, and 2–4 concrete changes for next time.
3. **Write** `.ccsk/retros/<YYMMDD>-<slug>.md` (run `date`; per `project-organization`).
4. **Compact MEMORY.md** (its job): fold/merge stale entries, archive superseded decisions, demote prose to ADRs/journals leaving only pointers, enforce the ~200-line cap.
5. **Milestone close (retro owns this).** If a milestone's exit criteria are met, mark `.ccsk/milestones/<vN>/MILESTONE.md` **closed** (final progress + date) and update `./docs/project-roadmap.md` if a documentation trigger fired. Lifecycle: `/ccsk:plan` **creates** a milestone (opt-in), `/ccsk:execute` **advances** it, `/ccsk:retro` **closes** it; `/ccsk:status` shows where it stands.

## Rules
- Read-only on source — never edits code.
- Metrics over opinion; cite the numbers.

## Output
The retro path + the top 2–4 actionable changes, and a note of what was compacted out of MEMORY.
