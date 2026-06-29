---
name: optimization-loop
description: Method for autonomously improving a single measurable metric through repeated commit → measure → keep-or-revert iterations, using git history and a TSV log as the only memory. Use when a goal can be scored by one number from a shell command and improved by repeated small, scoped edits — e.g. test coverage, bundle size, lint-error count, or benchmark time.
---

# Optimization Loop

The method behind `/ccsk-loop`. One idea: **make one small change, commit it, measure it, and keep it only if it provably helped — otherwise revert.** Repeat until the metric stops moving or a cap is hit.

The loop has no database and no background process. Its entire memory is two durable things:

1. **git history** — every attempt is a commit; kept work stays, rejected work is reverted (the failed commit is preserved so the loop can learn from it).
2. **`loop-log.tsv`** — one row per settled attempt, plus a config header.

That is deliberate: a fresh session can pick the loop back up by reading git and the TSV, with nothing else to restore.

---

## Configuration

| Key | Required | Default | Meaning |
|---|---|---|---|
| `Goal` | yes | — | Human description of what to improve |
| `Scope` | yes | — | Glob(s) for the files the loop may edit |
| `Verify` | yes | — | Shell command that prints **exactly one number** to stdout |
| `Guard` | no | none | Regression check; exit 0 = OK (e.g. typecheck + tests) |
| `Iterations` | no | 10 | Maximum iterations |
| `Direction` | no | higher | `higher` or `lower` is better |
| `Min-Delta` | no | 0 | Smallest change that counts as real progress |

---

## The eight phases

**Arm** runs once. **Recall → Record** is the repeating body.

### 0. Arm (once, before the first iteration)

Abort with a single clear message if any check fails. Do not "fix it and keep going."

1. `git rev-parse --git-dir` — confirm we are inside a git repository.
2. `git symbolic-ref --short HEAD` — confirm a named branch, not a detached HEAD.
3. `git status --porcelain` — the tree must be clean. (`loop-log.tsv` is gitignored, so it never dirties the tree.)
4. Expand `Scope` (`git ls-files <glob>`) — at least one file must match.
5. Run the **Safety screen** (below) on the `Verify` and `Guard` commands.
6. Dry-run `Verify` once — it must exit 0 and print one number. That number is the **baseline**.
7. Dry-run `Guard` (if set) — it must exit 0 on the clean baseline, or it cannot judge regressions.
8. Initialise `loop-log.tsv`: write the `#` config header, the column header, and the baseline row (`iter=0`, `decision=baseline`). Set `last_kept_metric = baseline`.

### 1. Recall (every iteration — never skipped)

Reconstruct what has been tried, from durable memory only:

```bash
git log --oneline --grep="ccsk-loop:" -n 20   # attempts, in order
git show --stat HEAD                            # the last attempt's footprint
cat loop-log.tsv                                # full metric trend + keep/discard record
```

Answer three questions before proposing anything: what **kept** (which files/techniques moved the metric), what **discarded** (which file+technique pairs failed), and where the **trend** is heading over the last ~5 deltas (climbing, flat, oscillating).

### 2. Propose (pick exactly ONE atomic change)

- Atomicity test: state the change in one sentence. If it needs the word "and," it's two iterations — split it.
- Exploit what worked (files/functions adjacent to a kept win). Avoid re-trying a file+technique pair already discarded.
- Target leverage first: the lowest-covered file, the biggest bundle contributor, the file with the most lint errors.
- If Recall shows several recent discards in one area, deliberately switch area or technique (see Stuck detection).

### 3. Apply (edit within scope only)

- Edit only files matching `Scope`. **Never** edit a file referenced by the `Guard` command — guard files are read-only, or the regression check becomes meaningless.
- Keep the edit minimal — one logical unit.
- Run a cheap local syntax sanity-check (e.g. `tsc --noEmit` on one file, a parser, a formatter) before committing — not the full guard.

### 4. Checkpoint (commit BEFORE measuring)

Git is the undo mechanism and the memory, not a safety net bolted on afterward. Commit first, so every attempt has a revertible anchor even if Verify crashes mid-run.

```bash
git add <only the files changed this iteration>
git commit -m "ccsk-loop: iter <N> — <one-line description>"
```

The `ccsk-loop:` prefix makes history greppable in Recall. `loop-log.tsv` is never staged.

### 5. Measure (run Verify, extract one number)

```bash
RESULT="$(<Verify command>)"
```

| Verify outcome | Treat as | Action |
|---|---|---|
| exit 0, one number | measured | go to Judge |
| exit 0, no parseable number | error | decision `error:no-number`, revert, count as discard |
| non-zero exit | error | decision `error:verify-crash`, revert, count as discard |
| exceeds time budget | fatal | decision `error:timeout`, log, **stop the loop** and report |

Then, if `Guard` is set, run it. Exit 0 = pass; non-zero = regression → force a discard (one rework attempt allowed within the same iteration; if it still fails, discard with reason `guard-fail`).

### 6. Judge (keep or revert)

Compute `delta` so that **positive always means better**: for `Direction: higher`, `delta = RESULT − last_kept_metric`; for `lower`, `delta = last_kept_metric − RESULT`.

| Condition | Decision |
|---|---|
| guard passed AND `delta ≥ Min-Delta` | **KEEP** |
| guard passed AND `delta < Min-Delta` | **DISCARD** (no real progress) |
| guard failed, or Verify errored | **DISCARD** |

