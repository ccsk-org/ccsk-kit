# Project Technical Stacks & Architecture

---

## Technology Stacks

List all technology stacks with version and target.

**Example**:

```md
- **Framework**: Next.js 16.1.1 with App Router + Turbopack
- **UI Library**: React 19.2.3
- **Language**: TypeScript 5.6.3 (target: es2020)
- **State Management**: Zustand 4.5.7
- **Data Fetching / Query**: @tanstack/react-query 5.76.1
- **Forms**: react-hook-form 7.56.3, zod 3.25.49
- **i18n**: i18next 25.2.1, react-i18next 15.5.3
- **Animation**: Framer Motion 11.13.1
- **Rich Text**: Tiptap 3.0
- **Icons**: lucide-react
- **UI Components**: Shadcn UI
- **Styling**: Tailwind CSS v4, tailwind-animate, class-variance-authority, tailwind-merge
- **Package Manager**: bun
```

## Architecture

Naming the `architecture` with comprehensive structure patterns

**Example**:

```md
The project follow Feature-first modular monolith architecture. Routing scaffolding is intentionally thin: Every route file is a one-liner that delegates to a `View` or `Layout` in `@modules/` or `@shared`. Feature code lives in `@modules/<feature>/` and never reaches sideways into a sibling module - cross-module code hoist to `@shared/`.

<project-name>/
├── @core/                 # framework-agnostic primitives
├── @shared/               # cross-module React (providers, layouts, theme, UI)
├── @modules/              # feature folders (one per domain)
├── @mocks/                # dev/test mock data + provider
├── src/                  # Vite entry — main.tsx, router.tsx, App.tsx
└── docs/                 # this file lives here


## Why feature-based modular

- **Replaceability** — swap a module without touching another. The boundary is the folder.
- **Test isolation** — a module's tests sit beside it (`__tests__/`). The blast radius of a change is the module.
- **AI-friendliness** — small modules = small context. An LLM (or a junior dev) loads one folder and has everything for the feature.
- **Dependency direction is enforced** — `core` is leafmost, `modules` never import siblings. Cycles are structurally impossible.

## The five layers

### `@core/` — framework-agnostic primitives

No React imports. Pure TS only. Holds constants, plain-TS domain models, async services (HTTP, SDKs), storages (`localStorage`, IndexedDB adapters), request/response interceptors, and pure utility functions. Anything in `@core/` is portable to a Node script, a CLI, or a worker without a React runtime.

### `@shared/` — cross-module React

Everything React-aware but not feature-specific. `components/{common,layout,ui}`, custom hooks, top-level layouts, the provider stack, theme tokens, and cross-cutting TS types. shadcn primitives land in `@shared/components/ui/` via a patched `components.json`.

### `@modules/<feature>/` — owned domain code

The whole feature in one folder. Conventional sub-folders: `components/`, `hooks/`, `queries/`, `schemas/`, `services/`, `__tests__/`. Each module is a sibling — never imports from another `modules/<other>/`. If two modules want the same thing, hoist it to `@shared/`.

### `@mocks/` — mock data + `<MockProvider />`

Dev/test mocks live here. The provider wraps the tree (innermost inside `AppProvider`) so it can override any data the real stack returns. Lets a developer run the app cold and tests run hermetically.

## Dependency direction

```
            ┌─────────┐
            │  src/   │  (one-liner delegators)
            └────┬────┘
       ┌────────┴────────┐
       ▼                 ▼
  ┌─────────┐      ┌──────────────┐
  │ modules │ ───▶ │   shared/    │
  └────┬────┘      └──────┬───────┘
       │                  │
       └────────┬─────────┘
                ▼
            ┌────────┐
            │ core/  │  ◀── leafmost; no inbound from src/modules/shared except as shown
            └────────┘
                ▲
                │
            ┌────────┐
            │ mocks/ │
            └────────┘
```

**Allowed:**

- `modules/*` → `shared/*` → `core/*`
- `src/*` → `modules/*` and `shared/*` (one-liner only)
- `mocks/*` → `core/*`

**Forbidden:**

- `core/*` importing from `shared/*`, `modules/*`
- `shared/*` importing from any `modules/*`
- `modules/<A>` importing from `modules/<B>` — hoist shared code to `shared/`
- Cross-layer `../../` relative imports — use the path alias instead

See `code-standards.md` for the authoritative rule list. `CLAUDE.md` encodes the same rules for AI assistants.

## Routing model

**Vite + react-router** — code-based. The route table lives in `src/router.tsx` as a `createBrowserRouter([...])` array. Each entry's `element` is a one-liner: `<FeatureView />` or `<ScopeLayout />`.

## State ownership

- **UI / ephemeral** — `useState` first. Zustand only when state is shared across siblings without a common parent.
- **Server state** — TanStack Query (`useQuery`, `useMutation`). Never mirror server data into a Zustand store.
- **Cross-cutting** — providers in `shared/providers/` (Theme, Mock). Composed by `<AppProvider>`.

## Data flow

```
Request → service (core or module) → query hook (module) → component (module)
```

Zod schemas gate every async boundary. Untyped responses are parsed before they leave the service.

## Out of scope

This architecture does **not** prescribe:

- A testing framework (Vitest, Jest, Playwright — pick what fits)
- A deployment target (Vercel, Cloudflare, self-hosted — orthogonal)
- An error-tracking SDK (Sentry, Rollbar — wire into `core/interceptors/`)
- An analytics SDK (PostHog, Segment — wire into `shared/providers/`)
- A CSS-in-JS solution (Tailwind is the default; swap freely)
```