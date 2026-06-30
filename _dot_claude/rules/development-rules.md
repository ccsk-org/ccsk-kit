# Development Rules

How code gets written in this kit. Always-on; loaded by `CLAUDE.md`.

## Principles

- **KISS / DRY / YAGNI.** Prefer the smallest change that satisfies the accepted scope. Reuse existing helpers, patterns, and test utilities before inventing abstractions. Don't build for hypothetical futures.
- **Edit over create.** Change the file that owns the behavior. Create a new file only for a real boundary — **never** an `*-enhanced`, `*-v2`, `*-new`, or `*-copy` duplicate of a file that already exists. If a rewrite is needed, rewrite in place.
- **Backward-compatible by default.** Keep public contracts (exports, routes, schemas, env vars, CLI flags) intact unless the accepted scope explicitly says otherwise. If you must break one, find and update every caller in the same change.
- **Match the surroundings.** New code should read like the code already there — same style, naming, error-handling, and comment density. Write comments where the surrounding code does.
- **One slice at a time.** Small, reviewable, independently-verifiable changes over big-bang commits.

## Modularization

- If a code file exceeds ~200 lines, consider splitting it. Check existing modules before creating new ones; split along logical boundaries (functions, classes, concerns).
- Does **not** apply to markdown, plain text, shell scripts, config, or env files — leave those whole.

## Code-file naming (always-on)

There is no per-write naming hook in this kit, so this convention is the contract — apply it on **every** file you create:

- **Directories & non-component files:** `kebab-case` with long, descriptive, self-documenting names (long is fine — it helps grep/glob/LLM tools).
- **Per-language code files:** follow the language/framework norm already in the repo — e.g. React components `PascalCase.tsx`, hooks `useThing.ts`, Python modules `snake_case.py`, Go files `lowercase.go`. When the repo already has a convention, match it; otherwise use the language default.
- **No vague names** (`utils2`, `helper`, `temp`, `final`). The name should say what the file is.

## Tests

- Add or update focused tests for behavior you touch. Broaden to lint/typecheck/build when you change a shared contract.
- Never weaken, skip, or delete a test to make the suite green — fix the regression at its source.

## Generated artifacts (`.ccsk/`) naming

Artifact paths and timestamps are owned by the `project-organization` skill — **run `date +%y%m%d-%H%M`, never infer a timestamp** (fabricated dates mis-sort plan dirs and break rehydrate's checks).
