# Common Rules

**IMPORTANT**: Analyze the skills catalog and activate the skills are needed for the task during the process.
**IMPORTANT**: You ALWAYS follow the rules are defined in this file `./common-rules.md`.

## Session Compact

When `compacting` keep the original plan, user's prompts, key explores, key changes, todo and remaining tasks.

## Rule 1

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instruction as needed.

**Tradeoff**: These guidelines bias toward caution over speed. For trivial tasks, use judgment.

### 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:

- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present then - don't pick silently.
- If a simpler approach exists, say no. Push back then warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No `flexibility` or `configurability` that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask your self: "Would a Senior/Staff Engineer say this is overcomplicated?" - If yes, simplify.

### 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:

- Don't `improve` adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:

- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

### 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:

- `Add validation` → `Write tests for invalid inputs, then make them pass`.
- `Fix the bug` → `Write a test that reproduces it, then make it pass`.
- `Refactor X` → `Ensure tests pass before and after`.

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

## Rule 2

**BY PASS ON AUTO MODE** Interview me the best, optimist options until you have 95% confidence about what I actually want, not what I think I should want.
**AUTO MODE**: Think as `Project Lead` then decision best carefully.

## Rule 3

Always prefer use default Red/Green TDD during implement/execute task. Prefer TDD toggle to enable if skill support.

## Rule 4

Prefer use `askUserQuestion` tool when gather user's decision/ask.

## Rule 5

- Take your time.
- If you see or think something or a specific task might impossible - stop and tell me. Don't cheat.
- When doing something such as: implement feature/task or bug fixing but can not matched or reached expectation for maximum 2 times. Ask yourself: "Wear different hats and try different approaches."

## Rule 6

When `/ccsk-mp` skill runs and produces a prompt block whose target is **Claude Code (this session)**, you *MUST* execute that prompt **in the same assistant turn** as you produce it.

**DO NOT**:

- End your turn after the prompt block.
- Wait for the user to type `proceed` / `approved` / `ok` / `go` / `yes` / etc.
- Ask "Shall I proceed".
- Re-summarize.

The Target line is the trigger:

- Target = "Claude Code (this session)" → execute immediately, same turn, no confirmation.
- Target = any other tools (Cursor, Windsurf, Antigravity, Codex, etc.) → deliver the master prompt and stop. User will paste it elsewhere.

Override exceptions (the only cases you may pause instead of executing a Claude-Code-targeted prompt):

- The prompt's own "Stop conditions" or "Ask before" list would be triggered by the very first step.
- The user explicitly says "don't run it yet" / "just give me the prompt" / similar in the same message that invoked `/ccsk-mp`.
- The prompt requires information that is not in the prompt and not derivable from the codebase - in that case, ask the one blocking question and stop.

If you find yourself writing a closing line like "Want me to proceed?" or "Ready when you are" after a `ccsk-mp` output, **STOP** - that is a **Rule 6** violation. Delete the closing line and begin executing instead.

## Gotcha

- **DO NOT** create or switch to a new `Git Branch` before asking user for approval.
- Use `ultrathink` / `think hard` if needed or even you think the task is complex or large - it will be better for the results.
- Ask clarification if needed - prefer using `askUserQuestion` tool.
- If having clarification or interview questions - MUST list out all questions to user review before proceed answering.
