'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/Button';

const HERO_SESSION_KEY = 'lodhi_hero_orchestrated_v1';

/**
 * Hero: Primary viewpoint into LODHI INTERIORS.
 * - Single h1 element on the page in display serif.
 * - Full-bleed photograph with solid low-opacity charcoal scrim (no gradients).
 * - Priority LCP image in the DOM from initial HTML paint.
 * - Orchestrated first-load sequence (900ms un-blur and subtle 1.05 -> 1.0 scale) runs
 *   strictly once per session via sessionStorage.
 * - Display headline lines rise masked over 600ms with 80ms stagger.
 * - Immediate static presentation under prefers-reduced-motion or subsequent session visits.
 */
export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const headlineLinesRef = useRef<HTMLSpanElement[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const img = imageRef.current;
    const lines = headlineLinesRef.current.filter(Boolean);
    const content = contentRef.current;
    if (!img) return;

    const mm = gsap.matchMedia();
    const hasSeenHero = sessionStorage.getItem(HERO_SESSION_KEY);

    mm.add(
      {
        isDesktop: '(min-width: 769px) and (prefers-reduced-motion: no-preference)',
        isMobile: '(max-width: 768px) and (prefers-reduced-motion: no-preference)',
        isReduced: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const { isDesktop, isMobile } = (context.conditions || {}) as {
          isDesktop?: boolean;
          isMobile?: boolean;
          isReduced?: boolean;
        };

        if (hasSeenHero) {
          // Subsequent session visit: render static immediately without tweening
          gsap.set(img, { scale: 1.0, filter: 'blur(0px)', clearProps: 'transform,filter' });
          gsap.set(lines, { yPercent: 0, opacity: 1, clearProps: 'all' });
          if (content) {
            gsap.set(content, { opacity: 1, y: 0, clearProps: 'all' });
          }
          return;
        }

        if (isDesktop) {
          // Desktop: 900ms un-blur + scale 1.05 to 1.0
          const tl = gsap.timeline({
            onComplete: () => {
              sessionStorage.setItem(HERO_SESSION_KEY, 'true');
            },
          });

          tl.fromTo(
            img,
            { scale: 1.05, filter: 'blur(10px)' },
            { scale: 1.0, filter: 'blur(0px)', duration: 0.9, ease: 'power2.out' },
            0,
          );

          tl.fromTo(
            lines,
            { yPercent: 110, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' },
            0.15,
          );

          if (content) {
            tl.fromTo(
              content,
              { opacity: 0, y: 16 },
              { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
              0.4,
            );
          }
        } else if (isMobile) {
          // Mobile: Snappy 350ms cap, no heavy GPU filter blurs
          const tl = gsap.timeline({
            onComplete: () => {
              sessionStorage.setItem(HERO_SESSION_KEY, 'true');
            },
          });

          tl.fromTo(
            img,
            { opacity: 0.85 },
            { opacity: 1, duration: 0.35, ease: 'power2.out' },
            0,
          );

          tl.fromTo(
            lines,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.35, stagger: 0.05, ease: 'power2.out' },
            0.05,
          );

          if (content) {
            tl.fromTo(
              content,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
              0.15,
            );
          }
        } else {
          // Reduced motion
          gsap.set(img, { scale: 1.0, filter: 'blur(0px)', clearProps: 'all' });
          gsap.set(lines, { yPercent: 0, opacity: 1, clearProps: 'all' });
          if (content) {
            gsap.set(content, { opacity: 1, y: 0, clearProps: 'all' });
          }
        }
      },
    );

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[90vh] w-full items-center justify-center overflow-hidden bg-charcoal md:min-h-screen"
      aria-label="Studio Overview"
    >
      {/* 1. LCP Priority Hero Image */}
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        <Image
          ref={imageRef}
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=75&w=2000&auto=format&fit=crop"
          alt="The Aranya Residence double-height living pavilion featuring natural Italian travertine and fluted teak joinery in Arera Colony, Bhopal"
          fill
          priority
          sizes="100vw"
          quality={75}
          className="object-cover object-[center_35%] md:object-center will-change-transform"
        />
        {/* Solid charcoal scrim for contrast; strictly no gradients */}
        <div className="pointer-events-none absolute inset-0 bg-charcoal/45" aria-hidden="true" />
      </div>

      {/* 2. Content Layer */}
      <div className="relative z-10 mx-auto w-full max-w-container px-5 pb-24 pt-32 text-bone md:px-12 md:pb-28 md:pt-40">
        <div className="max-w-3xl">
          {/* Exactly ONE h1 on the page */}
          <h1 className="mb-6 font-serif text-fluid-display font-normal leading-[1.02] tracking-[-0.02em] text-bone">
            <span className="block overflow-hidden py-1">
              <span
                ref={(el) => {
                  if (el) headlineLinesRef.current[0] = el;
                }}
                className="block will-change-transform"
              >
                Interiors,
              </span>
            </span>
            <span className="block overflow-hidden py-1">
              <span
                ref={(el) => {
                  if (el) headlineLinesRef.current[1] = el;
                }}
                className="block will-change-transform"
              >
                designed and delivered.
              </span>
            </span>
          </h1>

          {/* Supporting Statement & CTA */}
          <div ref={contentRef} className="will-change-transform">
            <p className="mb-8 max-w-[48ch] font-sans text-fluid-body leading-relaxed text-bone/90 md:mb-10">
              A Bhopal studio shaping complete residential and commercial spaces — from first
              drawing to final handover.
            </p>

            <div className="flex items-center gap-4">
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
        className="pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-bone/60 md:bottom-8"
        aria-hidden="true"
      >
        <span className="font-sans text-ui-label uppercase tracking-[0.14em] text-bone/70">
          Scroll
        </span>
        <span className="block h-6 w-[1px] animate-pulse bg-bone/40" />
      </div>
    </section>
  );
}
