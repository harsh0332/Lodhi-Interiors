import React from 'react';
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
      tone="light"
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
          <p className="max-w-sm font-sans text-ui-caption text-greige">
            Six disciplined stages ensuring zero disconnect between architectural concept and built
            reality.
          </p>
        </Reveal>
      </div>

      {/* Sequenced 6-Step Grid */}
      <div className="grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
        {STEPS.map((step, index) => (
          <Reveal key={step.number} delay={index * 0.05}>
            <div className="flex h-full flex-col border-t border-greige/30 pt-6">
              <span className="mb-3 block font-mono text-ui-caption text-accent">
                {step.number}
              </span>
              <h3 className="mb-3 font-serif text-fluid-h3 font-medium text-charcoal">
                {step.title}
              </h3>
              <p className="font-sans text-[0.9375rem] leading-relaxed text-charcoal/80">
                {step.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
