# Motion Standards

This repository uses a hybrid motion strategy:

1. `motion/react` for component-local UI states and in-view transitions.
2. `gsap` for timeline orchestration, scroll-driven animation, and advanced sequencing.

## Primary Rules

1. Do not animate the same CSS property on the same element with multiple engines at the same time.
2. Prefer `transform` and `opacity` over layout-affecting properties (`top`, `left`, `width`, `height`).
3. Always respect reduced motion.
4. Reuse shared timing/easing tokens from `src/lib/motion.ts`.
5. Keep high-frequency interactions subtle and fast.

## Shared Tokens

Use values from `src/lib/motion.ts`:

- `MOTION_DURATION.fast` for press/hover feedback.
- `MOTION_DURATION.base` for compact UI transitions.
- `MOTION_DURATION.medium` for section detail transitions.
- `MOTION_DURATION.slow` for major section entrances.
- `MOTION_EASING.smoothOut` for most UI entrances.
- `MOTION_EASING.gsapOut` and `MOTION_EASING.gsapInOut` for GSAP tweens.

## Reduced Motion

Use `prefersReducedMotion()` from `src/lib/motion.ts` before starting looped motion or long timelines.

## GSAP Defaults

`initGsapDefaults()` is initialized in `src/components/providers/SmoothScroll.tsx`.
Keep per-animation overrides intentional and minimal.
