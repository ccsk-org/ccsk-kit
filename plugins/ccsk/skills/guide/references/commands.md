# Command reference — every door, and when to use it

Two kinds of skills are surfaced as `/ccsk:<name>`: **entry-point commands** that drive the cadence, and **capability skills** that auto-activate by description match (you can also invoke them explicitly). All write under `.ccsk/` per `memory-protocol`.

---

## Entry-point commands

### `/ccsk:rehydrate` — pull memory before working
- **Does:** restores context from durable memory — reads `STATUS.md`, `MEMORY.md` (dereferencing its pointers), the active plan ledger, recent journals, then **reconciles against the actual code**.
- **Reach for it:** resuming work, after compaction, "where were we", and **before every `/ccsk:execute`** (it's a precondition — `/ccsk:execute` runs it for you, but invoke it directly when you just want the briefing).
- **Writes:** nothing (read-only). Outputs a short briefing.

### `/ccsk:plan` — the Frame beat
- **Does:** surveys the repo, clarifies scope at a hard gate, optionally researches, and writes a phased, reviewed plan. **Markdown only — never code.**
- **Reach for it:** scope unclear, multi-phase, or risky; starting a feature; before `/ccsk:execute`.
- **Writes:** a plan dir `.ccsk/plans/<YYMMDD-HHMM-slug>/` — `01-PROMPT.md`, `01-CLARIFY.md`, optional `01-RESEARCH.md` / `01-UI_UX.md`, the `01-PLAN.md` ledger, and `STATUS.md`.
- **Arg:** a task description, or a path to an existing plan dir to refine.

### `/ccsk:execute` — Forge → Prove → Sign-off
- **Does:** implements against an agreed design with mandatory tests, a **separate-reviewer** Sign-off gate, and memory write-back. Self-drives under gated autonomy.
- **Reach for it:** a plan exists, or the scope is clear and bounded (including quick bugfixes). If scope turns out unclear/multi-phase, it stops and routes to `/ccsk:plan`.
- **Writes:** code in the tree; updates `01-PLAN.md` boxes + `STATUS.md`; a reviewer verdict in the plan's `reports/`; a journal entry + `MEMORY.md` pointer (+ ADR when a real decision was made).
- **Arg:** a path to a `.ccsk/plans/<dir>`, or a clear task description.

### `/ccsk:loop` — autonomous metric loop
- **Does:** repeatedly makes ONE small change → commits → measures a single-number metric → keeps it or `git revert`s it. In-session; no subagents.
- **Reach for it:** one measurable metric to move — coverage, bundle size, lint count, benchmark time.
- **Writes:** commits prefixed `loop(iter-N):`, and a gitignored `loop-log.tsv`. Never pushes; never targets `main`/`master`.
- **Arg:** a bare `Goal`, or a `Key: value` block (`Goal/Scope/Verify/Guard/Iterations/Direction/Min-Delta`).

---

## Capability skills (auto-activate; also `/ccsk:`-invocable)
These fire by description match during the cadence; invoke explicitly when you want them on demand.

| Command | Does | Reach for it | Writes |
|---|---|---|---|
| `/ccsk:brainstorm` | weighs 2–4 distinct approaches with honest trade-offs; advisory only | path isn't obvious; a decision has real consequences; before `/ccsk:plan` | nothing (advisory) |
| `/ccsk:research` | investigates libraries/APIs/best practices; cited findings; read-only | a decision needs external facts or a library's real API | `01-RESEARCH.md` in the plan dir |
| `/ccsk:debug` | reproduce → isolate → prove → fix at the source | errors, stack traces, failing tests, regressions, "it's broken" | the fix + tests |
| `/ccsk:code-review` | separate-reviewer pass for correctness, regressions, security, contract drift | before commit/merge, or on request | findings report |
| `/ccsk:security-review` | STRIDE/OWASP audit — secrets, injection, authz gaps, dep risks; redacted | security-sensitive work (auth/payments/data/upload) before shipping | findings report |
| `/ccsk:docs-sync` | updates `./docs` only when real behavior/workflow/architecture changed | at Sign-off after a meaningful, user-facing change | `./docs` edits |
| `/ccsk:journal` | appends an honest lesson — what happened, decision + why, what hurt, next | continuously during work and at Sign-off | `.ccsk/journals/<date>-<slug>.md` |
| `/ccsk:retro` | data-driven retrospective over a timeframe; compacts `MEMORY.md` | milestone/sprint close, or on request | `.ccsk/retros/<date>-<slug>.md` |
| `/ccsk:status` | read-only view: milestone → plans → phases (progress) → recent journals/retros | "where are we", check progress without opening the ledger | nothing (read-only) |

**Rule of thumb:** you rarely call the capability skills by hand — the cadence pulls them in at the right beat (research within Frame, review at Sign-off, journal throughout). Invoke them explicitly only when you want that one capability outside a full build.
