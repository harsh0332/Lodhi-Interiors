'use client';

import { RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';
import { MOTION_DURATION, MOTION_EASE, MOTION_MEDIA, MOTION_STAGGER } from './tokens';

/**
 * useClosingCTAMotion: Port of Module 07A (closing call to action)
 * - Masked headline rise (yPercent: 108 -> 0)
 * - Staggered button reveal (opacity: 0 -> 1, y: 12 -> 0)
 */
export function useClosingCTAMotion(rootRef: RefObject<HTMLElement | null>) {
  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const line = Array.from(root.querySelectorAll<HTMLElement>("[data-motion='mask'] > *"));
    const actions = Array.from(root.querySelectorAll<HTMLElement>('[data-motion-item]'));

    function finalState() {
      if (line.length) gsap.set(line, { clearProps: 'transform' });
      if (actions.length) gsap.set(actions, { clearProps: 'transform,opacity' });
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      function buildTimeline() {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          onComplete: finalState,
        });

        if (line.length) {
          tl.from(line, {
            yPercent: 108,
            duration: 0.6,
            ease: MOTION_EASE.cinematic,
          });
        }

        if (actions.length) {
          tl.fromTo(
            actions,
            { opacity: 0, y: 12 },
            {
              immediateRender: false,
              opacity: 1,
              y: 0,
              duration: MOTION_DURATION.base,
              ease: MOTION_EASE.entrance,
              stagger: MOTION_STAGGER.base,
            },
            0.2,
          );
        }

        return () => {
          if (tl.scrollTrigger) tl.scrollTrigger.kill();
          tl.kill();
          finalState();
        };
      }

      mm.add(MOTION_MEDIA.desktop, buildTimeline);
      mm.add(MOTION_MEDIA.mobile, buildTimeline);
      mm.add(MOTION_MEDIA.reduced, () => {
        finalState();
      });
    }, root);

    return () => {
      ctx.revert();
    };
  }, [rootRef]);
}

/**
 * useFooterReveal: Port of Module 07B (footer staggered entrance)
 * - Staggered rise of structural footer blocks
 */
export function useFooterReveal(rootRef: RefObject<HTMLElement | null>) {
  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const blocks = Array.from(root.querySelectorAll<HTMLElement>('[data-motion-item]'));
    if (!blocks.length) return;

    function finalState() {
      gsap.set(blocks, { clearProps: 'transform,opacity' });
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      function buildTimeline() {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top 90%',
            once: true,
          },
          onComplete: finalState,
        });

        tl.from(blocks, {
          opacity: 0,
          y: 20,
          duration: MOTION_DURATION.base,
          ease: MOTION_EASE.entrance,
          stagger: 0.06,
        });

        return () => {
          if (tl.scrollTrigger) tl.scrollTrigger.kill();
          tl.kill();
          finalState();
        };
      }

      mm.add(MOTION_MEDIA.desktop, buildTimeline);
      mm.add(MOTION_MEDIA.mobile, buildTimeline);
      mm.add(MOTION_MEDIA.reduced, () => {
        finalState();
      });
    }, root);

    return () => {
      ctx.revert();
    };
  }, [rootRef]);
}

/**
 * useCustomCursor: Port of Module 07C (brass trailing cursor ring)
 * - Desktop only: (hover: hover) and (pointer: fine)
 * - Uses gsap.quickTo to ride the main GSAP ticker (zero extraneous rAF loops)
 */