- **Keep** — set `last_kept_metric = RESULT`; the commit stays.
- **Discard** — `git revert HEAD --no-edit` (preserves the failed attempt so Recall can still read it). Only if revert conflicts, fall back to `git reset --hard HEAD~1` and note it in the row.

### 7. Record (append one TSV row)

Append a single tab-separated line to `loop-log.tsv` **after** the commit/revert settles. Because the file is gitignored, the revert in Judge does not erase it — the discard stays in the record.

Re-enter **Recall** unless a stop condition fires.

---

## Invariants

- One atomic change per iteration.
- Commit **before** verify.
- Guard-scope files are read-only.
- Prefer `git revert` over `git reset`.
- Always **Recall** before **Propose**.

---

## `loop-log.tsv`

Lives at the project root. **Add it to `.gitignore` during Arm** — being untracked is what lets it survive every `git revert`, making it the durable trial record (complementary to git history, which holds the kept code).

```
# ccsk-loop run 2026-06-29T14:02:03Z
# goal: raise statement coverage in src/parser
# scope: src/parser/**/*.ts | tests/parser/**/*.ts
# verify: <command>
# guard: tsc --noEmit && vitest run --silent
# direction: higher  min-delta: 0.5  max-iter: 15  baseline: 61.3
iter	ts	metric	delta	decision	reason	target	summary	commit
0	2026-06-29T14:02:03Z	61.3	+0.0	baseline	-	-	baseline measurement	a1b2c3d
1	2026-06-29T14:03:11Z	64.0	+2.7	keep	progress	src/parser/lexer.ts	cover unterminated-string branch	e4f5a6b
2	2026-06-29T14:04:20Z	63.8	-0.2	discard	below-min-delta	src/parser/ast.ts	extract node-factory helper	(reverted)
```

Columns: `iter` · `ts` (ISO-8601 UTC) · `metric` (raw Verify number) · `delta` (signed, normalised so + = better) · `decision` (`baseline`/`keep`/`discard`/`error:*`) · `reason` (`progress`/`below-min-delta`/`guard-fail`/`no-number`/`verify-crash`) · `target` (file or area) · `summary` (the one-sentence change) · `commit` (short SHA, or `(reverted)`).

---

## Stuck detection & termination

Derive the consecutive-discard count by reading the **tail** of `loop-log.tsv` — count the trailing run of rows whose `decision` is not `keep` or `baseline`. No counter file needed.

| Trailing discards | Action |
|---|---|
| 5 in a row | **Shift strategy** — in Propose, switch to a different file area or technique than the recent failures; note the pivot in the next `summary`. |
| 10 in a row | **STOP** — emit the final report and recommend manual intervention. |

Halt on any of: iteration cap reached · 10 consecutive discards · a Verify timeout or repeated hard error · the numeric target in the Goal is crossed · user interrupt.

### Final report (printed on halt)

```
ccsk-loop finished: <N> iterations · <K> kept · <D> discarded
metric: baseline <Y> → best <X>  (net <±Z>, direction: <higher|lower>)
kept commits:
  <sha>  <summary>
  ...
outcome: <target met | diminishing returns | stuck (10 discards) | iteration cap>
next: <continue with wider scope | switch technique | done>
```

---

## Safety screen

Before running any user-supplied `Verify` or `Guard`: **refuse** outright on destructive patterns — `rm -rf /`, `rm -rf ~`, `rm -rf $HOME`, fork bombs, and piped remote execution (`curl … | sh`, `wget … | bash`). **Warn and confirm** before running anything with `sudo`, `chmod 777`, or a network write to an unnamed host. Never echo secrets that appear in Verify output into the log or the report. If a command looks designed to exfiltrate or destroy rather than measure, stop and ask.

---

## When this applies

Use the loop when the goal reduces to **one number from a shell command** that small scoped edits can move. Good fits: raising test coverage, shrinking a bundle, driving lint/type errors to zero, lowering a benchmark's wall-clock.

| Don't use it for… | Use instead |
|---|---|
| A feature with no single metric | `/ccsk-build` |
| A one-shot bug fix | `debugger` agent / `/ccsk-build` |
| Design exploration | `brainstormer` agent / `/ccsk-plan` |

---

## Usage examples

**A — Raise coverage (higher is better)**
```
/ccsk-loop
Goal: Raise statement coverage in src/parser toward 80%
Scope: src/parser/**/*.ts | tests/parser/**/*.test.ts
Verify: vitest run --coverage --coverage.reporter=json-summary --silent && node -e "process.stdout.write(String(require('./coverage/coverage-summary.json').total.statements.pct))"
Guard: tsc --noEmit && vitest run --silent
Iterations: 15
Direction: higher
Min-Delta: 0.5
```

**B — Shrink the bundle (lower is better)**
```
/ccsk-loop
Goal: Get the main client bundle under 200 KB
Scope: src/**/*.ts | src/**/*.tsx
Verify: vite build >/dev/null 2>&1 && du -k dist/assets/index-*.js | awk '{print $1}'
Guard: tsc --noEmit
Direction: lower
Min-Delta: 1
```

**C — Drive lint errors to zero (lower is better)**
```
/ccsk-loop
Goal: Eliminate ESLint errors under src/api
Scope: src/api/**/*.ts
Verify: eslint src/api --format json 2>/dev/null | node -e "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>console.log(JSON.parse(s).reduce((a,f)=>a+f.errorCount,0)))"
Direction: lower
Iterations: 20
```
