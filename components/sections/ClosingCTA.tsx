'use client';

import React, { useRef } from 'react';
import { env } from '@/lib/env';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { useClosingCTAMotion } from '@/components/motion/useFooterMotion';

/**
 * ClosingCTA: Full-width dark charcoal section sitting directly above the footer.
 * Port of Module 07A: Masked headline rise + staggered action reveals.
 */
export function ClosingCTA() {
  const containerRef = useRef<HTMLElement>(null);
  useClosingCTAMotion(containerRef);

  return (
    <Section
      ref={containerRef}
      tone="dark"
      data-motion-module="closing-cta"
      data-motion-start="top 80%"
      className="border-t border-greige/20 py-24 md:py-36"
      aria-label="Call to Action"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2
          data-motion="mask"
          className="mb-6 overflow-hidden font-serif text-fluid-display font-normal text-bone"
        >
          <span className="inline-block">Tell us about your space.</span>
        </h2>

        <p className="mx-auto mb-10 max-w-xl font-sans text-[1.0625rem] leading-relaxed text-bone/80">
          Whether you are planning a private residence in Arera Colony or an executive corporate
          headquarters in Bhopal, we welcome disciplined architectural conversations.
        </p>

        <div
          data-motion-group
          className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6"
        >
          <div data-motion-item className="w-full sm:w-auto">
            <Button
              variant="secondary"
              tone="dark"
              href="/contact"
              className="min-h-[48px] w-full px-8 text-[0.9375rem] sm:w-auto"
            >
              Start your project
            </Button>
          </div>
          <div data-motion-item className="w-full sm:w-auto">
            <Button
              variant="primary"
              tone="dark"
              href={`https://wa.me/${env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[48px] w-full text-[0.9375rem] text-bone/90 hover:text-bone sm:w-auto"
            >
              WhatsApp Consultation
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}

