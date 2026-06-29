---
name: frontend-development
description: Principles for modern component-driven UI — state-ownership splits, accessibility (WCAG 2.2), Core Web Vitals performance budgets, and meaningful UI testing. Framework-agnostic (React/Vue/Angular). Use when building or reviewing user-interface code.
---

# Frontend Development

Component-driven UI principles that hold across frameworks. Substance over framework trivia.

## When this applies

- Building or reviewing components, views, forms, or any user-facing UI.
- Decisions about where state lives, accessibility, or front-end performance.

| When NOT to use | Reach for instead |
|---|---|
| Server/API endpoint logic | `../backend-development/SKILL.md` |
| Schema or query work behind the UI | `../databases/SKILL.md` |
| Picking/verifying a library or framework | `../research/SKILL.md` |

## Core guidance

**State ownership — decide it deliberately.** Three kinds, never conflated:
- **Local/ephemeral** — `useState` (or equivalent) first. Form inputs, toggles, hover.
- **Server state** — a query/cache layer (TanStack Query etc.). Treat the server as the source of truth; never mirror it into a global store.
- **Global/shared** — a store (Zustand etc.) only when truly cross-cutting state has no common parent. Smallest scope that works.

**Composition over configuration.** Small focused components; lift state only as far as needed. Keep files under ~200 lines (development-rules); split by concern.

**Accessibility is non-optional (WCAG 2.2 AA).** Semantic HTML before ARIA — reach for `<button>`, `<nav>`, `<label>` before a `div` with handlers. Keyboard-operable, visible focus, labelled controls, 4.5:1 text contrast, target size ≥ 24px, no keyboard traps, respects `prefers-reduced-motion`.

**Performance budgets (Core Web Vitals).** Aim LCP < 2.5s, INP < 200ms, CLS < 0.1. Tactics: code-split at the route, lazy-load below-the-fold, reserve space for media to avoid layout shift, ship less JS, avoid blocking the main thread. Measure before optimizing.

**Units & styling.** Use `rem`, not `px`, for sizing/spacing (development-rules). Prefer design tokens over hard-coded values.

**Testing UI by behavior, not implementation.** Query by role/label/text as a user would; assert visible outcomes. Cover loading, empty, error, and success states. Skip snapshot churn that tests nothing.

## Checklist

- [ ] State placed in the correct tier (local / server / global) with the smallest scope.
- [ ] Server data not duplicated into a global store.
- [ ] Semantic elements used; keyboard + focus + contrast meet WCAG 2.2 AA.
- [ ] Loading / empty / error / success states all handled.
- [ ] No avoidable layout shift; heavy work split or deferred.
- [ ] Sizing in `rem`; tokens over magic numbers.
- [ ] Tests assert user-visible behavior, not internals.

## References

- `../../rules/technical-stacks.md` — state-ownership model and data flow.
- `../../rules/development-rules.md` — semantic HTML, `rem` units, file size.
- `../backend-development/SKILL.md` — the API contract the UI consumes.
