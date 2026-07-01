---
name: journal
description: Append an honest technical journal entry capturing what happened, the decision and why, what hurt, and the next step. Use continuously during work and at Sign-off so lessons compound across sessions. Writes to .ccsk/journals/.
when_to_use: Invoke to record a session lesson, a decision, or a gotcha. Triggers — finishing a beat, hitting a footgun, making a non-obvious choice, "note this for later".
allowed-tools: Read, Bash, Write, Edit, Task
---

# /ccsk:journal — append-only lessons

> The keystone of the kit's "self-improving" feel: cheap, honest entries that the next session reads back via `/ccsk:rehydrate`. Write **during** work, not only at the end (a crash then loses one line, not a whole beat).

Contract: `.claude/rules/memory-protocol.md`, `.claude/rules/documentation-management.md` (evidence-based).

## Announce
On activation, emit one highlighted line first per the `announce-style` reference:

> 📓 **Journal** · journal — {one concise clause on what you're doing}

## How
1. Path: `.ccsk/journals/<YYMMDD>-<slug>.md` (run `date +%y%m%d` — never infer). One file per day-topic; **append, never edit past entries**.
2. Each entry (terse — sacrifice grammar for concision):
   - **What happened** — the change/event, in a line or two.
   - **Decision & why** — what you chose and the trade-off accepted.
   - **What hurt** — the footgun, surprise, or wasted path (the highest-value part).
   - **Next** — the immediate next step if mid-stream.
3. **Brutal honesty.** Record what actually went wrong, not a sanitized version. That's what makes the lesson useful.
4. If the entry contains a durable fact/decision, add a **pointer** to `.ccsk/MEMORY.md` (`- <fact> → journal <date>`) respecting the cap; promote real decisions to an ADR.
5. For batch end-of-session reflection, delegate to `ccsk:journal-writer`.

## Note
Sign-off requires citing the journal entry written this session (`primary-workflows`) — this is what makes the write non-optional.
