'use client';

import { RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';
import { MOTION_DURATION, MOTION_EASE, MOTION_MEDIA } from './tokens';

const TRAVEL = 5;

/**
 * useSelectedWorkGallery: Port of Module 02 (Selected Work scroll gallery)
 * Controls viewport entry reveal (scale + fade), caption stagger, and desktop overscan parallax.
 */
export function useSelectedWorkGallery(rootRef: RefObject<HTMLElement | null>) {
  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const items = Array.from(root.querySelectorAll<HTMLElement>('[data-motion-item]'));
    if (!items.length) return;

    function parts(item: HTMLElement) {
      return {
        media: item.querySelector<HTMLElement>('[data-motion="reveal"]'),
        caption: item.querySelector<HTMLElement>('[data-motion="caption"]'),
        shift: item.querySelector<HTMLElement>('[data-motion="parallax"]'),
      };
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop branch
      mm.add(MOTION_MEDIA.desktop, () => {
        const made: Array<gsap.core.Timeline | gsap.core.Tween> = [];

        items.forEach((item) => {
          const p = parts(item);
          if (!p.media) return;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              end: 'bottom top',
              once: true,
            },
          });

          tl.fromTo(
            p.media,
            { opacity: 0, scale: 1.04 },
            {
              opacity: 1,
              scale: 1,
              duration: MOTION_DURATION.slow,
              ease: MOTION_EASE.cinematic,
            },
          );

          if (p.caption) {
            tl.fromTo(
              p.caption,
              { opacity: 0, y: 16 },
              {
                opacity: 1,
                y: 0,
                duration: MOTION_DURATION.base,
                ease: MOTION_EASE.entrance,
              },
              0.12,
            );
          }
          made.push(tl);

          if (p.shift) {
            const rawSpeed = p.shift.getAttribute('data-motion-speed');
            const speed = rawSpeed ? parseFloat(rawSpeed) : 1;
            const amp = TRAVEL * Math.max(-1, Math.min(1, isNaN(speed) ? 1 : speed));

            made.push(
              gsap.fromTo(
                p.shift,
                { yPercent: -amp },
                {
                  yPercent: amp,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: item,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 0.4,
                  },
                },
              ),
            );
          }
        });

        return () => {
          made.forEach((t) => {
            if ('scrollTrigger' in t && t.scrollTrigger) {
              (t.scrollTrigger as ScrollTrigger).kill();
            }
            t.kill();
          });
        };
      });

      // Mobile branch
      mm.add(MOTION_MEDIA.mobile, () => {
        const made: Array<gsap.core.Timeline> = [];

        items.forEach((item) => {
          const p = parts(item);
          if (!p.media) return;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              once: true,
            },
          });

          tl.fromTo(
            p.media,
            { opacity: 0, scale: 1.02 },
            {
              opacity: 1,
              scale: 1,
              duration: MOTION_DURATION.base,
              ease: MOTION_EASE.cinematic,
            },
          );

          if (p.caption) {
            tl.fromTo(
              p.caption,
              { opacity: 0, y: 12 },
              {
                opacity: 1,
                y: 0,
                duration: MOTION_DURATION.fast,
                ease: MOTION_EASE.entrance,
              },
              0.08,
            );
          }
          made.push(tl);
        });

        return () => {
          made.forEach((t) => {
            if (t.scrollTrigger) {
              (t.scrollTrigger as ScrollTrigger).kill();
            }
            t.kill();
          });
        };
      });

      // Reduced motion
      mm.add(MOTION_MEDIA.reduced, () => {
        items.forEach((item) => {
          const p = parts(item);
          const targets = [p.media, p.caption, p.shift].filter(Boolean);
          if (targets.length) {
            gsap.set(targets, { clearProps: 'all' });
          }
        });
      });
    }, root);

    return () => {
      ctx.revert();
    };
  }, [rootRef]);
}
