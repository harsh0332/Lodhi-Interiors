import React from 'react';
import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';

/**
 * StudioBio: Dark charcoal editorial section featuring founder portrait and practice narrative.
 * Mobile optimized with framed architectural portrait card, legible typography, and direct studio link.
 */
export function StudioBio() {
  return (
    <Section tone="dark" className="py-16 sm:py-24 md:py-40" aria-label="About the Studio">
      <div className="grid grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-20">
        {/* Left Column: Founder Portrait (Framed on mobile, left on desktop) */}
        <div className="lg:col-span-5">
          <Reveal>
            <div className="relative mx-auto aspect-[4/5] sm:aspect-[3/4] w-full max-w-[300px] sm:max-w-md overflow-hidden rounded-sm border border-accent-gold/30 bg-charcoal-2 shadow-luxury">
              <Image
                src="/images/soumya-lodhi.jpg"
                alt="Soumya Lodhi, founder and principal designer of Lodhi Interiors in Bhopal"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                quality={85}
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent pointer-events-none" />
              
              {/* Founder Credential Card */}
              <div className="absolute bottom-3 left-3 right-3 rounded border border-white/15 bg-charcoal/90 p-2.5 text-center shadow-md backdrop-blur-md">
                <span className="block font-serif text-[1rem] font-medium text-bone">
                  Soumya Lodhi
                </span>
                <span className="block font-mono text-[0.6875rem] uppercase tracking-wider text-accent-gold">
                  Principal Designer · 8+ Years Practice
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column: First-Person Narrative */}
        <div className="flex flex-col items-start lg:col-span-7">
          <Reveal delay={0.1}>
            <span className="mb-2.5 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-accent-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-gold" />
              The Practice
            </span>
            <Heading level={2} className="mb-4 sm:mb-6 text-bone text-[1.625rem] sm:text-fluid-h2 leading-snug">
              Design and execution belong under one hand.
            </Heading>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="space-y-3.5 sm:space-y-4 font-sans text-xs sm:text-[1.0625rem] leading-[1.75] text-bone/85 mb-6">
              <p>
                For over eight years in Bhopal, I have practiced interior architecture with a singular
                conviction:{' '}
                <strong className="font-semibold text-bone">
                  real luxury is precision in physical execution
                </strong>
                . Drawing a bespoke space is only half the battle; bringing master joiners, stonemasons,
                and custom fabricators together on site every morning is what turns intent into permanence.
              </p>
              <p className="text-bone/70">
                We remain intentionally boutique, taking on a limited number of turnkey commissions
                each year across Bhopal to guarantee direct principal involvement on every milestone.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="w-full sm:w-auto pt-1">
              <Button
                variant="primary"
                tone="dark"
                href="/studio"
                className="w-full sm:w-auto text-xs sm:text-[0.9375rem] justify-center py-3.5 px-6"
              >
                Read Our Studio Philosophy &rarr;
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
