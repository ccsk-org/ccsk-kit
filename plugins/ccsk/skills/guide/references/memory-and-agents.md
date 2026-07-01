# Memory loop and agent roster

How the kit learns across sessions, and who does the work. Source of truth: `.claude/rules/memory-protocol.md` and `.claude/rules/orchestration-protocols.md`.

---

## The self-learning loop — `.ccsk/`
All process memory lives under `./.ccsk/`, **gitignored by default** (local-only; sharing is an explicit opt-in). The kit has **no hooks** — these conventions are honored by the model and made non-optional by the cadence gates. The payoff: work **compounds** instead of starting cold.

### Artifacts
| Path | What it holds |
|---|---|
| `MEMORY.md` | durable facts as **pointers**, capped ≤ ~200 lines (`- <fact> → adr-0007 / journal 260630`). Sections: Conventions · Decision index · What hurt. |
| `plans/<YYMMDD-HHMM-slug>/01-PLAN.md` | **the authoritative ledger** — phase status as `[ ]`/`[x]` + a `status:` field. Single source of truth. |
| `plans/.../STATUS.md` | write-ahead pointer: active-plan / active-phase / next-action / updated. Preserves position if a session dies mid-beat. |
| `plans/.../reports/` | subagent reports + the reviewer verdict. |
| `journals/<date>-<slug>.md` | append-only session lessons (what happened, decision + why, what hurt, next). |
| `retros/<date>-<slug>.md` | periodic git-metrics retrospective; **owns `MEMORY.md` compaction**. |
| `adrs/<NNNN>-<slug>.md` | architecture decision records (context · decision · consequences). |
| `milestones/<vN>/MILESTONE.md` | goal + observable exit criteria + rolling progress. |

Always run `date +%y%m%d-%H%M` for timestamps — never infer one (fabricated dates mis-sort plan dirs and break rehydrate's reconciliation).

### Rehydrate ↔ write-back (the compounding cycle)
- **Rehydrate (pull, session start / before build):** STATUS first → MEMORY + dereference its top pointers → ledger → recent journals → **reconcile against the code** (don't trust checkboxes; a `[x]` whose files are absent or tests fail is marked *suspect* and re-verified).
- **Write-back (Sign-off):** flip completed `[ ]`→`[x]` (only for work in the tree), update `status:`/progress %, append a journal entry, add a `MEMORY.md` pointer (+ ADR on a real decision). **A task cannot be DONE without the journal + MEMORY write this session** — that is the pure-markdown substitute for a write-back hook.

Honest residual: a session abandoned before Sign-off loses that beat's *lesson* (STATUS still preserves *position*). Accepted and documented.

---

## The agent roster — 12 specialists
Each has a narrow remit, least-privilege tools, and a tiered `model:`/`effort:` — correctness gates pinned, generative agents inherit the session model (table in `orchestration-protocols`). Invoked by namespaced `subagent_type` `ccsk:<name>`.

| Agent | Remit |
|---|---|
| `ccsk:planner` | architecture + phase decomposition (the Frame design) |
| `ccsk:researcher` | read-only external investigation → cited report |
| `ccsk:brainstormer` | surface + weigh options; advisory only |
| `ccsk:designer` | UI/UX specs → `01-UI_UX.md` |
| `ccsk:executor` | **implements the code** (the Forge worker) |
| `ccsk:tester` | writes/runs tests |
| `ccsk:debugger` | reproduce + root-cause a defect |
| `ccsk:code-reviewer` | **separate** Sign-off verdict on the real diff |
| `ccsk:code-simplifier` | reduce/clean without behavior change |
| `ccsk:docs-manager` | sync `./docs` on a real change |
| `ccsk:journal-writer` | append journal lessons |
| `ccsk:git-manager` | branch/commit hygiene |

Note: the implementer is **`ccsk:executor`** (not "builder"). The executor writes code; a **different** subagent (`ccsk:code-reviewer`) attests it — the author may never review its own work.

---

## The delegation contract
This kit uses **single-subagent delegation**: spawn one specialist at a time. No fan-out teams, no multi-session orchestration; each agent carries its own model/effort tier.

- **The packet (7 parts):** every subagent prompt carries Task · Read set · Write set · Acceptance criteria · Constraints · Context (summarized, never the raw transcript) · Report path. Missing any ⇒ guesswork.
- **Typed status codes:** every subagent ends with `Status: DONE | DONE_WITH_CONCERNS | PARTIAL | BLOCKED | NEEDS_CONTEXT | REJECTED` + a one-line summary. Handle BLOCKED/NEEDS_CONTEXT/PARTIAL by changing the packet or approach — never by re-running the same failing prompt. A **REJECTED** verdict halts the cadence.
- **Disjoint write-sets for parallelism:** spawn agents in parallel **only** when their write sets are provably disjoint and the integration points are already fixed in the plan. Never parallelize edits to the same file, a shared config, or a migration sequence — when ownership is unclear, run sequentially. The controller integrates; subagents never merge each other's output.
