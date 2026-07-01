---
name: adopt
description: Adopt an existing codebase into the kit — scout the repo and populate the six evergreen docs/* from real, cited code. Use on a fresh install, or when the docs are still template TODOs. Triggers — "adopt this repo", "onboard the codebase", "fill/scaffold the docs", "set up ccsk here".
when_to_use: Invoke to cold-start the kit's understanding of a repo before planning or building. Triggers — "adopt", "onboard", "scaffold the docs", "fill in docs/", "prime the project", first run after ccsk init.
argument-hint: "[--fast] [--skip <slugs> | --docs <slugs>] [--dry-run] [--yes] [--force]"
user-invocable: true
allowed-tools: Read, Glob, Grep, Bash, Task, AskUserQuestion, Write, Edit
---

# /ccsk:adopt — prime the kit from an existing codebase

> The cold-start counterpart to `docs-sync`. Where `docs-sync` updates docs incrementally on a real change, **adopt fills them from scratch** — researching the repo and writing `docs/*` from verified code. **Docs only: it never mutates the shipped `.claude/rules/*`.**

Contract: `.claude/rules/documentation-management.md` (the six-doc skeleton + triggers), `.claude/rules/orchestration-protocols.md` (delegation packet), `.claude/rules/memory-protocol.md` (memory seed), `.claude/rules/common-rules.md` (no fabrication, denylist).

## Announce
On activation, emit this boxed banner first (per the `announce-style` reference — 🧭 is the Frame/prime family; adjust the `─` fill so the box is tidy):

```
╭─ 🧭 ADOPT ─ /ccsk:adopt ─────────────────────────────────╮
│  {one concise line — what this run is scouting/writing}  │
╰──────────────────────────────────────────────────────────╯
```

## Flags (parse from `$ARGUMENTS`)
| Flag | Effect |
|---|---|
| `--fast` | Single-pass inline instead of the default per-doc fan-out. |
| `--skip <slugs>` | Omit the named docs. **Mutually exclusive with `--docs`.** |
| `--docs <slugs>` | Adopt ONLY the named docs. **Mutually exclusive with `--skip`.** |
| `--dry-run` | Print the write-plan (docs in scope + outline) and stop — write nothing. |
| `--yes` / `-y` | Non-interactive: skip the interview, fill from code, leave the rest as `TODO`. |
| `--force` | Overwrite docs that already hold real content (default is skip-and-report). |

**Doc slugs:** `overview` (project-overview-pdr) · `architecture` (system-architecture) · `standards` (code-standards) · `summary` (codebase-summary) · `design` (design-guidelines) · `roadmap` (project-roadmap). If both `--skip` and `--docs` are given → error and stop.

## Flow
1. **Pre-flight.** Works on a virgin repo (no rehydrate needed if `.ccsk/` is empty). Confirm a `docs/` skeleton exists; if not, note it and continue (adopt can create the files).
2. **Survey.** Scout deterministic signals first — `package.json`/lockfile/configs, dir tree, entrypoints, test setup, `.env.example`, CI. Detect: project type, stack, package manager, whether a frontend exists (`design` auto-skips if none).
3. **Resolve scope.** Apply `--skip`/`--docs` (mutually exclusive) to the six slugs.
4. **Detect existing.** For each in-scope doc, decide if it already holds real content (beyond template `TODO`/`<project-name>` placeholders). **Report filled docs and skip them** unless `--force`.
5. **Dry-run gate.** If `--dry-run`: print the write-plan (each doc, one-line outline, detected facts) and **stop**.
6. **Interview gate.** `AskUserQuestion` (batched) for what code can't reveal — product intent, roadmap/milestones, non-obvious decisions. `--yes` skips this → those sections become explicit `TODO`.
7. **Populate.**
   - **Default (fan-out):** spawn one `ccsk:docs-manager` per in-scope doc, each with a **disjoint write-set** (its one `docs/*` file) and a full delegation packet (orchestration-protocols). Use `ccsk:researcher` for read-only scouting of an unclear subsystem; `ccsk:designer` for `design-guidelines`. **Cold-fill mode:** the packet must state the doc is still a template so `docs-manager` populates rather than applying its no-churn heuristic.
   - **`--fast`:** do it inline in one pass — no subagents.
   - **Load `references/adopt-playbook.md`** for the per-doc scout/cite/packet guide.
8. **Integrate + consistency sweep.** Reconcile across docs (no contradictions, stack table matches architecture, cross-links resolve). **Every fact is code-cited (`file:line`) or an explicit `TODO` — never fabricated.**
9. **Conditional project-context.** Only if load-bearing facts don't fit the six docs (a house rule, a critical gotcha), generate `.claude/rules/project-context.md` + one `@`-import in the project's `CLAUDE.md` (a user file — this is the one edit outside `docs/`, and it never touches a shipped rule). Otherwise docs-only.
10. **Seed memory.** Write a `.ccsk/MEMORY.md` seed (pointers to the new docs), a journal entry, and `STATUS.md` so `rehydrate` and later beats start warm.

## Anti-patterns (rejected)
- **Fabricating** a stack/version/architecture fact — unknown ⇒ `TODO`, never a guess.
- **Mutating any shipped `.claude/rules/*`** (they're the kit contract, re-materialized on `ccsk update`).
- Silently overwriting a hand-written doc (respect the detect-and-skip default; require `--force`).
- Parallel agents sharing a write-set (each owns exactly one `docs/*` file).

## Output
The populated `docs/*` (+ conditional `project-context.md`), a seeded `.ccsk/` memory, and a one-paragraph summary: which docs were filled, which skipped (and why), and the remaining `TODO`s the user should answer. Hands off cleanly to `/ccsk:plan` or `/ccsk:execute`.
