---
name: research
description: Discipline for gathering external knowledge — ranking source credibility, verifying versions and claims before relying on them, comparing options by trade-offs, and producing a cited report. Use when researching libraries, tools, or approaches the repo can't answer itself.
---

# Research

How to gather external knowledge reliably and report it so a reader can trust and re-check it.

## When this applies

- Evaluating a library, framework, API, or technique not already settled in the repo.
- Verifying current behavior, version compatibility, or a contested claim.
- Operating as the researcher agent.

| When NOT to use | Reach for instead |
|---|---|
| A fact the repo/code can answer | `Explore` agent / `Grep` |
| Choosing where state lives in UI | `../frontend-development/SKILL.md` |
| Multi-source fact-checked deep dive on demand | `deep-research` skill |

## Core guidance

**Rank sources by credibility.** Trust in order: official docs and source code → maintainer changelogs/RFCs/issues → reputable peer-reviewed or first-party engineering writeups → recent community posts → generic blogspam. Prefer primary over secondary. One source is a lead, not a fact.

**Verify, don't assume — especially versions.** Library behavior, APIs, and defaults drift between versions. Confirm the claim against the version actually in use (check the lockfile/`package.json`). Knowledge can be stale; check the publish date and re-confirm anything time-sensitive against a current source.

**Triangulate claims.** Corroborate a load-bearing claim with at least two independent credible sources, or mark it as unverified. Distinguish documented behavior from a blog author's anecdote. Note disagreement rather than papering over it.

**Compare by trade-offs, not popularity.** Evaluate options against the actual constraints (maintenance/last-release, bundle/runtime cost, license, API fit, ecosystem, security history). Present a small comparison; recommend with the reasoning, and state what would change the recommendation.

**Report so it's re-checkable.** Lead with the answer/recommendation. Cite every non-obvious claim with a source (link + date/version). Separate fact from inference. End with open questions and unverified points. Sacrifice grammar for concision (CLAUDE.md).

## Checklist

- [ ] Sources ranked; primary (docs/source) preferred over secondary.
- [ ] Claims verified against the version in use; publish dates checked.
- [ ] Load-bearing claims triangulated across ≥2 independent sources (or flagged unverified).
- [ ] Options compared by real trade-offs, not popularity.
- [ ] Report leads with the answer, cites every non-obvious claim, separates fact from inference.
- [ ] Open questions and unverified points listed at the end.

## References

- `../../rules/primary-workflows.md` — Frame (survey before asking).
- `../../rules/technical-stacks.md` — the stack/versions to verify against.
- `deep-research` skill — for full multi-source fact-checked reports.
