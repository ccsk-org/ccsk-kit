# Orchestration Protocols

**IMPORTANT**: Apply this file only when delegating to a subagent (via `Task`) or coordinating work. For solo work, follow `primary-workflows.md` directly.

A subagent starts with a blank context. It knows only what the prompt tells it. Everything below exists to make that prompt complete, the work collision-free, and the result trustworthy when it comes back.

This kit uses **single-subagent delegation**: spawn one specialist at a time. **No Agent-Teams fan-out, no multi-session orchestration, no per-agent model assignment** (agents inherit the session model). Parallel subagents are allowed only when write-sets are provably disjoint (see below).

Plugin agents are invoked by their namespaced `subagent_type`: `ccsk:planner`, `ccsk:code-reviewer`, `ccsk:executor`, `ccsk:tester`, `ccsk:debugger`, `ccsk:researcher`, `ccsk:brainstormer`, `ccsk:designer`, `ccsk:docs-manager`, `ccsk:journal-writer`, `ccsk:git-manager`, `ccsk:code-simplifier`.

---

## The delegation packet

Every subagent prompt MUST contain these seven parts. A packet missing any of them produces guesswork.

1. **Task** — one concrete objective, phrased as a verifiable goal ("make X pass", not "improve X").
2. **Read set** — the exact file paths to read. Give paths, not "look around" — unless the task *is* a survey.
3. **Write set** — the files this agent may create or modify. Everything else is read-only to it.
4. **Acceptance criteria** — the checks that define done (tests pass, behavior X holds, no contract change).
5. **Constraints** — stack, naming, file-size budget, backward-compat, and what is explicitly **out of scope**.
6. **Context** — the decisions already made, summarized. Never the raw conversation transcript.
7. **Report path** — where to write its report when one is expected: `.ccsk/plans/{plan-dir}/reports/`.

## Context isolation

- Do **not** forward conversation history. Summarize only what the subtask needs to act.
- Merge decisions, user approvals, and cross-agent coordination stay in the controller session.
- A subagent reports findings **up** to the controller. It does not negotiate scope directly with the user.

## File ownership for parallel work

Spawn agents in parallel **only** when both hold:

- each agent's **write set is disjoint** from every other agent's, and
- the integration points between them (shared types, API contracts, interfaces) are already fixed in the plan.

Never parallelize edits to the same file, a shared config, a single migration sequence, or generated artifacts. When ownership is unclear, run **sequentially** — a clean serial run beats a corrupted parallel one.

## Status contract

Every subagent ends its report with this block:

```
Status: DONE | DONE_WITH_CONCERNS | PARTIAL | BLOCKED | NEEDS_CONTEXT | REJECTED
Summary: one or two sentences
Concerns / Blockers: optional — only when status is not DONE
```

- **DONE** — acceptance criteria met and verified.
- **DONE_WITH_CONCERNS** — works, but surfaced a risk the controller must weigh before shipping.
- **PARTIAL** — made progress but the full objective is not met; states exactly what remains.
- **BLOCKED** — cannot proceed (missing dependency, failing precondition). State the blocker precisely.
- **NEEDS_CONTEXT** — the packet was insufficient. State exactly what is missing.
- **REJECTED** — a review or test gate failed; the change must not merge as-is.

Handle **BLOCKED / NEEDS_CONTEXT / PARTIAL** by changing the packet, scope, or approach — never by re-running the same failing prompt. After two failed attempts at the same goal, change approach.

## Cross-context attestation (the Sign-off reviewer)

The Sign-off review verdict (primary-workflows) MUST be produced by a **separate `ccsk:code-reviewer` subagent** that reads the actual diff — the agent that wrote the code may not attest to its own correctness. The reviewer writes its verdict to `.ccsk/plans/{plan-dir}/reports/` and returns a `Status:` block.

## Merging results

- The **controller** integrates work. Subagents do not merge each other's output.
- After parallel work lands, run **one consistency sweep** across all touched files: stale references, renamed symbols, contract drift, duplicated helpers.
- A **REJECTED** report halts the cadence. Surface the failure and 2–4 concrete options to the user (revert + re-plan / update dependents / add a compatibility shim / accept the risk), then let the user decide.
