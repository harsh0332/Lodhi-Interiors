'use client';

import { RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';
import { MOTION_DURATION, MOTION_EASE, MOTION_MEDIA, MOTION_STAGGER } from './tokens';

const WIPE = {
  up: 'inset(0% 0% 100% 0%)',
  down: 'inset(100% 0% 0% 0%)',
};
const OPEN = 'inset(0% 0% 0% 0%)';

function whenPaintable(img: HTMLImageElement | null, run: () => void, fallbackMs = 1200) {
  if (!img || (img.complete && img.naturalWidth > 0)) {
    run();
    return () => {};
  }
  let done = false;
  let timer: ReturnType<typeof setTimeout> | null = null;

  function fire() {
    if (done) return;
    done = true;
    if (timer) clearTimeout(timer);
    if (img) {
      img.removeEventListener('load', fire);
      img.removeEventListener('error', fire);
    }
    run();
  }

  timer = setTimeout(fire, fallbackMs);
  img.addEventListener('load', fire);
  img.addEventListener('error', fire);

  return () => {
    done = true;
    if (timer) clearTimeout(timer);
    if (img) {
      img.removeEventListener('load', fire);
      img.removeEventListener('error', fire);
    }
  };
}

/**
 * useCaseFullbleed: Port of Module 06A (full-bleed reveals with alternating wipes)
 */
export function useCaseFullbleed(rootRef: RefObject<HTMLElement | null>) {
  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const frameEls = Array.from(root.querySelectorAll<HTMLElement>("[data-motion='reveal']"));
    if (!frameEls.length && root.hasAttribute("data-motion='reveal'")) {
      frameEls.push(root);
    }
    if (!frameEls.length) return;

    const frames = frameEls.map((frame, i) => {
      const dir = (frame.getAttribute('data-motion-wipe') || (i % 2 ? 'down' : 'up')) as 'up' | 'down';
      frame.setAttribute('data-motion-wipe', dir);
      return {
        frame,
        img: frame.querySelector<HTMLImageElement>('img'),
        cap: frame.closest('figure')?.querySelector<HTMLElement>("[data-motion='caption']"),
        dir,
      };
    });

    function finalState(f: (typeof frames)[0]) {
      gsap.set(f.frame, { clipPath: 'none' });
      if (f.img) gsap.set(f.img, { scale: 1 });
      if (f.cap) gsap.set(f.cap, { opacity: 1, y: 0 });
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop
      mm.add(MOTION_MEDIA.desktop, () => {
        const releases: Array<() => void> = [];
        const tweens: gsap.core.Timeline[] = [];

        function reveal(frameEl: Element) {
          const f = frames.find((x) => x.frame === frameEl);
          if (!f) return;
          releases.push(
            whenPaintable(f.img, () => {
              const tl = gsap.timeline({ onComplete: () => finalState(f) });
              tl.fromTo(
                f.frame,
                { clipPath: WIPE[f.dir] },
                { clipPath: OPEN, duration: 0.8, ease: MOTION_EASE.cinematic },
                0,
              );
              if (f.img) {
                tl.fromTo(
                  f.img,
                  { scale: 1.06 },
                  { scale: 1, duration: 0.8, ease: MOTION_EASE.cinematic },
                  0,
                );
              }
              if (f.cap) {
                tl.fromTo(
                  f.cap,
                  { opacity: 0, y: 8 },
                  { opacity: 1, y: 0, duration: MOTION_DURATION.base, ease: MOTION_EASE.entrance },
                  0.15,
                );
              }
              tweens.push(tl);
            }),
          );
        }

        const triggers = ScrollTrigger.batch(
          frames.map((f) => f.frame),
          {
            interval: 0.12,
            batchMax: 3,
            start: 'top 82%',
            once: true,
            onEnter: (batch) => batch.forEach(reveal),
          },
        );

        return () => {
          triggers.forEach((t) => t.kill());
          tweens.forEach((t) => t.kill());
          releases.forEach((r) => r());
          frames.forEach(finalState);
        };
      });

      // Mobile
      mm.add(MOTION_MEDIA.mobile, () => {
        const tweens: gsap.core.Timeline[] = [];
        const releases: Array<() => void> = [];

        const triggers = ScrollTrigger.batch(
          frames.map((f) => f.frame),
          {
            interval: 0.12,
            batchMax: 4,
            start: 'top 92%',
            once: true,
            onEnter: (batch) => {
              batch.forEach((frameEl) => {
                const f = frames.find((x) => x.frame === frameEl);
                if (!f) return;
                releases.push(
                  whenPaintable(
                    f.img,
                    () => {
                      const tl = gsap.timeline({ onComplete: () => finalState(f) });
                      tl.fromTo(
                        f.frame,
                        { clipPath: WIPE.up },
                        { clipPath: OPEN, duration: MOTION_DURATION.slow, ease: MOTION_EASE.cinematic },
                        0,
                      );
                      if (f.cap) {
                        tl.fromTo(
                          f.cap,
                          { opacity: 0 },
                          { opacity: 1, duration: MOTION_DURATION.base, ease: MOTION_EASE.entrance },
                          0.15,
                        );
                      }
                      tweens.push(tl);
                    },
                    900,
                  ),
                );
              });
            },
          },
        );

        return () => {
          triggers.forEach((t) => t.kill());
          tweens.forEach((t) => t.kill());
          releases.forEach((r) => r());
          frames.forEach(finalState);
        };
      });

      // Reduced motion
      mm.add(MOTION_MEDIA.reduced, () => {
        frames.forEach(finalState);
      });
    }, root);

    return () => {
      ctx.revert();
    };
  }, [rootRef]);
}

