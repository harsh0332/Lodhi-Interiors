/**
 * Lodhi Interiors — Shared Motion Tokens & Primitives
 * Mirrored 1:1 with /motion/_shared/tokens.css and scroll-engine.js
 */

export const MOTION_EASE = {
  entrance: 'power2.out',
  exit: 'power2.in',
  cinematic: 'expo.out',
  snap: 'power4.out',
} as const;

export type MotionEaseKey = keyof typeof MOTION_EASE;

export const MOTION_DURATION = {
  fast: 0.25,
  base: 0.5,
  slow: 0.7,
  cinematic: 0.9,
} as const;

export type MotionDurationKey = keyof typeof MOTION_DURATION;

export const MOTION_STAGGER = {
  tight: 0.04,
  base: 0.08,
  loose: 0.12,
} as const;

export const MOTION_MEDIA = {
  desktop: '(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
  mobile: '(max-width: 899px), (hover: none), (pointer: coarse)',
  reduced: '(prefers-reduced-motion: reduce)',
} as const;
