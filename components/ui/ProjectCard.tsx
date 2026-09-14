'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useProjectTransition } from '@/components/motion/ProjectTransition';
import { BLUR_DATA_URL, IMAGE_QUALITY } from '@/lib/images';

export interface ProjectCardProps {
  slug: string;
  title: string;
  locality: string;
  projectType: string;
  heroImage: string;
  aspectRatio?: '4/3' | '16/10' | '3/2';
  priority?: boolean;
  className?: string;
}

/**
 * ProjectCard: Architectural project showcase card.
 * - Image with reserved aspect ratio to prevent CLS.
 * - Desktop pointer devices only: image scales to 1.03, meta line fades in over 300ms.
 * - Touch devices: meta line is permanently visible; image does not scale.
 * - Calm, non-blocking clip-path transition on click to /work/[slug].
 * - Strictly zero shadows, zero rounded corners, zero card borders.
 */
export function ProjectCard({
  slug,
  title,
  locality,
  projectType,
  heroImage,
  aspectRatio = '4/3',
  priority = false,
  className,
}: ProjectCardProps) {
  const { captureTransition } = useProjectTransition();
  const href = `/work/${slug}`;

  const aspectClass =
    aspectRatio === '16/10'
      ? 'aspect-[16/10]'
      : aspectRatio === '3/2'
        ? 'aspect-[3/2]'
        : 'aspect-[4/3]';

  const formattedType = projectType.replace(/-/g, ' ');

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      captureTransition(e.currentTarget, href, slug);
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      data-motion="transition-link"
      data-transition-key={slug}
      className={cn(
        'group relative block overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bone',
        className,
      )}
    >
      {/* Reserved Aspect Ratio Image Frame */}
      <div className={cn('relative w-full overflow-hidden bg-paper', aspectClass)}>
        <Image
          src={heroImage}
          alt={`${title} interior architecture in ${locality}, Bhopal`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          priority={priority}
          quality={IMAGE_QUALITY}
          placeholder={priority ? undefined : 'blur'}
          blurDataURL={priority ? undefined : BLUR_DATA_URL}
          className="group-pointer-hover:scale-103 object-cover transition-transform duration-300 ease-out will-change-transform"
        />
      </div>

      {/* Typography & Metadata */}
      <div className="mt-4 flex flex-col gap-1.5">
        <h3 className="font-serif text-fluid-h3 font-medium text-charcoal transition-colors duration-200 group-hover:text-accent">
          {title}
        </h3>

        {/* Meta line: always visible on touch, fades in on desktop hover */}
        <div className="pointer-hover:opacity-0 group-pointer-hover:opacity-100 flex items-center gap-2 font-sans text-ui-caption text-greige opacity-100 transition-opacity duration-300">
          <span>{locality}</span>
          <span aria-hidden="true">•</span>
          <span className="capitalize">{formattedType}</span>
        </div>
      </div>
    </Link>
  );
}