/**
 * useCaseGallery: Port of Module 06B (touch horizontal scroll-snap scroller / desktop grid)
 */
export function useCaseGallery(rootRef: RefObject<HTMLElement | null>) {
  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const group = root.querySelector<HTMLElement>('[data-motion-group]') || root;
    const items = Array.from(root.querySelectorAll<HTMLElement>('[data-motion-item]'));
    const imgs = items.map((it) => it.querySelector<HTMLImageElement>('img'));

    function finalState() {
      gsap.set(items, { clearProps: 'opacity,transform' });
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: Staggered entry
      mm.add(MOTION_MEDIA.desktop, () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: group, start: 'top 85%', once: true },
          onComplete: finalState,
        });
        tl.fromTo(
          items,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: MOTION_DURATION.slow,
            ease: MOTION_EASE.entrance,
            stagger: MOTION_STAGGER.base,
          },
        );
        return () => {
          if (tl.scrollTrigger) tl.scrollTrigger.kill();
          tl.kill();
          finalState();
        };
      });

      // Mobile: Touch scroller reveal
      mm.add(MOTION_MEDIA.mobile, () => {
        const firstImg = imgs[0] ?? null;
        const release = whenPaintable(firstImg, () => {}, 800);
        const tl = gsap.timeline({
          scrollTrigger: { trigger: group, start: 'top 92%', once: true },
          onComplete: finalState,
        });
        tl.fromTo(
          group,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: MOTION_DURATION.base, ease: MOTION_EASE.entrance },
        );
        return () => {
          if (tl.scrollTrigger) tl.scrollTrigger.kill();
          tl.kill();
          release();
          finalState();
        };
      });

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
 * useCaseCompare: Port of Module 06C (before/after interactive divider)
 */
