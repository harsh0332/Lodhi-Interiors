import type { Metadata } from 'next';
import { env } from '@/lib/env';
import {
  buildContactPageSchema,
  buildLocalBusinessSchema,
  buildBreadcrumbSchema,
} from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { Display, Label } from '@/components/ui/Typography';
import { Reveal } from '@/components/motion/Reveal';
import { ContactForm } from '@/components/sections/ContactForm';
import { LazyStudioMap } from '@/components/ui/LazyStudioMap';

export const metadata: Metadata = buildMetadata({
  title: 'Contact — start your interior project in Bhopal | Lodhi Interiors',
  description:
    'Start your interior design or turnkey project in Bhopal with Lodhi Interiors. Connect directly with founder Soumya Lodhi via WhatsApp, phone, or inquiry form.',
  path: '/contact',
});

export default function ContactPage() {
  const contactPageSchema = buildContactPageSchema();
  const localBusinessSchema = buildLocalBusinessSchema();
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' },
  ]);

  const prefilledWhatsApp = encodeURIComponent(
    'Hello Soumya, I would like to discuss an interior project in Bhopal.',
  );

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* 1. Opening Section: H1 "Start your project" + Expectation Setting */}
      <div className="pt-28 md:pt-36">
        <Section tone="light" className="pb-12 pt-10 md:pb-16">
          <Reveal>
            <Label className="mb-3 block text-accent">Direct Practice Line · Bhopal</Label>
            <Display as="h1" className="mb-4 max-w-4xl">
              Start your project
            </Display>
            <p className="max-w-3xl font-sans text-[1.125rem] leading-relaxed text-charcoal/85 md:text-[1.25rem]">
              Soumya Lodhi reviews every inquiry and responds within one working day. Our initial
              conversation focuses strictly on spatial scope, technical feasibility, and budget
              alignment before any commercial commitment is made.
            </p>
          </Reveal>

          {/* 2. Three Direct Routes: WhatsApp, Telephone, Email */}
          <div className="mt-10 grid grid-cols-1 gap-4 md:mt-14 md:grid-cols-3 md:gap-6">
            {/* Route A: WhatsApp */}
            <Reveal delay={0.05}>
              <a
                href={`https://wa.me/${env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${prefilledWhatsApp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block border border-greige/30 bg-bone p-6 transition-all duration-200 hover:border-charcoal hover:bg-paper/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-[0.8125rem] font-semibold uppercase tracking-wider text-accent">
                    Instant Channel
                  </span>
                  <span className="font-sans text-xs text-greige transition-colors group-hover:text-charcoal">
                    &rarr;
                  </span>
                </div>
                <h3 className="mb-1 font-serif text-[1.25rem] font-medium text-charcoal">
                  WhatsApp Direct
                </h3>
                <p className="mb-3 font-sans text-xs leading-relaxed text-charcoal/70">
                  Fastest route for sharing architectural floor plans, site sketches, or photos.
                </p>
                <span className="font-mono text-xs font-medium text-charcoal">
                  {env.NEXT_PUBLIC_PHONE_NUMBER}
                </span>
              </a>
            </Reveal>

            {/* Route B: Direct Telephone */}
            <Reveal delay={0.1}>
              <a
                href={`tel:${env.NEXT_PUBLIC_PHONE_NUMBER}`}
                className="group block border border-greige/30 bg-bone p-6 transition-all duration-200 hover:border-charcoal hover:bg-paper/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-[0.8125rem] font-semibold uppercase tracking-wider text-accent">
                    Voice Call
                  </span>
                  <span className="font-sans text-xs text-greige transition-colors group-hover:text-charcoal">
                    &rarr;
                  </span>
                </div>
                <h3 className="mb-1 font-serif text-[1.25rem] font-medium text-charcoal">
                  Studio Phone
                </h3>
                <p className="mb-3 font-sans text-xs leading-relaxed text-charcoal/70">
                  Direct voice conversation regarding upcoming residential or commercial spaces.
                </p>
                <span className="font-mono text-xs font-medium text-charcoal">
                  Mon — Sat: 10 AM — 7 PM
                </span>
              </a>
            </Reveal>

            {/* Route C: Studio Email */}
            <Reveal delay={0.15}>
              <a
                href="mailto:hello@lodhiinteriors.com"
                className="group block border border-greige/30 bg-bone p-6 transition-all duration-200 hover:border-charcoal hover:bg-paper/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-[0.8125rem] font-semibold uppercase tracking-wider text-accent">
                    Formal Briefs
                  </span>
                  <span className="font-sans text-xs text-greige transition-colors group-hover:text-charcoal">
                    &rarr;
                  </span>
                </div>
                <h3 className="mb-1 font-serif text-[1.25rem] font-medium text-charcoal">
                  Studio Email
                </h3>
                <p className="mb-3 font-sans text-xs leading-relaxed text-charcoal/70">
                  For formal developer RFP dossiers, tenders, and multi-file drawings.
                </p>
                <span className="font-mono text-xs font-medium text-charcoal">
                  hello@lodhiinteriors.com
                </span>
              </a>
            </Reveal>
          </div>
        </Section>
      </div>

      {/* 3. Inquiry Form & Studio NAP / Map Section */}
      <Section tone="light" className="border-t border-greige/20 pb-24 pt-4 md:pb-36">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Main Inquiry Form Column */}
          <div className="lg:col-span-7 xl:col-span-8">
            <Reveal>
              <div className="mb-6">
                <span className="mb-1 block font-mono text-ui-caption uppercase tracking-wider text-accent">
                  Detailed Feasibility
                </span>
                <h2 className="font-serif text-fluid-h2 text-charcoal">
                  Project Specification Form
                </h2>
                <p className="mt-1 font-sans text-ui-caption text-greige">
                  Takes two minutes. Enables us to prepare relevant material samples and case
                  studies prior to our first call.
                </p>
              </div>

              <ContactForm />
            </Reveal>
          </div>

          {/* Studio Details & Lazy Map Column */}
          <div className="lg:sticky lg:top-36 lg:col-span-5 xl:col-span-4">
            <Reveal delay={0.1}>
              <LazyStudioMap />
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
