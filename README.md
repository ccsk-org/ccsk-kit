<div align="center">

# ccsk-kit

**Build software in one rhythm — and let it learn as it goes.**

`Frame → Forge → Prove → Sign-off`

<sub>**Plugin · `/ccsk:` commands · 15 Skills · 12 Agents · 7 Rules · self-learning memory**</sub>

![MIT](https://img.shields.io/badge/license-MIT-1A1A1A)
![Claude Code](https://img.shields.io/badge/Claude%20Code-plugin-D97757)
![pure markdown](https://img.shields.io/badge/pure-markdown-3F9B6B)
![no hooks](https://img.shields.io/badge/no-hooks-6B7280)
![no multi-model](https://img.shields.io/badge/no-multi--model-6B7280)

> A lean, **pure-markdown** Claude Code kit shipped as a **plugin**: one Build Cadence, `/ccsk:` workflow commands, a focused specialist roster, an autonomous optimization loop, and a self-learning memory loop that compounds across sessions. No hooks, no Node scripts, no multi-model machinery — nothing to break silently.

</div>

---

## Highlights

- ✅ **One rhythm for everything** — every task follows the **Build Cadence**, so you always know the next move.
- 🧠 **Self-learning, pull-based** — work persists to `.ccsk/` (plan ledger, journals, retros, ADRs, milestones, `MEMORY.md`); `/ccsk:rehydrate` reads it back and reconciles against the code, so sessions compound instead of starting cold. No hooks required.
- ♻️ **Approve once, then let it run** — gated autonomy self-drives the cadence and pauses only at the human-owned gates (clarify · destructive ops · push). The `/ccsk:loop` improves a metric on its own, keeping only what provably helps.
- 🔒 **Verifiable Sign-off** — a task can't be "done" without test evidence + a **separate-reviewer** verdict + the memory write-back. Safety lives in a never-auto denylist, inlined where it acts.
- 👥 **12 specialist agents** — planner, builder, reviewer, tester, debugger, designer, and more — each a narrow remit, least-privilege tools, model-agnostic.
- 🧩 **A real delegation contract** — every subagent gets a complete packet and returns a typed status; file-ownership rules keep parallel work collision-free.
- 🪶 **Pure markdown** — behavior lives in skills, agents, and rules. Portable, transparent, diffable.

---

## How it works

### The Build Cadence

Every non-trivial task moves through four beats. Enter at the one that fits — the `/ccsk:` commands are the doors.

| Situation | Enter at | Command |
|---|---|---|
| Scope unclear, multi-phase, or risky | **Frame** | `/ccsk:plan` |
| A plan exists, or scope is clear | **Forge** | `/ccsk:build` |
| Improving one measurable metric repeatedly | **Loop** | `/ccsk:loop` |
| Resuming work / after compaction | (pre-flight) | `/ccsk:rehydrate` |
| Need options before committing | pre-Frame | `/ccsk:brainstorm` |

### The self-learning loop

```
rehydrate → work → journal (continuously) → Sign-off (gated on the memory write) → retro (compacts memory)
        ↑                                                                                    │
        └──────────────────────────── next session ─────────────────────────────────────────┘
```

Memory is plain markdown under `.ccsk/` (gitignored by default — local-only; opt in to commit for team sharing). `MEMORY.md` stays small (capped, pointer-based); journals are append-only; the plan ledger (`01-PLAN.md`) is the single source of truth for status.

### The autonomous loop ⟳

Point `/ccsk:loop` at a goal scored by **one number from a shell command** — coverage, bundle size, lint count, benchmark time. It makes one atomic change, commits, measures, and keeps it only if it beat the baseline; otherwise it reverts. Caps prevent runaway; it never pushes.

```text
/ccsk:loop
Goal: Raise statement coverage in src/parser toward 80%
Scope: src/parser/**/*.ts | tests/parser/**/*.test.ts
Verify: vitest run --coverage ... (prints one number)
Guard: tsc --noEmit && vitest run --silent
Direction: higher
Min-Delta: 0.5
```

---

## Get started

Install with [`@ccsk/cli`](https://github.com/ccsk-org/ccsk-cli) — it installs the plugin **and** materializes the project contract (CLAUDE.md, rules, docs, `.ccsk/`) and wires optional tools (RTK, context-mode, Serena, ADD):

```bash
npm i -g @ccsk/cli
ccsk init
```

Or add the plugin directly in Claude Code:

```text
/plugin marketplace add ccsk-org/ccsk-kit
/plugin install ccsk@ccsk-kit
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
.claude-plugin/marketplace.json   # the ccsk-kit marketplace
plugins/ccsk/                     # the plugin → /ccsk: commands
├── skills/    plan · build · loop · rehydrate · brainstorm · research · debug ·
│              code-review · security-review · journal · retro · docs-sync
│              (+ glue: project-organization · context-engineering · skill-creator)
├── agents/    planner · builder · code-reviewer · code-simplifier · tester · debugger ·
│              researcher · brainstormer · designer · docs-manager · journal-writer · git-manager
└── output-styles/  (ccsk-explain, materialized to the project)
_dot_claude/   rules/ (the 7-rule contract) + output-styles/  → materialized to .claude/
_dot_ccsk/     MEMORY.md · plans/ · journals/ · retros/ · adrs/ · milestones/ · templates/
docs/          evergreen documentation skeleton
```

The colon commands (`/ccsk:plan`) require the **plugin** — that's why the kit ships as one. Rules, docs, and `.ccsk/` are materialized into your project by the CLI (a plugin can't own those).

---

## Design choices

- **Pure markdown, no hooks.** Enforcement (gates, denylist) is honored by the model and wired into the cadence + inlined at point-of-action, not by OS hooks.
- **No multi-model.** Agents carry no `model:` and inherit your session model (set it before `/ccsk:loop`).
- **Single-subagent delegation.** One specialist at a time; parallel only on disjoint write-sets. No Agent-Teams fan-out.
- **Memory local by default.** `.ccsk/` is gitignored; opt in to commit for team/cross-machine learning.

---

## Links & license

- Installer CLI → [`@ccsk/cli`](https://github.com/ccsk-org/ccsk-cli)
- License → **MIT**
