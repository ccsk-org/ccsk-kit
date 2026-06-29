---
name: ccsk:loop
description: Autonomous optimization loop — repeatedly make one small change, commit, measure a single-number metric, and keep it or git-revert it. Learns from git history + a TSV log. For metrics like test coverage, bundle size, lint count, or benchmark time.
argument-hint: [Goal, or an inline Goal/Scope/Verify/Guard/Iterations/Direction/Min-Delta block]
allowed-tools: Read, Edit, MultiEdit, Write, Bash, Glob, Grep, AskUserQuestion, Skill
---

# `/ccsk:loop`

> Drive one measurable metric upward (or downward) without re-prompting. This command is the thin entry point; the method lives in the **`optimization-loop`** skill. Read and follow that skill — do not restate its phases here.

**Prime directive:** one change, committed, measured, kept only if it provably helps.

---

## What to do

1. **Load the method.** Activate the `optimization-loop` skill and follow its eight phases (Arm → Recall → Propose → Apply → Checkpoint → Measure → Judge → Record) and its invariants exactly. Everything below is just how to *start* a run.

2. **Parse the config** from `$ARGUMENTS`. Accept either a bare goal sentence or an inline block of `Key: value` lines. Recognise these keys:

   | Key | Required | Default |
   |---|---|---|
   | `Goal` | yes | — |
   | `Scope` | yes | — |
   | `Verify` (prints ONE number) | yes | — |
   | `Guard` (regression check, exit 0 = OK) | no | none |
   | `Iterations` | no | 10 |
   | `Direction` (`higher`/`lower`) | no | higher |
   | `Min-Delta` | no | 0 |

3. **Fill the gaps.** If any **required** field (Goal, Scope, Verify) is still missing after parsing, ask for all of them in **one batched `AskUserQuestion`**. Optional fields take their defaults silently — don't ask. If the user gave a goal but no Verify, propose a concrete Verify command for their stack and confirm it.

4. **Run the Safety screen** (from the skill) on the `Verify` and `Guard` commands. Refuse destructive commands; never echo secrets from Verify output.

5. **Arm** (skill phase 0): clean-git + named-branch checks, scope expansion, baseline measurement, `.gitignore` the log, initialise `loop-log.tsv`. Abort with one clear message if any precondition fails — do not silently "fix and continue."

6. **Drive the loop** through the skill's phases until a stop condition fires (iteration cap, 10 consecutive discards, Verify timeout/hard error, numeric target met, or user interrupt).

7. **Print the final report** in the skill's format (iterations, kept/discarded counts, baseline → best, kept commits, outcome, suggested next step).

## Rules of the run

- Never touch a file outside `Scope`, and never a file the `Guard` reads.
- Commit **before** you measure; revert (not reset) on discard.
- One atomic change per iteration — if the description needs "and", split it.
- Always Recall (read git history + the TSV) before proposing the next change.

## Quick examples

```
/ccsk:loop Raise statement coverage in src/parser toward 80%
```

```
/ccsk:loop
Goal: Get the main client bundle under 200 KB
Scope: src/**/*.ts | src/**/*.tsx
Verify: vite build >/dev/null 2>&1 && du -k dist/assets/index-*.js | awk '{print $1}'
Guard: tsc --noEmit
Direction: lower
Min-Delta: 1
```

See the `optimization-loop` skill for the full protocol and more examples.
