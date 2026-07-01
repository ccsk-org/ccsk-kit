# FAQ — common pitfalls

The footguns that fight the kit, and the fix. Grounded in `.claude/rules/primary-workflows.md` and `.claude/rules/memory-protocol.md`.

---

### "I ran `/ccsk:execute` and it acted on stale state."
**Pitfall:** skipping rehydrate. Trusting `[x]` checkboxes that don't match the code.
**Fix:** rehydrate is a **precondition** of build — let it run, and let it *reconcile* (it checks files exist and tests pass for "done" phases, flagging mismatches as suspect). Resuming after compaction? Invoke `/ccsk:rehydrate` explicitly first for the briefing.

### "It won't say the task is done."
**Pitfall:** expecting DONE without evidence.
**Fix:** Sign-off is a **hard gate**. DONE requires all four — test cmd+exit+output, a **separate** `ccsk:code-reviewer` verdict file, `git diff --stat`, and a journal entry + MEMORY pointer written this session. Missing any field ⇒ not done. This is by design; it's what makes work trustworthy and compounding.

### "Why didn't it push my commit?"
**Pitfall:** assuming push is automatic.
**Fix:** `push` is on the never-auto denylist — **always confirm**. `commit` is auto-allowed on a non-default branch; `push`, force-push, history rewrite, deletes, deploys, and secret reads always pause for explicit approval. When unsure whether an op is destructive, the kit treats it as destructive and asks.

### "I asked for a one-line change and got a whole plan."
**Pitfall:** over-planning trivial work.
**Fix:** the cadence is for work that's *more than a one-line answer*. For a trivial edit or a direct factual answer, skip the ceremony — go straight to `/ccsk:execute` (or just answer). Reserve `/ccsk:plan` for unclear, multi-phase, or risky scope.

### "It built something that ignores our existing patterns."
**Pitfall:** inventing a new abstraction instead of reusing.
**Fix:** Forge prefers existing helpers, patterns, and test utilities (KISS / DRY / YAGNI) and matches surrounding style. It edits existing files rather than spawning `*-v2`/`*-enhanced` duplicates. If it's not reusing, point it at the convention — or rehydrate so `MEMORY.md` conventions are in context.

### "Which command do I start with?"
**Fix:** golden path is `/ccsk:rehydrate` → `/ccsk:plan` → `/ccsk:execute`. Clear small change → `/ccsk:execute` directly (it rehydrates for you). One metric to move → `/ccsk:loop`. Need options first → `/ccsk:brainstorm`.

### "Can I call the planner/executor/reviewer agents directly?"
**Fix:** you normally don't — the `/ccsk:` commands orchestrate them for you (single-subagent delegation, one at a time). The agents are the *execution layer*; the commands are the doors. Spawn one directly only for a narrow, well-scoped subtask, and give it the full 7-part packet.

### "Where did my plans/journals go — they're not in git."
**Fix:** `.ccsk/` is **gitignored by default** (local-only). That's intentional. To share memory with a team, opt in by un-ignoring it. Durability otherwise rests on the CLI's uninstall backup.

### "The loop reverted my good change."
**Fix:** the loop keeps a change **only** if its `Guard` passes AND its measured delta beats `Min-Delta` in the configured `Direction`. If a real improvement was reverted, your `Verify` command or `Min-Delta` is mis-specified — tighten the metric, not the guardrails.
