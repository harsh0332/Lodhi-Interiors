import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllInsights } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { buildBreadcrumbSchema } from '@/lib/schema';
import { Section } from '@/components/ui/Section';
import { Display, Label } from '@/components/ui/Typography';
import { Reveal } from '@/components/motion/Reveal';
import { ClosingCTA } from '@/components/sections/ClosingCTA';
import { BLUR_DATA_URL, IMAGE_QUALITY } from '@/lib/images';

export const metadata: Metadata = buildMetadata({
  title: 'Editorial Insights & Technical Essays | Lodhi Interiors Bhopal',
  description:
    'Essays on architectural materiality, climatic performance, and single-source turnkey execution in Bhopal and Central India by Soumya Lodhi.',
  path: '/insights',
});

export default async function InsightsHubPage() {
  const insights = await getAllInsights();
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Insights', url: '/insights' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Section tone="light" className="pb-16 pt-32 md:pb-24 md:pt-44">
        <div className="max-w-4xl">
          <Reveal>
            <Label className="mb-3 block text-accent">Studio Journal</Label>
            <Display as="h1" className="mb-6">
              Insights & Technical Field Notes
            </Display>
            <p className="font-sans text-[1.125rem] leading-relaxed text-charcoal/80 md:text-[1.25rem]">
              Written by Soumya Lodhi and our practice team. Critical perspectives on Central Indian
              climatic architecture, regional masonry, material longevity, and why single-source
              turnkey execution protects architectural intent.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section tone="paper" className="py-20 md:py-32" aria-label="Articles Index">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {insights.map((insight, idx) => (
            <Reveal key={insight.frontmatter.slug} delay={idx * 0.1}>
              <Link
                href={`/insights/${insight.frontmatter.slug}`}
                className="group flex h-full flex-col border border-greige/30 bg-bone transition-all duration-300 hover:border-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-charcoal">
                  <Image
                    src={insight.frontmatter.heroImage}
                    alt={insight.frontmatter.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={IMAGE_QUALITY}
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-charcoal/15 transition-opacity group-hover:opacity-0" />
                </div>

                <div className="flex flex-1 flex-col p-8">
                  <div className="mb-3 flex items-center gap-3 font-mono text-ui-caption text-greige">
                    <span className="text-accent">{insight.frontmatter.category}</span>
                    <span>&bull;</span>
                    <time dateTime={insight.frontmatter.publishedAt}>
                      {insight.frontmatter.publishedAt}
                    </time>
                  </div>

                  <h2 className="mb-4 font-serif text-[1.625rem] font-medium leading-snug text-charcoal transition-colors group-hover:text-accent">
                    {insight.frontmatter.title}
                  </h2>

                  <p className="mb-6 flex-1 font-sans text-ui-caption leading-relaxed text-charcoal/70">
                    {insight.frontmatter.description}
                  </p>

                  <span className="inline-flex items-center gap-2 font-sans text-ui-label font-medium uppercase tracking-wider text-charcoal group-hover:text-accent">
                    <span>Read complete paper</span>
                    <span aria-hidden="true">&rarr;</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <ClosingCTA />
    </>
  );
}