export function useCustomCursor(
  cursorRef: RefObject<HTMLElement | null>,
  growSelector = "a, button, [data-motion-cursor='grow']",
) {
  useIsomorphicLayoutEffect(() => {
    const root = cursorRef.current;
    if (!root || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_MEDIA.desktop, () => {
        let shown = false;
        const listeners: Array<[EventTarget, string, EventListenerOrEventListenerObject]> = [];

        function on(
          target: EventTarget,
          type: string,
          fn: EventListenerOrEventListenerObject,
        ) {
          target.addEventListener(type, fn, { passive: true });
          listeners.push([target, type, fn]);
        }

        gsap.set(root, {
          xPercent: -50,
          yPercent: -50,
          scale: 1,
          opacity: 0,
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
        });

        const xTo = gsap.quickTo(root, 'x', { duration: 0.35, ease: 'power3' });
        const yTo = gsap.quickTo(root, 'y', { duration: 0.35, ease: 'power3' });
        const scaleTo = gsap.quickTo(root, 'scale', { duration: 0.25, ease: MOTION_EASE.snap });

        on(window, 'pointermove', ((e: PointerEvent) => {
          if (e.pointerType && e.pointerType !== 'mouse') return;
          xTo(e.clientX);
          yTo(e.clientY);
          if (!shown) {
            shown = true;
            gsap.to(root, { opacity: 1, duration: 0.25 });
          }
        }) as EventListener);

        on(document, 'pointerover', ((e: PointerEvent) => {
          const target = e.target as HTMLElement | null;
          if (target && target.closest && target.closest(growSelector)) {
            scaleTo(2.3);
          }
        }) as EventListener);

        on(document, 'pointerout', ((e: PointerEvent) => {
          const target = e.target as HTMLElement | null;
          if (target && target.closest && target.closest(growSelector)) {
            scaleTo(1);
          }
        }) as EventListener);

        on(document, 'mouseleave', () => {
          gsap.to(root, { opacity: 0, duration: 0.2 });
          shown = false;
        });

        return () => {
          listeners.forEach(([tgt, type, fn]) => tgt.removeEventListener(type, fn));
          gsap.killTweensOf(root);
          gsap.set(root, { clearProps: 'all' });
        };
      });

      mm.add(MOTION_MEDIA.mobile, () => {
        gsap.set(root, { opacity: 0 });
      });

      mm.add(MOTION_MEDIA.reduced, () => {
        gsap.set(root, { opacity: 0 });
      });
    }, root);

    return () => {
      ctx.revert();
    };
  }, [cursorRef, growSelector]);
}

/**
 * useStickyMobileBar: Port of Module 07D (sticky mobile action bar)
 * - Driven by ScrollTrigger boundaries (clearing hero, hiding before closing CTA/footer)
 * - Slide entrance/exit on mobile, instant visibility in reduced motion, hidden on desktop
 */
export function useStickyMobileBar(
  barRef: RefObject<HTMLElement | null>,
  options?: { afterSelector?: string; untilSelector?: string },
) {
  useIsomorphicLayoutEffect(() => {
    const root = barRef.current;
    if (!root || typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const afterSelector = options?.afterSelector || "[data-motion-hero], [data-motion-module='hero']";
    const untilSelector = options?.untilSelector || "[data-motion-module='closing-cta'], footer";

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      function make(animate: boolean) {
        let past = false;
        let blocked = false;
        const triggers: ScrollTrigger[] = [];

        function apply(instant = false) {
          const on = past && !blocked;
          const to: gsap.TweenVars = {
            yPercent: on ? 0 : 110,
            autoAlpha: on ? 1 : 0,
          };

          if (!animate || instant) {
            gsap.set(root, to);
            return;
          }

          to.duration = MOTION_DURATION.fast;
          to.ease = on ? MOTION_EASE.entrance : MOTION_EASE.exit;
          to.overwrite = true;
          gsap.to(root, to);
        }

        gsap.set(root, { yPercent: 110, autoAlpha: 0 });

        const afterEl = document.querySelector(afterSelector);
        if (afterEl) {
          triggers.push(
            ScrollTrigger.create({
              trigger: afterEl,
              start: 'bottom top',
              onEnter: () => {
                past = true;
                apply();
              },
              onLeaveBack: () => {
                past = false;
                apply();
              },
            }),
          );
        } else {
          past = true;
        }

        const untilEl = document.querySelector(untilSelector);
        if (untilEl) {
          triggers.push(
            ScrollTrigger.create({
              trigger: untilEl,
              start: 'top bottom',
              onEnter: () => {
                blocked = true;
                apply();
              },
              onLeaveBack: () => {
                blocked = false;
                apply();
              },
            }),
          );
        }

        apply(true);

        return () => {
          triggers.forEach((st) => st.kill());
          gsap.killTweensOf(root);
          gsap.set(root, { clearProps: 'all' });
        };
      }

      mm.add(MOTION_MEDIA.desktop, () => {
        gsap.set(root, { autoAlpha: 0 });
      });

      mm.add(MOTION_MEDIA.mobile, () => make(true));
      mm.add(MOTION_MEDIA.reduced, () => make(false));
    }, root);

    return () => {
      ctx.revert();
    };
  }, [barRef, options?.afterSelector, options?.untilSelector]);
}
