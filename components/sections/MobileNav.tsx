'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { env } from '@/lib/env';
import { BrandLogo } from '@/components/ui/BrandLogo';

export interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const NAV_ITEMS = [
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'Studio', href: '/studio' },
  { label: 'Process', href: '/process' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
];

/**
 * MobileNav: Full-screen editorial overlay on charcoal background.
 * - Staggered nav items at fluid h2 scale with generous vertical spacing.
 * - Focus trap, body scroll lock, Escape to close, focus restored to trigger.
 * - Auto-close on route change via usePathname.
 * - Phone, WhatsApp, Instagram links at bottom within thumb reach with safe-area insets.
 */
export function MobileNav({ isOpen, onClose, triggerRef }: MobileNavProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  // Close nav on route change
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      if (isOpen) {
        onClose();
      }
    }
  }, [pathname, isOpen, onClose]);

  // Lock body scroll and handle focus management
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus the close button upon opening
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        triggerRef.current?.focus();
        return;
      }

      if (e.key === 'Tab' && overlayRef.current) {
        const focusableElements = overlayRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (!first || !last) return;

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      id="mobile-nav"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className="fixed inset-0 z-50 flex flex-col justify-between overflow-y-auto bg-charcoal p-6 pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] text-bone transition-opacity duration-300 sm:p-10"
    >
      {/* Top bar: Brand title + Close button */}
      <div className="flex items-center justify-between border-b border-greige/20 pb-5">
        <BrandLogo size="sm" tone="light" onClick={onClose} />

        {/* Accessible Close Button (44px target) */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={() => {
            onClose();
            triggerRef.current?.focus();
          }}
          aria-label="Close navigation menu"
          className="flex h-11 w-11 items-center justify-center text-bone hover:text-accent focus-visible:ring-2 focus-visible:ring-accent"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <line x1="4" y1="4" x2="16" y2="16" />
            <line x1="16" y1="4" x2="4" y2="16" />
          </svg>
        </button>
      </div>

      {/* Center: Main Nav Links at h2 fluid size with generous vertical spacing */}
      <nav aria-label="Mobile main navigation" className="my-auto py-8">
        <ul className="flex flex-col space-y-6">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                onClick={onClose}
                className="flex min-h-[44px] items-center py-1 font-serif text-fluid-h2 font-normal text-bone transition-colors duration-200 hover:text-accent focus-visible:ring-2 focus-visible:ring-accent"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom: Contact & Social links within thumb reach */}
      <div className="flex flex-col gap-4 border-t border-greige/20 pt-6 font-sans text-ui-caption text-greige sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-4">
          <a
            href={`tel:${env.NEXT_PUBLIC_PHONE_NUMBER}`}
            className="flex min-h-[44px] items-center py-2 transition-colors hover:text-bone focus-visible:ring-2 focus-visible:ring-accent"
          >
            {env.NEXT_PUBLIC_PHONE_NUMBER}
          </a>
          <span aria-hidden="true" className="text-greige/40">•</span>
          <a
            href={`https://wa.me/${env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[44px] items-center py-2 transition-colors hover:text-bone focus-visible:ring-2 focus-visible:ring-accent"
          >
            WhatsApp
          </a>
          <span aria-hidden="true" className="text-greige/40">•</span>
          <a
            href="https://instagram.com/lodhiinteriors"
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[44px] items-center py-2 transition-colors hover:text-bone focus-visible:ring-2 focus-visible:ring-accent"
          >
            Instagram
          </a>
        </div>
        <div className="text-[0.8125rem] text-greige/70">Bhopal, Madhya Pradesh</div>
      </div>
    </div>
  );
}
