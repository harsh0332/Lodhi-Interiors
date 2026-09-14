'use client';

import { RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';
import { MOTION_DURATION, MOTION_EASE, MOTION_MEDIA, MOTION_STAGGER } from './tokens';

const SESSION_KEY = 'lodhi.hero.played';
const MOBILE_FACTOR = 0.7;
const TEXT_DEPTH = 2;
const CUE_LOOP = { distance: 5, duration: 3.2 };

function played(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

function markPlayed(): void {
  try {
    sessionStorage.setItem(SESSION_KEY, '1');
  } catch {}
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * useHeroSequence: Port of Module 01 (hero & first-load sequence)
 * Handles un-blur + scale entrance, dynamic headline line split and masks,
 * supporting item staggers, breathing scroll cue, and desktop parallax.
 */
export function useHeroSequence(rootRef: RefObject<HTMLElement | null>) {
  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const media = root.querySelector<HTMLElement>("[data-motion='media'] img") ||
                  root.querySelector<HTMLElement>("[data-motion='media']");
    const layer = root.querySelector<HTMLElement>("[data-motion='text-layer']");
    const title = root.querySelector<HTMLElement>("[data-motion='mask']");
    const cue = root.querySelector<HTMLElement>("[data-motion='cue']");
    const getItems = () =>
      Array.from(root.querySelectorAll<HTMLElement>('[data-motion-item]'));

    const titleSource = title ? title.textContent || '' : '';
    let boxWidth: number | null = null;
    let remountTimer: ReturnType<typeof setTimeout> | null = null;
    let settleTimer: ReturnType<typeof setTimeout> | null = null;
    let observer: ResizeObserver | null = null;
    let introTl: gsap.core.Timeline | null = null;
    let loop: gsap.core.Tween | null = null;

    function splitLines(): HTMLElement[] {
      if (!title) return [];
      const words = titleSource.replace(/\s+/g, ' ').trim().split(' ');
      title.innerHTML = words
        .map((w) => `<span data-motion-word>${esc(w)}</span>`)
        .join(' ');

      const spans = Array.from(title.querySelectorAll<HTMLElement>('[data-motion-word]'));
      const lines: string[][] = [];
      let top: number | null = null;
      let current: string[] = [];

      spans.forEach((span) => {
        const t = Math.round(span.getBoundingClientRect().top);
        if (top === null || Math.abs(t - top) > 4) {
          current = [];
          lines.push(current);
          top = t;
        }
        current.push(span.textContent || '');
      });

      title.innerHTML = lines
        .map(
          (line) =>
            `<span class="hero__line block overflow-hidden py-0.5"><span class="hero__line-i block will-change-transform" data-motion-line-inner>${esc(
              line.join(' '),
            )}</span></span>`,
        )
        .join('');
      title.setAttribute('data-motion-split', '');
      return Array.from(title.querySelectorAll<HTMLElement>('[data-motion-line-inner]'));
    }

    function showLines(lines: HTMLElement[]) {
      gsap.set(lines, { y: 0, yPercent: 0 });
    }

    function finalState(): HTMLElement[] {
      const lines = splitLines();
      if (media) gsap.set(media, { clearProps: 'filter,transform' });
      showLines(lines);
      gsap.set(getItems(), { opacity: 1, y: 0 });
      if (cue) gsap.set(cue, { opacity: 0.72, y: 0 });
      return lines;
    }

    function intro(k: number) {
      const lines = splitLines();
      const stagger = MOTION_STAGGER.base * k;
      const lineDur = 0.6 * k;
      const linesStart = 0.1;
      const linesEnd = linesStart + lineDur + Math.max(0, lines.length - 1) * stagger;
      const supportAt = linesEnd + 0.2 * k;

      const tl = gsap.timeline({ onComplete: markPlayed });

      // 1. Photograph: filter + scale only
      if (media) {
        tl.fromTo(
          media,
          { filter: 'blur(12px)', scale: 1.05 },
          {
            filter: 'blur(0px)',
            scale: 1,
            duration: MOTION_DURATION.cinematic * k,
            ease: MOTION_EASE.cinematic,
          },
          0,
        );
      }

      // 2. Headline: line by line out of mask
      if (lines.length) {
        tl.fromTo(
          lines,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: lineDur,
            ease: MOTION_EASE.entrance,
            stagger: stagger,
          },
          linesStart,
        );
      }

      // 3. Supporting items
      const items = getItems();
      if (items.length) {
        tl.fromTo(
          items,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: MOTION_DURATION.base * k,
            ease: MOTION_EASE.entrance,
            stagger: stagger,
          },
          supportAt,
        );
      }

      // 4. Scroll cue
      if (cue) {
        tl.fromTo(
          cue,
          { opacity: 0 },
          { opacity: 0.72, duration: MOTION_DURATION.fast, ease: MOTION_EASE.entrance },
          supportAt + 0.15,
        );
      }

      return tl;
    }

    function breathe() {
      if (!cue) return null;
      loop = gsap.to(cue, {
        y: CUE_LOOP.distance,
        duration: CUE_LOOP.duration,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
      return loop;
    }

    function parallax() {
      const speed = 0.08;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      if (media) {
        tl.to(media, { y: () => -root.offsetHeight * speed, ease: 'none' }, 0);
      }
      if (layer) {
        tl.to(layer, { y: () => -root.offsetHeight * speed * TEXT_DEPTH, ease: 'none' }, 0);
      }
      return tl;
    }

    function whenMeasurable(fn: () => void) {
      let ran = false;
      const once = () => {
        if (!ran) {
          ran = true;
          fn();
        }
      };
      if (document.fonts && document.fonts.status !== 'loaded') {
        document.fonts.ready.then(once);
        setTimeout(once, 400);
      } else {
        once();
      }
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      function start(k: number, withParallax: boolean) {
        let cancelled = false;
        const made: Array<gsap.core.Timeline | gsap.core.Tween | null> = [];

        whenMeasurable(() => {
          if (cancelled) return;
          if (played()) {
            finalState();
          } else {
            introTl = intro(k);
            made.push(introTl);
          }
          if (withParallax) {
            made.push(parallax());
          }
          made.push(breathe());

          if (document.fonts) {
            document.fonts.ready.then(() => {
              if (cancelled) return;
              const remeasure = () => {
                showLines(splitLines());
                ScrollTrigger.refresh();
              };
              if (introTl && introTl.isActive()) {
                introTl.eventCallback('onComplete', () => {
                  markPlayed();
                  remeasure();
                });
              } else {
                remeasure();
              }
            });
          }
        });

        return () => {
          cancelled = true;
          made.forEach((t) => {
            if (t) {
              if ('scrollTrigger' in t && t.scrollTrigger) {
                (t.scrollTrigger as ScrollTrigger).kill();
              }
              t.kill();
            }
          });
          made.length = 0;
        };
      }

      mm.add(MOTION_MEDIA.desktop, () => start(1, true));
      mm.add(MOTION_MEDIA.mobile, () => start(MOBILE_FACTOR, false));
      mm.add(MOTION_MEDIA.reduced, () => {
        finalState();
        markPlayed();
      });

      // ResizeObserver for copy container
      const copyBox = root.querySelector('.hero__copy') || title;
      if (copyBox && typeof window.ResizeObserver !== 'undefined') {
        observer = new ResizeObserver((entries) => {
          const w = Math.round(entries[0].contentRect.width);
          if (boxWidth === null) {
            boxWidth = w;
            return;
          }
          if (w === boxWidth) return;
          boxWidth = w;
          if (remountTimer) clearTimeout(remountTimer);
          remountTimer = setTimeout(() => {
            if (!root.isConnected) return;
            showLines(splitLines());
            ScrollTrigger.refresh();
          }, 140);
        });
        observer.observe(copyBox);
      }
    }, root);

    return () => {
      if (observer) observer.disconnect();
      if (remountTimer) clearTimeout(remountTimer);
      if (settleTimer) clearTimeout(settleTimer);
      if (loop) loop.kill();
      if (title) {
        title.removeAttribute('data-motion-split');
        title.textContent = titleSource;
      }
      ctx.revert();
    };
  }, [rootRef]);
}
