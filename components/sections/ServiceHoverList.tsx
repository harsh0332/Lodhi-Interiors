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

/**
 * ServiceHoverList: Typographic index of services with desktop hover photo reveal.
 * Strictly typographic; zero icon tiles.
 */
export function ServiceHoverList({ services }: ServiceHoverListProps) {
  const [activeSlug, setActiveSlug] = useState<string>(services[0]?.slug ?? '');

  const activeService = services.find((s) => s.slug === activeSlug) || services[0];

  return (
    <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
      {/* 1. Left Column: Typographic Service Index */}
      <div className="lg:col-span-7">
        <ul className="divide-y divide-greige/30 border-t border-greige/30">
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
                      'group block py-6 transition-transform duration-300 ease-out hover:translate-x-2 md:py-8',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bone',
                    )}
                  >
                    <div className="mb-2 flex items-baseline justify-between gap-4">
                      <div className="flex items-baseline gap-4 sm:gap-6">
                        <span
                          className={cn(
                            'font-mono text-ui-caption transition-colors duration-200',
                            isHovered ? 'text-accent' : 'text-greige',
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

                      <span className="hidden font-sans text-ui-caption uppercase tracking-[0.08em] text-greige sm:block">
                        {service.categoryTag}
                      </span>
                    </div>

                    <p className="max-w-xl pl-8 font-sans text-[0.875rem] leading-relaxed text-charcoal/70 sm:pl-11">
                      {service.shortDescription}
                    </p>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 2. Right Column: Representative Photograph on Desktop Hover */}
      <div className="sticky top-32 hidden lg:col-span-5 lg:block">
        <div className="relative aspect-[4/5] w-full overflow-hidden border border-greige/20 bg-paper transition-all duration-300">
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
                className="pointer-events-none absolute inset-0 bg-charcoal/20"
                aria-hidden="true"
              />
              <div className="absolute bottom-4 left-4 right-4 border border-greige/20 bg-bone/95 p-4">
                <span className="mb-0.5 block font-serif text-[1rem] text-charcoal">
                  {activeService.name}
                </span>
                <span className="block font-sans text-ui-caption text-greige">
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
