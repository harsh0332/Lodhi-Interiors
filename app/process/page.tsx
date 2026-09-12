import type { Metadata } from 'next';
import Image from 'next/image';
import { buildBreadcrumbSchema, buildFaqSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';
import { env } from '@/lib/env';
import { Section } from '@/components/ui/Section';
import { Display, Label, Body } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';
import { ProcessStages } from '@/components/sections/ProcessStages';
import { FaqAccordion } from '@/components/ui/FaqAccordion';

export const metadata: Metadata = buildMetadata({
  title: 'Our process — how an interior project runs | Lodhi Interiors',
  description:
    'A transparent six-stage turnkey design journey from site visit to handover. Understand realistic timelines, client inputs, and execution standards in Bhopal.',
  path: '/process',
});

const CLIENT_NEEDS = [
  {
    number: '01',
    title: 'Architectural Drawings or Physical Access',
    description:
      'If you have original structural or civil blueprints from your builder, they save measurement time. If not, we require full, unhindered access to the site in Bhopal to conduct our own laser survey.',
  },
  {
    number: '02',
    title: 'A Realistic Budget Framework',
    description:
      'We do not design in an abstract vacuum. An honest budget parameter allows us to specify genuine Italian marble, Indian stones, or calibrated marine ply from day one, rather than redrafting after costing.',
  },
  {
    number: '03',
    title: 'Decisive Sign-Off Timelines',
    description:
      'Turnkey execution schedules are vulnerable to decision stalls. When 3D visualisations and physical material boards are presented, consolidated feedback ensures our joinery teams begin fabrication on schedule.',
  },
  {
    number: '04',
    title: 'Uncompromised Site Custody',
    description:
      'During physical execution, our site supervisors require complete custody of the space. Allowing uncoordinated outside trades on site compromises laser alignments, waterproofing membranes, and security.',
  },
];

const PROCESS_FAQS = [
  {
    question: 'How long does a complete turnkey interior project typically take in Bhopal?',
    answer:
      'Depending on square footage and structural alteration scope, full residential turnkey commissions require 16 to 26 weeks [VERIFY: scope dependent] from initial design sign-off to final key handover. High-focus modular kitchens typically complete in 6 to 8 weeks, while 4,000+ sq.ft. villas in Arera Colony or Shahpura take 18 to 26 weeks. We build an honest buffer for monsoon transport and central Indian humidity curing.',
  },
  {
    question: 'What is the phased payment milestone structure?',
    answer:
      'Payments are structured across verifiable physical milestones rather than arbitrary calendar dates. Engagements start with a design retainer for spatial layouts and 3D visualisations. Following contract and BOQ sign-off, a mobilization advance funds raw material purchases (IS 710 marine ply, stone slabs). Subsequent stage payments clear upon completion of civil/MEP infrastructure, joinery carcass installation, finish installation, and final snag-free handover.',
  },
  {
    question: 'What happens if we want to change a layout or material detail mid-project?',
    answer:
      'Because design and execution are under one roof, we accommodate variations with minimal disruption. Any requested modification is evaluated by our engineering lead for structural feasibility, schedule impact, and cost adjustments. We issue a written, transparent Variation Order (VO) with exact line-item pricing and timeline adjustments before touching site work.',
  },
  {
    question:
      'What happens if a specified natural stone or veneer becomes unavailable at the quarry?',
    answer:
      'Natural stones and book-matched timber veneers are natural materials. If a specific batch from Rajasthan or imported quarries faces shipment delays or fails on-site grading, we immediately source two to three physically equivalent alternatives, present actual cut slabs in our studio, and seek your physical sign-off before proceeding. We never substitute inferior grades without consent.',
  },
  {
    question: 'What warranty or defect liability is provided on workmanship and joinery?',
    answer:
      'We provide a 12-month post-handover defect liability period (subject to contractual agreement) covering joinery alignment, door hardware calibration, and plumbing seals. Hardware elements such as Austrian Blum lift systems carry their respective manufacturer warranties (often up to 10 years). Any natural settlement or micro-snag occurring within the warranty window is addressed directly by our in-house site team.',
  },
  {
    question:
      'Do we need to hire separate contractors for electrical, plumbing, or false ceilings?',
    answer:
      'No. Lodhi Interiors is a single-source turnkey studio. We take complete responsibility for all civil alterations, plumbing stacks, electrical cabling, HVAC ducting, bespoke joinery, painting, and architectural lighting. You have one contract, one project manager, and zero trade coordination friction.',
  },
];

export default function ProcessPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Process', url: '/process' },
  ]);

  const faqSchema = buildFaqSchema(PROCESS_FAQS);

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1. Opening / Header: Single H1 "How a project runs" + Intro */}
      <div className="pt-28 md:pt-36">
        <Section tone="light" className="pb-16 pt-10 md:pb-24">
          <Reveal>
            <Label className="mb-3 block text-accent">Methodology &amp; Standards</Label>
            <Display as="h1" className="mb-6 max-w-4xl">
              How a project runs
            </Display>
            <Body className="max-w-3xl text-[1.125rem] leading-relaxed text-charcoal/85 md:text-[1.25rem]">
              Every commission undertaken by Lodhi Interiors follows a disciplined, six-stage
              turnkey sequence. We establish fixed scopes, clear deliverables, and predictable
              timelines from day one—eliminating contractor friction and unexpected cost
              escalations.
            </Body>
          </Reveal>
        </Section>
      </div>

      {/* 2. The Six Stages: Pinned desktop navigation + detail scroll */}
      <Section tone="light" className="border-t border-greige/20 pb-20 pt-0 md:pb-36">
        <div className="pt-12 md:pt-16">
          <ProcessStages />
        </div>
      </Section>

      {/* Real On-Site Custody & Craftsmanship in Bhopal */}
      <Section tone="paper" className="border-t border-greige/20 py-20 md:py-32">
        <div className="mb-14 max-w-3xl">
          <Reveal>
            <Label className="mb-2 block text-accent">On-Site Standards</Label>
            <h2 className="mb-4 font-serif text-fluid-h2 text-charcoal">
              Single-Source Trade Custody in Action
            </h2>
            <p className="font-sans text-[1rem] leading-relaxed text-charcoal/80">
              Unlike studios that subcontract to unvetted third parties, our master carpenters,
              stone masons, and site engineers maintain daily presence on site across Bhopal.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <Reveal delay={0.05}>
            <div className="group flex flex-col">
              <div className="relative aspect-[3/4] overflow-hidden bg-greige/20">
                <Image
                  src="/images/projects/site-bare-shell-survey.jpg"
                  alt="Bare shell duplex site survey in Bhopal"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-4 border-t border-greige/20 pt-3">
                <span className="block font-mono text-[0.75rem] uppercase tracking-wider text-accent">
                  Stage 01 • Site Survey
                </span>
                <p className="mt-1 font-serif text-[1.125rem] text-charcoal">
                  Bare-Shell Structural Survey
                </p>
                <p className="mt-1 font-sans text-ui-caption text-greige">
                  Laser measurement of column spans, slab deflections, and electrical conduits.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="group flex flex-col">
              <div className="relative aspect-[3/4] overflow-hidden bg-greige/20">
                <Image
                  src="/images/projects/craft-moulding-installation.jpg"
                  alt="Master craftsman fitting architectural mouldings in Bhopal"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-4 border-t border-greige/20 pt-3">
                <span className="block font-mono text-[0.75rem] uppercase tracking-wider text-accent">
                  Stage 04 • Precision Joinery
                </span>
                <p className="mt-1 font-serif text-[1.125rem] text-charcoal">
                  Architectural Moulding Installation
                </p>
                <p className="mt-1 font-sans text-ui-caption text-greige">
                  In-house joiners aligning panel datums with zero-gap precision.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="group flex flex-col">
              <div className="relative aspect-[3/4] overflow-hidden bg-greige/20">
                <Image
                  src="/images/projects/craft-stepped-arch-joinery.jpg"
                  alt="Turnkey joinery team fitting custom stepped arch and vitrine"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-4 border-t border-greige/20 pt-3">
                <span className="block font-mono text-[0.75rem] uppercase tracking-wider text-accent">
                  Stage 05 • Architectural Fit-Out
                </span>
                <p className="mt-1 font-serif text-[1.125rem] text-charcoal">
                  Stepped Archways &amp; Vitrines
                </p>
                <p className="mt-1 font-sans text-ui-caption text-greige">
                  Custom millwork and warm concealed cove illumination executed on site.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 3. What We Need From You: Dedicated client commitments section */}
      <Section tone="paper" className="border-t border-greige/20 py-20 md:py-32">
        <div className="mb-16 max-w-3xl">
          <Reveal>
            <Label className="mb-2 block text-accent">Client Partnership</Label>
            <h2 className="mb-4 font-serif text-fluid-h2 text-charcoal">What We Need From You</h2>
            <p className="font-sans text-[1rem] leading-relaxed text-charcoal/80">
              An architectural commission is a collaboration. To maintain our execution standards
              and deliver on time in Bhopal, we ask our clients for four clear commitments.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          {CLIENT_NEEDS.map((need, idx) => (
            <Reveal key={need.title} delay={idx * 0.05}>
              <div className="flex h-full flex-col border border-greige/30 bg-bone p-8">
                <span className="mb-3 block font-mono text-ui-label text-accent">
                  {need.number}
                </span>
                <h3 className="mb-3 font-serif text-[1.25rem] font-medium text-charcoal">
                  {need.title}
                </h3>
                <p className="font-sans text-[0.9375rem] leading-relaxed text-charcoal/80">
                  {need.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 4. Frequently Asked Questions: Accessible FAQ Accordion */}
      <Section tone="light" className="border-t border-greige/20 py-20 md:py-36">
        <div className="mb-16 max-w-3xl">
          <Reveal>
            <Label className="mb-2 block text-accent">Transparent Answers</Label>
            <h2 className="mb-4 font-serif text-fluid-h2 text-charcoal">
              Frequently Asked Questions
            </h2>
            <p className="font-sans text-ui-caption text-greige">
              Direct, unembellished answers regarding costs, delays, mid-project changes, and
              workmanship liability in Bhopal.
            </p>
          </Reveal>
        </div>

        <div className="max-w-3xl">
          <FaqAccordion faqs={PROCESS_FAQS} />
        </div>
      </Section>

      {/* 5. Closing Call to Action */}
      <Section
        tone="dark"
        className="border-t border-greige/20 py-24 md:py-36"
        aria-label="Commission your project"
      >
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal>
            <Label className="mb-3 block text-accent">Ready to Begin</Label>
            <h2 className="mb-6 font-serif text-fluid-display font-normal text-bone">
              Start your project with Lodhi Interiors.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mx-auto mb-10 max-w-xl font-sans text-[1.0625rem] leading-relaxed text-bone/80">
              Schedule an on-site consultation or bring your architectural floor plans to our Bhopal
              studio to discuss spatial feasibility and preliminary costing.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <Button
                variant="secondary"
                tone="dark"
                href="/contact"
                className="min-h-[48px] w-full px-8 text-[0.9375rem] sm:w-auto"
              >
                Schedule Consultation
              </Button>
              <Button
                variant="primary"
                tone="dark"
                href={`https://wa.me/${env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[48px] w-full text-[0.9375rem] text-bone/90 hover:text-bone sm:w-auto"
              >
                WhatsApp Consultation
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
