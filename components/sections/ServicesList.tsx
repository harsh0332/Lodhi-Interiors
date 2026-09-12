import React from 'react';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Heading, Label } from '@/components/ui/Typography';
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
    <Section tone="paper" className="py-24 md:py-40" aria-label="Services">
      {/* Section Header */}
      <div className="mb-16 flex flex-col justify-between gap-4 md:mb-20 md:flex-row md:items-end">
        <div>
          <Reveal>
            <Label className="mb-2 block text-accent">Capabilities</Label>
            <Heading level={2}>Areas of Practice</Heading>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="max-w-sm font-sans text-ui-caption text-greige">
            Complete design and turnkey delivery under one roof. No contractor handoffs.
          </p>
        </Reveal>
      </div>

      {/* Typographic Services List with Hairline Rules */}
      <nav aria-label="Services list" className="border-t border-greige/30">
        <ul className="divide-y divide-greige/30">
          {SERVICES.map((service, index) => (
            <li key={service.name}>
              <Reveal delay={index * 0.04}>
                <Link
                  href={service.href}
                  className="group flex items-baseline justify-between py-6 transition-transform duration-300 ease-out hover:translate-x-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:py-8"
                >
                  <div className="flex items-baseline gap-4 sm:gap-8">
                    <span className="font-mono font-sans text-ui-caption text-greige">
                      {service.number}
                    </span>
                    <span className="font-serif text-fluid-h2 font-normal text-charcoal transition-colors duration-200 group-hover:text-accent">
                      {service.name}
                    </span>
                  </div>

                  <span className="hidden font-sans text-ui-caption uppercase tracking-[0.08em] text-greige sm:block">
                    {service.scope}
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </nav>
    </Section>
  );
}
