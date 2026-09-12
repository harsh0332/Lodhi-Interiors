import React from 'react';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/motion/Reveal';

/**
 * Position: Confident single-statement positioning paragraph (50 words, max 55).
 * Set at fluid h3 size on bone background with wide margins. Nothing else in this section.
 */
export function Position() {
  return (
    <Section tone="light" className="py-28 md:py-48" aria-label="Studio Positioning">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-8">
        <Reveal>
          <p className="font-sans text-fluid-h3 font-normal leading-[1.4] tracking-normal text-charcoal">
            We believe architectural design and physical execution belong under one accountable
            roof. When the same studio that conceives the space directly commands the joinery, civil
            modifications, and finish craft in Bhopal, design intent survives intact. No contractor
            handoffs. No diluted details. Complete single-source ownership from first sketch to
            final handover.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
