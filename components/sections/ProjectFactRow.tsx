import React from 'react';
import Link from 'next/link';
import type { ProjectFrontmatter } from '@/lib/content';
import { cn } from '@/lib/utils';

export interface ProjectFactRowProps {
  frontmatter: Pick<
    ProjectFrontmatter,
    'locality' | 'city' | 'projectType' | 'areaSqft' | 'scope' | 'year'
  >;
  className?: string;
}

const SERVICE_SLUG_BY_TYPE: Record<string, string> = {
  residential: 'residential-interiors',
  'luxury-home': 'luxury-home-interiors',
  'modular-kitchen': 'modular-kitchens',
  office: 'office-interiors',
  retail: 'retail-showroom-interiors',
  hospitality: 'hospitality-restaurant-interiors',
  commercial: 'commercial-interiors',
};

const LOCALITY_SLUG_BY_NAME: Record<string, string> = {
  'Arera Colony': 'arera-colony',
  Shahpura: 'shahpura',
  'Koh-e-Fiza': 'kohefiza',
  'Chuna Bhatti': 'chunabhatti',
  'Bawadiya Kalan': 'bawadiya-kalan',
  'MP Nagar': 'mp-nagar',
};

/**
 * ProjectFactRow: Semantic `<dl>` metadata summary for architectural case studies.
 * - Desktop: 5-column horizontal strip with hairline greige borders.
 * - Mobile (<768px): Stacks into an accessible two-column grid.
 * - Cross-links directly to connected Service and Locality pages for SEO graph continuity.
 */
export function ProjectFactRow({ frontmatter, className }: ProjectFactRowProps) {
  const formattedType = frontmatter.projectType.replace(/-/g, ' ');
  const formattedScope =
    frontmatter.scope === 'turnkey'
      ? 'Turnkey Design & Build'
      : frontmatter.scope === 'design'
        ? 'Interior Architecture'
        : 'On-Site Execution';

  const serviceSlug = SERVICE_SLUG_BY_TYPE[frontmatter.projectType];
  const localitySlug = LOCALITY_SLUG_BY_NAME[frontmatter.locality];

  const facts = [
    {
      label: 'Location',
      value: `${frontmatter.locality}, ${frontmatter.city}`,
      href: localitySlug ? `/locations/${localitySlug}` : undefined,
    },
    {
      label: 'Typology',
      value: formattedType,
      capitalize: true,
      href: serviceSlug ? `/services/${serviceSlug}` : undefined,
    },
    { label: 'Area', value: `${frontmatter.areaSqft.toLocaleString('en-IN')} sq.ft.` },
    { label: 'Scope', value: formattedScope },
    { label: 'Year', value: frontmatter.year.toString() },
  ];

  return (
    <div
      className={cn(
        'my-8 w-full border-b border-t border-greige/30 py-6 md:my-12 md:py-8',
        className,
      )}
    >
      <dl className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 md:grid-cols-5 md:gap-4 md:divide-x md:divide-greige/25">
        {facts.map((fact, index) => (
          <div
            key={fact.label}
            className={cn(
              'flex flex-col gap-1',
              index > 0 ? 'md:pl-6' : '',
              index === 4 ? 'col-span-2 sm:col-span-1' : '',
            )}
          >
            <dt className="font-sans text-ui-label uppercase tracking-[0.08em] text-greige">
              {fact.label}
            </dt>
            <dd
              className={cn(
                'font-sans text-[0.9375rem] font-medium text-charcoal',
                fact.capitalize ? 'capitalize' : '',
              )}
            >
              {fact.href ? (
                <Link
                  href={fact.href}
                  className="transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                >
                  {fact.value}
                </Link>
              ) : (
                fact.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
