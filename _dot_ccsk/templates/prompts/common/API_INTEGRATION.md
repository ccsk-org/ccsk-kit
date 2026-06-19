# API Integration Task Prompt

Use this when wiring a new API endpoint or replacing a stub.

---

## Endpoint

- **Method + path:** `GET /api/...`
- **Request shape:** (params / body)
- **Response shape:** (JSON contract)
- **Auth:** (none / session / bearer)
- **Idempotency:** (yes / no)

## Goal

(One sentence — what flow does this API enable?)

## Acceptance Criteria

- [ ] Zod schema for request & response in `src/schemas/`
- [ ] Typed API client wrapper in `src/lib/api.ts`
- [ ] TanStack Query hook in `src/queries/`
- [ ] Optimistic update or invalidation strategy defined
- [ ] Error handling: surfaces 4xx vs 5xx differently
- [ ] Loading + empty + error UI states

## Touchpoints

- New files: `(list)`
- Modified files: `(list)`
- Affected components: `(list)`

## Out of Scope

- (what we are NOT doing)
