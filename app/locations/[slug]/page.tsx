import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getAllLocalities, getLocalityBySlug } from '@/lib/locations';
import { getProjectBySlug } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import {
  buildLocalityPageSchema,
  buildLocalBusinessSchema,
  buildBreadcrumbSchema,
} from '@/lib/schema';
import { Section } from '@/components/ui/Section';
import { Display, Label } from '@/components/ui/Typography';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { Reveal } from '@/components/motion/Reveal';
import { ClosingCTA } from '@/components/sections/ClosingCTA';
import { IMAGE_QUALITY } from '@/lib/images';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const localities = getAllLocalities();
  return localities.map((loc) => ({
    slug: loc.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const locality = getLocalityBySlug(slug);

  if (!locality) {
    return {};
  }

  return buildMetadata({
    title: locality.metaTitle,
    description: locality.metaDescription,
    path: `/locations/${locality.slug}`,
    ogImage: locality.heroImage,
  });
}

export default async function LocalityPage({ params }: PageProps) {
  const { slug } = await params;
  const locality = getLocalityBySlug(slug);

  if (!locality) {
    notFound();
  }

  // Fetch verified real projects
  const projects = (
    await Promise.all(locality.projectSlugs.map((pSlug) => getProjectBySlug(pSlug)))
  ).filter(Boolean);

  // Structured data
  const localitySchema = buildLocalityPageSchema(locality);
  const localBusinessSchema = buildLocalBusinessSchema();
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Practice Areas', url: '/locations' },
    { name: locality.name, url: `/locations/${locality.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([localitySchema, localBusinessSchema, breadcrumbSchema]),
        }}
      />

      {/* 1. Locality Hero */}
      <Section tone="light" className="pb-16 pt-32 md:pb-20 md:pt-44">
        <div className="max-w-4xl">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-6">
              <Link
                href="/locations"
                className="inline-flex items-center gap-2 font-sans text-ui-caption text-greige transition-colors hover:text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span aria-hidden="true">&larr;</span>
                <span>All Practice Areas</span>
              </Link>
            </nav>

            <Label className="mb-3 block text-accent">Bhopal Practice Area</Label>
            <Display as="h1" className="mb-6">
              {locality.name}
            </Display>
            <p className="font-sans text-[1.125rem] leading-relaxed text-charcoal/80 md:text-[1.25rem]">
              {locality.tagline}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Hero Image */}
      <div className="relative aspect-[16/9] max-h-[600px] w-full overflow-hidden bg-charcoal">
        <Image
          src={locality.heroImage}
          alt={locality.heroImageAlt}
          fill
          priority
          sizes="100vw"
          quality={IMAGE_QUALITY}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/15" />
      </div>

      {/* 2. Architectural Narrative (400+ Words) */}
      <Section
        tone="paper"
        className="py-20 md:py-32"
        aria-label={`Architectural Practice in ${locality.name}`}
      >
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <Label className="mb-3 block text-accent">Neighborhood Context</Label>
            <h2 className="mb-8 font-serif text-fluid-h2 text-charcoal">
              {locality.narrative.heading}
            </h2>
          </Reveal>

          <div className="space-y-6 font-sans text-[1rem] leading-relaxed text-charcoal/85 md:text-[1.0625rem]">
            {locality.narrative.paragraphs.map((p, idx) => (
              <Reveal key={idx} delay={idx * 0.05}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* 3. Key Architectural & Environmental Factors */}
      <Section
        tone="light"
        className="border-t border-greige/20 py-20 md:py-32"
        aria-label="Environmental and Structural Considerations"
      >
        <div className="mb-14 max-w-3xl">
          <Reveal>
            <Label className="mb-3 block text-accent">Site Diagnostics</Label>
            <h2 className="font-serif text-fluid-h2 text-charcoal">Locality Engineering Factors</h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {locality.keyFactors.map((factor, idx) => (
            <Reveal key={factor.label} delay={idx * 0.1}>
              <div className="flex h-full flex-col border border-greige/30 bg-bone p-6 md:p-8">
                <span className="mb-3 block font-mono text-ui-caption text-accent">
                  Factor 0{idx + 1}
                </span>
                <h3 className="mb-3 font-serif text-[1.25rem] font-medium text-charcoal">
                  {factor.label}
                </h3>
                <p className="font-sans text-ui-caption leading-relaxed text-charcoal/70">
                  {factor.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 4. Real Completed Projects in this Locality */}
      {projects.length > 0 && (
        <Section
          tone="paper"
          className="border-t border-greige/20 py-20 md:py-32"
          aria-label={`Executed Projects in ${locality.name}`}
        >
          <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <Reveal>
                <Label className="mb-2 block text-accent">Executed Portfolio</Label>
                <h2 className="font-serif text-fluid-h2 text-charcoal">
                  Delivered Work in {locality.name}
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <Link
                href="/work"
                className="font-sans text-ui-caption font-medium text-charcoal transition-colors hover:text-accent"
              >
                View complete portfolio &rarr;
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => {
              if (!project) return null;
              return (
                <Reveal key={project.frontmatter.slug}>
                  <ProjectCard
                    slug={project.frontmatter.slug}
                    title={project.frontmatter.title}
                    locality={project.frontmatter.locality}
                    projectType={project.frontmatter.projectType}
                    heroImage={project.frontmatter.heroImage}
                    aspectRatio="4/3"
                  />
                </Reveal>
              );
            })}
          </div>
        </Section>
      )}

      {/* 5. Connected Services */}
      <Section
        tone="light"
        className="border-t border-greige/20 py-16 md:py-24"
        aria-label="Connected Practice Disciplines"
      >
        <div className="mb-8">
          <Reveal>
            <Label className="mb-2 block text-accent">Discipline Capabilities</Label>
            <h2 className="font-serif text-[1.75rem] text-charcoal">
              Services Executed in {locality.name}
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {locality.relatedServices.map((svc, idx) => (
            <Reveal key={svc.slug} delay={idx * 0.08}>
              <Link
                href={`/services/${svc.slug}`}
                className="group block border border-greige/30 bg-bone p-5 transition-colors hover:border-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span className="block font-serif text-[1.125rem] font-medium text-charcoal transition-colors group-hover:text-accent">
                  {svc.name}
                </span>
                <span className="mt-2 inline-block font-sans text-ui-caption text-greige group-hover:text-charcoal">
                  View scope and standards &rarr;
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <ClosingCTA />
    </>
  );
}
