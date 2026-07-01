# Documentation Management

Two layers of writing live in this kit, and they must not be confused:

- **Evergreen docs** — human-facing, long-lived, in `./docs/`. The reconciled skeleton (one set, no drift):
  - `project-overview-pdr.md` — what the project is, why, the product requirements.
  - `system-architecture.md` — components, data flow, key decisions at a glance.
  - `code-standards.md` — conventions, stack norms, lint/test expectations.
  - `codebase-summary.md` — the map: where things live.
  - `design-guidelines.md` — UI/UX and visual standards (frontend projects).
  - `project-roadmap.md` — milestones, status, what's next.
- **Process memory** — generated, local, in `./.ccsk/` (plans, journals, retros, ADRs, milestones, `MEMORY.md`). Owned by `memory-protocol.md`, not this file.

## When to update `./docs` (drift triggers)

Update an evergreen doc **only** when one of these actually happened — never churn docs for a no-op:

- a phase/milestone status changed;
- a major feature landed or was removed;
- a significant bug or **security** fix changed behavior;
- timeline or scope changed;
- a breaking dependency / contract change;
- architecture or a public contract changed.

## How

- **Evidence-based.** Write what the code does now, verified — not aspirations. Cite file paths.
- **Update in place.** Refresh the relevant section; don't append a parallel "v2" doc.
- The `docs-sync` skill and `ccsk:docs-manager` agent do this work; they run at **Sign-off** when a trigger fired.
- **Cold start vs. incremental.** `/ccsk:adopt` **populates** the six docs from scratch on a fresh repo (template TODOs → cited facts); `docs-sync` **updates** them incrementally when a drift trigger fires. Same six docs, opposite entry conditions — don't run `docs-sync`'s no-churn logic during a first-run fill.
- Keep `./docs` readable and current; keep depth/working-state in `.ccsk/`.

## Drift checking

There is no validator script (pure-markdown kit). Drift is prevented by convention: the `docs-sync` skill checks that backticked code symbols still exist, internal links resolve, and documented env keys appear in `.env.example`, and reports — it does not block.
