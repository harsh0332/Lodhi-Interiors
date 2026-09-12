import React from 'react';
import Image from 'next/image';
import type { GalleryItem } from '@/lib/content';
import { cn } from '@/lib/utils';
import { Caption } from '@/components/ui/Typography';
import { Reveal } from '@/components/motion/Reveal';
import { BLUR_DATA_URL } from '@/lib/images';

export interface CaseStudyGalleryProps {
  images: GalleryItem[];
  className?: string;
}

/**
 * CaseStudyGallery: Architectural photography gallery.
 * - Desktop: Irregular rhythm mixing full-width, two-up pairs, and offset portraits.
 * - Mobile (<768px): Swipeable horizontal carousel with native CSS scroll-snap.
 * - Reserved aspect ratios for 0 CLS, responsive sizes, lazy loaded, quality 75.
 */
export function CaseStudyGallery({ images, className }: CaseStudyGalleryProps) {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className={cn('w-full', className)}>
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
          className="scrollbar-none -mx-5 flex touch-pan-x snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4"
          style={{ WebkitOverflowScrolling: 'touch' }}
          role="region"
          aria-label="Gallery photographs slider"
          tabIndex={0}
        >
          {images.map((item, idx) => {
            const isPortrait = item.orientation === 'portrait';
            return (
              <div key={idx} className="flex w-[82vw] max-w-sm shrink-0 snap-start flex-col">
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
      <div className="hidden space-y-16 md:block lg:space-y-24">
        {/* We arrange photos in an architectural rhythm: full-width, two-up, offset */}
        {images.map((item, idx) => {
          // Rhythm calculation
          const patternIndex = idx % 5;
          const isPortrait = item.orientation === 'portrait';

          // If current or next forms a two-up pair (patternIndex 1 and 2)
          if (patternIndex === 1 && idx + 1 < images.length) {
            const nextItem = images[idx + 1]!;
            return (
              <div key={idx} className="grid grid-cols-2 gap-8 lg:gap-12">
                <Reveal delay={0.05}>
                  <figure className="flex flex-col">
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
                </Reveal>

                <Reveal delay={0.1}>
                  <figure className="flex flex-col">
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
                </Reveal>
              </div>
            );
          }

          // Skip rendering idx + 1 because it was rendered in the pair above
          if (patternIndex === 2 && idx > 0 && (idx - 1) % 5 === 1) {
            return null;
          }

          // Full width hero spread
          if (patternIndex === 0) {
            return (
              <Reveal key={idx} delay={0.05}>
                <figure className="w-full">
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
              </Reveal>
            );
          }

          // Offset portrait or single plate
          return (
            <Reveal key={idx} delay={0.05}>
              <figure
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
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
