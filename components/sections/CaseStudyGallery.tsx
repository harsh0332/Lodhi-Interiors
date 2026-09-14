'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import type { GalleryItem } from '@/lib/content';
import { cn } from '@/lib/utils';
import { Caption } from '@/components/ui/Typography';
import { BLUR_DATA_URL } from '@/lib/images';
import { useCaseGallery } from '@/components/motion/useCaseStudyMedia';

export interface CaseStudyGalleryProps {
  images: GalleryItem[];
  className?: string;
}

/**
 * CaseStudyGallery: Architectural photography gallery powered by useCaseGallery (Module 06B).
 * - Desktop: Irregular rhythm mixing full-width, two-up pairs, and offset portraits.
 * - Mobile (<768px): Swipeable horizontal carousel with native CSS scroll-snap.
 * - Reserved aspect ratios for 0 CLS, responsive sizes, lazy loaded, quality 75.
 */
export function CaseStudyGallery({ images, className }: CaseStudyGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  useCaseGallery(rootRef);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div ref={rootRef} data-motion-module="case-gallery" className={cn('w-full', className)}>
      {/* 1. Mobile Swipeable Horizontal Scroller (<768px) with native scroll-snap */}
      <div className="md:hidden">
        <div className="mb-3 flex items-center justify-between px-1">
          <span className="font-mono text-[0.8125rem] uppercase tracking-wider text-greige">
            Swipe to explore ({images.length} views)
          </span>
          <span className="font-sans text-[0.8125rem] font-medium text-accent" aria-hidden="true">
            &rarr;
          </span>
        </div>

        <div
          data-motion-group
          className="scrollbar-none -mx-5 flex touch-pan-x snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4"
          style={{ WebkitOverflowScrolling: 'touch' }}
          role="region"
          aria-label="Gallery photographs slider"
          tabIndex={0}
        >
          {images.map((item, idx) => {
            const isPortrait = item.orientation === 'portrait';
            return (
              <div
                key={idx}
                data-motion-item
                className="flex w-[82vw] max-w-sm shrink-0 snap-start flex-col"
              >
                <div
                  className={cn(
                    'relative w-full overflow-hidden bg-paper',
                    isPortrait ? 'aspect-[3/4]' : 'aspect-[4/3]',
                  )}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="85vw"
                    quality={75}
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    className="object-cover"
                  />
                </div>
                {item.alt && (
                  <div className="mt-2.5 px-0.5">
                    <Caption className="line-clamp-2 text-charcoal/70">{item.alt}</Caption>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Desktop Editorial Layout (>=768px) */}
      <div data-motion-group className="hidden space-y-16 md:block lg:space-y-24">
        {images.map((item, idx) => {
          const patternIndex = idx % 5;
          const isPortrait = item.orientation === 'portrait';

          if (patternIndex === 1 && idx + 1 < images.length) {
            const nextItem = images[idx + 1]!;
            return (
              <div key={idx} className="grid grid-cols-2 gap-8 lg:gap-12">
                <figure data-motion-item className="flex flex-col">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 1280px) 50vw, 600px"
                      quality={75}
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                      className="object-cover transition-transform duration-500 ease-out hover:scale-[1.02]"
                    />
                  </div>
                  {item.alt && (
                    <figcaption className="mt-3">
                      <Caption className="text-charcoal/70">{item.alt}</Caption>
                    </figcaption>
                  )}
                </figure>

                <figure data-motion-item className="flex flex-col">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper">
                    <Image
                      src={nextItem.src}
                      alt={nextItem.alt}
                      fill
                      sizes="(max-width: 1280px) 50vw, 600px"
                      quality={75}
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                      className="object-cover transition-transform duration-500 ease-out hover:scale-[1.02]"
                    />
                  </div>
                  {nextItem.alt && (
                    <figcaption className="mt-3">
                      <Caption className="text-charcoal/70">{nextItem.alt}</Caption>
                    </figcaption>
                  )}
                </figure>
              </div>
            );
          }

          if (patternIndex === 2 && idx > 0 && (idx - 1) % 5 === 1) {
            return null;
          }

          if (patternIndex === 0) {
            return (
              <figure key={idx} data-motion-item className="w-full">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-paper lg:aspect-[21/9]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 1280px) 100vw, 1200px"
                    quality={75}
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    className="object-cover transition-transform duration-500 ease-out hover:scale-[1.02]"
                  />
                </div>
                {item.alt && (
                  <figcaption className="mt-3">
                    <Caption className="text-charcoal/70">{item.alt}</Caption>
                  </figcaption>
                )}
              </figure>
            );
          }

          return (
            <figure
              key={idx}
              data-motion-item
              className={cn(
                'flex flex-col',
                isPortrait
                  ? 'mx-auto max-w-xl'
                  : patternIndex === 3
                    ? 'mr-auto max-w-4xl'
                    : 'ml-auto max-w-4xl',
              )}
            >
              <div
                className={cn(
                  'relative w-full overflow-hidden bg-paper',
                  isPortrait ? 'aspect-[3/4]' : 'aspect-[16/10]',
                )}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes={
                    isPortrait
                      ? '(max-width: 1280px) 50vw, 550px'
                      : '(max-width: 1280px) 80vw, 950px'
                  }
                  quality={75}
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="object-cover transition-transform duration-500 ease-out hover:scale-[1.02]"
                />
              </div>
              {item.alt && (
                <figcaption className="mt-3">
                  <Caption className="text-charcoal/70">{item.alt}</Caption>
                </figcaption>
              )}
            </figure>
          );
        })}
      </div>
    </div>
  );
}
