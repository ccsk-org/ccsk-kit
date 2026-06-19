
# Feature: Home Dashboard

> In case you have access to Figma and also use Figma MCP

---

## Pre-requisites

- Read `CLAUDE.md`, `Serena's`, `RTK's`, and `context-mode's` initial instructions before going forward
- Use ultrathink and deep analyze the UI design to make sure we can build the UI correctly and apply First Principle Thinking if needed
- Use `ui-ux-pro-max` skill and gather the same components or ui concepts if having something new that same with current to compare what we needs
- Use `Figma__MCP` to analyze the UI design

## Context

We're planning to build UIs for the Report Overview — UIs only. The APIs are not ready yet, so we will integrate them once they're ready.

Gather context and information start from our codebase. Then put more effort to take a look and deep analyze the Figma UI Design for the Report Overview at: https://www.figma.com/design/FNH6RUOtjHxdOhFrwTEmnM/THRU-Hotel-Interface--Copy-?node-id=5247-17133&m=dev

## Scopes & Requirements

**Reports**: The report menu item has these children:

- Overview
- Guest messages
- Survey
- Campaign
- Upsell
- Check-ins

Currently, we are having a child called "Chat read" -> Please don't care about it, keep it as a draft page/feature

We are mainly focus on building Overview child inside Reports

## Requirements

- Strictly follow Figma UI Design.
- Hardcode as mock data -> Don't make the mock/fake data implementation complex -> Keep it simple as simple

**Behaviors**: Accessing to details by click/press to the section

User is able to access to Report Overview of Chat Card by pressing on it - for example.

Deep investigate and help to build all UIs related to the Report Overview base on Figma UI Design.