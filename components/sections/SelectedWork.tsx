'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/lib/content';
import { Section } from '@/components/ui/Section';
import { Heading, Label } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';
import { useProjectTransition } from '@/components/motion/ProjectTransition';
import { useSelectedWorkGallery } from '@/components/motion/useSelectedWorkGallery';
import { BLUR_DATA_URL, IMAGE_QUALITY } from '@/lib/images';

export interface SelectedWorkProps {
  projects: Project[];
}

/**
 * SelectedWorkCard: Formatted card for project display obeying Module 02 & 03 contract.
 */
function SelectedWorkCard({
  project,
  aspectRatio = '4/3',
  priority = false,
}: {
  project: Project;
  aspectRatio?: '4/3' | '16/10' | '21/9';
  priority?: boolean;
}) {
  const { frontmatter } = project;

  const aspectClass =
    aspectRatio === '16/10'
      ? 'aspect-[16/10]'
      : aspectRatio === '21/9'
        ? 'aspect-[16/9] md:aspect-[21/9]'
        : 'aspect-[4/3]';

  const { triggerTransition } = useProjectTransition();
  const href = `/work/${frontmatter.slug}`;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      triggerTransition(href);
    }
  };

  return (
    <div data-motion-item className="group relative block overflow-hidden">
      <Link
        href={href}
        onClick={handleClick}
        data-motion="transition-link"
        data-transition-key={frontmatter.slug}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bone"
      >
        <div
          data-motion="reveal"
          className={`relative w-full overflow-hidden bg-paper ${aspectClass}`}
        >
          <Image
            src={frontmatter.heroImage}
            alt={`${frontmatter.title} architectural space in ${frontmatter.locality}, Bhopal`}
            fill
            sizes={
              aspectRatio === '4/3'
                ? '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px'
                : '(max-width: 768px) 100vw, 1280px'
            }
            priority={priority}
            quality={IMAGE_QUALITY}
            placeholder={priority ? undefined : 'blur'}
            blurDataURL={priority ? undefined : BLUR_DATA_URL}
            data-motion="parallax"
            data-motion-speed="0.8"
            className="group-pointer-hover:scale-103 object-cover transition-transform duration-300 ease-out will-change-transform"
          />
        </div>

        <div
          data-motion="caption"
          className="mt-5 flex flex-col gap-2 border-b border-greige/20 pb-4 md:flex-row md:items-baseline md:justify-between"
        >
          <div>
            <h3 className="font-serif text-fluid-h3 font-medium text-charcoal transition-colors duration-200 group-hover:text-accent">
              {frontmatter.title}
            </h3>
            <span className="mt-0.5 block font-sans text-ui-caption text-greige">
              {frontmatter.locality}, {frontmatter.city}
            </span>
          </div>

          <div className="flex items-center gap-2 font-sans text-ui-caption text-greige/90">
            <span className="capitalize">{frontmatter.projectType.replace('-', ' ')}</span>
            <span aria-hidden="true">•</span>
            <span className="capitalize">{frontmatter.scope}</span>
            <span aria-hidden="true">•</span>
            <span>{frontmatter.areaSqft.toLocaleString('en-IN')} sq.ft.</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

/**
 * SelectedWork: Alternating full-width and two-up layout of 3 to 5 featured projects.
 */
export function SelectedWork({ projects }: SelectedWorkProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  useSelectedWorkGallery(sectionRef);

  if (!projects || projects.length === 0) {
    return null;
  }

  const firstProject = projects[0];
  const middleProjects = projects.slice(1, 3);
  const fourthProject = projects[3];

  return (
    <div ref={sectionRef} data-motion-module="selected-work">
      <Section
        tone="light"
        className="border-t border-greige/20 py-20 md:py-36"
        aria-label="Selected Work"
      >
      {/* Section Header */}
      <div className="mb-16 flex flex-col justify-between gap-4 md:mb-24 md:flex-row md:items-end">
        <div>
          <Reveal>
            <Label className="mb-2 block text-accent">Portfolio</Label>
            <Heading level={2}>Selected Work</Heading>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="max-w-sm font-sans text-ui-caption text-greige">
            Executed projects spanning private residences, villas, and commercial studios across
            Bhopal.
          </p>
        </Reveal>
      </div>

      {/* Alternating Layout: 1 Full Width -> 2-Up -> 1 Full Width */}
      <div className="space-y-16 md:space-y-24">
        {/* 1. Full-Width Project Showcase */}
        {firstProject && (
          <Reveal>
            <SelectedWorkCard project={firstProject} aspectRatio="16/10" priority={false} />
          </Reveal>
        )}

        {/* 2. Two-Up Layout */}
        {middleProjects.length > 0 && (
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
            {middleProjects.map((project, idx) => (
              <Reveal key={project.frontmatter.slug} delay={idx * 0.1}>
                <SelectedWorkCard project={project} aspectRatio="4/3" />
              </Reveal>
            ))}
          </div>
        )}

        {/* 3. Second Full-Width or Large Project Showcase */}
        {fourthProject && (
          <Reveal>
            <SelectedWorkCard project={fourthProject} aspectRatio="16/10" />
          </Reveal>
        )}
      </div>

      {/* Bottom Link to Full Index */}
      <div className="mt-16 text-center md:mt-24">
        <Reveal>
          <Button variant="primary" href="/work" className="text-[1rem] tracking-wide">
            See all work
          </Button>
        </Reveal>
      </div>
    </Section>
  </div>
);
}
