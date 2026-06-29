---
name: backend-development
description: Principles for server-side code — API contract design, validation at trust boundaries, structured error handling, idempotency, layered service architecture, and observability. Use when building or reviewing server, API, or service code.
---

# Backend Development

How server-side code should behave: predictable contracts, validated boundaries, observable failures.

## When this applies

- Building or reviewing API endpoints, services, handlers, jobs, or integrations.
- Decisions about validation, error semantics, retries, or layering.

| When NOT to use | Reach for instead |
|---|---|
| UI/component concerns | `../frontend-development/SKILL.md` |
| Schema, migration, or query design | `../databases/SKILL.md` |
| Threat modeling / vuln audit | `../security-review/SKILL.md` |

## Core guidance

**Design the contract first.** Stable resource shapes, consistent naming, explicit versioning when a breaking change is unavoidable. Document the request/response and status codes before implementing.

**Validate at every trust boundary.** Parse and reject at the edge — schema-validate (Zod or equivalent) request bodies, params, and external responses before they flow inward. Untyped data never crosses a layer. Fail closed.

**Error handling that means something.** Distinguish client errors (4xx) from server faults (5xx). Return structured, non-leaky errors — stable error codes, human message, no stack traces or secrets in responses. Use `try-catch` where recovery or context matters; don't blanket-wrap (development-rules).

**Idempotency & safety.** GET/PUT/DELETE idempotent; make non-idempotent operations safe under retry via idempotency keys or natural dedupe. Assume clients retry. Validate webhooks and external callbacks.

**Layer the responsibilities.** Keep transport (controller/route) thin; business logic in services; data access isolated. One concern per module, files under ~200 lines (development-rules). Dependencies point inward.

**Observability is part of the feature.** Structured logs with correlation/request IDs, metrics on latency/error-rate/throughput, and traces across service hops. Log decisions and failures — never secrets or PII.

**Concurrency & resources.** Time out and bound external calls; use circuit breakers/backoff for flaky dependencies. Release connections; cap pool sizes.

## Checklist

- [ ] Contract (shapes, status codes, versioning) defined before coding.
- [ ] All inputs and external responses validated at the boundary; fail closed.
- [ ] Errors: 4xx vs 5xx correct, structured, no secrets/stack traces leaked.
- [ ] Non-idempotent operations safe under retry; webhooks verified.
- [ ] Transport / service / data-access layers separated; deps point inward.
- [ ] Structured logs + metrics with correlation IDs; no PII/secrets logged.
- [ ] External calls bounded by timeouts and backoff.

## References

- `../../rules/development-rules.md` — error-handling and modularization rules.
- `../databases/SKILL.md` — data-access and transaction concerns.
- `../security-review/SKILL.md` — authz, secret handling, injection.
