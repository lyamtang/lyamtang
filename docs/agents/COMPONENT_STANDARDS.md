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
| Icon button (`icon`) | 40px (`size-10`) | 40px (`size-10`) | Minimum icon action target |
| Icon button (`icon-lg`) | 44px (`size-11`) | 44px (`size-11`) | Use in mobile drawers and major actions |
| Interactive filter chips (removable) | 36px (`h-9`) | 36px (`h-9`) | Keep selected-filter chips compact while maintaining readability |
| Project-card metadata/tech chips | 24px (`h-6`) | 24px (`h-6`) | Improve readability while preserving card density |

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

## 3) Card Composition

- `Card` spacing uses `--card-spacing`:
  - default: `--spacing(4)` (16px)
  - small: `--spacing(3)` (12px)
- Keep card actions reachable:
  - Primary card link/action should use at least `h-10` with horizontal padding.
  - Icon-only external links in cards should have at least `size-9` target.
  - Metadata/tech chips in cards should not drop below `h-6` with `text-xs`.

## 4) Toolbar Pattern (Search + Filters)

- Search input follows input standard (`h-11` mobile, `h-10` desktop).
- Leading icon stays 16px (`h-4 w-4`), positioned with `pl-10`.
- Search icon must remain visibly rendered above the input surface (`z-10`, non-transparent contrast tone).
- Trailing clear control should use at least `size-9`.
- Adjacent filter triggers should match search input height per breakpoint (`h-11` mobile, `h-10` desktop).
- Collection/filter toolbars should use `position: sticky` under fixed header chrome, so they pin only once scrolled near the viewport top.
- When paired with an auto-hiding header:
  - header visible → filter toolbar offset sits below header;
  - header hidden → filter toolbar snaps to device top safe-area (`env(safe-area-inset-top)`).
- On touch devices, when a text field is focused and the virtual keyboard opens, keep the auto-hiding header suppressed to prevent it from popping back into view mid-typing.

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

