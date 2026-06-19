# System Architecture — <project-name>

> **Purpose:** High-level technical design — how the system's major parts connect, what each owns, and why it's structured this way. Update when a new integration or layer is added. Detail lives in `docs/references/architecture.md`.

---

## System overview

TODO: One paragraph describing the overall system — client, server(s), third-party services, data stores.

## Component diagram

```
┌─────────────────────────────────────────────────┐
│  Browser                                         │
│                                                  │
│  ┌──────────┐    ┌──────────┐    ┌────────────┐ │
│  │  src/    │───▶│ modules/ │───▶│  shared/   │ │
│  │ (router) │    │(features)│    │(providers) │ │
│  └──────────┘    └──────────┘    └────────────┘ │
│                        │                │        │
│                        └────────┬───────┘        │
│                                 ▼                │
│                           ┌──────────┐           │
│                           │  core/   │           │
│                           │(services)│           │
│                           └─────┬────┘           │
└─────────────────────────────────┼───────────────-┘
                                  │ HTTP / REST
                                  ▼
                    ┌─────────────────────────┐
                    │  Backend API            │
                    │  TODO: describe         │
                    └─────────────────────────┘
                                  │
                    ┌─────────────┴───────────┐
                    │  Data store             │
                    │  TODO: describe         │
                    └─────────────────────────┘
```

## Layers and responsibilities

| Layer | Owns | Does NOT own |
|-------|------|-------------|
| `src/` | App entry, router (one-liner delegators) | Business logic, UI state |
| `modules/<feature>/` | Feature components, hooks, queries, schemas, services | Cross-feature code |
| `shared/` | Providers, layouts, UI primitives, cross-module hooks/types | Feature-specific logic |
| `core/` | HTTP client, interceptors, domain models, pure utils | React, JSX, feature logic |
| `mocks/` | Dev/test mock data and MockProvider | Production code paths |

## External integrations

TODO: List third-party services this system calls.

| Service | Purpose | Integration point |
|---------|---------|------------------|
| TODO    | TODO    | `core/services/` |

## Authentication & authorization

TODO: Describe auth strategy (e.g. JWT in Authorization header, session cookie, OAuth flow). Note where the token is stored and how interceptors attach it.

## Data flow

```
User action
  → component calls query hook (modules/<feature>/queries/)
  → query hook calls service (modules/<feature>/services/ or core/services/)
  → service calls API via http-client (core/services/http-client.ts)
  → response validated by Zod schema (modules/<feature>/schemas/)
  → typed data returned to component
```

## Deployment topology

TODO: Describe where the frontend is deployed (CDN, edge, server-rendered, etc.) and how it reaches the backend.

## Security considerations

- All external data validated with Zod at the service boundary before use.
- Auth tokens stored in TODO (httpOnly cookie / memory / localStorage — note trade-offs).
- CORS policy: TODO.
- CSP headers: TODO.

## Related docs

- `docs/references/architecture.md` — detailed layer rationale and dependency rules
- `docs/references/codebase-map.md` — file-level directory layout
- `docs/project-overview-pdr.md` — product context
