import React from 'react';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Heading, Label } from '@/components/ui/Typography';
import { Reveal } from '@/components/motion/Reveal';

const STEPS = [
  {
    number: '01',
    title: 'Consultation',
    description:
      'Comprehensive brief analysis exploring lifestyle patterns, architectural boundaries, and realistic timeline goals.',
  },
  {
    number: '02',
    title: 'Concept & 3D',
    description:
      'Volumetric layout development, circulation studies, and high-fidelity photometric spatial renders.',
  },
  {
    number: '03',
    title: 'Material Palette',
    description:
      'Tactile curation of natural stones, fluted timbers, architectural metals, and custom textiles.',
  },
  {
    number: '04',
    title: 'Execution',
    description:
      'Turnkey site custody managing structural civil works, electrical integration, and in-house joinery.',
  },
  {
    number: '05',
    title: 'Styling',
    description:
      'Curated lighting balance, artwork positioning, custom upholstery, and acoustic layering.',
  },
  {
    number: '06',
    title: 'Handover',
    description:
      'Rigorous snagging clearance, quality benchmarking, and turnkey delivery of the finished space.',
  },
];

/**
 * Process: Six sequenced and numbered steps with one-line descriptions.
 * Horizontal sequence on desktop, vertical list on mobile.
 */
export function Process() {
  return (
    <Section
      tone="travertine"
      className="border-t border-greige/20 py-24 md:py-40"
      aria-label="Our Process"
    >
      {/* Section Header */}
      <div className="mb-16 flex flex-col justify-between gap-4 md:mb-24 md:flex-row md:items-end">
        <div>
          <Reveal>
            <Label className="mb-2 block text-accent">Methodology</Label>
            <Heading level={2}>The Turnkey Sequence</Heading>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="max-w-sm font-sans text-ui-caption text-charcoal/70">
            Six disciplined stages ensuring zero disconnect between architectural concept and built
            reality.
          </p>
        </Reveal>
      </div>

      {/* Sequenced 6-Step Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {STEPS.map((step, index) => (
          <Reveal key={step.number} delay={index * 0.05}>
            <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-sm border border-greige/30 bg-white p-7 sm:p-8 shadow-luxury transition-all duration-300 hover:-translate-y-1 hover:border-accent-gold/60 hover:shadow-glow-subtle">
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-accent-gold/0 via-accent-gold to-accent-gold/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div>
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded border border-accent/25 bg-accent/10 px-2.5 py-0.5 font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                    STAGE {step.number}
                  </span>
                  <span className="font-mono text-[0.6875rem] font-medium text-greige">
                    Turnkey
                  </span>
                </div>
                <h3 className="mb-3 font-serif text-[1.25rem] font-medium text-charcoal transition-colors duration-200 group-hover:text-accent">
                  {step.title}
                </h3>
                <p className="font-sans text-[0.9375rem] leading-relaxed text-charcoal/75">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 border-t border-greige/20 pt-4 flex items-center justify-between">
                <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-greige group-hover:text-accent transition-colors">
                  0{index + 1} of 06
                </span>
                <span className="font-mono text-xs text-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200">
                  &rarr;
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Process CTA Link */}
      <div className="mt-14 flex items-center justify-center">
        <Reveal delay={0.3}>
          <Link
            href="/process"
            className="group inline-flex items-center gap-2 rounded-sm border border-accent/40 bg-white px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-widest text-accent shadow-sm transition-all duration-300 hover:border-accent hover:bg-accent hover:text-charcoal"
          >
            <span>Explore Detailed 6-Stage Process &amp; Deliverables</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
          </Link>
        </Reveal>
      </div>
    </Section>
  );
}
