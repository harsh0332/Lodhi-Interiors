import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { ServiceData } from '@/lib/services';
import { getAllProjects } from '@/lib/content';
import { buildServiceSchema, buildBreadcrumbSchema, buildFaqSchema } from '@/lib/schema';
import { Section } from '@/components/ui/Section';
import { Label } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { Process } from '@/components/sections/Process';
import { ClosingCTA } from '@/components/sections/ClosingCTA';
import { Reveal } from '@/components/motion/Reveal';
import { BLUR_DATA_URL, IMAGE_QUALITY } from '@/lib/images';

export async function ServiceLandingView({
  service,
  canonicalPath,
}: {
  service: ServiceData;
  canonicalPath?: string;
}) {
  const path = canonicalPath || `/${service.slug}`;
  const allProjects = await getAllProjects();

  const matchingProjects = allProjects.filter(
    (p) => p.frontmatter.projectType === service.projectType,
  );
  const isFallback = matchingProjects.length === 0;
  const displayProjects = isFallback ? allProjects.slice(0, 2) : matchingProjects.slice(0, 3);

  const serviceSchema = buildServiceSchema({
    name: service.name,
    description: service.shortDescription,
    slug: service.slug,
    serviceType: service.categoryTag,
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: service.name, url: path },
  ]);

  const faqSchema = buildFaqSchema(service.faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1. Hero */}
      <section
        className="relative flex min-h-[75vh] w-full items-center justify-center overflow-hidden bg-charcoal text-bone md:min-h-[85vh]"
        aria-label={service.heroH1}
      >
        <div className="absolute inset-0 h-full w-full">
          <Image
            src={service.heroImage}
            alt={service.heroImageAlt}
            fill
            priority
            sizes="100vw"
            quality={IMAGE_QUALITY}
            className="object-cover object-center"
          />
          <div className="pointer-events-none absolute inset-0 bg-charcoal/50" aria-hidden="true" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-container px-5 pb-20 pt-32 md:px-12 md:pb-28 md:pt-40">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-2 font-sans text-ui-caption text-bone/70"
          >
            <Link href="/" className="transition-colors hover:text-bone">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-accent-gold">{service.categoryTag}</span>
            <span aria-hidden="true">/</span>
            <span className="text-bone">{service.name}</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="mb-6 font-serif text-fluid-h1 font-normal leading-[1.08] text-bone">
              {service.heroH1}
            </h1>
            <p className="mb-8 max-w-2xl font-sans text-fluid-body leading-relaxed text-bone/90">
              {service.heroPromise}
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Button
                variant="secondary"
                tone="dark"
                href="/contact"
                className="min-h-[48px] px-8 text-[0.9375rem]"
              >
                Discuss your project
              </Button>
              <a
                href="tel:+919131569856"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 border border-accent-gold/40 bg-charcoal/70 px-5 py-2.5 font-sans text-[0.875rem] font-medium text-accent-gold backdrop-blur-sm transition-all duration-200 hover:border-accent-gold hover:bg-charcoal sm:hidden"
                aria-label="Call studio desk: 09131569856"
              >
                <svg
                  className="h-4 w-4 text-accent-gold"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>Call 09131569856</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Scope & Inclusions */}
      <Section tone="light" className="py-20 md:py-32" aria-label="Scope of Service">
        <div className="mb-12 flex flex-col justify-between gap-4 md:mb-16 md:flex-row md:items-end">
          <div>
            <Reveal>
              <Label className="mb-2 block text-accent">Scope & Inclusions</Label>
              <h2 className="font-serif text-fluid-h2 text-charcoal">What This Covers</h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm font-sans text-ui-caption text-greige">{service.scopeSummary}</p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-x-12 gap-y-4 border-t border-greige/30 pt-8 md:grid-cols-2">
          {service.scopeItems.map((item, idx) => (
            <Reveal key={item} delay={idx * 0.03}>
              <div className="flex items-start gap-4 border-b border-greige/20 py-3">
                <span className="mt-0.5 font-mono text-ui-caption text-accent" aria-hidden="true">
                  —
                </span>
                <span className="font-sans text-[0.9375rem] leading-relaxed text-charcoal/90">
                  {item}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 3. Methodology & Approach */}
      <Section
        tone="paper"
        className="border-t border-greige/20 py-20 md:py-36"
        aria-label="Our Approach"
      >
        <div className="max-w-3xl">
          <Reveal>
            <Label className="mb-2 block text-accent">Methodology</Label>
            <h2 className="mb-8 font-serif text-fluid-h2 text-charcoal">{service.approachTitle}</h2>
          </Reveal>

          <div className="space-y-6">
            {service.approachParagraphs.map((paragraph, index) => (
              <Reveal key={index} delay={index * 0.08}>
                <p className="font-sans text-[1.0625rem] leading-[1.7] text-charcoal/85">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* 4. Related Case Studies */}
      <Section
        tone="light"
        className="border-t border-greige/20 py-20 md:py-36"
        aria-label="Related Projects"
      >
        <div className="mb-16 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <Reveal>
              <Label className="mb-2 block text-accent">Case Studies</Label>
              <h2 className="font-serif text-fluid-h2 text-charcoal">
                {isFallback ? 'Adjacent Architectural Work' : 'Related Projects in Bhopal'}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm font-sans text-ui-caption text-greige">
              {isFallback
                ? 'Documented projects demonstrating our execution standards across adjacent typologies in Bhopal.'
                : 'Turnkey projects executed under this practice area in Bhopal.'}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayProjects.map((project, idx) => (
            <Reveal key={project.frontmatter.slug} delay={idx * 0.1}>
              <ProjectCard
                slug={project.frontmatter.slug}
                title={project.frontmatter.title}
                locality={project.frontmatter.locality}
                projectType={project.frontmatter.projectType}
                heroImage={project.frontmatter.heroImage}
                aspectRatio="4/3"
              />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 5. Materials and Finishes */}
      <Section
        tone="paper"
        className="border-t border-greige/20 py-20 md:py-36"
        aria-label="Materials and Finishes"
      >
        <div className="mb-16 max-w-3xl">
          <Reveal>
            <Label className="mb-2 block text-accent">Tactile Specifications</Label>
            <h2 className="mb-4 font-serif text-fluid-h2 text-charcoal">
              {service.materialsTitle}
            </h2>
            <p className="font-sans text-[1rem] leading-relaxed text-charcoal/80">
              {service.materialsProse}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {service.materialsList.map((mat, idx) => (
            <Reveal key={mat.title} delay={idx * 0.1}>
              <div className="flex h-full flex-col border border-greige/30 bg-bone p-4">
                <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden bg-paper">
                  <Image
                    src={mat.image}
                    alt={mat.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    quality={IMAGE_QUALITY}
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    className="object-cover"
                  />
                </div>
                <h3 className="mb-2 font-serif text-[1.125rem] font-medium text-charcoal">
                  {mat.title}
                </h3>
                <p className="font-sans text-ui-caption leading-relaxed text-greige">
                  {mat.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 6. Process */}
      <Process />

      {/* 7. Frequently Asked Questions */}
      <Section
        tone="light"
        className="border-t border-greige/20 py-20 md:py-36"
        aria-label="Frequently Asked Questions"
      >
        <div className="mb-12 max-w-3xl">
          <Reveal>
            <Label className="mb-2 block text-accent">Direct Answers</Label>
            <h2 className="mb-4 font-serif text-fluid-h2 text-charcoal">
              Frequently Asked Questions
            </h2>
            <p className="font-sans text-ui-caption text-greige">
              Honest explanations regarding costs, timelines, and site management in Bhopal.
            </p>
          </Reveal>
        </div>

        <div className="max-w-3xl">
          <FaqAccordion faqs={service.faqs} />
        </div>
      </Section>

      {/* 8. Related Services (3 Internal Links) */}
      <Section
        tone="paper"
        className="border-t border-greige/20 py-20 md:py-32"
        aria-label="Related Services"
      >
        <div className="mb-12">
          <Reveal>
            <Label className="mb-2 block text-accent">Connected Disciplines</Label>
            <h2 className="font-serif text-fluid-h2 text-charcoal">Related Services in Bhopal</h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {service.relatedServices.map((related, idx) => (
            <Reveal key={related.slug} delay={idx * 0.1}>
              <Link
                href={`/${related.slug}`}
                className="group block border border-greige/30 bg-bone p-6 transition-colors hover:border-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span className="mb-2 block font-serif text-[1.25rem] font-medium text-charcoal transition-colors group-hover:text-accent">
                  {related.name}
                </span>
                <p className="mb-4 font-sans text-ui-caption leading-relaxed text-greige">
                  {related.description}
                </p>
                <span className="inline-block font-sans text-[0.8125rem] font-medium uppercase tracking-wider text-accent">
                  Explore Service &rarr;
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 9. Closing Call to Action */}
      <ClosingCTA />
    </>
  );
}
