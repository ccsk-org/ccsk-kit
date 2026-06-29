---
name: docs-sync
description: When and what to update in `./docs` — the canonical doc types, freshness triggers, size limits, and evidence-based writing (verify against code before documenting). Use during Sign-off or when the docs-manager runs.
---

# Docs Sync

Keep `./docs` true to the code — update on real change, never churn on no-ops.

## When this applies

- Sign-off after a change that altered user-facing behavior, workflows, or architecture.
- Operating as the docs-manager agent.

| When NOT to use | Reach for instead |
|---|---|
| No-op / internal refactor with no behavior change | skip — don't churn docs |
| Researching external library facts | `../research/SKILL.md` |
| Writing release notes / deploy steps | `../deploy/SKILL.md` |

## Core guidance

**Update only on real change.** Sync docs when user-facing behavior, public contracts, workflows, or architecture actually changed (primary-workflows Sign-off). A pure refactor or no-op edit triggers nothing. Don't manufacture churn.

**The canonical doc set** (`./docs`, see documentation-management):
- `project-overview-pdr.md` · `code-standards.md` · `codebase-summary.md` · `design-guidelines.md` · `deployment-guide.md` · `system-architecture.md` · `project-roadmap.md`

Map the change to the right doc — new module/dependency-direction → `system-architecture.md` + `codebase-summary.md`; new convention → `code-standards.md`; new release step → `deployment-guide.md`; scope/milestone → `project-roadmap.md`.

**Evidence-based writing.** Document what the code does, not what you intend it to do. Verify each claim against the actual source/config before writing it — read the file, don't recall it. No aspirational or speculative docs.

**Freshness triggers.** A new public export/route/env var, a changed schema, a new module or dependency rule, a workflow or command change, a deployment-process change. If a trigger fires and the doc is silent, it's stale.

**Size & form.** Keep docs focused and skimmable; split an overgrown doc rather than letting it sprawl. Markdown is exempt from the 200-line code limit, but a doc nobody can scan is a doc nobody reads. Mermaid v11 for diagrams (development-rules).

**Leave it coherent.** After editing, cross-links resolve and no doc contradicts another or the code.

## Checklist

- [ ] A real behavior/contract/architecture change occurred (else skip).
- [ ] Change mapped to the correct doc(s) in `./docs`.
- [ ] Every statement verified against current source/config — no aspirational claims.
- [ ] Freshness triggers (exports, schema, modules, workflows, deploy) checked.
- [ ] Docs skimmable; oversized docs split; diagrams in Mermaid v11.
- [ ] Cross-links resolve; no doc contradicts another or the code.

## References

- `../../rules/documentation-management.md` — authoritative doc rules and structure.
- `../../rules/primary-workflows.md` — Sign-off doc-sync trigger.
- `../research/SKILL.md` — verifying external claims before writing.
