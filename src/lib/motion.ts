import { gsap } from 'gsap';

// Shared motion tokens for both motion/react and GSAP usage.
export const MOTION_EASING = {
  smoothOut: [0.23, 1, 0.32, 1] as const,
  smoothInOut: [0.45, 0, 0.55, 1] as const,
  gsapOut: 'power3.out',
  gsapInOut: 'power2.inOut',
} as const;

export const MOTION_DURATION = {
  fast: 0.18,
  base: 0.24,
  medium: 0.42,
  slow: 0.6,
} as const;

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function initGsapDefaults() {
  gsap.defaults({
    duration: MOTION_DURATION.base,
    ease: MOTION_EASING.gsapOut,
  });
}
