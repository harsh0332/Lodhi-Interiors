'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

export interface HeadlineRevealProps {
  lines: string[];
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'div';
  delay?: number;
}

/**
 * HeadlineReveal: Masked typographic reveal for editorial headlines.
 * - Each line is wrapped in an overflow-hidden mask.
 * - Lines rise from yPercent: 110% over 600ms with 80ms stagger (power3.out).
 * - Triggered at 85% viewport entry.
 * - Reduced motion branch displays lines immediately with zero tween.
 */
export function HeadlineReveal({
  lines,
  className,
  as: Component = 'h2',
  delay = 0,
}: HeadlineRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    const activeLines = lineRefs.current.filter(Boolean) as HTMLSpanElement[];

    // 1. Desktop branch (>= 769px)
    mm.add('(min-width: 769px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        activeLines,
        {
          yPercent: 110,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            once: true,
          },
        },
      );
    });

    // 2. Mobile branch (<= 768px): direct opacity reveal, no mask clipping transform, 350ms cap
    mm.add('(max-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        activeLines,
        {
          opacity: 0,
          y: 6,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.04,
          delay: Math.min(delay, 0.05),
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 92%',
            once: true,
          },
        },
      );
    });

    // 3. Reduced motion: immediate static display
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(activeLines, {
        yPercent: 0,
        opacity: 1,
        clearProps: 'all',
      });
    });

    return () => {
      mm.revert();
    };
  }, [delay]);

  return (
    // @ts-expect-error dynamic polymorphic component typing
    <Component ref={containerRef} className={cn('block font-serif', className)}>
      {lines.map((line, idx) => (
        <span key={idx} className="block overflow-hidden py-0.5">
          <span
            ref={(el) => {
              lineRefs.current[idx] = el;
            }}
            className="block will-change-transform"
          >
            {line}
          </span>
        </span>
      ))}
    </Component>
  );
}
