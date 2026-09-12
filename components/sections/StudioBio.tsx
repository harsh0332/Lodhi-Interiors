import React from 'react';
import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Heading, Label, Body } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';

/**
 * StudioBio: Dark charcoal section featuring founder portrait and 70-word narrative (max 90 words).
 * Handover token: [FOUNDER PORTRAIT: Soumya Lodhi on-site in studio/execution attire]
 */
export function StudioBio() {
  return (
    <Section tone="dark" className="py-24 md:py-40" aria-label="About the Studio">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-20">
        {/* Left Column: Founder Portrait (Stacked on mobile, left on desktop) */}
        <div className="lg:col-span-5">
          <Reveal>
            <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden border border-greige/20 bg-charcoal-2 lg:max-w-none">
              <Image
                src="/images/soumya-lodhi.jpg"
                alt="Soumya Lodhi, founder and principal designer of Lodhi Interiors in Bhopal"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                quality={85}
                className="object-cover object-top"
              />
            </div>
            <div className="mt-4 text-center lg:text-left">
              <span className="block font-serif text-[1.125rem] text-bone">Soumya Lodhi</span>
              <span className="block font-sans text-ui-caption text-greige">
                Founder & Principal Designer
              </span>
            </div>
          </Reveal>
        </div>

        {/* Right Column: First-Person Narrative (70 words) */}
        <div className="flex flex-col items-start lg:col-span-7">
          <Reveal delay={0.1}>
            <Label className="mb-3 block text-accent">The Practice</Label>
            <Heading level={2} className="mb-8 text-bone">
              Design and execution belong under one hand.
            </Heading>
          </Reveal>

          <Reveal delay={0.2}>
            <Body className="mb-6 text-[1.0625rem] leading-[1.7] text-bone/85">
              For over eight years in Bhopal, I have practiced interior architecture with a singular
              conviction: real luxury is precision in execution. Drawing a bespoke space is only
              half the battle; bringing master joiners, stonemasons, and custom fabricators together
              on site every morning is what turns intent into permanence. We remain intentionally
              boutique, taking on a limited number of turnkey commissions each year to guarantee
              personal principal involvement on every milestone.
            </Body>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="pt-2">
              <Button variant="primary" tone="dark" href="/studio" className="text-[0.9375rem]">
                Read our studio philosophy
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
