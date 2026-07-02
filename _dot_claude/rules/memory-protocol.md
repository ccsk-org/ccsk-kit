# Memory Protocol

The kit's self-learning loop. It has **no hooks** — nothing auto-fires — so these conventions are honored by the model, made non-optional by being wired into the cadence gates (`primary-workflows.md`). The point: work **compounds** across sessions instead of starting cold each time.

All process memory lives under `./.ccsk/` and is **gitignored by default** (local-only). Durability rests on the CLI's uninstall backup; cross-machine/team sharing is an explicit opt-in the end-user enables in `.gitignore`. Because targets live on disk locally, pointers resolve locally even when uncommitted.

## Layout

```
.ccsk/
├── MEMORY.md                       # durable facts — POINTERS, capped (see below)
├── plans/<YYMMDD-HHMM-slug>/
│   ├── 01-PLAN.md                  # THE authoritative ledger ([ ]/[x] + status). Single source of truth.
│   ├── 01-PROMPT.md 01-CLARIFY.md 01-PHASE-NN-*.md 01-UI_UX.md
│   ├── STATUS.md                   # write-ahead pointer (active plan/phase/next-action)
│   └── reports/                    # subagent reports, reviewer verdicts, research
├── journals/<YYMMDD>-<slug>.md     # append-only session lessons
├── retros/<YYMMDD>-<slug>.md       # periodic git-metrics retrospective; owns MEMORY compaction
├── adrs/<NNNN>-<slug>.md           # architecture decision records
└── milestones/<vN>/MILESTONE.md    # goal + observable exit criteria + progress
```

**Always run `date +%y%m%d-%H%M` for timestamps — never infer one.** Fabricated dates mis-sort plan dirs and break rehydrate's checks. Paths/naming are owned by the `project-organization` skill.

## The ledger (single source of truth)

- `01-PLAN.md` holds phase status as `[ ]`/`[x]` checkboxes + a `status:` field. **Phase files hold work detail only — never duplicate checkbox state into them.** (Duplicated status is the corruption vector; one source removes it.)
- **Hydrate** (session start, via `ccsk-rehydrate`): read the ledger; each open `[ ]` becomes a working task (`TaskCreate`), skip `[x]`.
- **Work:** update tasks live.
- **Sync-back** (end of beat): flip completed `[ ]`→`[x]`, update the `status:` and progress %. Flip a box **only** for work actually present in the tree.

## STATUS.md — write-ahead for crash/compaction recovery

At the **start of each phase**, write one short block to the active plan's `STATUS.md`:

```
active-plan: .ccsk/plans/<dir>
active-phase: <NN — name>
next-action: <one line>
updated: <date>
```

It's cheap and habitual; it preserves *position* if the session dies mid-beat.

## Rehydrate (pull-based; auto-activates; precondition of build)

`ccsk-rehydrate` runs at session start / continuation and **before any `/ccsk:execute`**:

1. Read `STATUS.md` of the most recent in-progress plan **first**.
2. Read `MEMORY.md` and **dereference its top-N relevant pointers** (open the ADRs/journals it points to — listing them is not reading them).
3. **Reconcile, don't trust:** compare the ledger against the actual code/tests. If a box says done but its files are absent or its tests fail → mark suspect and re-verify. Self-check for conflict markers (`<<<<<<<`), parseable dates, and progress %∈[0,100]; repair or flag before proceeding.

## Journals — continuous, append-only

Write lessons **during** work, not batched at the end (a crash then loses one line, not a whole beat). Each entry: what happened, the decision + why, what hurt, next step. Append to today's `journals/<date>-<slug>.md`; never edit past entries. Authored by `ccsk:journal-writer` / the `journal` skill.

## ADRs & milestones

- **ADR** on any real, non-obvious decision (trade-off chosen, alternative rejected): `adrs/<NNNN>-<slug>.md` — context · decision · consequences. Add a one-line pointer to `MEMORY.md`.
- **Milestone** for multi-plan goals (**opt-in**): `milestones/<vN>/MILESTONE.md` — goal + observable exit criteria + rolling progress, sequential `vN`. **Lifecycle lives in the cadence — there is no `/ccsk:milestone` command:** `/ccsk:plan` **creates/attaches** it (only when work spans multiple plans or the user asks), linking plans via a `milestone: vN` field in `01-PLAN.md` + `active-milestone: vN` in `STATUS.md`; `/ccsk:execute` **advances** it at Sign-off; `/ccsk:retro` **closes** it. View milestone → plans → phases with `/ccsk:status`.

## MEMORY.md — bounded, pointer-based

- **≤ ~200 lines.** Entries are **pointers**, not prose: `- <fact> → adr-0007 / journal 260630`. Sections: *Conventions · Decision index · What hurt*.
- **Cap enforced on every write:** before appending, if near the cap, merge/prune or push detail down into an ADR/journal and keep only the pointer here.
- `retro` owns periodic compaction/eviction: fold stale entries, archive superseded decisions.

## Sign-off-gated writes (what makes this non-optional)

Per `primary-workflows.md`, a task cannot be declared **DONE** unless the Sign-off block cites the **journal entry + MEMORY pointer written this session** (plus an ADR when a decision was made). The completion the agent is driving toward is unreachable without the memory write — that is the pure-markdown substitute for a write-back hook.

**Honest residual:** if a session is abandoned before Sign-off, that beat's learning is lost (STATUS still preserves position). Accepted; documented.
