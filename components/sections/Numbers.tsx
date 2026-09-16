'use client';

import React, { useRef } from 'react';
import { Section } from '@/components/ui/Section';
import { useCounters } from '@/components/motion/useCounters';

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
 * Numbers: Three substantiated studio figures powered by useCounters (Module 04B).
 * Fixed min-width reservation in ch units, en-IN formatting, once per viewport entry.
 * Instant static rendering under prefers-reduced-motion.
 */
export function Numbers() {
  const sectionRef = useRef<HTMLDivElement>(null);
  useCounters(sectionRef);

  return (
    <div ref={sectionRef} data-motion-module="counters">
      <Section tone="umber" className="border-t border-white/10 py-24 md:py-36" aria-label="Studio Metrics">
        <div className="grid grid-cols-1 gap-12 divide-y divide-white/10 md:grid-cols-3 md:gap-16 md:divide-x md:divide-y-0">
          {STATS.map((stat, idx) => (
            <div
              key={stat.label}
              data-motion="count"
              data-motion-count-to={stat.target}
              className={`group relative rounded-sm transition-all duration-300 ${
                idx > 0 ? 'pt-8 md:pl-12 md:pt-0' : ''
              }`}
            >
              <span className="mb-4 inline-block h-1.5 w-1.5 rounded-full bg-accent-gold opacity-60 transition-all duration-300 group-hover:scale-125 group-hover:opacity-100" />
              <div className="mb-3 font-serif text-fluid-h1 font-normal leading-none">
                <span
                  data-motion="count-value"
                  className="bg-gradient-to-r from-[#F5E6CC] via-[#D4AF37] to-[#C5A265] bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(197,162,101,0.25)]"
                >
                  {stat.target}
                </span>
                <span className="ml-0.5 text-accent-gold">{stat.suffix}</span>
              </div>
              <span className="mb-2 block font-serif text-[1.3125rem] font-medium text-bone transition-colors duration-200 group-hover:text-accent-gold">
                {stat.label}
              </span>
              <p className="max-w-xs font-sans text-ui-caption leading-relaxed text-bone/70">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
