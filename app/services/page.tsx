import type { Metadata } from 'next';
import { getAllServices } from '@/lib/services';
import { buildBreadcrumbSchema } from '@/lib/schema';
import { Section } from '@/components/ui/Section';
import { Display, Body, Label } from '@/components/ui/Typography';
import { Reveal } from '@/components/motion/Reveal';
import { ServiceHoverList } from '@/components/sections/ServiceHoverList';
import { ClosingCTA } from '@/components/sections/ClosingCTA';

import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Interior Design & Turnkey Services in Bhopal | Lodhi Interiors',
  description:
    'Comprehensive interior design and turnkey execution services in Bhopal. Residential villas, modular kitchens, corporate offices, and hospitality environments.',
  path: '/services',
});

export default function ServicesHubPage() {
  const services = getAllServices();

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* 1. Header & Editorial Introduction */}
      <div className="pt-28 md:pt-36">
        <Section tone="light" className="pb-16 pt-12 md:pb-24">
          <Reveal>
            <Label className="mb-3 block text-accent">Areas of Practice</Label>
            <Display className="mb-6 max-w-4xl">
              Interior Design & Turnkey Practice in Bhopal
            </Display>
            <Body className="max-w-3xl text-[1.125rem] leading-relaxed text-charcoal/80">
              From private residential villas in Arera Colony to executive commercial headquarters
              in MP Nagar, Lodhi Interiors bridges architectural concept with on-site turnkey
              execution. We eliminate contractor handoffs, delivering every civil intervention,
              electrical schematic, and custom joinery detail under a single accountable roof.
            </Body>
          </Reveal>
        </Section>
      </div>

      {/* 2. Typographic Services Index with Desktop Hover Preview */}
      <Section tone="light" className="pb-28 pt-0 md:pb-40">
        <ServiceHoverList services={services} />
      </Section>

      {/* 3. Turnkey Studio Advantage Band */}
      <Section tone="paper" className="border-t border-greige/20 py-20 md:py-32">
        <div className="max-w-3xl">
          <Reveal>
            <Label className="mb-2 block text-accent">Studio Standard</Label>
            <h2 className="mb-6 font-serif text-fluid-h2 text-charcoal">
              Single-Source Project Custody
            </h2>
            <p className="mb-6 font-sans text-[1rem] leading-relaxed text-charcoal/80">
              Every commission undertaken by our studio is managed end-to-end. We do not provide
              unverified decorative drawings for outside bidding; our teams supervise procurement,
              civil adjustments, joinery fabrication, and final snagging with continuous daily
              presence in Bhopal.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* 4. Closing CTA */}
      <ClosingCTA />
    </>
  );
}
