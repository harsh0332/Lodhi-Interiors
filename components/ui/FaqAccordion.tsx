'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FaqAccordionProps {
  faqs: FAQItem[];
  className?: string;
}

/**
 * FaqAccordion: Accessible FAQ accordion component.
 * - Uses native button elements with aria-expanded and aria-controls.
 * - Clean keyboard navigation and state announcement.
 * - 1px hairline divider rules in greige/30.
 */
export function FaqAccordion({ faqs, className }: FaqAccordionProps) {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set([0]));

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className={cn('w-full divide-y divide-greige/30 border-t border-greige/30', className)}>
      {faqs.map((faq, idx) => {
        const isOpen = openIndices.has(idx);
        const triggerId = `faq-trigger-${idx}`;
        const panelId = `faq-panel-${idx}`;

        return (
          <div key={faq.question} className="transition-colors">
            <h3>
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleIndex(idx)}
                className="group flex w-full items-baseline justify-between gap-6 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bone"
              >
                <span className="font-serif text-fluid-h3 font-medium text-charcoal transition-colors duration-200 group-hover:text-accent">
                  {faq.question}
                </span>

                {/* Quiet Architectural Plus/Minus Indicator */}
                <span
                  className="flex-shrink-0 font-mono text-ui-caption text-greige transition-transform duration-200 group-hover:text-accent"
                  aria-hidden="true"
                >
                  {isOpen ? '—' : '+'}
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className={cn(
                'overflow-hidden transition-all duration-300 ease-out',
                isOpen ? 'max-h-[500px] pb-6 opacity-100' : 'max-h-0 pb-0 opacity-0',
              )}
            >
              <p className="max-w-3xl font-sans text-[0.9375rem] leading-relaxed text-charcoal/85">
                {faq.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
