'use client';

import { RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';
import { MOTION_EASE, MOTION_MEDIA } from './tokens';

/**
 * useCounters: Port of Module 04B (count-up figures)
 * Fixed width reservation to avoid shift, en-IN formatting, once per viewport entry.
 */
export function useCounters(rootRef: RefObject<HTMLElement | null>) {
  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const figures = Array.from(root.querySelectorAll<HTMLElement>("[data-motion='count']"));
    if (!figures.length) return;

    let hasRun = false;

    const entries = figures.map((fig) => {
      const valueEl = fig.querySelector<HTMLElement>("[data-motion='count-value']") || fig;
      const raw = fig.getAttribute('data-motion-count-to') || valueEl.textContent || '0';
      const target = parseFloat(raw);
      const decimals = raw.split('.')[1];
      const places = decimals ? decimals.length : 0;
      const final = target.toLocaleString('en-IN', {
        minimumFractionDigits: places,
        maximumFractionDigits: places,
      });

      valueEl.style.minWidth = `${(final.length + 0.15).toFixed(2)}ch`;
      valueEl.style.display = 'inline-block';
      valueEl.textContent = final;

      return { el: valueEl, to: target, places, final };
    });

    function render(entry: (typeof entries)[0], v: number) {
      entry.el.textContent = v.toLocaleString('en-IN', {
        minimumFractionDigits: entry.places,
        maximumFractionDigits: entry.places,
      });
    }

    function countUp() {
      if (hasRun) return [];
      hasRun = true;
      return entries.map((entry) => {
        const proxy = { v: 0 };
        render(entry, 0);
        return gsap.to(proxy, {
          v: entry.to,
          duration: 1.2,
          ease: MOTION_EASE.entrance,
          onUpdate: () => render(entry, proxy.v),
          onComplete: () => {
            entry.el.textContent = entry.final;
          },
        });
      });
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_MEDIA.desktop, () => {
        let running: gsap.core.Tween[] = [];
        const st = ScrollTrigger.create({
          trigger: root,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            running = countUp();
          },
        });
        return () => {
          st.kill();
          running.forEach((t) => t.kill());
          entries.forEach((e) => {
            e.el.textContent = e.final;
          });
        };
      });

      mm.add(MOTION_MEDIA.mobile, () => {
        let running: gsap.core.Tween[] = [];
        const st = ScrollTrigger.create({
          trigger: root,
          start: 'top 88%',
          once: true,
          onEnter: () => {
            running = countUp();
          },
        });
        return () => {
          st.kill();
          running.forEach((t) => t.kill());
          entries.forEach((e) => {
            e.el.textContent = e.final;
          });
        };
      });

      mm.add(MOTION_MEDIA.reduced, () => {
        hasRun = true;
        entries.forEach((e) => {
          e.el.textContent = e.final;
        });
      });
    }, root);

    return () => {
      entries.forEach((e) => {
        e.el.textContent = e.final;
        e.el.style.minWidth = '';
        e.el.style.display = '';
      });
      ctx.revert();
    };
  }, [rootRef]);
}
