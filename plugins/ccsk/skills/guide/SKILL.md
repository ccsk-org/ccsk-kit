---
name: guide
description: Explain how to use ccsk in Claude Code — the Build Cadence, the entry-point commands, when to use which, with worked end-to-end examples. Use when a user asks "how do I use ccsk", "what does /ccsk:build do", "where do I start", or wants a walkthrough or use cases.
when_to_use: Invoke for onboarding or usage questions about the kit. Triggers — "how to use ccsk", "getting started", "which command", "show me an example", "explain the workflow".
argument-hint: "[optional topic: cadence|plan|build|loop|memory|agents]"
allowed-tools: Read, Glob, Grep
user-invocable: true
---

# /ccsk:guide — how to use ccsk

> The kit's own usage manual. Read this when you (or the user) need to know which `/ccsk:` door to open, what each beat produces, and how the memory loop compounds. Grounded in `.claude/rules/primary-workflows.md`, `.claude/rules/memory-protocol.md`, `.claude/rules/orchestration-protocols.md`.

## What ccsk is
A **pure-markdown** Claude Code plugin that runs all work on one rhythm — the **Build Cadence** — backed by a self-learning memory loop under `.ccsk/`. No hooks, no scripts, no multi-model. Behavior lives in skills, agents, and always-on rules. Sessions **compound**: what you learn is written back and rehydrated next time.

## The mental model — one rhythm
```
Frame  →  Forge  →  Prove  →  Sign-off
```
- **Frame** — understand before touching: rehydrate memory, survey the code, clarify scope. (`/ccsk:plan`)
- **Forge** — implement against an agreed design, one slice at a time. (`/ccsk:build`)
- **Prove** — focused tests; show it side-effect free. (inside `/ccsk:build`)
- **Sign-off** — separate-reviewer verdict + evidence + memory write-back. (inside `/ccsk:build`)

Enter at the beat that fits. The `/ccsk:` commands are the doors; specialist agents execute the beats.

## Pick your door
| Your situation | Enter at | Command |
|---|---|---|
| Resuming work / after compaction / "where were we" | pre-flight | `/ccsk:rehydrate` |
| Scope unclear, multi-phase, or risky | **Frame** | `/ccsk:plan` |
| Plan exists, or scope is clear and bounded | **Forge** | `/ccsk:build` |
| Quick, obvious bugfix or scoped edit | **Forge** | `/ccsk:build` |
| Drive ONE measurable metric up/down repeatedly | **Loop** | `/ccsk:loop` |
| Need options before committing to a design | pre-Frame | `/ccsk:brainstorm` |
| Verify external facts / a library's real API | within Frame | `/ccsk:research` |
| Something is broken, cause unknown | within Forge | `/ccsk:debug` |

**Golden path:** `/ccsk:rehydrate` → `/ccsk:plan` → `/ccsk:build`. For a clear small change, skip planning and go straight to `/ccsk:build` (it rehydrates for you).

## Route to depth (load on demand)
- **Load `references/walkthroughs.md`** when you want full worked examples — new feature, quick bugfix, optimization run, resume-after-compaction — with the actual commands and a real Sign-off block.
- **Load `references/commands.md`** for the per-command reference: what each entry point and capability skill does, when to reach for it, what it writes.
- **Load `references/memory-and-agents.md`** for the `.ccsk/` self-learning loop and the 12-agent roster + delegation contract.
- **Load `references/faq.md`** for common pitfalls and how to avoid them.

If `$ARGUMENTS` names a topic, route straight there: `cadence|plan|build` → `references/commands.md` + `references/walkthroughs.md`; `loop` → `references/commands.md` (loop section); `memory|agents` → `references/memory-and-agents.md`.

## Agent roster (cheat-sheet)
12 specialists, each a narrow remit + least-privilege tools, invoked as `ccsk:<name>`:

| Agent | Does | Agent | Does |
|---|---|---|---|
| `ccsk:planner` | architecture + phase breakdown | `ccsk:executor` | **implements** the code |
| `ccsk:researcher` | cited external findings | `ccsk:tester` | writes/runs tests |
| `ccsk:brainstormer` | weighs options | `ccsk:debugger` | root-cause a defect |
| `ccsk:designer` | UI/UX specs | `ccsk:code-reviewer` | **separate** Sign-off verdict |
| `ccsk:code-simplifier` | reduce/clean | `ccsk:docs-manager` | sync `./docs` |
| `ccsk:journal-writer` | append lessons | `ccsk:git-manager` | branch/commit hygiene |

`ccsk:executor` writes the code; `ccsk:code-reviewer` (a **different** subagent) attests it. The implementer never reviews its own work.

## Non-negotiables (so you don't fight the kit)
- **Rehydrate before building.** `/ccsk:build` reads memory and reconciles the ledger against real code first.
- **Autonomy is gated.** It self-drives the cadence and pauses only at: the clarify gate, the never-auto denylist (destructive/outward ops), and `push`. `commit` is auto on a feature branch.
- **Sign-off needs evidence.** No DONE without: test cmd+exit+output, a separate `ccsk:code-reviewer` verdict, `git diff --stat`, and a journal entry + MEMORY pointer written this session.

## Top anti-patterns
- Calling `/ccsk:build` cold without rehydrating, then trusting stale checkboxes.
- Declaring DONE without the Sign-off evidence block.
- Pushing without explicit approval (always confirm).
- Over-planning a one-line edit — use judgment; trivial work skips the ceremony.
- Inventing a new pattern when an existing helper/convention already fits.
