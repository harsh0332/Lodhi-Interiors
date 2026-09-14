'use client';

import React, { useRef } from 'react';
import { useCustomCursor } from '@/components/motion/useFooterMotion';

/**
 * CustomCursor: Module 07C brass trailing cursor ring.
 * - Desktop pointer only: (hover: hover) and (pointer: fine).
 * - Driven by GSAP quickTo riding the shared ticker; zero extra rAF loops.
 * - Grows over interactive links, buttons, and marked interactive zones.
 * - Hidden on touch screens and under prefers-reduced-motion.
 */
export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  useCustomCursor(cursorRef);

  return (
    <div
      ref={cursorRef}
      data-motion-module="cursor"
      data-motion-grow="a, button, [data-motion-cursor='grow']"
      aria-hidden="true"
      className="lodhi-cursor"
    />
  );
}

