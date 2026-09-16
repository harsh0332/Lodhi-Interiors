'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { ServiceData } from '@/lib/services';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/motion/Reveal';

export interface ServiceHoverListProps {
  services: ServiceData[];
}

function getCategoryBadge(tag: string) {
  if (tag.includes('Residential')) {
    return 'bg-[#C5A265]/15 text-[#8A6A3B] border-[#C5A265]/35';
  }
  if (tag.includes('Turnkey')) {
    return 'bg-emerald-950/10 text-emerald-800 border-emerald-700/25';
  }
  if (tag.includes('Joinery') || tag.includes('Kitchen')) {
    return 'bg-[#8B4513]/10 text-[#8B4513] border-[#8B4513]/25';
  }
  if (tag.includes('Hospitality') || tag.includes('Dining')) {
    return 'bg-purple-950/10 text-purple-900 border-purple-800/25';
  }
  return 'bg-charcoal/10 text-charcoal/80 border-charcoal/20';
}

/**
 * ServiceHoverList: Practice capabilities index.
 * - Mobile: Rich visual architectural cards with project photography, badges, and direct scope triggers.
 * - Desktop: Typographic index with real-time hover photo reveal in the sticky right column.
 */
export function ServiceHoverList({ services }: ServiceHoverListProps) {
  const [activeSlug, setActiveSlug] = useState<string>(services[0]?.slug ?? '');

  const activeService = services.find((s) => s.slug === activeSlug) || services[0];

  return (
    <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
      {/* 1. Services Column: Mobile Visual Cards + Desktop Typographic Rows */}
      <div className="lg:col-span-7">
        {/* Mobile: Visual Architectural Cards (lg:hidden) */}
        <div className="space-y-6 lg:hidden">
          {services.map((service, index) => {
            const number = (index + 1).toString().padStart(2, '0');
            return (
              <Reveal key={service.slug} delay={index * 0.04}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group block overflow-hidden rounded-sm border border-greige/30 bg-white p-4 shadow-sm transition-all duration-300 hover:border-accent-gold/60 hover:shadow-luxury"
                >
                  {/* Visual Photo Header on Mobile */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-greige/20 bg-paper">
                    <Image
                      src={service.heroImage}
                      alt={service.heroImageAlt}
                      fill
                      sizes="100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-103"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />
                    <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-bone">
                      <span className="font-mono text-[0.6875rem] font-semibold uppercase tracking-wider text-accent-gold drop-shadow">
                        {service.categoryTag}
                      </span>
                      <span className="font-mono text-xs font-semibold text-bone/90 drop-shadow">
                        {number}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="pt-3.5">
                    <div className="mb-2 flex items-baseline justify-between gap-3">
                      <h2 className="font-serif text-[1.25rem] font-medium text-charcoal group-hover:text-accent transition-colors">
                        {service.name}
                      </h2>
                      <span className="font-mono text-xs text-accent transition-transform group-hover:translate-x-1">
                        &rarr;
                      </span>
                    </div>

                    <p className="font-sans text-xs leading-relaxed text-charcoal/75">
                      {service.shortDescription}
                    </p>

                    <div className="mt-3.5 flex items-center justify-between border-t border-greige/20 pt-2.5 font-mono text-[0.6875rem] uppercase tracking-wider text-accent font-semibold">
                      <span>Explore Scope &amp; Specifications</span>
                      <span>&rarr;</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        {/* Desktop: Typographic Index with Hover Interactions (hidden lg:block) */}
        <ul className="hidden divide-y divide-greige/30 border-t border-greige/30 lg:block">
          {services.map((service, index) => {
            const isHovered = activeSlug === service.slug;
            const number = (index + 1).toString().padStart(2, '0');

            return (
              <li key={service.slug}>
                <Reveal delay={index * 0.03}>
                  <Link
                    href={`/services/${service.slug}`}
                    onMouseEnter={() => setActiveSlug(service.slug)}
                    onFocus={() => setActiveSlug(service.slug)}
                    className={cn(
                      'group block -mx-4 rounded-sm p-6 transition-all duration-300 ease-out',
                      isHovered
                        ? 'bg-white shadow-luxury border border-greige/20 translate-x-1.5'
                        : 'hover:bg-sandstone/30',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bone',
                    )}
                  >
                    <div className="mb-2.5 flex items-baseline justify-between gap-4">
                      <div className="flex items-baseline gap-5">
                        <span
                          className={cn(
                            'flex h-7 w-7 items-center justify-center rounded font-mono text-xs font-semibold transition-all duration-200',
                            isHovered
                              ? 'bg-charcoal text-accent-gold shadow-sm'
                              : 'bg-paper text-greige group-hover:text-charcoal',
                          )}
                        >
                          {number}
                        </span>
                        <h2
                          className={cn(
                            'font-serif text-fluid-h3 font-medium transition-colors duration-200',
                            isHovered ? 'text-accent' : 'text-charcoal group-hover:text-accent',
                          )}
                        >
                          {service.name}
                        </h2>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            'font-mono text-[0.6875rem] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border',
                            getCategoryBadge(service.categoryTag),
                          )}
                        >
                          {service.categoryTag}
                        </span>
                        <span className="font-mono text-base text-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200">
                          &rarr;
                        </span>
                      </div>
                    </div>

                    <p className="max-w-xl pl-12 font-sans text-[0.875rem] leading-relaxed text-charcoal/75">
                      {service.shortDescription}
                    </p>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 2. Right Column: Representative Photograph on Desktop Hover (hidden on mobile) */}
      <div className="sticky top-32 hidden lg:col-span-5 lg:block">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-accent-gold/40 bg-charcoal shadow-luxury-lg transition-all duration-300">
          {activeService && (
            <>
              <Image
                key={activeService.slug}
                src={activeService.heroImage}
                alt={activeService.heroImageAlt}
                fill
                sizes="40vw"
                className="object-cover transition-opacity duration-300"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute inset-3 pointer-events-none border border-white/10" />
              <div className="absolute bottom-5 left-5 right-5 rounded-sm border border-white/15 bg-charcoal/90 p-5 shadow-lg backdrop-blur-md">
                <span className="mb-1 block font-mono text-[0.6875rem] font-semibold uppercase tracking-widest text-accent-gold">
                  {activeService.categoryTag}
                </span>
                <span className="mb-1 block font-serif text-[1.1875rem] font-medium text-bone">
                  {activeService.name}
                </span>
                <span className="block font-sans text-xs leading-relaxed text-bone/70">
                  {activeService.heroPromise}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
