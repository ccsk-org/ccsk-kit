---
name: research
description: Investigate technical questions, libraries, APIs, and best practices, then write a cited findings report into the plan dir. Use when a decision needs external facts, a library's real API, version-accurate guidance, or prior art. Read-only — never changes code.
when_to_use: Invoke when work depends on facts you must verify. Triggers — "how does X work", "which library", "what's the current best practice", "is this API still valid".
allowed-tools: Read, Glob, Grep, Bash, WebSearch, WebFetch, Write
---

# /ccsk:research — verified findings, cited

> Turn an open technical question into a concise, **cited** report. The point is accuracy: every concrete claim is grounded in a source or the codebase, or marked unverified.

Contract: `.claude/rules/common-rules.md` (verify claims, token discipline), `.claude/rules/memory-protocol.md` (where the report goes).

## Method
1. Scope the question precisely. Split compound questions.
2. Gather from the right source: the codebase (Grep/Read) for "how does *our* X work"; official docs / `WebFetch` / `WebSearch` for libraries, versions, APIs. Prefer primary sources.
3. **Verify versions/APIs** against current docs — don't answer from memory. Mark anything you couldn't confirm `TODO: verify`.
4. Cross-check conflicting sources; note disagreements rather than picking silently.
5. Write `01-RESEARCH.md` (or `reports/research-<date>-<slug>.md`) per `project-organization`: question · findings (with citations: URL or `file:line`) · recommendation · open questions.

## Rules
- Cite or qualify every concrete claim. No unsourced version numbers.
- Concision over grammar; lead with the answer, then the evidence.
- Read-only — never edit source.

## Output
The report path + a 2–3 sentence bottom line.
