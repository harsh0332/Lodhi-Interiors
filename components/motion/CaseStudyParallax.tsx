'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { Caption } from '@/components/ui/Typography';

export interface CaseStudyParallaxProps {
  src: string;
  alt: string;
  priority?: boolean;
  aspectRatio?: '21/9' | '16/9' | '16/10';
  caption?: string;
  className?: string;
}

/**
 * CaseStudyParallax: Editorial full-bleed architectural photograph with subtle parallax.
 * - Desktop: 8-10% vertical parallax scrub via ScrollTrigger inside gsap.matchMedia.
 * - Reduced motion & mobile (<768px): fully static presentation.
 * - Initial entry: 1.04 to 1 scale reveal with opacity fade (700ms).
 * - Calls ScrollTrigger.refresh() on document ready/font load to prevent Lenis desync.
 */
export function CaseStudyParallax({
  src,
  alt,
  priority = false,
  aspectRatio = '21/9',
  caption,
  className,
}: CaseStudyParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const img = imageRef.current;
    if (!container || !img || typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    // Desktop standard motion: subtle 8-10% parallax + entrance scale reveal
    mm.add('(min-width: 769px) and (prefers-reduced-motion: no-preference)', () => {
      // 1. Entrance reveal (1.04 to 1 scale + opacity fade over 700ms)
      gsap.fromTo(
        img,
        { scale: 1.08, opacity: 0.8 },
        {
          scale: 1.04,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 95%',
            once: true,
          },
        },
      );

      // 2. Subtle vertical parallax scrub
      gsap.fromTo(
        img,
        { yPercent: -5 },
        {
          yPercent: 5,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    });

    // Mobile or reduced motion: static presentation with zero displacement
    mm.add('(max-width: 768px), (prefers-reduced-motion: reduce)', () => {
      gsap.set(img, {
        clearProps: 'transform,scale,opacity',
      });
    });

    // Desync prevention: trigger refresh after layout and fonts settle
    const handleFontLoad = () => {
      ScrollTrigger.refresh();
    };

    if (document.fonts) {
      document.fonts.ready.then(handleFontLoad).catch(() => {});
    }
    window.addEventListener('load', handleFontLoad);

    return () => {
      window.removeEventListener('load', handleFontLoad);
      mm.revert();
    };
  }, []);

  const aspectClass =
    aspectRatio === '16/9'
      ? 'aspect-[16/9]'
      : aspectRatio === '16/10'
        ? 'aspect-[16/10]'
        : 'aspect-[16/10] md:aspect-[21/9]';

  return (
    <figure
      ref={containerRef}
      className={cn(
        'relative left-1/2 right-1/2 my-12 -ml-[50vw] -mr-[50vw] w-screen max-w-none overflow-hidden md:my-20',
        className,
      )}
    >
      <div className={cn('relative w-full overflow-hidden bg-paper', aspectClass)}>
        <Image
          ref={imageRef}
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          quality={75}
          className="object-cover will-change-transform"
        />
      </div>
      {caption && (
        <figcaption className="mx-auto mt-3.5 max-w-container px-5 text-left md:px-12">
          <Caption>{caption}</Caption>
        </figcaption>
      )}
    </figure>
  );
}
