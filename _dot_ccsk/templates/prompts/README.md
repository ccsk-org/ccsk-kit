# Prompt templates

Reusable prompt scaffolds you can paste into `/ccsk:plan` or `/ccsk:execute` to give the kit a complete, well-shaped brief for common task types. They encode the Clarify-gate questions up front so the cadence has fewer gaps to stop at.

Suggested scaffolds (add as your project needs them):

- `ui-ux.md` — a frontend feature: screens, states, data, a11y, design-system reuse.
- `api-integration.md` — integrating an external API: auth, endpoints, error/retry, types.
- `bugfix.md` — a defect: repro steps, expected vs actual, scope, acceptance.

Each scaffold should fill in: **goal · acceptance criteria · scope/boundary · constraints · touchpoints** — the five things the Frame clarify-gate checks (`primary-workflows`).
