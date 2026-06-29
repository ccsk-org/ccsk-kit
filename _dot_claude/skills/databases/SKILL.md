---
name: databases
description: Principles for schema design, safe migrations (forward-only, reversible, correctly ordered), query hygiene (N+1, indexing, pagination), and transaction boundaries. Use when touching schemas, migrations, or data-access code.
---

# Databases

Schema, migration, and query discipline that keeps data correct and access fast.

## When this applies

- Designing or altering a schema, writing a migration, or changing data-access code.
- Diagnosing slow queries, N+1 patterns, or lock contention.

| When NOT to use | Reach for instead |
|---|---|
| API shape / service logic above the data layer | `../backend-development/SKILL.md` |
| Migration ordering during a release rollout | `../deploy/SKILL.md` |
| SQL injection / data-exposure audit | `../security-review/SKILL.md` |

## Core guidance

**Schema design.** Model the domain, then normalize; denormalize only with a measured read reason. Right-size types, enforce `NOT NULL` and constraints/foreign keys at the DB — the database is the last line of integrity, not the app. Prefer explicit enums/check constraints over free text.

**Migrations are forward-only and ordered.** Each migration is immutable once shipped — never edit a merged migration; add a new one. Keep them sequential and deterministic; the same ordered set must reproduce the schema on any environment. Provide a reversible `down` (or a documented manual rollback) for every `up`.

**Expand/contract for breaking changes.** Split risky changes across deploys: add the new column/table (expand), backfill, switch reads/writes, then drop the old (contract) in a later migration — so app and schema are never incompatible mid-deploy. Backfill large tables in batches, not one locking statement.

**Query hygiene.**
- **N+1** — fetch related data in a set (join / batched load), never one query per row in a loop.
- **Indexing** — index the columns you filter, join, and sort on; match composite-index column order to query predicates. Indexes cost writes — add for real access patterns, not speculatively.
- **Pagination** — prefer keyset/cursor pagination over large `OFFSET`; always bound result sets.
- Select only needed columns; avoid `SELECT *` in hot paths.

**Transactions.** Wrap multi-statement invariants in one transaction; keep it short to limit lock time. Pick the right isolation level; handle deadlocks with retry. Never hold a transaction open across a network/user round-trip.

**Access safety.** Parameterized queries only — never string-concatenate input (see security-review).

## Checklist

- [ ] Constraints, FKs, NOT NULL, and correct types enforced at the DB.
- [ ] Migration is new (not an edit of a shipped one), ordered, and reversible.
- [ ] Breaking changes use expand → backfill (batched) → contract.
- [ ] No N+1; related data fetched in sets.
- [ ] Indexes match real filter/join/sort patterns; result sets bounded/paginated.
- [ ] Multi-statement invariants in short transactions; deadlocks retried.
- [ ] All queries parameterized.

## References

- `../../rules/development-rules.md` — general code-quality rules.
- `../deploy/SKILL.md` — migration ordering at release time.
- `../security-review/SKILL.md` — injection and data-exposure checks.
