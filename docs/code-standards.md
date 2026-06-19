# Code Standards — <project-name>

> **Purpose:** Project-level rules for naming, structure, and quality gates. Claude agents and human developers follow these equally. When this doc and `CLAUDE.md` diverge, fix both — they must stay in sync.

---

## Guiding principles

- **YAGNI** — don't build what isn't needed yet.
- **KISS** — the simplest solution that satisfies the requirement.
- **DRY** — extract duplication only when the abstraction is obvious and stable.

## File naming

- TypeScript/JavaScript: `kebab-case` with descriptive names (self-documenting for LLM grep tools).
- React components: `kebab-case` file, `PascalCase` export (`user-profile-view.tsx` → `UserProfileView`).
- Hooks: `use-*.ts` file, `useXxx` export.
- Services: `<noun>-service.ts`. Schemas: `<noun>-schemas.ts`. Types: `<noun>-types.ts`.

See `docs/references/code-standards.md` for the full naming table.

## File size

- Keep files under **200 lines**. Split when growing past it.
- One concern per file. Composition over monoliths.

## TypeScript

- `strict: true` — no exceptions.
- No `any` in public surfaces. Use `unknown` + narrowing instead.
- Prefer explicit return types on service functions and query hooks.

## Imports

Order: (1) framework, (2) third-party, (3) path aliases (`@core`, `@shared`, `@modules`, `@mocks`), (4) relative (intra-module only).

Never use `../../` across layer boundaries — always use a path alias.

## Error handling

- Async functions throw; never return `{ ok, error }` tuples.
- Validate all external data at the boundary with Zod before returning it.
- HTTP errors are normalized in `core/interceptors/` — feature code should not handle raw status codes.

## Styling

- Tailwind utility-first. No hardcoded hex/HSL values in feature code.
- Use CSS variables / theme tokens from `shared/theme/` for all design values.
- CVA for component variants with more than 2 visual states.

## Testing (when added)

- Co-locate tests in `__tests__/` beside the code under test.
- Unit tests for services, schemas, and pure utilities.
- Component tests for non-trivial UI logic.
- No mocking of internal module code — mock at the network/service boundary only.

## Linting & formatting

TODO: List the linter config (ESLint preset) and formatter config (Prettier) used on this project.

## Pre-commit gates

- `lint-staged` runs Prettier + ESLint on staged files.
- `tsc --noEmit` must pass before push.
- Failing tests block push — do not skip.
