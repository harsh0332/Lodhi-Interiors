'use client';

import { RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';
import { MOTION_DURATION, MOTION_EASE, MOTION_MEDIA, MOTION_STAGGER } from './tokens';

/**
 * refreshGuards: Refreshes ScrollTrigger once fonts are loaded, un-cached images load,
 * and on debounced resize/orientationchange.
 */
function refreshGuards(onRefresh?: () => void) {
  let alive = true;
  let timer: ReturnType<typeof setTimeout> | null = null;

  function fire() {
    if (!alive) return;
    ScrollTrigger.refresh();
    if (onRefresh) onRefresh();
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(fire).catch(() => {});
  }

  const imgs = Array.from(document.images).filter((img) => !img.complete);
  if (imgs.length) {
    let left = imgs.length;
    imgs.forEach((img) => {
      function done() {
        img.removeEventListener('load', done);
        img.removeEventListener('error', done);
        if (--left === 0) fire();
      }
      img.addEventListener('load', done);
      img.addEventListener('error', done);
    });
  }

  if (document.readyState !== 'complete') {
    window.addEventListener('load', fire, { once: true });
  }

  function onResize() {
    if (timer) clearTimeout(timer);
    timer = setTimeout(fire, 180);
  }

  window.addEventListener('resize', onResize);
  window.addEventListener('orientationchange', onResize);

  return function teardown() {
    alive = false;
    if (timer) clearTimeout(timer);
    window.removeEventListener('resize', onResize);
    window.removeEventListener('orientationchange', onResize);
  };
}

/**
 * useProcessSequence: Port of Module 04A (pinned process sequence)
 * Pinned left navigation column, active-stage toggle tracking, and rising step cards.
 */
export function useProcessSequence(
  rootRef: RefObject<HTMLElement | null>,
  onActiveChange?: (index: number) => void,
) {
  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const stages = Array.from(root.querySelectorAll<HTMLElement>("[data-motion='stage']"));
    const steps = Array.from(root.querySelectorAll<HTMLElement>("[data-motion='detail']"));
    const nav = root.querySelector<HTMLElement>("[data-motion='pin-col']");
    const inner = root.querySelector<HTMLElement>("[data-motion='pin-scope']") || root;

    function setActive(i: number) {
      stages.forEach((s, idx) => {
        s.classList.toggle('is-active', idx === i);
      });
      if (onActiveChange) onActiveChange(i);
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop branch: pin + tracking + rise
      mm.add(MOTION_MEDIA.desktop, () => {
        const triggers: ScrollTrigger[] = [];
        const tweens: Array<gsap.core.Tween | gsap.core.Timeline> = [];

        if (nav && inner) {
          const pin = ScrollTrigger.create({
            trigger: inner,
            start: () => `top top+=${Math.round(window.innerHeight * 0.14)}`,
            end: 'bottom bottom',
            pin: nav,
            pinSpacing: false,
            pinType: 'transform',
            anticipatePin: 1,
            invalidateOnRefresh: true,
          });
          triggers.push(pin);
        }

        // Active stage tracking per step
        steps.forEach((step, i) => {
          triggers.push(
            ScrollTrigger.create({
              trigger: step,
              start: 'top 55%',
              end: 'bottom 55%',
              invalidateOnRefresh: true,
              onToggle: (self) => {
                if (self.isActive) setActive(i);
              },
            }),
          );
        });

        // Detail blocks rising entrance
        steps.forEach((step) => {
          tweens.push(
            gsap.from(step, {
              opacity: 0,
              y: 28,
              duration: MOTION_DURATION.slow,
              ease: MOTION_EASE.entrance,
              scrollTrigger: {
                trigger: step,
                start: 'top 82%',
                once: true,
                invalidateOnRefresh: true,
              },
            }),
          );
        });

        if (stages.length) {
          tweens.push(
            gsap.from(stages, {
              opacity: 0,
              y: 10,
              duration: MOTION_DURATION.base,
              ease: MOTION_EASE.entrance,
              stagger: MOTION_STAGGER.base,
              scrollTrigger: { trigger: root, start: 'top 70%', once: true },
            }),
          );
        }

        setActive(0);
        const teardownGuards = refreshGuards();

        return () => {
          teardownGuards();
          triggers.forEach((t) => t.kill());
          tweens.forEach((tw) => {
            if ('scrollTrigger' in tw && tw.scrollTrigger) {
              (tw.scrollTrigger as ScrollTrigger).kill();
            }
            tw.kill();
          });
          gsap.set(steps.concat(stages), { clearProps: 'opacity,transform' });
          stages.forEach((s) => s.classList.remove('is-active'));
        };
      });

      // Mobile branch: vertical rise without pin
      mm.add(MOTION_MEDIA.mobile, () => {
        const tweens: gsap.core.Tween[] = [];

        steps.forEach((step) => {
          tweens.push(
            gsap.from(step, {
              opacity: 0,
              y: 24,
              duration: MOTION_DURATION.base,
              ease: MOTION_EASE.entrance,
              scrollTrigger: { trigger: step, start: 'top 88%', once: true },
            }),
          );
        });

        const teardownGuards = refreshGuards();

        return () => {
          teardownGuards();
          tweens.forEach((tw) => {
            if (tw.scrollTrigger) (tw.scrollTrigger as ScrollTrigger).kill();
            tw.kill();
          });
          gsap.set(steps, { clearProps: 'opacity,transform' });
        };
      });

      // Reduced motion: static final state
      mm.add(MOTION_MEDIA.reduced, () => {
        gsap.set(steps.concat(stages), { clearProps: 'all' });
        setActive(0);
      });
    }, root);

    return () => {
      stages.forEach((s) => s.classList.remove('is-active'));
      ctx.revert();
    };
  }, [rootRef, onActiveChange]);
}
