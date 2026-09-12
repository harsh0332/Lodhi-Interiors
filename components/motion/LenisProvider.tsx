'use client';

import React, { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

let isLenisInitialised = false;

/**
 * LenisProvider: Unified smooth scroll engine for LODHI INTERIORS.
 * - Single Lenis scroll authority across the application.
 * - Bridges Lenis scroll events to GSAP ScrollTrigger ticker:
 *     lenis.on('scroll', ScrollTrigger.update)
 *     gsap.ticker.add(time => lenis.raf(time * 1000))
 *     gsap.ticker.lagSmoothing(0)
 * - Synchronises ScrollTrigger with font loading, window load, and debounced window resize.
 * - Respects prefers-reduced-motion: reduce by stopping Lenis and returning to native scroll.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    if (process.env.NODE_ENV === 'development' && !isLenisInitialised) {
      console.log('[Lenis] Smooth scroll engine initialised (single authority)');
    }
    isLenisInitialised = true;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // 1. Bridge Lenis scroll to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // 2. Single GSAP ticker driving Lenis RAF (strictly no second rAF loop)
    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    // 3. Prevent desync: refresh ScrollTrigger after fonts load, images load, and debounced resize
    const handleRefresh = () => {
      ScrollTrigger.refresh();
    };

    if (document.fonts) {
      document.fonts.ready.then(handleRefresh).catch(() => {});
    }

    window.addEventListener('load', handleRefresh);

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // 4. Reduced motion handling
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotion = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        lenis.stop();
        ScrollTrigger.refresh();
      } else {
        lenis.start();
        ScrollTrigger.refresh();
      }
    };

    handleMotion(mediaQuery);
    mediaQuery.addEventListener?.('change', handleMotion);

    return () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      mediaQuery.removeEventListener?.('change', handleMotion);
      window.removeEventListener('load', handleRefresh);
      window.removeEventListener('resize', handleResize);
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
      lenisRef.current = null;
      isLenisInitialised = false;
    };
  }, []);

  return <LenisContext.Provider value={lenisRef.current}>{children}</LenisContext.Provider>;
}
