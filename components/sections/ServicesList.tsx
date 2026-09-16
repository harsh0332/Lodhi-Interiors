import React from 'react';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Typography';
import { Reveal } from '@/components/motion/Reveal';

const SERVICES = [
  {
    name: 'Residential interiors',
    href: '/services#residential',
    scope: 'Turnkey & Design',
    number: '01',
  },
  {
    name: 'Luxury homes',
    href: '/services#luxury-homes',
    scope: 'Bespoke Architecture',
    number: '02',
  },
  {
    name: 'Turnkey interiors',
    href: '/services#turnkey',
    scope: 'Single-Source Delivery',
    number: '03',
  },
  {
    name: 'Modular kitchens',
    href: '/services#modular-kitchens',
    scope: 'In-House Joinery',
    number: '04',
  },
  {
    name: 'Office interiors',
    href: '/services#office',
    scope: 'Commercial Workplaces',
    number: '05',
  },
  {
    name: 'Retail and showrooms',
    href: '/services#retail',
    scope: 'Brand Environments',
    number: '06',
  },
  {
    name: 'Hospitality and restaurants',
    href: '/services#hospitality',
    scope: 'Experiential Spaces',
    number: '07',
  },
];

/**
 * ServicesList: Typographic services list with hairline rules and hover indents.
 * Strictly typographic; zero icon cards.
 */
export function ServicesList() {
  return (
    <Section tone="umber" className="py-24 md:py-40 border-t border-white/10" aria-label="Services">
      {/* Section Header */}
      <div className="mb-16 flex flex-col justify-between gap-4 md:mb-20 md:flex-row md:items-end">
        <div>
          <Reveal>
            <span className="mb-3 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-accent-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-gold" />
              Capabilities
            </span>
            <Heading level={2} className="text-bone">Areas of Practice</Heading>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="max-w-sm font-sans text-ui-caption text-bone/70">
            Complete design and turnkey delivery under one roof. No contractor handoffs.
          </p>
        </Reveal>
      </div>

      {/* Typographic Services List with Hairline Rules */}
      <nav aria-label="Services list" className="border-t border-white/10">
        <ul className="divide-y divide-white/10">
          {SERVICES.map((service, index) => (
            <li key={service.name}>
              <Reveal delay={index * 0.04}>
                <Link
                  href={service.href}
                  className="group flex items-center justify-between py-6 sm:py-8 px-2 -mx-2 rounded-sm transition-all duration-300 ease-out hover:bg-white/[0.03] hover:translate-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
                >
                  <div className="flex items-baseline gap-4 sm:gap-8">
                    <span className="font-mono text-xs font-medium text-accent-gold/80 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                      {service.number}
                    </span>
                    <span className="font-serif text-fluid-h2 font-normal text-bone transition-colors duration-200 group-hover:text-accent-gold">
                      {service.name}
                    </span>
                  </div>

                  <div className="hidden sm:flex items-center gap-3">
                    <span className="font-mono text-[0.6875rem] font-semibold uppercase tracking-wider text-accent-gold bg-accent/15 border border-accent/30 px-3 py-1 rounded-full transition-all group-hover:border-accent-gold/60">
                      {service.scope}
                    </span>
                    <span className="font-mono text-base text-accent-gold opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200">
                      &rarr;
                    </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </nav>
    </Section>
  );
}
