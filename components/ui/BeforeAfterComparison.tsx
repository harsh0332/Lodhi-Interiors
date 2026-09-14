'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import type { BeforeAfterItem } from '@/lib/content';
import { cn } from '@/lib/utils';
import { Label, Caption } from '@/components/ui/Typography';
import { useCaseCompare } from '@/components/motion/useCaseStudyMedia';

export interface BeforeAfterComparisonProps {
  items: BeforeAfterItem[];
  className?: string;
}

/**
 * BeforeAfterComparison: Architectural site transformation documentation (Module 06C).
 * - Desktop: Interactive divider with drag & keyboard navigation (arrow keys, Shift+arrows, Home/End).
 * - Mobile / touch: Cleanly stacked before & after frames with authentic labels.
 * - Zero layout shift with reserved aspect ratio containers.
 */
export function BeforeAfterComparison({ items, className }: BeforeAfterComparisonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useCaseCompare(containerRef);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      data-motion-module="case-compare"
      className={cn('space-y-16 md:space-y-24', className)}
    >
      {items.map((item, idx) => (
        <div key={idx} className="border-t border-greige/30 pt-10 md:pt-14">
          <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
            <Label className="text-accent">Site Transformation</Label>
            {item.note && (
              <p className="max-w-xl font-sans text-ui-caption text-charcoal/80">{item.note}</p>
            )}
          </div>

          <div className="space-y-3">
            <div
              data-motion="compare-stage"
              className="lodhi-compare-stage border border-greige/20 bg-paper"
            >
              {/* 1. Before Image Layer */}
              <figure className="lodhi-compare-layer">
                <Image
                  src={item.beforeSrc}
                  alt={item.beforeAlt}
                  fill
                  sizes="(max-width: 899px) 100vw, 1200px"
                  quality={80}
                  className="object-cover"
                  priority={idx === 0}
                />
                <span className="absolute left-3 top-3 z-10 bg-charcoal/90 px-2.5 py-1 font-mono text-[0.8125rem] uppercase tracking-wider text-bone backdrop-blur-sm">
                  {item.beforeLabel || 'Initial Handover Condition'}
                </span>
                <figcaption className="sr-only">{item.beforeAlt}</figcaption>
              </figure>

              {/* 2. After Image Layer */}
              <figure className="lodhi-compare-layer lodhi-compare-after">
                <Image
                  src={item.afterSrc}
                  alt={item.afterAlt}
                  fill
                  sizes="(max-width: 899px) 100vw, 1200px"
                  quality={80}
                  className="object-cover"
                  priority={idx === 0}
                />
                <span className="absolute right-3 top-3 z-10 bg-accent px-2.5 py-1 font-mono text-[0.8125rem] uppercase tracking-wider text-bone backdrop-blur-sm">
                  {item.afterLabel || 'Completed Architectural Space'}
                </span>
                <figcaption className="sr-only">{item.afterAlt}</figcaption>
              </figure>

              {/* 3. Interactive Split Handle (Desktop/Keyboard) */}
              <div
                data-motion="handle"
                role="slider"
                tabIndex={0}
                aria-label={`Slide to compare before and after transformation: ${item.afterAlt}`}
                aria-orientation="horizontal"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={50}
                className="lodhi-compare-handle"
              />
            </div>

            <div className="flex items-center justify-between font-sans text-ui-caption text-charcoal/60">
              <Caption className="text-charcoal/70">{item.afterAlt || item.beforeAlt}</Caption>
              <span className="hidden text-[0.75rem] text-charcoal/50 md:inline-block">
                Drag divider or use arrow keys (Shift for 10%, Home/End for full view)
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

