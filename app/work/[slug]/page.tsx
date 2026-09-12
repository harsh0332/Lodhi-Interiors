import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getAllProjects, getProjectBySlug } from '@/lib/content';
import { buildProjectSchema, buildBreadcrumbSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';
import { env } from '@/lib/env';
import { Section } from '@/components/ui/Section';
import { Display, Label, Caption } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { Reveal } from '@/components/motion/Reveal';
import { CaseStudyParallax } from '@/components/motion/CaseStudyParallax';
import { ProjectFactRow } from '@/components/sections/ProjectFactRow';
import { BeforeAfterComparison } from '@/components/ui/BeforeAfterComparison';
import { CaseStudyGallery } from '@/components/sections/CaseStudyGallery';
import { BLUR_DATA_URL } from '@/lib/images';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({
    slug: project.frontmatter.slug,
  }));
}

function formatMetaTitle(title: string, type: string, locality: string): string {
  const cleanType = type.replace(/-/g, ' ');
  const capitalizedType = cleanType.charAt(0).toUpperCase() + cleanType.slice(1);
  return `${title} — ${capitalizedType} interior in ${locality}, Bhopal | Lodhi Interiors`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  const { frontmatter } = project;
  const metaTitle = formatMetaTitle(
    frontmatter.title,
    frontmatter.projectType,
    frontmatter.locality,
  );

  return buildMetadata({
    title: metaTitle,
    description: frontmatter.brief,
    path: `/work/${frontmatter.slug}`,
    ogImage: frontmatter.heroImage,
    ogType: 'article',
  });
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { frontmatter } = project;
  const allProjects = await getAllProjects();

  // 13. Related projects: Three, preferring the same projectType, never linking to the current project
  const otherProjects = allProjects.filter((p) => p.frontmatter.slug !== slug);
  const sameTypeProjects = otherProjects.filter(
    (p) => p.frontmatter.projectType === frontmatter.projectType,
  );
  const differentTypeProjects = otherProjects.filter(
    (p) => p.frontmatter.projectType !== frontmatter.projectType,
  );
  const relatedProjects = [...sameTypeProjects, ...differentTypeProjects].slice(0, 3);

  // Schemas
  const projectSchema = buildProjectSchema(project);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Work', url: '/work' },
    { name: frontmatter.title, url: `/work/${frontmatter.slug}` },
  ]);

  const formattedType = frontmatter.projectType.replace(/-/g, ' ');

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* 1. Opening: Project title as h1 in display serif */}
      <div className="pt-28 md:pt-36">
        <Section tone="light" className="pb-6 pt-10 md:pb-8">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-8">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 font-sans text-ui-caption text-greige transition-colors hover:text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span aria-hidden="true">&larr;</span>
                <span>Selected Work</span>
              </Link>
            </nav>

            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Label className="text-accent">
                {frontmatter.locality}, {frontmatter.city}
              </Label>
              <span className="font-sans text-ui-caption text-greige" aria-hidden="true">
                &bull;
              </span>
              <span className="font-mono text-ui-caption text-greige">{frontmatter.year}</span>
            </div>

            <Display as="h1" className="mb-6 max-w-4xl">
              {frontmatter.title}
            </Display>
          </Reveal>

          {/* 2. Fact row: Semantic definition list */}
          <Reveal delay={0.05}>
            <ProjectFactRow frontmatter={frontmatter} />
          </Reveal>

          {/* 3. The brief: 2 or 3 plain sentences in the client's terms */}
          <Reveal delay={0.1}>
            <div className="max-w-3xl pt-2">
              <Label className="mb-2.5 block text-accent">The Client Brief</Label>
              <p className="font-sans text-[1.125rem] font-normal leading-[1.75] text-charcoal/90">
                {frontmatter.brief}
              </p>
            </div>
          </Reveal>
        </Section>
      </div>

      {/* 4. Full-bleed Hero Photograph: strictly the ONLY priority image */}
      <CaseStudyParallax
        src={frontmatter.heroImage}
        alt={`${frontmatter.title} interior space in ${frontmatter.locality}, Bhopal`}
        priority
        aspectRatio="21/9"
        caption={`${frontmatter.title} &mdash; ${frontmatter.locality}, Bhopal. Conceived and delivered turnkey by Lodhi Interiors.`}
      />

      {/* 5. Concept: 120-200 word design idea narrative */}
      <Section tone="light" className="border-t border-greige/20 py-16 md:py-24">
        <div className="max-w-3xl">
          <Reveal>
            <Label className="mb-3 block text-accent">Architectural Concept</Label>
            <h2 className="mb-6 font-serif text-fluid-h2 text-charcoal">The Spatial Idea</h2>
            <p className="font-sans text-[1.0625rem] leading-[1.8] text-charcoal/85">
              {frontmatter.concept}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* 6. Material palette: Prose plus close-up photograph plates with captions */}
      <Section tone="paper" className="border-t border-greige/20 py-16 md:py-28">
        <div className="mb-12 max-w-3xl">
          <Reveal>
            <Label className="mb-2 block text-accent">Material Integrity</Label>
            <h2 className="mb-4 font-serif text-fluid-h2 text-charcoal">
              Material Palette &amp; Finishes
            </h2>
            <p className="font-sans text-[1rem] leading-relaxed text-charcoal/80">
              {frontmatter.materialProse ||
                'Tactile finishes selected for central Indian climatic durability, natural patina, and sensory quietness.'}
            </p>
          </Reveal>
        </div>

        {frontmatter.materialsDetail && frontmatter.materialsDetail.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {frontmatter.materialsDetail.map((mat, idx) => (
              <Reveal key={mat.name} delay={idx * 0.05}>
                <div className="flex h-full flex-col border border-greige/30 bg-bone p-3">
                  <div className="relative mb-3 aspect-[4/3] w-full overflow-hidden bg-paper">
                    <Image
                      src={mat.image}
                      alt={mat.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      quality={75}
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-auto">
                    {mat.category && (
                      <span className="mb-1 block font-sans text-[0.8125rem] uppercase tracking-wider text-greige">
                        {mat.category}
                      </span>
                    )}
                    <h3 className="font-serif text-[1rem] font-medium text-charcoal">{mat.name}</h3>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          /* Clean tactile cards fallback when materialsDetail image plates are absent */
          <div className="flex flex-wrap gap-3">
            {frontmatter.materials.map((mat) => (
              <span
                key={mat}
                className="border border-greige/30 bg-bone px-4 py-2 font-sans text-[0.875rem] text-charcoal"
              >
                {mat}
              </span>
            ))}
          </div>
        )}
      </Section>

      {/* 7. Spatial strategy: How the plan works, supported by photographs */}
      {frontmatter.spatialNarrative && (
        <Section tone="light" className="border-t border-greige/20 py-16 md:py-28">
          <div className="mb-12 max-w-3xl">
            <Reveal>
              <Label className="mb-2 block text-accent">Plan &amp; Flow</Label>
              <h2 className="mb-4 font-serif text-fluid-h2 text-charcoal">Spatial Strategy</h2>
              <p className="font-sans text-[1.0625rem] leading-[1.8] text-charcoal/85">
                {frontmatter.spatialNarrative}
              </p>
            </Reveal>
          </div>

          {frontmatter.spatialImages && frontmatter.spatialImages.length > 0 && (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {frontmatter.spatialImages.map((sImg, idx) => (
                <Reveal key={idx} delay={idx * 0.08}>
                  <figure className="flex flex-col">
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-paper">
                      <Image
                        src={sImg.src}
                        alt={sImg.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        quality={75}
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL}
                        className="object-cover"
                      />
                    </div>
                    {sImg.caption && (
                      <figcaption className="mt-3">
                        <Caption className="text-charcoal/70">{sImg.caption}</Caption>
                      </figcaption>
                    )}
                  </figure>
                </Reveal>
              ))}
            </div>
          )}
        </Section>
      )}

      {/* 8. Challenges and decisions: 2 to 4 honest constraint-solution pairs */}
      <Section tone="paper" className="border-t border-greige/20 py-16 md:py-28">
        <div className="mb-12 max-w-3xl">
          <Reveal>
            <Label className="mb-2 block text-accent">Engineering Reality</Label>
            <h2 className="mb-4 font-serif text-fluid-h2 text-charcoal">
              Challenges &amp; Decisions
            </h2>
            <p className="font-sans text-ui-caption text-greige">
              Honest structural, material, and logistical constraints encountered on site in Bhopal,
              and how our team resolved them.
            </p>
          </Reveal>
        </div>

        <div className="max-w-4xl space-y-8">
          {frontmatter.challengesDecisions && frontmatter.challengesDecisions.length > 0 ? (
            frontmatter.challengesDecisions.map((item, idx) => (
              <Reveal key={idx} delay={idx * 0.05}>
                <div className="grid grid-cols-1 items-baseline gap-4 border-t border-greige/30 pt-6 md:grid-cols-12">
                  <div className="font-mono text-ui-caption text-accent md:col-span-1">
                    0{idx + 1}
                  </div>
                  <div className="md:col-span-5">
                    <span className="mb-1 block font-sans text-[0.8125rem] uppercase tracking-wider text-greige">
                      The Constraint
                    </span>
                    <p className="font-sans text-[0.9375rem] font-medium leading-relaxed text-charcoal">
                      {item.constraint}
                    </p>
                  </div>
                  <div className="md:col-span-6">
                    <span className="mb-1 block font-sans text-[0.8125rem] uppercase tracking-wider text-accent">
                      Our Decision &amp; Resolution
                    </span>
                    <p className="font-sans text-[0.9375rem] leading-relaxed text-charcoal/80">
                      {item.resolution}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))
          ) : (
            /* Fallback for projects with simple challenges list */
            <div className="space-y-4">
              {frontmatter.challenges.map((ch, idx) => (
                <Reveal key={idx} delay={idx * 0.05}>
                  <div className="flex items-start gap-3 border-b border-greige/20 pb-4">
                    <span
                      className="mt-0.5 font-mono text-ui-caption text-accent"
                      aria-hidden="true"
                    >
                      0{idx + 1}
                    </span>
                    <p className="font-sans text-[0.9375rem] leading-relaxed text-charcoal/85">
                      {ch}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </Section>

      {/* 9. Execution: On-site/in-progress photos + note on management & sequencing */}
      {frontmatter.executionNote && (
        <Section tone="light" className="border-t border-greige/20 py-16 md:py-28">
          <div className="mb-12 max-w-3xl">
            <Reveal>
              <Label className="mb-2 block text-accent">Turnkey Custody</Label>
              <h2 className="mb-4 font-serif text-fluid-h2 text-charcoal">
                On-Site Execution &amp; Sequencing
              </h2>
              <p className="font-sans text-[1.0625rem] leading-[1.8] text-charcoal/85">
                {frontmatter.executionNote}
              </p>
            </Reveal>
          </div>

          {frontmatter.executionImages && frontmatter.executionImages.length > 0 && (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {frontmatter.executionImages.map((eImg, idx) => (
                <Reveal key={idx} delay={idx * 0.08}>
                  <figure className="flex flex-col">
                    <div className="relative aspect-[16/10] w-full overflow-hidden border border-greige/20 bg-paper">
                      <Image
                        src={eImg.src}
                        alt={eImg.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        quality={75}
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL}
                        className="object-cover"
                      />
                    </div>
                    {eImg.caption && (
                      <figcaption className="mt-3">
                        <Caption className="text-charcoal/70">{eImg.caption}</Caption>
                      </figcaption>
                    )}
                  </figure>
                </Reveal>
              ))}
            </div>
          )}
        </Section>
      )}

      {/* 10. Before and after: Only where genuine before images exist */}
      {frontmatter.beforeAfter && frontmatter.beforeAfter.length > 0 && (
        <Section tone="paper" className="border-t border-greige/20 py-16 md:py-28">
          <BeforeAfterComparison items={frontmatter.beforeAfter} />
        </Section>
      )}

      {/* 11. Gallery: 6 to 14 photographs, true ratios, swipeable on mobile */}
      {frontmatter.gallery && frontmatter.gallery.length > 0 && (
        <Section tone="light" className="border-t border-greige/20 py-16 md:py-32">
          <Reveal>
            <div className="mb-12 max-w-2xl">
              <Label className="mb-2 block text-accent">Completed Space</Label>
              <h2 className="font-serif text-fluid-h2 text-charcoal">
                Architectural Documentation
              </h2>
              <p className="mt-2 font-sans text-ui-caption text-greige">
                Documented on site in {frontmatter.locality}, Bhopal. All photographs preserve true
                proportions.
              </p>
            </div>
          </Reveal>

          <CaseStudyGallery images={frontmatter.gallery} />
        </Section>
      )}

      {/* 12. Outcome: 2 to 3 sentences on what the finished space does for the client */}
      <Section tone="paper" className="border-t border-greige/20 py-16 md:py-24">
        <div className="max-w-3xl">
          <Reveal>
            <Label className="mb-2 block text-accent">Spatial Impact</Label>
            <h2 className="mb-6 font-serif text-fluid-h2 text-charcoal">Delivered Outcome</h2>
            <p className="font-sans text-[1.125rem] font-normal leading-[1.8] text-charcoal/90">
              {frontmatter.outcome}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* 13. Testimonial: Rendered only if real quote exists */}
      {frontmatter.testimonial && (
        <Section tone="light" className="border-t border-greige/20 py-20 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <span
                className="mb-4 block select-none font-serif text-4xl text-accent/80"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <blockquote className="mb-6 font-serif text-fluid-h3 font-normal italic leading-[1.3] text-charcoal md:text-fluid-h2">
                &ldquo;{frontmatter.testimonial.quote}&rdquo;
              </blockquote>
              <cite className="block font-sans text-ui-label uppercase not-italic tracking-[0.08em] text-greige">
                {frontmatter.testimonial.name} &mdash; {frontmatter.testimonial.locality},{' '}
                {formattedType}
              </cite>
            </Reveal>
          </div>
        </Section>
      )}

      {/* 14. Related projects: Exactly 3, preferring same projectType, never current */}
      {relatedProjects.length > 0 && (
        <Section tone="paper" className="border-t border-greige/20 py-20 md:py-32">
          <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <Reveal>
                <Label className="mb-2 block text-accent">Portfolio Continuity</Label>
                <h2 className="font-serif text-fluid-h2 text-charcoal">Related Projects</h2>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <Link
                href="/work"
                className="font-sans text-ui-caption font-medium text-charcoal transition-colors hover:text-accent"
              >
                View all projects &rarr;
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {relatedProjects.map((p, idx) => (
              <Reveal key={p.frontmatter.slug} delay={idx * 0.08}>
                <ProjectCard
                  slug={p.frontmatter.slug}
                  title={p.frontmatter.title}
                  locality={p.frontmatter.locality}
                  projectType={p.frontmatter.projectType}
                  heroImage={p.frontmatter.heroImage}
                  aspectRatio="4/3"
                />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* 15. Closing call to action: "Planning something similar? Start your project" */}
      <Section
        tone="dark"
        className="border-t border-greige/20 py-24 md:py-36"
        aria-label="Start your project"
      >
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal>
            <Label className="mb-3 block text-accent">Next Commission</Label>
            <h2 className="mb-6 font-serif text-fluid-display font-normal text-bone">
              Planning something similar?
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mx-auto mb-10 max-w-xl font-sans text-[1.0625rem] leading-relaxed text-bone/80">
              Whether you are acquiring an estate in {frontmatter.locality} or planning an
              architectural intervention in Bhopal, discuss technical feasibility directly with our
              principal team.
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
                Start your project
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
