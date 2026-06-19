# Codebase Summary — <project-name>

> **Purpose:** A dense, LLM-optimized snapshot of this codebase — architecture, key files, patterns, and current state. Agents read this before scouting. Update after major structural changes.

---

## Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | TODO (e.g. Vite + React 18) | TODO |
| Language | TypeScript (strict) | |
| Styling | Tailwind CSS + shadcn/ui | primitives in `shared/components/ui/` |
| State — server | TanStack Query v5 | |
| State — client | useState / Zustand (where needed) | |
| Forms | React Hook Form + Zod | |
| Routing | TODO (e.g. react-router v6) | |
| Testing | TODO (e.g. Vitest + Testing Library) | |
| Package manager | TODO (npm / pnpm / bun) | |

## Architecture summary

Five-layer feature-modular layout. Dependency direction is strictly enforced:

```
src/ (delegators) → modules/ → shared/ → core/
                                        ↑
                               mocks/ ──┘
```

- `core/` — pure TS, no React. Transport, utils, domain models, interceptors.
- `shared/` — React-aware, not feature-specific. UI primitives, providers, layouts, cross-module hooks.
- `modules/<feature>/` — self-contained feature code. Never imports from sibling modules.
- `mocks/` — dev/test data and MockProvider.
- `src/` — thin entry: `main.tsx`, `App.tsx`, `router.tsx` (one-liner delegators only).

Full annotated tree: `docs/references/codebase-map.md`

## Key files

| File | Role |
|------|------|
| `src/router.tsx` | Route table — one-liner delegators only |
| `shared/providers/app-provider.tsx` | Composes all cross-cutting providers |
| `core/services/http-client.ts` | Typed fetch wrapper used by all services |
| `CLAUDE.md` | AI assistant memory — conventions and constraints |
| `docs/references/code-standards.md` | Naming and dependency rules |

## Active modules

TODO: List feature modules currently in the codebase.

| Module | Status | Entry component |
|--------|--------|----------------|
| `modules/home` | TODO | `home-view.tsx` |
| `modules/auth` | TODO | `login-view.tsx` |

## Known constraints

TODO: Record any non-obvious constraints (API rate limits, legacy integrations, performance budgets, a11y requirements).

## Recent significant changes

TODO: Brief log of the last 2–3 structural changes (not a full changelog — just context for agents picking up mid-stream).

- TODO
