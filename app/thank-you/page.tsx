import type { Metadata } from 'next';
import Link from 'next/link';
import { getFeaturedProjects } from '@/lib/content';
import { env } from '@/lib/env';
import { Section } from '@/components/ui/Section';
import { Display, Label, Body } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { Reveal } from '@/components/motion/Reveal';
import { ThankYouTracker } from './ThankYouTracker';

import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Thank you — Inquiry Received | Lodhi Interiors',
  description:
    'Thank you for initiating your project inquiry with Lodhi Interiors. Our principal design team in Bhopal will review your spatial scope and connect promptly.',
  path: '/thank-you',
  robots: {
    index: false,
    follow: false,
  },
});

export default async function ThankYouPage() {
  const featuredProjects = await getFeaturedProjects();
  const displayProjects = featuredProjects.slice(0, 3);

  const prefilledWhatsApp = encodeURIComponent(
    'Hello Soumya, I just submitted an inquiry on the website and would like to share my floor plans directly.',
  );

  return (
    <>
      {/* Client Analytics Tracker Component */}
      <ThankYouTracker />

      {/* 1. Confirmation & Timeline Expectation Section */}
      <div className="pt-28 md:pt-36">
        <Section tone="light" className="pb-16 pt-12 md:pb-24">
          <div className="max-w-3xl">
            <Reveal>
              <Label className="mb-3 block text-accent">Inquiry Logged</Label>
              <Display as="h1" className="mb-6">
                Thank you for reaching out.
              </Display>
              <Body className="mb-6 text-[1.125rem] leading-relaxed text-charcoal/90 md:text-[1.25rem]">
                Your project parameters have been delivered directly to Soumya Lodhi’s desk. We
                review architectural feasibility and respond within{' '}
                <strong className="font-semibold text-charcoal">one working day</strong> to schedule
                an initial scope discussion.
              </Body>
            </Reveal>

            {/* 2. Immediate WhatsApp Escalation Route */}
            <Reveal delay={0.1}>
              <div className="mb-10 mt-8 border border-greige/30 bg-paper/60 p-6 md:p-8">
                <span className="mb-2 block font-mono text-ui-caption font-medium uppercase tracking-wider text-accent">
                  Immediate Route
                </span>
                <h2 className="mb-2 font-serif text-[1.25rem] font-medium text-charcoal">
                  Have floor plans or site photos ready right now?
                </h2>
                <p className="mb-6 font-sans text-xs leading-relaxed text-charcoal/80">
                  Skip the email queue. You can send CAD drawings, PDFs, or site condition videos
                  directly to Soumya on WhatsApp.
                </p>
                <Button
                  variant="primary"
                  tone="light"
                  href={`https://wa.me/${env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${prefilledWhatsApp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[46px] px-6 text-xs uppercase tracking-wider"
                >
                  Message on WhatsApp now &rarr;
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="flex items-center gap-4 font-sans text-xs text-greige">
                <Link
                  href="/"
                  className="text-charcoal underline transition-colors hover:text-accent"
                >
                  &larr; Return to Homepage
                </Link>
                <span>&bull;</span>
                <Link
                  href="/work"
                  className="text-charcoal underline transition-colors hover:text-accent"
                >
                  Explore Studio Archive
                </Link>
              </div>
            </Reveal>
          </div>
        </Section>
      </div>

      {/* 3. Three Recent Featured Projects */}
      <Section tone="paper" className="border-t border-greige/20 py-20 md:py-32">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <Reveal>
              <Label className="mb-2 block text-accent">While You Wait</Label>
              <h2 className="font-serif text-fluid-h2 text-charcoal">
                Recent Architectural Commissions
              </h2>
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
          {displayProjects.map((project, idx) => (
            <Reveal key={project.frontmatter.slug} delay={idx * 0.08}>
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
    </>
  );
}
