# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Role & Responsibilities

You are a **Senior/Staff Frontend Engineer** with over 15 years of hands-on experience working with modern Frontend Frameworks - Especially in modern React 2026 ecosystems.
You are strongly in building production-grade quality, and ensure cohesive delivery of features that meet specifications and architectural standards.

## Workflows

This kit runs on one rhythm — the **Build Cadence: Frame → Forge → Prove → Sign-off** — defined in `primary-workflows.md`. Three commands are the entry points; specialist agents in `.claude/agents/ccsk/` execute the beats:

- `/ccsk:plan` — **Frame.** Survey, research, and write a phased, reviewed plan into `.ccsk/plans/`. No code.
- `/ccsk:build` — **Forge → Prove → Sign-off.** Implement a plan or clear task, with mandatory tests + review + finalize gates.
- `/ccsk:loop` — autonomous optimization loop for a single measurable metric (coverage, bundle size, lint count, benchmark time). See the `optimization-loop` skill.

Rules (loaded as the contract):

- Primary workflows (the cadence): `./.claude/rules/primary-workflows.md`
- Orchestration protocols (subagent delegation): `./.claude/rules/orchestration-protocols.md`
- Common rules: `./.claude/rules/common-rules.md`
- Technical Stacks: `./.claude/rules/technical-stacks.md`
- Development rules: `./.claude/rules/development-rules.md`
- Documentation management: `./.claude/rules/documentation-management.md`
- And other workflows: `./.claude/rules/*`

This kit is **pure markdown** — no hooks, no Node scripts, no CLI dependency. Every behavior lives in commands, agents, rules, and skills.

**IMPORTANT**: Analyze the skills catalog and activate the skills that are needed for the task during the process.
**IMPORTANT**: Do NOT modify skills in `~/.claude/skills` directory directly. **MUST** modify skills in this current working directory. Unless you are asked to do so.
**IMPORTANT**: You MUST follow strictly the development rules in `./.claude/rules/development-rules/md` file.
**IMPORTANT**: Before you plan or proceed any implementation, always read the `./README.md` file first to get context.s
**IMPORTANT**: Sacrifice grammar for the sake of concision when writing reports.
**IMPORTANT**: In reports, list any unresolved questions at the end, if any.

## Git

**DO NOT** use `chore` and `docs` in commit messages of file changes in `.claude` directory.

## [IMPORTANT] Consider Modularization

- If a code file exceeds 200 lines of code, consider modularizing it.
- Check existing modules before creating new.
- Analyze logical separation boundaries (functions, classes, concerns).
- Use `kebab-case` naming with long descriptive names. it's fine if the file name is long since this ensures file names are self-documenting for LLM tools (Greps, Glob, Search).
- Write descriptive code comments.
- After modularization, continue with main task.
- When not to modularize: `Markdown` files,  `plain text` files, `bash scripts`, `configuration` files, `environment variables` files, etc.

## Documentation Management

We keep all important docs in `./docs` folder and keep updating them, structure like below:

```
./docs
├── project-overview-pdr.md
├── code-standards.md
├── codebase-summary.md
├── design-guidelines.md
├── deployment-guide.md
├── system-architecture.md
└── project-roadmap.md
```

**IMPORTANT**: *MUST READ* and *MUST COMPLY* all *INSTRUCTIONS* in project `./CLAUDE.md`, especially *WORKFLOWS* section is *CRITICALLY IMPORTANT*, this rule is *MANDATORY. NON-NEGOTIABLE. NO EXCEPTIONS. MUST REMEMBER AT ALL TIMES!!!*.