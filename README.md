<div align="center">

# ccsk-kit

**Build software in one rhythm.**

`Frame → Forge → Prove → Sign-off`

<sub>**1 Loop ⟳ · 3 Commands · 13 Agents · 9 Skills**</sub>

![MIT](https://img.shields.io/badge/license-MIT-1A1A1A)
![Claude Code](https://img.shields.io/badge/Claude%20Code-kit-D97757)
![pure markdown](https://img.shields.io/badge/pure-markdown-3F9B6B)
![no hooks](https://img.shields.io/badge/no-hooks-6B7280)

> A lean, **pure-markdown** kit for Claude Code — one rhythm, a focused agent roster, three workflow commands, and an autonomous optimization loop. No hooks, no Node scripts, nothing to break silently.

</div>

---

## Highlights

- ✅ **One rhythm for everything** — every task follows the **Build Cadence**, so you always know the next move.
- ♻️ **Approve once, then let it run** — the autonomous loop improves a metric on its own, keeping only what provably helps.
- 🧠 **Git is the memory** — the loop learns from commit history + a `loop-log.tsv`; nothing hidden, fully auditable.
- 👥 **13 specialist agents** — planner, builder, reviewer, tester, debugger, and more, each with a narrow remit.
- 🧩 **A real delegation contract** — every subagent gets a complete packet and reports a typed status.
- 📐 **Scope precision** — file-ownership rules make parallel work collision-free.
- 🪶 **Pure markdown** — no hooks, no `.cjs`, no runtime dependency. Portable and transparent.
- 🎯 **Lean by design** — deliberately excludes the bloat (see the bottom of this page).

---

## How it works

### The Build Cadence

Every non-trivial task moves through four beats. Enter at the one that fits — the commands are the doors.

<div align="center">
<img src=".github/assets/build-cadence.svg" alt="The Build Cadence: Frame → Forge → Prove → Sign-off" width="900">
</div>

| Situation | Enter at | Command |
|---|---|---|
| Scope unclear, multi-phase, or risky | **Frame** | `/ccsk:plan` |
| A plan exists, or scope is clear | **Forge** | `/ccsk:build` |
| Improving one measurable metric repeatedly | **Loop** | `/ccsk:loop` |
| Need options before committing to a design | pre-Frame | `brainstormer` agent |

### The autonomous loop ⟳

Point it at a goal that can be scored by **one number from a shell command** — test coverage, bundle size, lint count, benchmark time. It makes one small change, commits, measures, and keeps it only if it beat the baseline; otherwise it reverts. Memory is just git + a `loop-log.tsv`.

<div align="center">
<img src=".github/assets/optimization-loop.svg" alt="The eight-phase autonomous loop wheel" width="820">
</div>

```text
/ccsk:loop
Goal: Raise statement coverage in src/parser toward 80%
Scope: src/parser/**/*.ts | tests/parser/**/*.test.ts
Verify: vitest run --coverage ... (prints one number)
Guard: tsc --noEmit && vitest run --silent
Direction: higher
Min-Delta: 0.5
```

### Agents & rules

The controller delegates each beat to a specialist, grouped by where it serves the cadence. Two rules are the contract: **`primary-workflows`** (the cadence) and **`orchestration-protocols`** (the delegation packet + status codes).

<div align="center">
<img src=".github/assets/agent-roster.svg" alt="Agent roster grouped by cadence beat" width="900">
</div>

### Skills

Passive domain knowledge the model auto-activates by match: **`optimization-loop`** (drives `/ccsk:loop`) plus `planning`, `frontend-development`, `backend-development`, `databases`, `security-review`, `research`, `deploy`, `docs-sync`, and `context-engineering`.

---

## Get started

Install the kit into any project with [`@ccsk/cli`](https://github.com/ccsk-org/ccsk-cli):

```bash
npm i -g @ccsk/cli
ccsk init
```

Then, inside Claude Code:

```text
/ccsk:plan    Add team workspaces with role-based permissions
/ccsk:build   .ccsk/plans/260629-1430-team-workspaces
/ccsk:loop    Raise coverage in src/api toward 85%
```

---

## What's inside

```text
.claude/
├── commands/ccsk/   plan · build · loop  (+ scaffold, ultra-think, code-review, update-docs)
├── agents/ccsk/     13 specialists (planner, senior-fullstack-engineer, code-reviewer, …)
├── rules/           primary-workflows · orchestration-protocols · common-rules · …
└── skills/          optimization-loop + 9 domain skills
.ccsk/               plans · prompt templates
docs/                documentation skeleton
```

---

## Deliberately excluded

To stay lean and maintainable, this kit intentionally leaves out lifecycle **hooks** / Node scripts, multi-modal tooling, sequential-thinking scaffolds, coding-level output styles, and large catalog sprawl. It's a focused original — not a stripped-down everything-kit.

---

## Links & license

- Installer CLI → [`@ccsk/cli`](https://github.com/ccsk-org/ccsk-cli)
- License → **MIT**
