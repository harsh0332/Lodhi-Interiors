'use client';

import React, { useState, useEffect, useRef, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { gsap } from 'gsap';
import type { Project, ProjectType } from '@/lib/content';
import { cn } from '@/lib/utils';
import { WorkGalleryView } from './WorkGalleryView';
import { WorkTableView } from './WorkTableView';

export interface WorkIndexClientProps {
  initialProjects: Project[];
}

const FILTER_CATEGORIES: { key: string; label: string; projectType?: ProjectType }[] = [
  { key: 'all', label: 'All' },
  { key: 'residential', label: 'Residential', projectType: 'residential' },
  { key: 'luxury-home', label: 'Luxury homes', projectType: 'luxury-home' },
  { key: 'modular-kitchen', label: 'Modular kitchens', projectType: 'modular-kitchen' },
  { key: 'office', label: 'Office', projectType: 'office' },
  { key: 'retail', label: 'Retail', projectType: 'retail' },
  { key: 'hospitality', label: 'Hospitality', projectType: 'hospitality' },
  { key: 'commercial', label: 'Commercial', projectType: 'commercial' },
];

/**
 * WorkIndexClient: Client orchestrator for the portfolio index.
 * - View mode toggle (Gallery vs Index), persisted in sessionStorage.
 * - Category filter synchronized with URL query parameter (?type=...).
 * - Live count announced via polite live region.
 * - Honest empty state with nearest category navigation.
 * - Non-blocking GSAP mask wipe transition into case studies.
 */
export function WorkIndexClient({ initialProjects }: WorkIndexClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  // 1. View mode state (gallery vs index)
  const [viewMode, setViewMode] = useState<'gallery' | 'index'>('gallery');

  // 2. Active filter state
  const typeParam = searchParams.get('type') || 'all';
  const [activeFilter, setActiveFilter] = useState<string>(typeParam);

  // Transition wipe overlay ref
  const transitionOverlayRef = useRef<HTMLDivElement>(null);

  // Initialize and restore view mode from sessionStorage
  useEffect(() => {
    try {
      const savedMode = sessionStorage.getItem('lodhi_work_view_mode');
      if (savedMode === 'gallery' || savedMode === 'index') {
        setViewMode(savedMode);
      }
    } catch {
      // Ignore storage access errors in private browsing
    }
  }, []);

  // Update filter when query param changes
  useEffect(() => {
    const currentParam = searchParams.get('type') || 'all';
    setActiveFilter(currentParam);
  }, [searchParams]);

  // Handle view mode change
  const handleViewModeChange = (mode: 'gallery' | 'index') => {
    setViewMode(mode);
    try {
      sessionStorage.setItem('lodhi_work_view_mode', mode);
    } catch {
      // Ignore storage error
    }
  };

  // Handle filter change
  const handleFilterChange = (filterKey: string) => {
    setActiveFilter(filterKey);
    const params = new URLSearchParams(searchParams.toString());
    if (filterKey === 'all') {
      params.delete('type');
    } else {
      params.set('type', filterKey);
    }
    const query = params.toString() ? `?${params.toString()}` : '';
    startTransition(() => {
      router.replace(`/work${query}`, { scroll: false });
    });
  };

  // 3. Filter projects
  const filteredProjects = initialProjects.filter((project) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'commercial') {
      return ['commercial', 'office', 'retail', 'hospitality'].includes(project.frontmatter.projectType);
    }
    return project.frontmatter.projectType === activeFilter;
  });

  // 4. Case study transition handler
  const handleProjectClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault();
    const destination = `/work/${slug}`;

    // Respect prefers-reduced-motion or mobile viewport: navigate instantly
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    if (mediaQuery.matches || !transitionOverlayRef.current || isMobile) {
      router.push(destination);
      return;
    }

    const overlay = transitionOverlayRef.current;

    // Safety timeout: never block navigation if animation stalls
    const safetyTimer = setTimeout(() => {
      router.push(destination);
    }, 600);

    gsap.set(overlay, { display: 'block', opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' });
    gsap.to(overlay, {
      opacity: 1,
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        clearTimeout(safetyTimer);
        router.push(destination);
      },
    });
  };

  const activeCategoryObj =
    FILTER_CATEGORIES.find((c) => c.key === activeFilter) || FILTER_CATEGORIES[0];

  return (
    <>
      {/* Non-blocking GSAP transition overlay */}
      <div
        ref={transitionOverlayRef}
        className="pointer-events-none fixed inset-0 z-50 hidden bg-charcoal"
        aria-hidden="true"
      />

      {/* Controls Bar: Filters + View Mode Toggle + Live Count */}
      <div className="mb-12 border-b border-t border-greige/30 py-6 md:mb-16">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          {/* Pill-free Filter Buttons with 2px Underline & Font-Semibold Active Indicator */}
          <nav aria-label="Filter projects by typology" className="overflow-x-auto pb-2 lg:pb-0">
            <ul className="flex min-w-max items-center gap-1 sm:gap-2">
              {FILTER_CATEGORIES.map((cat) => {
                const isActive = activeFilter === cat.key;
                return (
                  <li key={cat.key}>
                    <button
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => handleFilterChange(cat.key)}
                      className={cn(
                        'relative flex min-h-[44px] select-none items-center justify-center px-3 py-2 font-sans text-[0.875rem] transition-colors',
                        isActive
                          ? 'font-semibold text-charcoal'
                          : 'font-normal text-charcoal/70 hover:text-charcoal',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-bone',
                      )}
                    >
                      <span>{cat.label}</span>
                      {isActive && (
                        <span
                          className="absolute bottom-1.5 left-3 right-3 h-[2px] bg-charcoal"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right Controls: View Toggle + Count */}
          <div className="flex items-center justify-between gap-6 lg:justify-end">
            {/* Live Count Announcer */}
            <div className="font-mono font-sans text-ui-caption text-greige">
              <span className="sr-only" role="status" aria-live="polite">
                {filteredProjects.length} projects found
              </span>
              <span>
                {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
              </span>
            </div>

            {/* Accessible View Mode Toggle */}
            <div
              role="group"
              aria-label="Portfolio view layout"
              className="flex items-center rounded-sm border border-greige/30 bg-paper/50 p-0.5"
            >
              <button
                type="button"
                aria-pressed={viewMode === 'gallery'}
                onClick={() => handleViewModeChange('gallery')}
                className={cn(
                  'flex min-h-[44px] min-w-[44px] items-center justify-center rounded-sm px-3.5 py-1.5 font-sans text-ui-caption transition-colors',
                  viewMode === 'gallery'
                    ? 'border border-greige/20 bg-bone font-medium text-charcoal shadow-none'
                    : 'text-greige hover:text-charcoal',
                  'focus-visible:ring-2 focus-visible:ring-accent',
                )}
              >
                Gallery
              </button>
              <button
                type="button"
                aria-pressed={viewMode === 'index'}
                onClick={() => handleViewModeChange('index')}
                className={cn(
                  'flex min-h-[44px] min-w-[44px] items-center justify-center rounded-sm px-3.5 py-1.5 font-sans text-ui-caption transition-colors',
                  viewMode === 'index'
                    ? 'border border-greige/20 bg-bone font-medium text-charcoal shadow-none'
                    : 'text-greige hover:text-charcoal',
                  'focus-visible:ring-2 focus-visible:ring-accent',
                )}
              >
                Index
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Project Presentation (Gallery vs Index vs Empty State) */}
      {filteredProjects.length > 0 ? (
        viewMode === 'gallery' ? (
          <WorkGalleryView projects={filteredProjects} onProjectClick={handleProjectClick} />
        ) : (
          <WorkTableView projects={filteredProjects} onProjectClick={handleProjectClick} />
        )
      ) : (
        /* Honest Empty State: Suggests Nearest Typologies */
        <div className="mx-auto max-w-xl border border-greige/20 bg-paper/30 p-8 py-20 text-center md:py-28">
          <span className="mb-2 block font-mono text-ui-caption uppercase tracking-wider text-accent">
            Notice
          </span>
          <h2 className="mb-4 font-serif text-fluid-h3 text-charcoal">
            No projects catalogued under &ldquo;{activeCategoryObj?.label}&rdquo; yet.
          </h2>
          <p className="mb-8 font-sans text-[0.9375rem] leading-relaxed text-charcoal/80">
            We are documenting several private commissions in Bhopal. In the interim, examine our
            adjacent residential or office case studies, or contact the studio for private
            portfolios.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => handleFilterChange('residential')}
              className="rounded-sm border border-charcoal/30 px-4 py-2 font-sans text-xs text-charcoal transition-colors hover:bg-charcoal hover:text-bone"
            >
              View Residential Projects
            </button>
            <button
              type="button"
              onClick={() => handleFilterChange('all')}
              className="rounded-sm bg-charcoal px-4 py-2 font-sans text-xs text-bone transition-colors hover:bg-charcoal-2"
            >
              Reset Filter
            </button>
          </div>
        </div>
      )}
    </>
  );
}
