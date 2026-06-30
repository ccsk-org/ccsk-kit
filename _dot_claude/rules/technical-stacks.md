# Technical Stacks

**Thin pointer rule.** This file states defaults and routes to the deep, *auto-activating* domain skills — it deliberately stays short so it costs little on every session. Heavy stack knowledge lives in skills that load only when relevant (better token economy + better targeting).

## Defaults & conventions

- **Detect, don't assume.** Read `package.json` / lockfile / config to learn the actual stack, package manager, and scripts before acting. Match what's there.
- Production-grade bar: typed where the language supports it, tested for touched behavior, lint/format clean, no new build/type errors.
- Prefer the framework's idiomatic patterns and the repo's existing conventions over novel ones.

## Where the depth lives (domain skills)

When a task is clearly in one of these domains, the matching skill auto-activates (by description) and loads its `references/` just-in-time:

- **Frontend / React 2026** → `frontend-development` skill (component patterns, state, data-fetching, accessibility).
- **Backend / APIs** → `backend-development` skill (service design, validation, auth, error handling).
- **Databases** → `databases` skill (schema, migrations, query patterns).
- **Deploy / infra** → `deploy` skill (build, release, environments).

If a needed domain has no skill yet, use `skill-creator` to add one (don't bloat this rule with stack specifics).

> Note: the kit ships with the domain skills the project needs. Keep this rule a one-screen pointer — add stack-specific depth to a skill's `references/`, not here.
