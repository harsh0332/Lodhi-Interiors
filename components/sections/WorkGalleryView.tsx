'use client';

import React from 'react';
import Image from 'next/image';
import type { Project } from '@/lib/content';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/motion/Reveal';
import { BLUR_DATA_URL, IMAGE_QUALITY } from '@/lib/images';

export interface WorkGalleryViewProps {
  projects: Project[];
  onProjectClick: (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => void;
}

/**
 * WorkGalleryView: Deliberately irregular editorial gallery layout.
 * - Alternates full-width, offset singles, and asymmetric pairs.
 * - Preserves true orientation (portrait, landscape, square) with reserved aspect ratios.
 * - Desktop hover: image scales to 1.03, meta line fades in.
 * - Touch: meta permanently visible.
 * - Exactly one priority image (index === 0) as the true LCP element.
 */
export function WorkGalleryView({ projects, onProjectClick }: WorkGalleryViewProps) {
  return (
    <div className="space-y-16 md:space-y-28">
      {projects.map((project, index) => {
        const { frontmatter } = project;
        // Exactly ONE priority image per route (the LCP element)
        const isEager = index === 0;
        const galleryItem = frontmatter.gallery[0];
        const orientation = galleryItem?.orientation || 'landscape';

        // Irregular Editorial Rhythm (0: Full-Width, 1: Asymmetric Left, 2 & 3: Two-Up, etc.)
        const rhythm = index % 4;

        let containerSpan = 'w-full';
        let aspectClass = 'aspect-[16/10]';

        if (orientation === 'portrait') {
          aspectClass = 'aspect-[3/4]';
          containerSpan = 'max-w-2xl mx-auto md:ml-0 md:mr-auto';
        } else if (rhythm === 0) {
          aspectClass = 'aspect-[16/10] md:aspect-[21/9]';
          containerSpan = 'w-full';
        } else if (rhythm === 1) {
          aspectClass = 'aspect-[16/10]';
          containerSpan = 'max-w-4xl md:mr-auto';
        } else {
          aspectClass = 'aspect-[4/3]';
          containerSpan = 'w-full';
        }

        const formattedType = frontmatter.projectType.replace(/-/g, ' ');

        return (
          <Reveal key={frontmatter.slug} delay={0.05}>
            <div className={containerSpan}>
              <a
                href={`/work/${frontmatter.slug}`}
                onClick={(e) => onProjectClick(e, frontmatter.slug)}
                className={cn(
                  'group relative block overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bone',
                )}
              >
                {/* Reserved Aspect Ratio Frame (Zero CLS) */}
                <div className={cn('relative w-full overflow-hidden bg-paper', aspectClass)}>
                  <Image
                    src={frontmatter.heroImage}
                    alt={
                      galleryItem?.alt ||
                      `${frontmatter.title} architectural space in ${frontmatter.locality}, Bhopal`
                    }
                    fill
                    priority={isEager}
                    quality={IMAGE_QUALITY}
                    placeholder={isEager ? undefined : 'blur'}
                    blurDataURL={isEager ? undefined : BLUR_DATA_URL}
                    sizes={
                      rhythm === 0
                        ? '100vw'
                        : '(max-width: 768px) 100vw, (max-width: 1280px) 70vw, 1100px'
                    }
                    className="object-cover transition-transform duration-500 ease-out will-change-transform md:group-hover:scale-[1.03]"
                  />
                </div>

                {/* Typography & Metadata */}
                <div className="mt-4 flex flex-col gap-2 border-b border-greige/20 pb-4 md:flex-row md:items-baseline md:justify-between">
                  <div>
                    <h2 className="font-serif text-fluid-h3 font-medium text-charcoal transition-colors duration-200 group-hover:text-accent">
                      {frontmatter.title}
                    </h2>
                    <span className="mt-0.5 block font-sans text-ui-caption text-greige">
                      {frontmatter.locality}, {frontmatter.city}
                    </span>
                  </div>

                  {/* Meta: Always visible on touch, fades in on desktop hover */}
                  <div className="flex items-center gap-2 font-sans text-ui-caption text-greige/90 opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
                    <span className="capitalize">{formattedType}</span>
                    <span aria-hidden="true">•</span>
                    <span className="capitalize">{frontmatter.scope}</span>
                    <span aria-hidden="true">•</span>
                    <span>{frontmatter.areaSqft.toLocaleString('en-IN')} sq.ft.</span>
                    <span aria-hidden="true">•</span>
                    <span>{frontmatter.year}</span>
                  </div>
                </div>
              </a>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
