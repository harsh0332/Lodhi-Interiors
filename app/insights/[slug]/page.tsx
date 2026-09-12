import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getAllInsights, getInsightBySlug, getFeaturedProjects } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { buildArticleSchema, buildBreadcrumbSchema } from '@/lib/schema';
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
  const insights = await getAllInsights();
  return insights.map((insight) => ({
    slug: insight.frontmatter.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = await getInsightBySlug(slug);

  if (!insight) {
    return {};
  }

  // Format: [Article Title] | Lodhi Interiors
  const rawTitle = `${insight.frontmatter.title} | Lodhi Interiors`;
  const metaTitle = rawTitle.length > 60 ? `${rawTitle.slice(0, 57)}...` : rawTitle;

  return buildMetadata({
    title: metaTitle,
    description: insight.frontmatter.description,
    path: `/insights/${insight.frontmatter.slug}`,
    ogImage: insight.frontmatter.heroImage,
    ogType: 'article',
  });
}

export default async function InsightArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const insight = await getInsightBySlug(slug);

  if (!insight) {
    notFound();
  }

  const { frontmatter, content } = insight;
  const featuredProjects = await getFeaturedProjects();
  const displayProjects = featuredProjects.slice(0, 2);

  // Structured data
  const articleSchema = buildArticleSchema(insight);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Insights', url: '/insights' },
    { name: frontmatter.title, url: `/insights/${frontmatter.slug}` },
  ]);

  // Derive relevant service based on category
  const isTurnkey = frontmatter.category.toLowerCase().includes('practice');
  const relatedService = isTurnkey
    ? {
        name: 'Turnkey Interior Execution',
        slug: 'turnkey-interiors',
        description:
          'Single-source accountability from architectural working drawings through on-site trade custody.',
      }
    : {
        name: 'Residential Interiors',
        slug: 'residential-interiors',
        description:
          'Private residences engineered with climatic natural stones, lime plasters, and custom joinery.',
      };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([articleSchema, breadcrumbSchema]),
        }}
      />

      {/* 1. Article Header */}
      <Section tone="light" className="pb-12 pt-32 md:pb-16 md:pt-44">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-6">
              <Link
                href="/insights"
                className="inline-flex items-center gap-2 font-sans text-ui-caption text-greige transition-colors hover:text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span aria-hidden="true">&larr;</span>
                <span>Back to Insights</span>
              </Link>
            </nav>

            <div className="mb-4 flex items-center gap-3 font-mono text-ui-caption text-greige">
              <span className="text-accent">{frontmatter.category}</span>
              <span>&bull;</span>
              <time dateTime={frontmatter.publishedAt}>{frontmatter.publishedAt}</time>
              <span>&bull;</span>
              <span>5 min read</span>
            </div>

            <Display as="h1" className="mb-6 leading-tight">
              {frontmatter.title}
            </Display>

            <p className="font-sans text-[1.125rem] leading-relaxed text-charcoal/80 md:text-[1.25rem]">
              {frontmatter.description}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* 2. Featured Image */}
      <div className="mx-auto max-w-container px-5 md:px-12">
        <div className="relative aspect-[16/9] max-h-[600px] w-full overflow-hidden bg-charcoal">
          <Image
            src={frontmatter.heroImage}
            alt={frontmatter.title}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            quality={IMAGE_QUALITY}
            className="object-cover"
          />
        </div>
      </div>

      {/* 3. Article Content */}
      <Section tone="light" className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <article className="prose prose-lg prose-neutral font-sans leading-relaxed text-charcoal/90">
            {content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('# ')) {
                return null; // Heading is already in header
              }
              if (paragraph.startsWith('## ')) {
                return (
                  <h2
                    key={idx}
                    className="mb-6 mt-12 font-serif text-[1.75rem] font-medium text-charcoal"
                  >
                    {paragraph.replace(/^##\s+/, '')}
                  </h2>
                );
              }
              return (
                <p key={idx} className="mb-6 text-[1.0625rem] leading-[1.8] text-charcoal/85">
                  {paragraph}
                </p>
              );
            })}
          </article>
        </div>
      </Section>

      {/* 4. Cross-link to Relevant Service */}
      <Section tone="paper" className="border-t border-greige/20 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <Label className="mb-2 block text-accent">Related Discipline</Label>
            <h2 className="mb-4 font-serif text-fluid-h2 text-charcoal">Applied Practice</h2>
            <p className="mb-8 font-sans text-ui-caption leading-relaxed text-charcoal/70">
              The technical methodology explored in this article is actively deployed in our
              studio’s turnkey commissions across Bhopal.
            </p>

            <Link
              href={`/services/${relatedService.slug}`}
              className="group block border border-greige/30 bg-bone p-6 transition-colors hover:border-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h3 className="font-serif text-[1.375rem] font-medium text-charcoal transition-colors group-hover:text-accent">
                    {relatedService.name}
                  </h3>
                  <p className="mt-1 max-w-lg font-sans text-ui-caption text-greige">
                    {relatedService.description}
                  </p>
                </div>
                <span className="font-sans text-ui-label font-medium uppercase tracking-wider text-charcoal group-hover:text-accent">
                  Explore Service &rarr;
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* 5. Connected Case Studies */}
      <Section tone="light" className="border-t border-greige/20 py-20 md:py-32">
        <div className="mx-auto max-w-container px-5 md:px-12">
          <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <Reveal>
                <Label className="mb-2 block text-accent">Real-World Case Studies</Label>
                <h2 className="font-serif text-fluid-h2 text-charcoal">Demonstrated Projects</h2>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <Link
                href="/work"
                className="font-sans text-ui-caption font-medium text-charcoal transition-colors hover:text-accent"
              >
                View full portfolio &rarr;
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {displayProjects.map((project) => (
              <Reveal key={project.frontmatter.slug}>
                <ProjectCard
                  slug={project.frontmatter.slug}
                  title={project.frontmatter.title}
                  locality={project.frontmatter.locality}
                  projectType={project.frontmatter.projectType}
                  heroImage={project.frontmatter.heroImage}
                  aspectRatio="16/10"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <ClosingCTA />
    </>
  );
}
