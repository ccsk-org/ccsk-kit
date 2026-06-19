# Project Documentation Management

---

## Roadmap & Changelog Maintenance

- **Project Roadmap** (`./docs/development-roadmap.md`): Living document tracking project phases, milestones, and progresses.
- **Project Changelog** (`./docs/project-changelog.md`): Detailed record of all significant changes, features, and fixes.
- **System Architecture** (`./docs/system-architecture.md`): Detailed record of all significant changes, features, and fixes.
- **Code Standards** (`./docs/code-standards.md`): Detailed record of all significant changes, features, and fixes.

## Autonomic Updates Required

- **After Feature Implementation**: Update roadmap progress status and changelog entries.
- **After Major Milestones**: Review and adjust roadmap phases, update success metrics.
- **After Bug Fixes**: Document fixes in changelog with severity and impact.
- **After Security Updates**: Record security improvements and version updates.
- **Weekly Reviews**: Update progress percentages and milestone statuses.

## Documentation Triggers

You *MUST* update these documents when:

- A development phase status changes (e.g., from "In Progress" to "Complete").
- Major features are implemented or released.
- Significant bugs are resolved or security patches applied.
- Project timeline or scope adjustments are made.
- External dependencies or breaking changes occur.

## Update Protocol

1. **Before Updates**: Always read current roadmap and changelog status.
2. **During Updates**: Maintain version consistency and proper formatting.
3. **After Updates**: Verify links, dates, and cross-references are accurate.
4. **Quality Check**: Ensure updates align with actual implementation progress.

## Plan

### Plan Approach

You *MUST* follow the instructions:

**Before Starting Session**: Save the `original prompt` (user's prompt - no rewrite)
**Before Proceed With Implementation**: Save the `implementation plan`

--

**Documentation Types**: `PROMPT`, `PLAN`, `CLARIFY`, `RESEARCH`, `UI_UX`, `DISCUSSION`, `CONTEXT`, `CONCERNS`, `PITFALLS`, etc.

*MUST* rename file to meaningful instead of using random name such as: `abundant-juggling-parasol.md` -> Wrong.

### Plan Location

Save plans in `./.ccsk/plans` directory with timestamp and descriptive name.

**Format**: `./.ccsk/plans/{YYMMDD}-{HHMM}-descriptive-name`
**Example**: `./.ccsk/plans/260525-1505-authentication-and-profile-implementation/`

#### File Organization

```
.ccsk/
    - plans/
        - 20251101-1505-authentication-and-profile-implementation/
            - 01-PROMPT.md
            - 01-CLARIFY.md
            - 01-RESEARCH.md
            - 01-UI_UX.md
            - 01-CONTEXT.md
            - 01-CONCERNS.md
            - 01-PITFALLS.md
            - 01-PLAN.md
            - ...

```