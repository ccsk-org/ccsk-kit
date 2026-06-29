---
name: security-review
description: A practical security-audit checklist — injection, authentication/authorization, secret handling and masking, input validation, dependency CVEs, and common web vulnerabilities. Use when reviewing security-sensitive code or performing a security audit.
---

# Security Review

A working checklist for auditing code for exploitable weaknesses. Findings over vibes — cite the file and the exploit path.

## When this applies

- Reviewing auth, data-access, file/upload, deserialization, or any user-input handling.
- Doing a deliberate security pass before a release or on a sensitive change.

| When NOT to use | Reach for instead |
|---|---|
| General correctness/quality review | `code-review` skill / `Code Reviewer` agent |
| Building the API itself | `../backend-development/SKILL.md` |
| Release/secret-rotation mechanics | `../deploy/SKILL.md` |

## Core guidance

**Injection.** All queries parameterized — never concatenate input into SQL/NoSQL/shell/LDAP. Avoid `eval` and dynamic command execution; if unavoidable, allowlist. Escape/encode output by context (HTML, attribute, URL, JS) to stop XSS. Set a restrictive Content-Security-Policy.

**Authentication.** Strong password hashing (bcrypt/argon2, never plain/MD5/SHA1). Session tokens random and rotated on privilege change; cookies `HttpOnly` + `Secure` + `SameSite`. Verify JWT signature *and* expiry/audience — never trust unverified claims. Rate-limit and lock out on credential endpoints.

**Authorization.** Check on every request at the server, per-resource — never rely on a hidden UI control. Enforce object-level ownership to stop IDOR (`/orders/123` must verify the caller owns 123). Default deny; least privilege.

**Secrets.** No secrets in source, logs, error responses, or client bundles. Load from env/secret manager. Mask in any output (`****`). Treat a committed secret as compromised — rotate, don't just delete.

**Input validation.** Validate type, length, range, and format at the trust boundary; allowlist over denylist. Validate file uploads (type, size, stored outside webroot). Guard against SSRF on server-side fetches (block internal ranges/metadata endpoints). Prevent path traversal on any file path built from input.

**Dependencies.** Audit for known CVEs (`npm audit`/`pip-audit`/`osv`). Pin and update; remove unused packages. Watch for typosquats and unmaintained transitive deps.

**Common web vulns.** CSRF tokens (or SameSite) on state-changing requests. Security headers (HSTS, X-Content-Type-Options, frame-ancestors). Don't leak stack traces or internal details in errors. Avoid insecure deserialization of untrusted data.

## Checklist

- [ ] No injection: parameterized queries, no `eval`/dynamic shell, context-correct output encoding.
- [ ] Strong password hashing; session/JWT verified and hardened.
- [ ] Server-side, per-resource authz; IDOR/object-ownership enforced; default deny.
- [ ] No secrets in code/logs/responses/bundles; masked in output; rotation noted.
- [ ] Inputs allowlist-validated; uploads, SSRF, and path traversal guarded.
- [ ] Dependencies scanned for CVEs; unused/risky packages removed.
- [ ] CSRF, security headers, and error-leak protections in place.

## References

- `../backend-development/SKILL.md` — validation and error-handling foundations.
- `../databases/SKILL.md` — parameterization and data-exposure.
- `../../rules/development-rules.md` — security/error-handling expectations.
