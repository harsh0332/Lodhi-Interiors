'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '@/components/ui/Section';

const STATS = [
  {
    target: 8,
    suffix: '+',
    label: 'Years in Practice',
    detail: 'Continuous architectural and turnkey studio practice in Bhopal since 2016.',
  },
  {
    target: 75,
    suffix: '+',
    label: 'Spaces Completed',
    detail: 'Residential, luxury homes, and commercial turnkey interiors delivered.',
  },
  {
    target: 100,
    suffix: '%',
    label: 'In-House Accountability',
    detail: 'Complete custody of design drafting, joinery fabrication, and site supervision.',
  },
];

/**
 * Numbers: Three substantiated studio figures with GSAP count-up over 1.2 seconds.
 * Instant static rendering under prefers-reduced-motion.
 */
export function Numbers() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      STATS.forEach((stat, idx) => {
        const span = counterRefs.current[idx];
        if (!span) return;

        const counterObj = { val: 0 };
        gsap.to(counterObj, {
          val: stat.target,
          duration: 1.2,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
          onUpdate: () => {
            span.textContent = Math.floor(counterObj.val).toString();
          },
          onComplete: () => {
            span.textContent = stat.target.toString();
          },
        });
      });
    });

    mm.add('(prefers-reduced-motion: reduce)', () => {
      STATS.forEach((stat, idx) => {
        const span = counterRefs.current[idx];
        if (span) {
          span.textContent = stat.target.toString();
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={sectionRef}>
      <Section tone="paper" className="py-20 md:py-32" aria-label="Studio Metrics">
        <div className="grid grid-cols-1 gap-12 divide-y divide-greige/30 md:grid-cols-3 md:gap-16 md:divide-x md:divide-y-0">
          {STATS.map((stat, idx) => (
            <div key={stat.label} className={idx > 0 ? 'pt-8 md:pl-12 md:pt-0' : ''}>
              <div className="mb-3 font-serif text-fluid-h1 font-normal leading-none text-charcoal">
                <span
                  ref={(element) => {
                    counterRefs.current[idx] = element;
                  }}
                >
                  {stat.target}
                </span>
                <span className="text-accent">{stat.suffix}</span>
              </div>
              <span className="mb-2 block font-serif text-[1.25rem] text-charcoal">
                {stat.label}
              </span>
              <p className="max-w-xs font-sans text-ui-caption leading-relaxed text-greige">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
