import React from 'react';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/motion/Reveal';

/**
 * Position: Confident single-statement positioning paragraph (50 words, max 55).
 * Set at fluid h3 size on bone background with wide margins. Nothing else in this section.
 */
export function Position() {
  return (
    <Section tone="travertine" className="py-28 md:py-44" aria-label="Studio Positioning">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-8">
        <Reveal>
          <span className="mb-8 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Studio Manifesto
          </span>
          <p className="font-sans text-fluid-h3 font-normal leading-[1.45] tracking-normal text-charcoal/90">
            We believe architectural design and physical execution belong under{' '}
            <span className="font-serif italic font-normal text-charcoal">one accountable roof</span>
            . When the same studio that conceives the space directly commands the joinery, civil
            modifications, and finish craft in Bhopal, design intent survives{' '}
            <span className="text-accent font-medium">intact</span>. No contractor handoffs. No
            diluted details.{' '}
            <span className="border-b border-accent/40 pb-0.5">
              Complete single-source ownership
            </span>{' '}
            from first sketch to final handover.
          </p>
          <div className="mx-auto mt-10 h-[1px] w-16 bg-accent/40" />
          <span className="mt-3 block font-mono text-[0.6875rem] uppercase tracking-widest text-greige">
            Soumya Lodhi &middot; Bhopal, MP
          </span>
        </Reveal>
      </div>
    </Section>
  );
}
