import React from 'react';
import { env } from '@/lib/env';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';

/**
 * ClosingCTA: Full-width dark charcoal section sitting directly above the footer.
 * Uses Reveal motion wrappers for calm, guaranteed entry.
 */
export function ClosingCTA() {
  return (
    <Section
      tone="dark"
      className="border-t border-greige/20 py-24 md:py-36"
      aria-label="Call to Action"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <Reveal>
          <h2 className="mb-6 font-serif text-fluid-display font-normal text-bone">
            Tell us about your space.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mb-10 max-w-xl font-sans text-[1.0625rem] leading-relaxed text-bone/80">
            Whether you are planning a private residence in Arera Colony or an executive corporate
            headquarters in Bhopal, we welcome disciplined architectural conversations.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
            <Button
              variant="secondary"
              tone="dark"
              href="/contact"
              className="min-h-[48px] w-full px-8 text-[0.9375rem] sm:w-auto"
            >
              Start your project
            </Button>
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
        </Reveal>
      </div>
    </Section>
  );
}

