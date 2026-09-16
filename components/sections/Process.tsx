import React from 'react';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Typography';
import { Reveal } from '@/components/motion/Reveal';

const STEPS = [
  {
    number: '01',
    title: 'Consultation & Spatial Brief',
    duration: 'Week 1',
    description:
      'Comprehensive on-site brief analysis exploring lifestyle patterns, architectural boundaries, and realistic budget-to-finish milestones.',
  },
  {
    number: '02',
    title: 'Concept & 3D Photometrics',
    duration: 'Weeks 2–4',
    description:
      'Volumetric layout development, circulation studies, spatial lightwells, and high-fidelity photometric spatial renders.',
  },
  {
    number: '03',
    title: 'Material Palette & BOQ',
    duration: 'Weeks 4–6',
    description:
      'Physical material board curation (natural stone, fluted timber, metals) paired with itemised, transparent pricing sign-off.',
  },
  {
    number: '04',
    title: 'Turnkey Execution & Civil Works',
    duration: 'Weeks 6–20',
    description:
      'Single-source site custody managing structural civil works, MEP pressure testing, and in-house precision joinery fabrication.',
  },
  {
    number: '05',
    title: 'Styling & Lighting Commissioning',
    duration: 'Weeks 20–22',
    description:
      'Architectural ironmongery installation, loose furniture curation, calibrated warm lighting scenes, and preliminary snag review.',
  },
  {
    number: '06',
    title: 'Handover & Warranty Dossier',
    duration: 'Handover & Beyond',
    description:
      'Zero-snag sign-off, as-built MEP conduit diagrams, certified warranties, material maintenance guides, and ongoing studio support.',
  },
];

/**
 * Process: Six sequenced turnkey steps.
 * - Mobile: Connected vertical architectural timeline with glowing gold milestone nodes.
 * - Desktop: Stepped 3x2 sequence cards with hover illumination.
 */
export function Process() {
  return (
    <Section
      tone="travertine"
      className="border-t border-greige/20 py-16 sm:py-24 md:py-40"
      aria-label="Our Process"
    >
      {/* Section Header */}
      <div className="mb-10 sm:mb-16 md:mb-24 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <Reveal>
            <span className="mb-2.5 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Methodology
            </span>
            <Heading level={2}>The Turnkey Sequence</Heading>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="max-w-sm font-sans text-xs sm:text-ui-caption text-charcoal/70 leading-relaxed">
            Six disciplined stages ensuring zero disconnect between architectural concept and built
            reality in Bhopal.
          </p>
        </Reveal>
      </div>

      {/* Sequenced Roadmap: Connected Vertical Timeline on Mobile / 3-Col Grid on Desktop */}
      <div className="relative ml-2 sm:ml-0 pl-6 sm:pl-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 space-y-5 sm:space-y-0">
        {/* Mobile Continuous Vertical Connecting Line */}
        <div
          className="absolute left-[11px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-accent via-accent-gold to-accent/40 sm:hidden"
          aria-hidden="true"
        />

        {STEPS.map((step, index) => (
          <Reveal key={step.number} delay={index * 0.05}>
            <div className="relative group">
              {/* Mobile Timeline Milestone Node */}
              <div
                className="sm:hidden absolute -left-[30px] top-4 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-charcoal text-accent-gold border-2 border-accent-gold font-mono text-[0.625rem] font-bold shadow-[0_0_8px_rgba(197,162,101,0.4)]"
                aria-hidden="true"
              >
                {step.number}
              </div>

              {/* Step Card */}
              <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-sm border border-greige/30 bg-white p-5 sm:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-gold/60 hover:shadow-glow-subtle">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-accent-gold/0 via-accent-gold to-accent-gold/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div>
                  <div className="mb-3 sm:mb-4 flex items-center justify-between">
                    <span className="rounded border border-accent/25 bg-accent/10 px-2.5 py-0.5 font-mono text-[0.6875rem] font-semibold uppercase tracking-wider text-accent">
                      STAGE {step.number}
                    </span>
                    <span className="font-mono text-[0.6875rem] font-semibold text-accent-gold bg-accent-gold/10 px-2 py-0.5 rounded border border-accent-gold/25">
                      {step.duration}
                    </span>
                  </div>

                  <h3 className="mb-2 sm:mb-2.5 font-serif text-[1.1875rem] sm:text-[1.25rem] font-medium text-charcoal transition-colors duration-200 group-hover:text-accent">
                    {step.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-[0.9375rem] leading-relaxed text-charcoal/75">
                    {step.description}
                  </p>
                </div>

                <div className="mt-4 sm:mt-6 border-t border-greige/20 pt-3 sm:pt-4 flex items-center justify-between">
                  <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-greige group-hover:text-accent transition-colors">
                    Step 0{index + 1} of 06
                  </span>
                  <span className="font-mono text-xs text-accent transition-transform group-hover:translate-x-1">
                    &rarr;
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Process CTA Link */}
      <div className="mt-10 sm:mt-14 flex items-center justify-center">
        <Reveal delay={0.3}>
          <Link
            href="/process"
            className="group inline-flex items-center gap-2 rounded-sm border border-accent/40 bg-white px-5 sm:px-6 py-3 sm:py-3.5 font-mono text-xs font-semibold uppercase tracking-widest text-accent shadow-sm transition-all duration-300 hover:border-accent hover:bg-accent hover:text-charcoal"
          >
            <span>Explore Detailed 6-Stage Process &amp; Deliverables</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
          </Link>
        </Reveal>
      </div>
    </Section>
  );
}
