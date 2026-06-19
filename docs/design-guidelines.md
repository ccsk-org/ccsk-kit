# Design Guidelines — <project-name>

> **Purpose:** Visual and interaction design constraints that code must respect. Agents writing UI components read this before touching Tailwind classes or theme tokens. Update when the design system changes.

---

## Design system

TODO: Name the design system or library in use (e.g. shadcn/ui + custom tokens, Radix + Tailwind, etc.)

## Color tokens

All colors are defined as CSS variables in `shared/theme/`. Never hardcode hex or HSL values in component code.

| Token | Purpose | Example value |
|-------|---------|---------------|
| `--color-background` | Page background | TODO |
| `--color-foreground` | Primary text | TODO |
| `--color-primary` | Brand / CTA | TODO |
| `--color-primary-foreground` | Text on primary | TODO |
| `--color-muted` | Subtle backgrounds | TODO |
| `--color-muted-foreground` | Deemphasized text | TODO |
| `--color-destructive` | Errors / danger | TODO |
| `--color-border` | Borders, dividers | TODO |

## Typography

TODO: Document typeface, scale, and line-height rules.

| Level | Class / token | Use |
|-------|--------------|-----|
| Heading 1 | TODO | Page titles |
| Heading 2 | TODO | Section headers |
| Body | TODO | Default prose |
| Small | TODO | Captions, helper text |
| Code | TODO | Inline code |

## Spacing & layout

- Base unit: `4px` (Tailwind default). Use multiples only (`4, 8, 12, 16, 24, 32, 48, 64`).
- Page max-width: TODO (e.g. `max-w-7xl`).
- Consistent padding on page containers: TODO (e.g. `px-4 md:px-8`).

## Component variants

Use `class-variance-authority` (CVA) for any primitive with more than 2 visual variants. Variant names must match design token names, not visual descriptions (e.g. `variant="destructive"` not `variant="red"`).

## Dark mode

TODO: Describe dark mode strategy (e.g. `next-themes` class toggle, Tailwind `dark:` variants, CSS variable swap).

## Accessibility

- All interactive elements must have a visible focus ring (`focus-visible:ring-2`).
- Color contrast: minimum WCAG AA (4.5:1 for body text, 3:1 for large text).
- Icon-only buttons must have `aria-label`.
- Form inputs must have associated `<label>` elements (not just placeholders).
- Motion: respect `prefers-reduced-motion` for all transitions.

## Animation

TODO: Define permitted transition durations and easing curves (e.g. `duration-150 ease-out` for micro-interactions).

## Iconography

TODO: Specify the icon library in use (e.g. Lucide, Radix Icons, Heroicons) and import path convention.

## Reference

- `shared/theme/` — CSS variables and Tailwind preset
- `shared/components/ui/` — shadcn primitives
- `shared/components/common/` — bespoke shared components
- `docs/references/design-patterns.md` — component composition patterns
