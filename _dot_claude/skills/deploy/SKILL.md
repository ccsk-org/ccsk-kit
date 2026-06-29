---
name: deploy
description: Release discipline — pre-release checklist, environment/secret hygiene, rollback strategy, CI gates, and zero-downtime migration ordering at deploy time. Use when preparing a release or wiring up deployment.
---

# Deploy

How to ship safely: gated, reversible, and zero-downtime by default.

## When this applies

- Preparing a release, cutting a version, or wiring a deployment pipeline.
- Sequencing a schema migration against a code rollout.

| When NOT to use | Reach for instead |
|---|---|
| Designing the migration itself | `../databases/SKILL.md` |
| Auditing the code for vulns pre-release | `../security-review/SKILL.md` |
| Updating docs after a change | `../docs-sync/SKILL.md` |

## Core guidance

**CI gates are the contract.** No deploy without green: lint, typecheck, tests, and build all pass (development-rules — never weaken a test to go green). Add a dependency/security scan gate for production. The pipeline, not a human, enforces the bar.

**Environment & secret hygiene.** Config from environment, never baked into the artifact — one build promotes across envs. Secrets live in a secret manager, injected at runtime; never in the image, repo, or logs. Diff env config across environments before promoting so prod isn't missing a key.

**Zero-downtime migration ordering.** Decouple schema changes from code so the running and incoming versions both work mid-deploy:
1. **Expand** — deploy the additive schema change (new nullable column/table) first.
2. **Backfill** — populate in batches; both code versions tolerate old and new shape.
3. **Switch** — deploy code that writes/reads the new shape.
4. **Contract** — drop the old column/constraint in a *later* release, once no code uses it.
Never deploy a destructive migration in the same step as the code that depends on it.

**Rollback strategy decided up front.** Know the undo before you ship: re-deploy the prior artifact, feature-flag off, or migration down. Migrations must be backward-compatible enough that rolling back code doesn't corrupt data (the expand/contract split is what buys this). Prefer progressive rollout (canary/blue-green) to catch failure on a fraction of traffic.

**Verify after, not just before.** Health checks and smoke tests post-deploy; watch error rate and latency through the rollout window. Have the abort/rollback trigger defined.

## Checklist

- [ ] CI green: lint, typecheck, tests, build (+ security scan for prod).
- [ ] Config and secrets from env/secret manager, not the artifact; env diff checked.
- [ ] Migration ordered expand → backfill → switch → contract; no destructive step coupled to dependent code.
- [ ] Rollback path chosen and proven backward-compatible.
- [ ] Progressive rollout (canary/blue-green) where possible.
- [ ] Post-deploy smoke tests + error/latency watch; abort trigger defined.

## References

- `../databases/SKILL.md` — migration design and expand/contract.
- `../../rules/development-rules.md` — pre-commit/push gates.
- `../security-review/SKILL.md` — pre-release security pass.
