'use client';

import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { useHeroSequence } from '@/components/motion/useHeroSequence';

/**
 * Hero: Primary viewpoint into LODHI INTERIORS.
 * - Single h1 element on the page in display serif.
 * - Full-bleed cinematic video background with solid low-opacity charcoal scrim.
 * - Mobile-optimized autoplay, muted, playsInline, and instant poster fallback.
 * - Orchestrated first-load sequence powered by useHeroSequence (Module 01 contract).
 * - Dynamic line-split masks, un-blur and subtle scale, and desktop parallax.
 * - Strict zero-layout-shift and immediate static presentation under prefers-reduced-motion.
 */
export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  useHeroSequence(containerRef);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;

    // Defer attaching video src and playing until after initial paint / idle to keep mobile LCP under 1.4s
    const loadAndPlayVideo = () => {
      if (!video.src || video.src === window.location.href) {
        video.src = '/hero-video.mp4';
        video.load();
      }
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // Autoplay restricted on low power mode; poster frame seamlessly handles display
        });
      }
    };

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const handle = (
        window as unknown as {
          requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number;
        }
      ).requestIdleCallback(loadAndPlayVideo, { timeout: 2000 });
      return () => {
        if ('cancelIdleCallback' in window) {
          (window as unknown as { cancelIdleCallback: (h: number) => void }).cancelIdleCallback(
            handle,
          );
        }
      };
    } else {
      const timer = setTimeout(loadAndPlayVideo, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <section
      ref={containerRef}
      data-motion-module="hero"
      className="relative flex min-h-[90vh] w-full items-center justify-center overflow-hidden bg-charcoal md:min-h-screen"
      aria-label="Studio Overview"
    >
      {/* 1. Cinematic Hero Video */}
      <div data-motion="media" className="absolute inset-0 h-full w-full overflow-hidden">
        <video
          ref={videoRef}
          poster="/hero-poster.webp"
          muted
          playsInline
          loop
          preload="none"
          aria-hidden="true"
          className="h-full w-full object-cover object-[center_35%] md:object-center will-change-transform pointer-events-none select-none"
        />
        {/* Solid charcoal scrim for contrast; strictly no gradients */}
        <div className="pointer-events-none absolute inset-0 bg-charcoal/45" aria-hidden="true" />
      </div>

      {/* 2. Content Layer */}
      <div
        data-motion="text-layer"
        className="hero__copy relative z-10 mx-auto w-full max-w-container px-5 pb-24 pt-32 text-bone md:px-12 md:pb-28 md:pt-40"
      >
        <div className="max-w-3xl">
          {/* Exactly ONE h1 on the page with data-motion="mask" */}
          <h1
            data-motion="mask"
            className="mb-6 font-serif text-fluid-display font-normal leading-[1.02] tracking-[-0.02em] text-bone"
          >
            Interiors, designed and delivered.
          </h1>

          {/* Supporting Statement & CTA */}
          <div>
            <p
              data-motion-item
              className="mb-8 max-w-[48ch] font-sans text-fluid-body leading-relaxed text-bone/90 md:mb-10"
            >
              A Bhopal studio shaping complete residential and commercial spaces — from first
              drawing to final handover.
            </p>

            <div data-motion-item className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Button
                variant="secondary"
                tone="dark"
                href="/contact"
                className="min-h-[48px] px-8 text-[0.9375rem]"
              >
                Start your project
              </Button>
              <a
                href="tel:+919131569856"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 border border-accent-gold/40 bg-charcoal/70 px-5 py-2.5 font-sans text-[0.875rem] font-medium text-accent-gold backdrop-blur-sm transition-all duration-200 hover:border-accent-gold hover:bg-charcoal sm:hidden"
                aria-label="Call studio desk: 09131569856"
              >
                <svg
                  className="h-4 w-4 text-accent-gold"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>Call 09131569856</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Quiet Scroll Cue at Base */}
      <div
        data-motion="cue"
        className="pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-bone/60 md:bottom-8"
        aria-hidden="true"
      >
        <span className="font-sans text-ui-label uppercase tracking-[0.14em] text-bone/70">
          Scroll
        </span>
        <span className="block h-6 w-[1px] bg-bone/40" />
      </div>
    </section>
  );
}
