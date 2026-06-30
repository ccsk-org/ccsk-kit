---
name: context-engineering
description: Discipline for managing the context window — write things down, select only what's needed, compress aggressively, and isolate subtasks — so long sessions stay accurate and cheap. Auto-activates on large/long tasks, deep file reads, or when context is filling up.
when_to_use: Reference on long multi-step tasks, when reading many files, or when the window is filling. Triggers — token pressure, "this is getting long", broad investigations.
user-invocable: false
allowed-tools: Read, Glob, Grep, Bash
---

# context-engineering — keep the window accurate and cheap

> Passive discipline that makes long sessions reliable. Pairs with `memory-protocol` (persist) and `orchestration-protocols` (isolate via subagents).

## Four levers
- **Write** — persist anything you'll need later to `.ccsk/` (plan ledger, STATUS, journal) instead of holding it in the window. The window is working memory, not storage.
- **Select** — pull in only what the current step needs. Glob/Grep to locate, then read the relevant slice — not whole files. Dereference MEMORY pointers selectively.
- **Compress** — summarize findings into a few durable lines; drop raw dumps. Prefer `file:line` references over pasted blocks.
- **Isolate** — push large, self-contained sub-work into a single subagent (`orchestration-protocols`) so its bulky context never lands in the controller.

## Heuristics
- Glob/Grep before Read; read in slices; never dump a whole large file into the reply.
- At a beat boundary, write state to `.ccsk/` and let the window shrink — `/ccsk:rehydrate` restores it.
- If you're re-reading the same thing, you didn't write it down — fix that.
- Approaching the window limit: summarize-and-persist, then continue from the summary.
