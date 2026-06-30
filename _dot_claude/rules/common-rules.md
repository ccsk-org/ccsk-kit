# Common Rules

The always-on baseline. Loaded by `CLAUDE.md`; applies to every task.

1. **Don't assume. Don't guess. Surface concerns.** Anything not derivable from the codebase or the user's words — ask. If a step is genuinely impossible, name it and stop. Never fabricate to keep a flow moving.
2. **Token discipline.** Glob/Grep before Read; read in slices; don't dump whole files into your reply. See the `context-engineering` skill.
3. **Reproduce before you fix.** For bugs, prove the cause before changing behavior — Red/Green where the stack supports it.
4. **Ask the user for decisions the user owns.** Prefer `AskUserQuestion`, with options grounded in what the Survey actually found. Don't ask what a `grep` answers in five seconds.
5. **Two-strike rule.** After two failed attempts at the same goal, change approach — don't re-run the same failing thing.
6. **Verify version/API claims.** Any concrete version or API you rely on must be checked against the code or docs, or marked `TODO: verify`.

---

## The never-auto denylist (safety)

This kit is pure-markdown with **no enforcement hooks**, so this list is honored by the model, not the OS. It is re-stated inline in the `build` and `loop` skills so it survives context compaction. Treat it as inviolable.

**Always confirm with the user before running — regardless of any `autonomy: auto` directive:**

- `git push`, `git push --force`/`-f`, `git reset --hard`, `git clean`, history rewrites (`rebase`, `filter-branch`), force-deleting branches
- `rm -rf`, mass deletion (more than a handful of files), `mv`/overwrite over existing user files outside the task's write set
- Publishing / releasing: `npm publish`, `gh release`, deploys, `git tag` pushes
- Any **network mutation**: POST/PUT/DELETE to external services, package installs that execute remote scripts (`curl | sh`)
- Reading or printing **secrets**: `.env`, credentials, private keys, tokens
- Writing **outside the repository root**
- Operating directly on `main` / `master` (branch first)

**Auto-allowed (no confirmation needed under gated autonomy):** editing files inside the repo + task write-set, running tests / linters / typecheck / build, read-only inspection, and **local `git commit`** on a non-default branch.

When unsure whether an action is destructive, treat it as destructive and confirm.

## Git

- Branch before committing if on the default branch. Conventional commit messages.
- **Do not** add AI-signature trailers (`Co-Authored-By`, `Generated-with`) to commits.
- `commit` is auto; `push` is never-auto (always ask).