export function useCaseCompare(rootRef: RefObject<HTMLElement | null>) {
  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const stages = Array.from(root.querySelectorAll<HTMLElement>("[data-motion='compare-stage']"));
    const handles = Array.from(root.querySelectorAll<HTMLElement>("[data-motion='handle']"));
    if (!stages.length || !handles.length) return;

    const cleanupFns: Array<() => void> = [];

    stages.forEach((stage, idx) => {
      const handle = handles[idx];
      if (!handle) return;

      let pos = parseFloat(handle.getAttribute('aria-valuenow') || '50') || 50;
      const authoredTabindex = handle.getAttribute('tabindex') || '0';
      const proxy = { p: pos };

      function paint(p: number) {
        pos = Math.max(0, Math.min(100, p));
        stage.style.setProperty('--pos', `${pos}%`);
        const w = stage.clientWidth;
        if (w > 0) stage.style.setProperty('--pos-px', `${(w * pos) / 100}px`);
        handle!.setAttribute('aria-valuenow', Math.round(pos).toString());
        handle!.setAttribute('aria-valuetext', `${Math.round(pos)}% after`);
      }

      function set(p: number, animate: boolean) {
        if (!animate) {
          gsap.killTweensOf(proxy);
          proxy.p = p;
          paint(p);
          return;
        }
        gsap.to(proxy, {
          p: Math.max(0, Math.min(100, p)),
          duration: MOTION_DURATION.fast,
          ease: MOTION_EASE.snap,
          overwrite: true,
          onUpdate: () => paint(proxy.p),
        });
      }

      paint(pos);
      const raf = requestAnimationFrame(() => paint(pos));

      let ro: ResizeObserver | null = null;
      if (typeof window.ResizeObserver !== 'undefined') {
        ro = new ResizeObserver(() => paint(pos));
        ro.observe(stage);
      }

      function enableDrag(animateKeys: boolean) {
        let dragging = false;

        function pctFromClientX(x: number) {
          const r = stage.getBoundingClientRect();
          return ((x - r.left) / r.width) * 100;
        }
        function onDown(e: PointerEvent) {
          if (e.button !== undefined && e.button !== 0) return;
          dragging = true;
          handle?.setPointerCapture?.(e.pointerId);
          root?.setAttribute('data-motion-dragging', '');
          set(pctFromClientX(e.clientX), false);
          e.preventDefault();
        }
        function onMove(e: PointerEvent) {
          if (dragging) set(pctFromClientX(e.clientX), false);
        }
        function onUp() {
          dragging = false;
          root?.removeAttribute('data-motion-dragging');
        }
        function onStageDown(e: PointerEvent) {
          if (e.target === handle) return;
          handle!.focus();
          set(pctFromClientX(e.clientX), animateKeys);
        }
        function onKey(e: KeyboardEvent) {
          const step = e.shiftKey ? 10 : 2;
          let next: number | null = null;
          if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') next = pos - step;
          else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') next = pos + step;
          else if (e.key === 'PageDown') next = pos - 10;
          else if (e.key === 'PageUp') next = pos + 10;
          else if (e.key === 'Home') next = 0;
          else if (e.key === 'End') next = 100;

          if (next === null) return;
          e.preventDefault();
          set(next, animateKeys);
        }

        handle!.addEventListener('pointerdown', onDown);
        handle!.addEventListener('pointermove', onMove);
        handle!.addEventListener('pointerup', onUp);
        handle!.addEventListener('pointercancel', onUp);
        handle!.addEventListener('keydown', onKey);
        stage.addEventListener('pointerdown', onStageDown);
        handle!.setAttribute('tabindex', authoredTabindex === '-1' ? '0' : authoredTabindex);
        handle!.removeAttribute('aria-hidden');
        paint(pos);

        return () => {
          handle!.removeEventListener('pointerdown', onDown);
          handle!.removeEventListener('pointermove', onMove);
          handle!.removeEventListener('pointerup', onUp);
          handle!.removeEventListener('pointercancel', onUp);
          handle!.removeEventListener('keydown', onKey);
          stage.removeEventListener('pointerdown', onStageDown);
          gsap.killTweensOf(proxy);
          onUp();
        };
      }

      const ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add(MOTION_MEDIA.desktop, () => {
          const offDrag = enableDrag(true);
          const tl = gsap.timeline({
            scrollTrigger: { trigger: root, start: 'top 80%', once: true },
          });
          tl.fromTo(
            stage,
            { opacity: 0, scale: 1.02 },
            { opacity: 1, scale: 1, duration: MOTION_DURATION.slow, ease: MOTION_EASE.cinematic },
          );
          tl.fromTo(
            handle!,
            { opacity: 0 },
            { opacity: 1, duration: MOTION_DURATION.base, ease: MOTION_EASE.entrance },
            0.15,
          );
          return () => {
            offDrag();
            if (tl.scrollTrigger) tl.scrollTrigger.kill();
            tl.kill();
            gsap.set([stage, handle!], { clearProps: 'all' });
            paint(pos);
          };
        });

        mm.add(MOTION_MEDIA.mobile, () => {
          handle!.setAttribute('tabindex', '-1');
          handle!.setAttribute('aria-hidden', 'true');
          return () => {
            handle!.removeAttribute('aria-hidden');
            handle!.setAttribute('tabindex', authoredTabindex === '-1' ? '0' : authoredTabindex);
            paint(pos);
          };
        });

        mm.add(MOTION_MEDIA.reduced, () => {
          const offDrag = enableDrag(false);
          return () => offDrag();
        });
      }, root);

      cleanupFns.push(() => {
        if (ro) ro.disconnect();
        cancelAnimationFrame(raf);
        ctx.revert();
      });
    });

    return () => {
      cleanupFns.forEach((fn) => fn());
    };
  }, [rootRef]);
}
