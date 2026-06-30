---
name: skill-creator
description: Author a new ccsk skill that auto-activates reliably — write a scored description, choose user-invocable vs glue, and follow the progressive-disclosure layout. Auto-activates when the user wants to add, create, or improve a skill.
when_to_use: Reference when adding or improving a skill. Triggers — "create a skill", "add a skill for X", "this skill doesn't trigger", "improve this skill's description".
user-invocable: false
allowed-tools: Read, Glob, Grep, Write, Edit
---

# skill-creator — grow the kit, correctly

> So the kit can extend itself. A skill lives or dies by its `description` (the auto-activation trigger) and its layout. This is ccsk's own authoring contract — **do not** validate against other kits' schemas.

## Layout (progressive disclosure)
```
plugins/ccsk/skills/<name>/
├── SKILL.md          # < ~120 lines — the router: what + when + the steps
└── references/       # optional deep content, loaded on demand ("Load: references/x.md when Y")
```
Keep `SKILL.md` short; push depth into `references/`. Files referenced but never loaded cost nothing until needed.

## Frontmatter
```yaml
---
name: <kebab>                 # display label; the slash name comes from the dir + plugin namespace (/ccsk:<dir>)
description: <scored — see below>   # THE auto-activation trigger
when_to_use: <one line + extra trigger keywords>   # appended to description for matching
user-invocable: true|false   # false = glue: auto-activates, hidden from the / menu
allowed-tools: <least privilege>
argument-hint: "[...]"        # for user-invocable command skills
---
```

## Description scoring (aim high)
A good description is `{ActionVerb} {what}. Use when/for {2–4 concrete triggers, including literal user phrasings}.` Self-check:
- starts with an action verb; says **what** it does AND **when** to use it;
- contains a `Use when`/`Use for` clause with 2–4 distinct triggers (quote real user phrasings);
- 80–300 chars; not confusable with a sibling skill (if two descriptions overlap heavily, disambiguate);
- third person ("Investigate…", not "I investigate").

## Rules
- One skill = one job. If it needs "and", consider splitting.
- Glue/passive knowledge → `user-invocable: false`. User-facing command → `true` + `argument-hint`.
- Reference rules with project-root-relative paths (`.claude/rules/x.md`), never plugin-relative `../../`.
- After authoring, sanity-check with `claude plugin validate plugins/ccsk --strict`.

## Output
The new skill files + a one-line note on the trigger you optimized the description for.
