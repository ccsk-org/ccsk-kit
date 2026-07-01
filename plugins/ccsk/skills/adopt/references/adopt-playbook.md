# adopt playbook — per-doc scout · cite · packet

Load this when populating (SKILL step 7). One section per evergreen doc: **what to
scout**, **what to cite**, and the **delegation packet** to hand a `ccsk:docs-manager`
in the default fan-out. Every populated fact must be code-cited (`file:line`) or left
as an explicit `TODO` — never invented.

## Cold-fill mode (read first)
`ccsk:docs-manager`'s default persona is *incremental, no-churn* (docs-sync). Adopt is
the opposite: a **first-run cold fill**. Every packet MUST say so, verbatim:

> This doc is still a shipped template (TODO/`<project-name>` placeholders). You are in
> **cold-fill mode**: populate it from scratch from real code — do not apply the
> no-churn heuristic. Cite `file:line` for every concrete claim; leave genuinely
> unknowable items as `TODO`.

## Delegation packet (shape — orchestration-protocols)
Each per-doc agent gets all seven parts: **Task** (populate `docs/<file>` from code) ·
**Read set** (the scout paths below) · **Write set** (exactly that one `docs/*` file —
disjoint) · **Acceptance** (every section filled or `TODO`; facts cited; no other file
touched) · **Constraints** (cold-fill mode; markdown only; keep the template's headings) ·
**Context** (detected stack + interview answers) · **Report path**
(`.ccsk/plans/{dir}/reports/`).

## Per-doc guide

### `overview` → docs/project-overview-pdr.md
- **Scout:** `README*`, `package.json` description/keywords, top-level product code, any
  `docs/` prose. **Interview-heavy** — product intent/why usually isn't in code.
- **Cite:** entrypoints, user-facing surfaces. Mark vision/goals `TODO` if only the user knows.

### `architecture` → docs/system-architecture.md
- **Scout:** dir topology, module boundaries, service/client split, data stores, third-party
  integrations (imports of SDKs), config, deploy manifests.
- **Cite:** the files that own each component/boundary; draw the component relationships
  from real imports, not assumption.

### `standards` → docs/code-standards.md
- **Scout:** linter/formatter configs (eslint/prettier/ruff/…), `tsconfig`, test runner
  config, CI steps, naming patterns visible in the tree, commit-message history style.
- **Cite:** the config files that enforce each rule. Don't prescribe rules the repo doesn't keep.

### `summary` → docs/codebase-summary.md
- **Scout:** the whole map — stack table (framework/lang/styling/state/test/pkg-mgr from
  manifests), key directories, dominant patterns, current state.
- **Cite:** `package.json`/lockfile for stack rows; representative files for each pattern.
  This is the densest doc; it must agree with `architecture` and `standards`.

### `design` → docs/design-guidelines.md  *(auto-skip if no frontend)*
- **Scout:** design tokens, component library, theme config, CSS/Tailwind setup, a11y
  patterns. Delegate to `ccsk:designer` when present.
- **Cite:** token/theme files, the component primitives dir.

### `roadmap` → docs/project-roadmap.md
- **Scout:** milestones/issues/TODOs in code, changelog, git tags for shipped versions.
- **Cite:** tags/changelog for done items. **Interview-heavy** for what's next — mark `TODO`.

## Consistency sweep (after fan-out)
Reconcile the set: the `summary` stack table must match `architecture`; no doc contradicts
another; internal links resolve; backticked symbols exist in source. Fix drift before Sign-off.
