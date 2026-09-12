import React from 'react';
import Link from 'next/link';
import type { Insight } from '@/lib/content';
import { Section } from '@/components/ui/Section';
import { Heading, Label } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';

export interface InsightsTeaserProps {
  insights: Insight[];
}

/**
 * InsightsTeaser: Displays latest 2 to 3 editorial articles.
 * Strictly skips rendering entirely if fewer than two articles exist.
 */
export function InsightsTeaser({ insights }: InsightsTeaserProps) {
  // Requirement: Skip the section entirely if fewer than two exist.
  if (!insights || insights.length < 2) {
    return null;
  }

  const displayedArticles = insights.slice(0, 3);

  return (
    <Section
      tone="paper"
      className="border-t border-greige/20 py-24 md:py-40"
      aria-label="Insights"
    >
      {/* Section Header */}
      <div className="mb-16 flex flex-col justify-between gap-4 md:mb-20 md:flex-row md:items-end">
        <div>
          <Reveal>
            <Label className="mb-2 block text-accent">Editorial</Label>
            <Heading level={2}>Insights on Craft & Climate</Heading>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="max-w-sm font-sans text-ui-caption text-greige">
            Architectural observations on detailing, natural materials, and turnkey site custody in
            Central India.
          </p>
        </Reveal>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {displayedArticles.map((article, index) => {
          const { frontmatter } = article;
          return (
            <Reveal key={frontmatter.slug} delay={index * 0.1}>
              <article className="group flex h-full flex-col justify-between border-t border-greige/30 pt-6">
                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <span className="font-sans text-ui-caption uppercase tracking-[0.06em] text-accent">
                      {frontmatter.category}
                    </span>
                    <span className="text-greige/50" aria-hidden="true">
                      •
                    </span>
                    <span className="font-sans text-ui-caption text-greige">
                      {new Date(frontmatter.publishedAt).toLocaleDateString('en-IN', {
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  <h3 className="mb-3 font-serif text-fluid-h3 font-medium text-charcoal transition-colors duration-200 group-hover:text-accent">
                    <Link
                      href={`/insights/${frontmatter.slug}`}
                      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      {frontmatter.title}
                    </Link>
                  </h3>

                  <p className="mb-6 font-sans text-[0.875rem] leading-relaxed text-charcoal/80">
                    {frontmatter.description}
                  </p>
                </div>

                <div>
                  <Button
                    variant="primary"
                    href={`/insights/${frontmatter.slug}`}
                    className="text-[0.8125rem]"
                  >
                    Read essay
                  </Button>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
