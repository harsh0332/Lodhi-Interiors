'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

export interface UseRevealOptions {
  delay?: number;
  duration?: number;
  distance?: number;
}

/**
 * useReveal: Standardized viewport section entry animation hook.
 * - Desktop: 24px rise + opacity fade over 500ms (power2.out) triggered at 85% viewport.
 * - Mobile: 16px rise over 350ms for swift, unhindered reading agility.
 * - Reduced Motion: Immediate presentation with zero tween and clearProps.
 * - Handled strictly through gsap.matchMedia across all 3 branches.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(options?: UseRevealOptions) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    const delay = options?.delay ?? 0;

    // 1. Desktop branch (>= 769px)
    mm.add('(min-width: 769px) and (prefers-reduced-motion: no-preference)', () => {
      const distance = options?.distance ?? 24;
      const duration = options?.duration ?? 0.5;

      gsap.fromTo(
        el,
        {
          y: distance,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration,
          delay,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        },
      );
    });

    // 2. Mobile branch (<= 768px): shorter duration, reduced displacement
    mm.add('(max-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const distance = Math.min(options?.distance ?? 16, 16);
      const duration = Math.min(options?.duration ?? 0.35, 0.35);

      gsap.fromTo(
        el,
        {
          y: distance,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration,
          delay: Math.min(delay, 0.1),
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        },
      );
    });

    // 3. Reduced Motion branch: immediate static visibility
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(el, {
        y: 0,
        opacity: 1,
        clearProps: 'all',
      });
    });

    return () => {
      mm.revert();
    };
  }, [options?.delay, options?.duration, options?.distance]);

  return ref;
}

export interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: React.ElementType;
}

/**
 * Reveal: Declarative viewport motion wrapper.
 * Applied across all section entries for uniform, calm editorial rhythm.
 */
export function Reveal({ children, className, delay = 0, as: Component = 'div' }: RevealProps) {
  const ref = useReveal<HTMLDivElement>({ delay });

  return (
    <Component ref={ref} className={cn('will-change-transform', className)}>
      {children}
    </Component>
  );
}
