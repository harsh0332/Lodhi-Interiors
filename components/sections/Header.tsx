'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { MobileNav } from './MobileNav';

export interface HeaderProps {
  initialTone?: 'bone' | 'charcoal';
}

const NAV_LINKS = [
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'Studio', href: '/studio' },
  { label: 'Process', href: '/process' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
];

/**
 * Header: Global architectural navigation bar.
 * - Left: Logotype in serif with "by Soumya Lodhi" caption on desktop.
 * - Center: Editorial navigation links.
 * - Right: "Start your project" CTA + Mobile hamburger.
 * - Scroll: Transparent over hero with bone text, transitions to solid bone + charcoal text after 80px.
 * - Hides on scroll down, reveals on scroll up over 250ms.
 */
export function Header({ initialTone = 'bone' }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 80px threshold for solid bone background transition
      if (currentScrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide on scroll down, reveal on scroll up (with 12px threshold to prevent flicker)
      if (currentScrollY > 120 && currentScrollY > lastScrollY.current + 12) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current - 12 || currentScrollY <= 80) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pathname = usePathname();
  const isHome = pathname === '/';

  const headerThemeClasses = isScrolled
    ? 'bg-bone/95 backdrop-blur-sm text-charcoal border-b border-greige/20 shadow-none'
    : initialTone === 'charcoal' || !isHome
      ? 'bg-transparent text-charcoal'
      : 'bg-transparent text-bone';

  return (
    <>
      <header
        className={cn(
          'fixed left-0 right-0 top-0 z-40 w-full transition-all duration-[250ms] ease-out',
          isVisible ? 'translate-y-0' : '-translate-y-full',
          headerThemeClasses,
        )}
      >
        <div className="mx-auto flex h-20 max-w-container items-center justify-between px-5 md:h-24 md:px-12">
          {/* Brand Architectural Logotype */}
          <BrandLogo size="md" />

          {/* Desktop Navigation */}
          <nav aria-label="Main navigation" className="hidden items-center gap-8 xl:gap-10 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    'group relative py-1 font-sans text-[0.8125rem] font-medium uppercase tracking-[0.14em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                    isActive ? 'text-accent' : 'text-current/80 hover:text-current',
                  )}
                >
                  <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5">
                    {link.label}
                  </span>

                  {/* Active / Hover Animated Gold Hairline Indicator */}
                  <span
                    className={cn(
                      'absolute -bottom-1 left-0 h-[1.5px] w-full origin-left bg-accent transition-transform duration-300 ease-out',
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                    )}
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right Action & Mobile Trigger */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <Button
                variant="secondary"
                tone={isScrolled || initialTone === 'charcoal' ? 'light' : 'dark'}
                href="/contact"
                className="min-h-[44px] px-5 py-2 text-[0.8125rem]"
              >
                Start your project
              </Button>
            </div>

            {/* Mobile Hamburger (44px target) */}
            <button
              ref={hamburgerRef}
              type="button"
              onClick={() => setIsMobileNavOpen(true)}
              aria-expanded={isMobileNavOpen}
              aria-controls="mobile-nav"
              aria-label="Open navigation menu"
              className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 text-current hover:text-accent focus-visible:ring-2 focus-visible:ring-accent lg:hidden"
            >
              <span className="block h-[1.5px] w-5 bg-current transition-transform" />
              <span className="block h-[1.5px] w-5 bg-current transition-transform" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Navigation Overlay */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        triggerRef={hamburgerRef}
      />
    </>
  );
}
