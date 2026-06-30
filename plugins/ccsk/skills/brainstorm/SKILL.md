---
name: brainstorm
description: Surface and weigh 2–4 distinct approaches with honest trade-offs before committing to a design. Use when the path isn't obvious, a decision has real consequences, or you want options before /ccsk:plan. Advisory only — never implements.
when_to_use: Invoke for open design questions and decisions. Triggers — "what are the options", "how should we approach", "is there a better way", "pros and cons".
allowed-tools: Read, Glob, Grep, Bash, Task, WebSearch, WebFetch, AskUserQuestion
---

# /ccsk:brainstorm — options before commitment

> Pre-Frame thinking. Generate genuinely different approaches, judge them honestly, recommend one. You do not write code or plans — you hand a chosen direction to `/ccsk:plan`.

Contract: `.claude/rules/common-rules.md`, `.claude/rules/primary-workflows.md`.

## Method
1. **Ground first.** Read the relevant code/docs and `.ccsk/MEMORY.md` so options fit reality, not generic advice. Use `ccsk:brainstormer` or `ccsk:researcher` for unknowns rather than guessing.
2. **Generate 2–4 distinct approaches** — distinct in mechanism, not cosmetics (e.g. MVP-first vs risk-first vs reuse-existing). For each: how it works, what it costs, what it risks, when it's the right call.
3. **Brutal honesty.** Name the real trade-offs and the failure mode of each. No false balance; if one clearly wins, say so.
4. **Recommend one** with the reasoning, and note what would change the recommendation.
5. If the decision is the user's, present it via `AskUserQuestion` with the options grounded in what you found.

## Output
A short comparison + a clear recommendation. If a real, non-obvious decision is made, suggest capturing it as an ADR (`memory-protocol`). Hand off: "ready for `/ccsk:plan` with approach X."

## Anti-patterns
- Listing near-identical options to look thorough.
- Recommending without stating the trade-off you accepted.
- Implementing anything (that's `/ccsk:build`).
