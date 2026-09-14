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
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // Autoplay restricted on low power mode; poster frame seamlessly handles display
        });
      }
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
          src="/hero-video.mp4"
          poster="/hero-poster.jpg"
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
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

            <div data-motion-item className="flex items-center gap-4">
              <Button
                variant="secondary"
                tone="dark"
                href="/contact"
                className="min-h-[48px] px-8 text-[0.9375rem]"
              >
                Start your project
              </Button>
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
