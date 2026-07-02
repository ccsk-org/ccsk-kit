# Announce style — how ccsk stages & agents highlight themselves

Single source of truth for the **in-session** highlight banners every ccsk skill
and agent emits on activation. The goal is *scannability without noise*: a user
should see, at a glance, which cadence beat or specialist just took over.

Companion surface: the `ccsk init` CLI prints a matching rounded-box "installed"
summary in the terminal (that one is picocolors-rendered; this one is markdown).

## The two forms

**Boxed banner** — for a **stage/workflow entry** or an **agent handoff**. Emit a
fenced code block (the fence forces monospace so the box aligns) containing a
rounded box. Target ~58 columns; exact width isn't critical in-session — keep it
one tidy box, two content lines max:

```
╭─ 🔨 FORGE ─ executor ───────────────────────────────────╮
│  implement plan 260701-auth · phase 02                  │
╰─────────────────────────────────────────────────────────╯
```

**Inline line** — for an **advisory skill or sub-step**. One blockquote line, no
box (this is what keeps a long session quiet):

```
> 🔬 **Research** · researcher — surveying the picocolors gradient API
```

**Rules of thumb:** box the 4 cadence beats and every agent handoff; inline
everything advisory. If two boxes would land back-to-back, collapse the second to
an inline line. **Glue skills stay silent** (see below).

## Glyph vocabulary (fixed — one per component, no drift)

Cadence beats (Tier 1):

| Beat | Glyph |
|------|-------|
| Frame | 🧭 |
| Forge | 🔨 |
| Prove | 🧪 |
| Sign-off | ✅ |

Cross-cutting roles (Tier 2):

| Role | Glyph | Role | Glyph |
|------|-------|------|-------|
| ideate | 💡 | docs | 📄 |
| research | 🔬 | journal/retro | 📓 |
| review | 🔍 | git | 🔀 |
| security | 🛡️ | loop | ⟳ |
| debug | 🐛 | simplify | ✂️ |
| design | 🎨 | guide | 📖 |
| status | 📊 | | |

## Component → form + glyph

**Skills — boxed (stage entry):** `plan` 🧭 · `build` 🔨 · `loop` ⟳ · `debug` 🐛
· `code-review` 🔍 · `security-review` 🛡️ · `research` 🔬 · `rehydrate` 🧭 · `adopt` 🧭

**Skills — inline (advisory):** `brainstorm` 💡 · `docs-sync` 📄 · `journal` 📓
· `retro` 📓 · `guide` 📖 · `status` 📊

**Skills — silent (glue, `user-invocable: false`):** `project-organization` ·
`context-engineering` · `skill-creator` — these run as background support; no banner.

**Agents — all boxed (a handoff is always a boxed transition):**
`planner` 🧭 · `executor` 🔨 · `tester` 🧪 · `code-reviewer` 🔍 · `debugger` 🐛 ·
`researcher` 🔬 · `brainstormer` 💡 · `designer` 🎨 · `docs-manager` 📄 ·
`journal-writer` 📓 · `git-manager` 🔀 · `code-simplifier` ✂️

## Box construction (for the CLI + anyone reproducing it exactly)

- Rounded corners `╭ ╮ ╰ ╯`, horizontal `─`, vertical `│`.
- **Emoji occupy 2 monospace columns** — budget 2 (not 1) per emoji when padding,
  or the right border drifts. This is the single rule that keeps boxes square.
- Title line: `╭─ {emoji} {WORD} ─ {trigger} ` + fill `─` to width + `╮`.

**Design trade-off (recorded here as the SSOT):** boxed banners live inside
fenced code blocks because that is the only way to force monospace so the box
aligns in a terminal-rendered markdown view — but a fence disables markdown
bold/color and adds vertical height. That is why only beat transitions and agent
handoffs are boxed; every advisory sub-step degrades to the lighter inline
blockquote. The alternative (inline-only, no true box anywhere) was rejected for
beat transitions because they are the moments a user most needs to see the shift.
