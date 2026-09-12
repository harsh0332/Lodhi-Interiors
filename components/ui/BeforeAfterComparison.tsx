import React from 'react';
import Image from 'next/image';
import type { BeforeAfterItem } from '@/lib/content';
import { cn } from '@/lib/utils';
import { Label, Caption } from '@/components/ui/Typography';
import { Reveal } from '@/components/motion/Reveal';

export interface BeforeAfterComparisonProps {
  items: BeforeAfterItem[];
  className?: string;
}

/**
 * BeforeAfterComparison: Architectural site transformation documentation.
 * - Desktop: Side-by-side comparison with authentic typographic labels.
 * - Mobile: Stacked view with clear sectioning.
 * - Zero layout shift with reserved aspect ratio containers.
 * - Renders ONLY when genuine before photographs exist in frontmatter.
 */
export function BeforeAfterComparison({ items, className }: BeforeAfterComparisonProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className={cn('space-y-16 md:space-y-24', className)}>
      {items.map((item, idx) => (
        <div key={idx} className="border-t border-greige/30 pt-10 md:pt-14">
          <Reveal>
            <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
              <Label className="text-accent">Site Transformation</Label>
              {item.note && (
                <p className="max-w-xl font-sans text-ui-caption text-charcoal/80">{item.note}</p>
              )}
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {/* 1. Before Image Frame */}
            <Reveal delay={0.05}>
              <figure className="group flex flex-col">
                <div className="relative aspect-[4/3] w-full overflow-hidden border border-greige/20 bg-paper">
                  <Image
                    src={item.beforeSrc}
                    alt={item.beforeAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={75}
                    className="object-cover"
                  />
                  <div className="absolute left-3 top-3 bg-charcoal/90 px-2.5 py-1 font-mono text-[0.8125rem] uppercase tracking-wider text-bone backdrop-blur-sm">
                    {item.beforeLabel || 'Initial Handover Condition'}
                  </div>
                </div>
                <figcaption className="mt-3">
                  <Caption className="text-charcoal/70">{item.beforeAlt}</Caption>
                </figcaption>
              </figure>
            </Reveal>

            {/* 2. After Image Frame */}
            <Reveal delay={0.1}>
              <figure className="group flex flex-col">
                <div className="relative aspect-[4/3] w-full overflow-hidden border border-greige/20 bg-paper">
                  <Image
                    src={item.afterSrc}
                    alt={item.afterAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={75}
                    className="object-cover"
                  />
                  <div className="absolute left-3 top-3 bg-accent px-2.5 py-1 font-mono text-[0.8125rem] uppercase tracking-wider text-bone backdrop-blur-sm">
                    {item.afterLabel || 'Completed Architectural Space'}
                  </div>
                </div>
                <figcaption className="mt-3">
                  <Caption className="text-charcoal/70">{item.afterAlt}</Caption>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      ))}
    </div>
  );
}
