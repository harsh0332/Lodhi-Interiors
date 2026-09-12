'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * CustomCursor: Ultra-lightweight (~1KB) architectural trailing ring for desktop pointers.
 * - Active strictly on desktop pointer devices: (hover: hover) and (pointer: fine).
 * - Preserves native OS cursor for accessibility; never sets cursor: none.
 * - Smooth trailing via compositor translate3d; zero layout shift.
 * - Scales slightly when hovering over interactive elements (a, button, input).
 * - Omitted on touchscreens and prefers-reduced-motion.
 */
export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const isHoveringRef = useRef(false);
  const posRef = useRef({ x: -100, y: -100 });
  const targetPosRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Gate: desktop pointer only, no reduced motion
    const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!pointerQuery.matches || motionQuery.matches) {
      return;
    }

    setIsEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      targetPosRef.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current && cursorRef.current.style.opacity === '0') {
        cursorRef.current.style.opacity = '1';
      }
    };

    const onMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '0';
      }
    };

    const onMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '1';
      }
    };

    // Detect interactive elements on pointerover
    const onPointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest('a, button, input, textarea, select, [role="button"]');
      isHoveringRef.current = Boolean(interactive);
    };

    // Smooth lerp trailing loop (pure transform: translate3d)
    const render = () => {
      const lerp = 0.25;
      posRef.current.x += (targetPosRef.current.x - posRef.current.x) * lerp;
      posRef.current.y += (targetPosRef.current.y - posRef.current.y) * lerp;

      if (cursorRef.current) {
        const scale = isHoveringRef.current ? 1.5 : 1;
        cursorRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      }

      rafRef.current = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseover', onPointerOver, { passive: true });

    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', onPointerOver);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  if (!isEnabled) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-50 h-7 w-7 rounded-full border border-accent/40 opacity-0 transition-[opacity,transform] duration-150 ease-out will-change-transform"
      style={{
        transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
      }}
    />
  );
}
