import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getAllProjects } from '@/lib/content';
import { buildBreadcrumbSchema, buildCollectionPageSchema } from '@/lib/schema';
import { Section } from '@/components/ui/Section';
import { Display, Body, Label } from '@/components/ui/Typography';
import { Reveal } from '@/components/motion/Reveal';
import { WorkIndexClient } from '@/components/sections/WorkIndexClient';
import { ClosingCTA } from '@/components/sections/ClosingCTA';

import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Our work — interior design projects in Bhopal | Lodhi Interiors',
  description:
    'Portfolio of residential, luxury villa, kitchen, and commercial interior design and turnkey execution projects across Bhopal by Lodhi Interiors.',
  path: '/work',
});

export default async function WorkPage() {
  const allProjects = await getAllProjects();

  // Sort: featured pinned to top, then publishedAt descending
  const sortedProjects = [...allProjects].sort((a, b) => {
    if (a.frontmatter.featured && !b.frontmatter.featured) return -1;
    if (!a.frontmatter.featured && b.frontmatter.featured) return 1;
    const dateA = new Date(a.frontmatter.publishedAt || 0).getTime();
    const dateB = new Date(b.frontmatter.publishedAt || 0).getTime();
    return dateB - dateA;
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Work', url: '/work' },
  ]);

  const collectionSchema = buildCollectionPageSchema(sortedProjects);

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      {/* Header & Editorial Introduction */}
      <div className="pt-28 md:pt-36">
        <Section tone="light" className="pb-12 pt-12 md:pb-16">
          <Reveal>
            <Label className="mb-3 block text-accent">Studio Archive · 2018 — 2026</Label>
            <Display className="mb-6 max-w-4xl">Selected work</Display>
            <Body className="max-w-3xl text-[1.125rem] leading-relaxed text-charcoal/80">
              Eight years of residential architecture, bespoke private villas, modular kitchens, and
              commercial environments across Bhopal. Every commission is conceived, engineered, and
              executed under a single accountable roof.
            </Body>
          </Reveal>
        </Section>
      </div>

      {/* Interactive Portfolio Section (Filters, View Mode Toggle, Gallery/Table) */}
      <Section tone="light" className="pb-28 pt-0 md:pb-36">
        <Suspense
          fallback={
            <div className="animate-pulse py-20 text-center font-sans text-ui-caption text-greige">
              Loading portfolio index...
            </div>
          }
        >
          <WorkIndexClient initialProjects={sortedProjects} />
        </Suspense>
      </Section>

      {/* Closing Inquiries CTA */}
      <ClosingCTA />
    </>
  );
}
