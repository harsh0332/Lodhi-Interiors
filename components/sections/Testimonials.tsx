import React from 'react';
import { Section } from '@/components/ui/Section';
import { Heading, Label } from '@/components/ui/Typography';
import { Reveal } from '@/components/motion/Reveal';

const TESTIMONIALS = [
  {
    quote:
      'Soumya took full charge of our Arera Colony residence. Having the studio design and execute every single detail—from the grand living ceiling and mouldings to the master suite joinery—meant total transparency and flawless execution.',
    name: 'Mr. Vishnu Gupta',
    locality: 'Arera Colony, Bhopal',
    projectType: 'Turnkey Luxury Villa',
  },
  {
    quote:
      'Soumya and the Lodhi Interiors team completed our entire 850 sq.ft. office in Malviya Nagar with remarkable attention to joinery and lighting. The turnkey delivery was completely transparent.',
    name: 'Mr. Sukarn Mishra',
    locality: 'Malviya Nagar, New Market, Bhopal',
    projectType: '850 sq.ft. Corporate Office',
  },
  {
    quote:
      "Having our corporate office built near Capital Petrol Pump under Soumya Lodhi's direct supervision was effortless. The in-house carpentry, marble reception, and finish quality exceeded expectations.",
    name: 'Mr. Vinay Yadav',
    locality: 'Near Capital Petrol Pump, Bhopal',
    projectType: 'Executive Corporate Suite',
  },
];

const DEVELOPER_COMMUNITIES = [
  'Fortune Builders',
  'Sage Group',
  'Aakriti Group',
  'Raj Homes',
  'DB City Infra',
];

/**
 * Testimonials: Real Bhopal client perspectives and developer community trust strip.
 * - Large serif quotes with small caption attribution.
 * - Strictly zero star ratings, zero avatars, zero autoplay carousels.
 */
export function Testimonials() {
  return (
    <Section
      tone="light"
      className="border-t border-greige/20 py-24 md:py-40"
      aria-label="Client Perspectives"
    >
      {/* Section Header */}
      <div className="mb-16 md:mb-24">
        <Reveal>
          <Label className="mb-2 block text-accent">Client Perspectives</Label>
          <Heading level={2}>Accountability in Practice</Heading>
        </Reveal>
      </div>

      {/* Static Multi-Column Editorial Quotes */}
      <div className="grid grid-cols-1 gap-12 divide-y divide-greige/30 lg:grid-cols-3 lg:gap-16 lg:divide-x lg:divide-y-0">
        {TESTIMONIALS.map((item, index) => (
          <div key={item.name} className={index > 0 ? 'pt-10 lg:pl-12 lg:pt-0' : ''}>
            <Reveal delay={index * 0.1}>
              <blockquote className="flex h-full flex-col justify-between">
                <p className="mb-8 font-serif text-fluid-h3 font-normal leading-[1.3] text-charcoal">
                  &ldquo;{item.quote}&rdquo;
                </p>

                <footer className="border-t border-greige/20 pt-4">
                  <cite className="not-italic">
                    <span className="block font-sans text-[0.875rem] font-medium text-charcoal">
                      {item.name}
                    </span>
                    <span className="mt-0.5 block font-sans text-ui-caption text-greige">
                      {item.locality} • {item.projectType}
                    </span>
                  </cite>
                </footer>
              </blockquote>
            </Reveal>
          </div>
        ))}
      </div>

      {/* Bhopal Developer Communities Trust Strip */}
      <div className="mt-20 border-t border-greige/20 pt-12">
        <Reveal delay={0.2}>
          <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
            <div>
              <p className="font-sans text-[0.8125rem] uppercase tracking-[0.15em] text-greige">
                Turnkey Execution Across Premier Bhopal Communities &amp; Developments
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-serif text-fluid-body text-charcoal/80 md:justify-end">
              {DEVELOPER_COMMUNITIES.map((dev, i) => (
                <React.Fragment key={dev}>
                  <span>{dev}</span>
                  {i < DEVELOPER_COMMUNITIES.length - 1 && (
                    <span className="text-greige/40 select-none">/</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
