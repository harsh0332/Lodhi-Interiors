'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { env } from '@/lib/env';
import { trackWhatsAppClick, trackCallClick } from '@/lib/analytics';

/**
 * StickyMobileBar: Mobile-only sticky bottom quick-action bar.
 * - Three equal targets: WhatsApp, Call, Enquire (min 48px height each).
 * - Appears after the hero has scrolled past (> 500px).
 * - Dynamically hides near the footer so it never obscures footer actions.
 */
export function StickyMobileBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Appears after hero section (~550px)
      const pastHero = scrollY > 550;

      // Hides when reaching footer area (approx bottom 450px of page)
      const nearFooter = windowHeight + scrollY >= documentHeight - 450;

      if (pastHero && !nearFooter) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <aside
      aria-label="Quick contact actions"
      className={`fixed bottom-0 left-0 right-0 z-30 block border-t border-greige/20 bg-charcoal pb-[max(0.5rem,env(safe-area-inset-bottom,0px))] text-bone transition-transform duration-300 ease-out lg:hidden ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="grid grid-cols-3 divide-x divide-greige/20">
        {/* 1. WhatsApp */}
        <a
          href={`https://wa.me/${env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(
            'Hello Soumya, I would like to consult on an interior project in Bhopal.',
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick('mobile_sticky_bar')}
          className="flex min-h-[48px] items-center justify-center px-2 py-3 font-sans text-[0.8125rem] font-medium uppercase tracking-[0.06em] text-bone transition-colors hover:bg-charcoal-2 hover:text-accent focus-visible:ring-2 focus-visible:ring-accent"
        >
          WhatsApp
        </a>

        {/* 2. Direct Call */}
        <a
          href={`tel:${env.NEXT_PUBLIC_PHONE_NUMBER}`}
          onClick={() => trackCallClick('mobile_sticky_bar')}
          className="flex min-h-[48px] items-center justify-center px-2 py-3 font-sans text-[0.8125rem] font-medium uppercase tracking-[0.06em] text-bone transition-colors hover:bg-charcoal-2 hover:text-accent focus-visible:ring-2 focus-visible:ring-accent"
        >
          Call
        </a>

        {/* 3. Enquire Form */}
        <Link
          href="/contact"
          className="flex min-h-[48px] items-center justify-center bg-bone px-2 py-3 font-sans text-[0.8125rem] font-medium uppercase tracking-[0.06em] text-charcoal transition-colors hover:bg-paper focus-visible:ring-2 focus-visible:ring-accent"
        >
          Enquire
        </Link>
      </div>
    </aside>
  );
}
