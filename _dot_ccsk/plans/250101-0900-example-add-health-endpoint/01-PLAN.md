---
status: completed
progress: 100%
created: 250101-0900
---

# Plan: add health endpoint (EXAMPLE)

> Shipped example showing the ledger shape. `[x]` = done. Single source of truth for status.

## Summary
Add a `GET /health` endpoint returning `{ status, uptime }`, with a focused test. Single-phase.

## Phase 01 — health endpoint + test
- **Context:** ops needs a liveness probe; none exists.
- **Goal:** `GET /health` → `200 { status: "ok", uptime: <seconds> }`.
- **Related files:** Create: `src/routes/health.ts`, `tests/health.test.ts` · Modify: `src/router.ts`
- **Risks:** none material; keep it dependency-free.
- **Acceptance criteria**
  - [x] `GET /health` returns 200 with `status: "ok"` and a numeric `uptime`
  - [x] route registered in the app router
  - [x] focused test covers the success shape
  - [x] no new lint/type errors
