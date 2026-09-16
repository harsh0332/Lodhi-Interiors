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
    detail: 'Complete private residences & villas crafted from concept to physical handover.',
    number: '01',
  },
  {
    name: 'Luxury homes',
    href: '/services#luxury-homes',
    scope: 'Bespoke Architecture',
    detail: 'Waterfront estates & penthouses with natural stone, lime washes & custom millwork.',
    number: '02',
  },
  {
    name: 'Turnkey interiors',
    href: '/services#turnkey',
    scope: 'Single-Source Delivery',
    detail: 'Zero contractor handoffs with unconditional in-house trade supervision & accountability.',
    number: '03',
  },
  {
    name: 'Modular kitchens',
    href: '/services#modular-kitchens',
    scope: 'In-House Joinery',
    detail: 'IS 710 marine plywood carcasses with German hardware & 1.5mm shadowline tolerances.',
    number: '04',
  },
  {
    name: 'Office interiors',
    href: '/services#office',
    scope: 'Commercial Workplaces',
    detail: 'High-focus corporate headquarters, executive cabins & calibrated acoustic architecture.',
    number: '05',
  },
  {
    name: 'Retail and showrooms',
    href: '/services#retail',
    scope: 'Brand Environments',
    detail: 'Precision display joinery & museum-grade lighting for luxury retail & jewelry boutiques.',
    number: '06',
  },
  {
    name: 'Hospitality and restaurants',
    href: '/services#hospitality',
    scope: 'Experiential Spaces',
    detail: 'Atmospheric dining interiors with bespoke banquettes, moody lighting & acoustic comfort.',
    number: '07',
  },
];

/**
 * ServicesList: Practice capabilities list engineered for high-contrast clarity on both mobile and desktop.
 * On mobile: Structured architectural cards with visible numbers, scope pills, and deliverable highlights.
 * On desktop: Elegant typographic index with hairline rules and hover slide interactions.
 */
export function ServicesList() {
  return (
    <Section tone="umber" className="py-16 sm:py-24 md:py-40 border-t border-white/10" aria-label="Services">
      {/* Section Header */}
      <div className="mb-10 sm:mb-16 md:mb-20 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <Reveal>
            <span className="mb-2.5 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-accent-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-gold" />
              Capabilities
            </span>
            <Heading level={2} className="text-bone">Areas of Practice</Heading>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="max-w-sm font-sans text-xs sm:text-ui-caption text-bone/70 leading-relaxed">
            Complete design and turnkey delivery under one roof. No contractor handoffs.
          </p>
        </Reveal>
      </div>

      {/* Services List: Mobile Elevated Cards / Desktop Hairline Rows */}
      <nav aria-label="Services list" className="space-y-3.5 sm:space-y-0 sm:border-t sm:border-white/10">
        <ul className="space-y-3.5 sm:space-y-0 sm:divide-y sm:divide-white/10">
          {SERVICES.map((service, index) => (
            <li key={service.name}>
              <Reveal delay={index * 0.04}>
                <Link
                  href={service.href}
                  className="group block rounded-sm border border-white/10 bg-[#191714] p-5 shadow-sm transition-all duration-300 hover:border-accent-gold/50 sm:border-0 sm:bg-transparent sm:p-0 sm:py-7 sm:hover:bg-white/[0.03] sm:hover:translate-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
                >
                  {/* Top Bar on Mobile / Inline Header on Desktop */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 sm:gap-6">
                      <span className="font-mono text-xs font-semibold text-accent-gold bg-accent/20 border border-accent/35 px-2.5 py-0.5 rounded">
                        {service.number}
                      </span>
                      {/* Mobile Scope Pill */}
                      <span className="inline-block sm:hidden font-mono text-[0.6875rem] font-semibold uppercase tracking-wider text-accent-gold bg-accent/15 border border-accent/30 px-2.5 py-0.5 rounded-full">
                        {service.scope}
                      </span>
                    </div>

                    {/* Mobile Arrow */}
                    <span className="inline-block sm:hidden font-mono text-base text-accent-gold group-hover:translate-x-1 transition-transform">
                      &rarr;
                    </span>
                  </div>

                  {/* Title & Desktop Scope */}
                  <div className="mt-3.5 flex items-baseline justify-between gap-4 sm:mt-0">
                    <h3 className="font-serif text-[1.25rem] sm:text-fluid-h2 font-medium text-bone transition-colors duration-200 group-hover:text-accent-gold">
                      {service.name}
                    </h3>

                    {/* Desktop Scope badge & arrow */}
                    <div className="hidden sm:flex items-center gap-3">
                      <span className="font-mono text-[0.6875rem] font-semibold uppercase tracking-wider text-accent-gold bg-accent/15 border border-accent/30 px-3 py-1 rounded-full transition-all group-hover:border-accent-gold/60">
                        {service.scope}
                      </span>
                      <span className="font-mono text-base text-accent-gold opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200">
                        &rarr;
                      </span>
                    </div>
                  </div>

                  {/* 1-Line Deliverable Detail */}
                  <p className="mt-2 font-sans text-xs sm:text-[0.875rem] text-bone/65 leading-relaxed sm:max-w-2xl">
                    {service.detail}
                  </p>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </nav>
    </Section>
  );
}
