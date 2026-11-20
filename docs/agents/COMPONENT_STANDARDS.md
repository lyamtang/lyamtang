# Component Standards

This is the portfolio-wide baseline for component sizing, spacing, and padding.
Use these defaults unless a component has a clear product reason to deviate.

## 1) Interactive Control Sizing

| Control type | Mobile | Desktop | Notes |
| --- | --- | --- | --- |
| Primary/secondary button (`lg`) | 44px (`h-11`) | 44px (`h-11`) | Main CTAs (`Send message`, `Apply`, `Clear`) |
| Standard button (`default`) | 40px (`h-10`) | 40px (`h-10`) | General actions and toolbar controls |
| Compact button (`sm`) | 36px (`h-9`) | 36px (`h-9`) | Dense, secondary controls only |
| Text input | 44px (`h-11`) | 40px (`sm:h-10`) | Keeps touch comfort while preserving desktop density |
| Textarea input | 16px text on mobile (`text-base`) | 14px text on desktop (`sm:text-sm`) | Prevent iOS focus-zoom; keep density on larger screens |
| Icon button (`icon`) | 40px (`size-10`) | 40px (`size-10`) | Minimum icon action target |
| Icon button (`icon-lg`) | 44px (`size-11`) | 44px (`size-11`) | Use in mobile drawers and major actions |
| Interactive filter chips (toggle) | 40px (`h-10`) | 40px (`h-10`) | Pill chips with a leading icon inside the filter panel |
| Project-card metadata/tech chips | 24px (`h-6`) | 24px (`h-6`) | Improve readability while preserving card density |
| About section skill/tool chips | 24px (`h-6`) | 24px (`h-6`) | Keep skills/tools readable while matching project chip scale |

### Hit-target rule
- Never ship user-facing controls below ~40px target size.
- Prefer ~44px for primary mobile actions.

## 2) Internal Padding + Gaps

| Pattern | Standard |
| --- | --- |
| Button horizontal padding | `px-3` (default), `px-4` (`lg`) |
| Input horizontal padding | `px-3` |
| Compact toolbar gap | `gap-2` |
| Action group gap | `gap-3` |
| Content stack gap in cards/forms | `gap-3` to `gap-5` |

Textarea surfaces should reuse the same background/border token strategy as standard text inputs in the same form.

## 3) Card Composition

- `Card` spacing uses `--card-spacing`:
  - default: `--spacing(4)` (16px)
  - small: `--spacing(3)` (12px)
- Keep card actions reachable:
  - Primary card link/action should use at least `h-10` with horizontal padding.
  - Icon-only external links in cards should have at least `size-9` target.
  - Metadata/tech chips in cards should not drop below `h-6` with `text-xs`.

## 3.1) Chip System (Cohesive Standard)

Use chip variants by semantics, not by section-level preference.

| Chip role | Variant/style | Size baseline | Interaction | Current usage |
| --- | --- | --- | --- | --- |
| Filter chip (toggle) | `default` when selected, `outline` otherwise | `h-10 px-3.5 text-sm`, icon + label | `aria-pressed` toggle | Project filter panel (Industry, Focus, Status) |
| Metadata chip (neutral context) | `outline` | `h-6 px-2.5 text-xs` | static | Project category chips, “+N” category chip |
| Skill/tool chip (knowledge stack) | `secondary` | `h-6 px-2.5 text-xs` | static | Education highlights, Experience tools, Project tech chips |
| Status chip (state semantics) | custom tinted semantic class | `h-6 px-2.5 text-xs` | static | Project status (`in_progress`, `completed`) |

Rules:
- Keep chip text at `text-xs` for dense chip groups.
- Keep `h-6 px-2.5` as the default static chip baseline.
- Use `h-10` for interactive filter chips; they meet the 40px hit-target rule.
- Do not mix `outline` and `secondary` in one static tag group unless they intentionally encode different meanings.
- Status chips must remain semantically tinted (state meaning), not converted to neutral variants.

## 4) Toolbar Pattern (Search + Filters)

- Collection toolbars are one compact island pill (`nav-glass`, icon segments `size-11` mobile / `size-10` desktop) holding only search and filter. It never spans the full width.
- The island sits in its own row directly below the section heading, aligned to the trailing edge, so it can never overlap the title. The row is `position: sticky` under the fixed header.
- Search is the first island segment and expands in place (`width` transition), auto-focuses, stays open while it has a query, and collapses on blur when empty or on Escape.
- Filters are one inline panel for every breakpoint (no drawer, popover or dropdown menus); it expands in flow below the island and pushes content down. Chip groups are laid out with `flex-wrap`, and changes apply instantly (no draft or Apply step).
- The filter icon shows a count badge when filters are active. Reset lives inside the filter panel (top-right, on the first group's caption row) and is disabled when no filters are active; the search field has its own ✕.
- The sticky `top` offset transitions (~240ms, same easing as the header slide) so the toolbar never snaps when the header hides, e.g. on touch text-field focus.
- The filter panel dismisses on Escape or an outside press.
- Filtering is local and instant: no debounce and no skeleton flash.
- When paired with an auto-hiding header:
  - header visible → toolbar offset sits below header;
  - header hidden → toolbar snaps to device top safe-area (`env(safe-area-inset-top)`).

## 5) Motion + Feedback Baseline

- Press feedback: `scale(0.96)` on active controls.
- Do not use `transition: all`; specify animated properties.
- Keep control transitions short (`~200ms`, `ease-out`).
- Disabled controls must not animate on press.

## 6) Accessibility Baseline for Component Density

- Keep keyboard-visible focus styles on all interactive elements.
- Ensure icon-only actions expose an accessible name.
- Do not reduce controls below minimum target sizes to “fit more”.

## 7) Section-Level Spacing

| Layer | Standard |
| --- | --- |
| Page section horizontal padding | `px-4 sm:px-6 lg:px-8` |
| Primary section vertical spacing | `py-16 sm:py-24` |
| Route content container spacing | `px-4 sm:px-6 lg:px-8` with page-specific `py-*` |

## 8) Floating Header / Navbar Baseline

- Header top clearance should not sit flush to device edge:
  - minimum top inset: `top-4` plus safe-area handling.
- Keep nav controls at least `h-11` and `min-w-11` when icon-only labels collapse on mobile.
- Keep nav item spacing at `gap-0.5` to `gap-1` to avoid crowded touch zones.
- Keep a matching layout spacer for fixed headers so page content never clips under nav.

## 9) QA Checklist (Sizing + Spacing)

Before merging UI changes, verify:

1. No critical action is below 40px target size.
2. Mobile-first actions are 44px where practical.
3. Search/filter/action bars align to one shared control height.
4. Card actions are not text-only tiny links.
5. Icon-only controls have both sufficient hit area and focus ring.
6. Spacing rhythm uses existing Tailwind steps (`2/3/4/5/6`) consistently.

