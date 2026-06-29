---
name: context-engineering
description: Token discipline for large codebases and multi-agent work — slice-reading over full-file dumps, Glob/Grep before Read, clean delegation packets, and summarizing context for subagents. Use when orchestrating subagents or working a large codebase under context pressure.
---

# Context Engineering

Spend tokens like budget. Carry the conclusion, not the raw material.

## When this applies

- Orchestrating subagents (delegating searches, reviews, or builds).
- Navigating a large or unfamiliar codebase where reading everything is infeasible.
- Assembling a brief for another agent or compressing a long context.

| When NOT to use | Reach for instead |
|---|---|
| A small, fully-known set of files | just Read them directly |
| Designing the phase breakdown of work | `../planning/SKILL.md` |
| Gathering external (non-repo) knowledge | `../research/SKILL.md` |

## Core guidance

**Locate before you load.** Glob for files and Grep for symbols/strings *before* Read — find the exact place, then read only it. A search that returns line hits beats opening ten files.

**Slice, don't dump.** Read the relevant range, not the whole file, once you know roughly where the answer is. Re-reading a file you just edited to "verify" wastes budget — the edit already confirmed the change.

**Delegate the fan-out, keep the conclusion.** When answering means sweeping many files or naming conventions, hand it to a search/explore subagent and keep its summary — not the file dumps it waded through. Run independent delegations in parallel, in one batch.

**Delegation-packet hygiene.** A subagent starts blank. Give it exactly what it needs and nothing it doesn't:
- the concrete goal and the definition of done;
- the specific paths/anchors to start from (so it doesn't re-discover them);
- the constraints and the expected output shape;
- *not* your entire conversation — curate.

A bloated packet poisons the subagent's context as surely as too little starves it.

**Summarize for handoff.** When passing context onward (or compacting your own), distill to decisions, contracts, file paths, and open questions — drop the exploration trail. Prefer absolute paths and exact symbol names over prose descriptions.

**Watch the budget.** Long transcripts degrade focus. Periodically compress what's settled into a short state summary; let durable artifacts (plans, docs, git) hold detail instead of the live context.

## Checklist

- [ ] Glob/Grep used to locate before any Read.
- [ ] Reads are sliced to the relevant range, not whole-file dumps.
- [ ] Fan-out searches delegated; only conclusions retained.
- [ ] Independent delegations issued in parallel.
- [ ] Delegation packets carry goal + paths + done-criteria, not the whole transcript.
- [ ] Handoff/compaction summaries keep decisions, contracts, paths, open questions.

## References

- `../../rules/orchestration-protocols.md` — agent roles and delegation contracts.
- `../planning/SKILL.md` — decomposing work before delegating it.
- `../research/SKILL.md` — external-knowledge gathering discipline.
