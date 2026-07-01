---
name: loop
description: Autonomous optimization loop — repeatedly make ONE small change, commit, measure a single-number metric, and keep it or git-revert it. Learns from git history + a TSV log. Use for metrics like test coverage, bundle size, lint count, or benchmark time.
when_to_use: Invoke to drive one measurable number up or down without re-prompting. Triggers — "raise coverage", "shrink the bundle", "reduce lint errors", "optimize until".
argument-hint: "[Goal, or an inline Goal/Scope/Verify/Guard/Iterations/Direction/Min-Delta block]"
allowed-tools: Read, Edit, MultiEdit, Write, Bash, Glob, Grep, AskUserQuestion
---

# /ccsk:loop — autonomous metric loop

> Drive one measurable metric without re-prompting. **Prime directive: one change, committed, measured, kept only if it provably helps.** Runs **in-session** (no subagents, no multi-model). Memory = git history + `loop-log.tsv`.

Contract: `.claude/rules/common-rules.md` (denylist), `.claude/rules/primary-workflows.md` (autonomy).

## Announce
On activation, announce yourself first per the `announce-style` reference — emit this inside a fenced code block (adjust the `─` fill so the box looks tidy; fill the second line with one concise clause):

```
╭─ ⟳ LOOP ─ /ccsk:loop ────────────────────────────────────╮
│  {one concise line — what this stage is doing}           │
╰──────────────────────────────────────────────────────────╯
```

## Config (parse from `$ARGUMENTS`: a bare goal, or `Key: value` lines)
| Key | Required | Default |
|---|---|---|
| `Goal` | yes | — |
| `Scope` (editable glob) | yes | — |
| `Verify` (prints ONE number) | yes | — |
| `Guard` (regression check; exit 0 = OK) | no | none |
| `Iterations` | no | 10 |
| `Direction` (`higher`/`lower`) | no | higher |
| `Min-Delta` | no | 0 |

If any **required** field is missing after parsing, ask for all of them in ONE batched `AskUserQuestion`. Optional fields take defaults silently. If a goal but no Verify, propose a concrete Verify for the stack and confirm.

## Safety screen (before anything)
REFUSE destructive Verify/Guard commands (`rm -rf`, fork bombs, `curl | sh`, anything on the never-auto denylist). Never echo secrets from command output. The loop **commits but never pushes**, and never targets `main`/`master`.

## The eight phases (per iteration)
0. **Arm** (iter 1): require a git repo, **clean tree**, a named non-default branch; confirm `Scope` matches ≥1 file; dry-run Verify (+Guard) once; record **baseline = iteration 0**; `.gitignore` the log; init `loop-log.tsv`. Abort with one clear message if any precondition fails — don't "fix and continue".
1. **Recall** — `git log --oneline -20` (loop commits are prefixed `loop(iter-N):` for `git log --grep`), `git diff HEAD~1`, read `loop-log.tsv` → trend. Exploit past wins; avoid failed file+technique pairs.
2. **Propose** — exactly ONE atomic change. Atomicity test: if the description needs "and", split it.
3. **Apply** — edit only files in `Scope`; **never** modify a file the `Guard` reads.
4. **Checkpoint** — `git commit -m "loop(iter-N): <desc>"` **before** measuring ("git is memory, not a safety net").
5. **Measure** — run Verify → `DELTA = RESULT − PREV`. No number / non-zero exit → revert; >30s or hard error → abort.
6. **Judge** — KEEP iff Guard passes (if set) AND delta beats `Min-Delta` in `Direction`. KEEP → update PREV, reset discard counter. DISCARD → `git revert HEAD --no-edit` (reset --hard only on conflict), increment counter.
7. **Record** — append TSV: `iter, ISO8601, metric, delta, kept, description`.

## Stop conditions (caps)
Iteration cap reached · **5 consecutive discards → shift strategy; 10 → STOP and surface** · Verify timeout/hard error · numeric target met · user interrupt (`loop-stop` file / Ctrl-C). Never exceed `Iterations`.

## Final report
Iterations run, kept/discarded counts, baseline → best, kept commit list, outcome, suggested next step. Offer the commits (already local); **do not push**.

## Example
```
/ccsk:loop
Goal: Get the main client bundle under 200 KB
Scope: src/**/*.ts | src/**/*.tsx
Verify: vite build >/dev/null 2>&1 && du -k dist/assets/index-*.js | awk '{print $1}'
Guard: tsc --noEmit
Direction: lower
Min-Delta: 1
```
