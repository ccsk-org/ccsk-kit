---
name: security-review
description: Audit changes or a codebase area for security issues — secrets, injection, authz gaps, unsafe input handling, and dependency risks — with a STRIDE/OWASP lens and redacted reporting. Use before shipping security-sensitive work or on request.
when_to_use: Invoke for security-sensitive changes or audits. Triggers — "security review", "is this safe", auth/payments/data/file-upload/deserialization work, handling user input or secrets.
allowed-tools: Read, Glob, Grep, Bash, Task
---

# /ccsk:security-review — STRIDE / OWASP pass

> A focused security lens for a diff or an area. Declares its scope, finds issues by category, reports with redaction. Read-only.

Contract: `.claude/rules/common-rules.md` (never print secrets), `.claude/rules/orchestration-protocols.md`.

## Scope declaration (first)
State exactly what is in scope (files/paths/diff) and out of scope. Security findings escalate to a human — never auto-"fix and move on" a security issue silently.

## Checklist (STRIDE / OWASP-flavored)
- **Secrets:** hardcoded keys/tokens/passwords; `.env` committed; secrets in logs. (Report locations, never the values.)
- **Injection:** SQL/NoSQL/command/template injection; unparameterized queries; unescaped output (XSS).
- **AuthN/AuthZ:** missing/incorrect authorization checks, IDOR, privilege escalation, broken session handling.
- **Input handling:** unvalidated input, unsafe deserialization, path traversal, SSRF, unrestricted upload.
- **Dependencies:** known-vulnerable or unpinned deps; `curl | sh` installs; transitive risk.
- **Crypto / data:** weak/auto-rolled crypto, PII exposure, missing encryption at rest/in transit.

For depth, delegate to a reviewer with a security lens (`ccsk:code-reviewer`). Run `git diff` for change-scoped reviews.

## Reporting
Findings ranked by severity: `file:line` · category · impact · remediation. **Redact** any secret/credential value. A high/critical finding is a HARD-STOP for Sign-off — surface it and the options; do not ship around it.

## Output
The scope, ranked findings (redacted), and a clear pass / must-fix verdict.
