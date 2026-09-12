'use client';

import React from 'react';
import type { Project } from '@/lib/content';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/motion/Reveal';

export interface WorkTableViewProps {
  projects: Project[];
  onProjectClick: (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => void;
}

/**
 * WorkTableView: Compact tabular typographic index for scanning the full body of work.
 * Responsive down to 360px without horizontal scroll.
 */
export function WorkTableView({ projects, onProjectClick }: WorkTableViewProps) {
  return (
    <div className="w-full">
      {/* 1. Desktop Column Headers */}
      <div className="hidden gap-4 border-b border-greige/40 pb-4 font-sans text-ui-label uppercase tracking-[0.08em] text-greige md:grid md:grid-cols-12">
        <div className="md:col-span-4">Project</div>
        <div className="md:col-span-2">Locality</div>
        <div className="md:col-span-2">Typology</div>
        <div className="md:col-span-2">Scope</div>
        <div className="text-right md:col-span-1">Area</div>
        <div className="text-right md:col-span-1">Year</div>
      </div>

      {/* 2. Typographic Rows */}
      <ul className="divide-y divide-greige/20 border-b border-greige/20">
        {projects.map((project, idx) => {
          const { frontmatter } = project;
          const formattedType = frontmatter.projectType.replace(/-/g, ' ');

          return (
            <li key={frontmatter.slug}>
              <Reveal delay={idx * 0.02}>
                <a
                  href={`/work/${frontmatter.slug}`}
                  onClick={(e) => onProjectClick(e, frontmatter.slug)}
                  className={cn(
                    'group -mx-2 block px-2 py-4 transition-colors duration-200 hover:bg-paper/40 sm:py-5',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bone',
                  )}
                >
                  {/* Desktop Grid Layout */}
                  <div className="hidden items-baseline gap-4 md:grid md:grid-cols-12">
                    <div className="font-serif text-[1.125rem] font-medium text-charcoal transition-colors group-hover:text-accent md:col-span-4">
                      {frontmatter.title}
                    </div>
                    <div className="font-sans text-ui-caption text-greige md:col-span-2">
                      {frontmatter.locality}, {frontmatter.city}
                    </div>
                    <div className="font-sans text-ui-caption capitalize text-charcoal/80 md:col-span-2">
                      {formattedType}
                    </div>
                    <div className="font-sans text-ui-caption capitalize text-charcoal/80 md:col-span-2">
                      {frontmatter.scope}
                    </div>
                    <div className="text-right font-mono text-ui-caption text-charcoal/80 md:col-span-1">
                      {frontmatter.areaSqft.toLocaleString('en-IN')}
                    </div>
                    <div className="text-right font-mono text-ui-caption text-greige md:col-span-1">
                      {frontmatter.year}
                    </div>
                  </div>

                  {/* Mobile Stacked Layout (Clean 2-line editorial presentation) */}
                  <div className="flex flex-col gap-1 md:hidden">
                    {/* Line 1: Title & Locality */}
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-serif text-[1.0625rem] font-medium text-charcoal group-hover:text-accent">
                        {frontmatter.title}
                      </span>
                      <span className="flex-shrink-0 font-sans text-ui-caption text-greige">
                        {frontmatter.locality}
                      </span>
                    </div>

                    {/* Line 2: Typology, Area, Year */}
                    <div className="flex items-center gap-2 font-sans text-ui-caption text-charcoal/70">
                      <span className="capitalize">{formattedType}</span>
                      <span aria-hidden="true" className="text-greige/50">•</span>
                      <span>{frontmatter.areaSqft.toLocaleString('en-IN')} sq.ft.</span>
                      <span aria-hidden="true" className="text-greige/50">•</span>
                      <span className="font-mono text-greige">{frontmatter.year}</span>
                    </div>
                  </div>
                </a>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
