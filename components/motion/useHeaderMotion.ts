'use client';

import { RefObject, useEffect } from 'react';
import { gsap } from 'gsap';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';
import { MOTION_DURATION, MOTION_EASE, MOTION_MEDIA } from './tokens';

const MENU_EVENT = 'lodhi:menu';

interface UseHeaderMotionOptions {
  threshold?: number;
  hysteresis?: number;
  hideAfter?: number;
}

/**
 * useHeaderMotion: Port of Module 05A (site-header)
 * Manages solid/transparent background state with hysteresis, hide on scroll down,
 * reveal on scroll up, and accessibility focus handling.
 */
export function useHeaderMotion(
  headerRef: RefObject<HTMLElement | null>,
  options?: UseHeaderMotionOptions,
) {
  useIsomorphicLayoutEffect(() => {
    const root = headerRef.current;
    if (!root || typeof window === 'undefined') return;

    const THRESH = options?.threshold ?? 80;
    const HYST = options?.hysteresis ?? 16;
    const HIDE_AFTER = options?.hideAfter ?? 200;

    let solid: boolean | null = null;
    let hidden = false;
    let menuOpen = false;
    let lastY = window.scrollY || document.documentElement.scrollTop || 0;
    let anim: { hide: () => void; show: () => void } | null = null;
    const listeners: Array<() => void> = [];

    function scrollY() {
      return window.scrollY || document.documentElement.scrollTop || 0;
    }

    function setSolid(next: boolean) {
      if (next === solid) return;
      solid = next;
      root!.setAttribute('data-header-state', next ? 'solid' : 'over');
    }

    function show() {
      if (!hidden) return;
      hidden = false;
      root!.setAttribute('data-header-hidden', 'false');
      anim?.show();
    }

    function hide() {
      if (hidden || menuOpen || root!.contains(document.activeElement)) return;
      hidden = true;
      root!.setAttribute('data-header-hidden', 'true');
      anim?.hide();
    }

    function update() {
      const y = scrollY();
      const delta = y - lastY;

      if (!solid && y > THRESH + HYST) setSolid(true);
      else if (solid && y < THRESH - HYST) setSolid(false);

      if (menuOpen || root!.contains(document.activeElement) || y <= HIDE_AFTER) {
        show();
      } else if (delta > 4) {
        hide();
      } else if (delta < -4) {
        show();
      }

      if (Math.abs(delta) > 1) lastY = y;
    }

    function bind() {
      let queued = false;
      function onScroll() {
        if (queued) return;
        queued = true;
        requestAnimationFrame(() => {
          queued = false;
          update();
        });
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      listeners.push(() => window.removeEventListener('scroll', onScroll));

      function onFocusIn() {
        show();
      }
      root!.addEventListener('focusin', onFocusIn);
      listeners.push(() => root!.removeEventListener('focusin', onFocusIn));
      update();
    }

    function onMenu(e: Event) {
      const ce = e as CustomEvent<{ open?: boolean }>;
      menuOpen = Boolean(ce.detail && ce.detail.open);
      root!.setAttribute('data-menu-open', menuOpen ? 'true' : 'false');
      if (menuOpen) show();
      else update();
    }
    document.addEventListener(MENU_EVENT, onMenu);

    setSolid(scrollY() > THRESH + HYST);
    root.setAttribute('data-header-hidden', 'false');
    root.setAttribute('data-menu-open', 'false');

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_MEDIA.desktop, () => {
        anim = {
          hide: () => {
            gsap.to(root, {
              yPercent: -100,
              duration: MOTION_DURATION.base,
              ease: MOTION_EASE.exit,
              overwrite: true,
            });
          },
          show: () => {
            gsap.to(root, {
              yPercent: 0,
              duration: MOTION_DURATION.fast,
              ease: MOTION_EASE.snap,
              overwrite: true,
            });
          },
        };
        bind();
        return () => {
          unbind();
          gsap.set(root, { clearProps: 'transform' });
        };
      });

      mm.add(MOTION_MEDIA.mobile, () => {
        anim = {
          hide: () => {
            gsap.to(root, {
              yPercent: -100,
              duration: MOTION_DURATION.fast,
              ease: MOTION_EASE.exit,
              overwrite: true,
            });
          },
          show: () => {
            gsap.to(root, {
              yPercent: 0,
              duration: MOTION_DURATION.fast,
              ease: MOTION_EASE.snap,
              overwrite: true,
            });
          },
        };
        bind();
        return () => {
          unbind();
          gsap.set(root, { clearProps: 'transform' });
        };
      });

      mm.add(MOTION_MEDIA.reduced, () => {
        root.setAttribute('data-motion-instant', 'true');
        anim = {
          hide: () => gsap.set(root, { yPercent: -100 }),
          show: () => gsap.set(root, { yPercent: 0 }),
        };
        bind();
        return () => {
          unbind();
          root.removeAttribute('data-motion-instant');
          gsap.set(root, { clearProps: 'transform' });
        };
      });
    }, root);

    function unbind() {
      listeners.splice(0).forEach((off) => off());
      anim = null;
    }

    return () => {
      unbind();
      document.removeEventListener(MENU_EVENT, onMenu);
      ctx.revert();
    };
  }, [headerRef, options?.threshold, options?.hysteresis, options?.hideAfter]);
}

/**
 * useNavOverlay: Port of Module 05B (mobile full-screen overlay menu)
 * Controls clip-path wipe entrance, item masks, focus trap, body scroll lock.
 */
export function useNavOverlay({
  overlayRef,
  triggerRef,
  isOpen,
  onClose,
}: {
  overlayRef: RefObject<HTMLElement | null>;
  triggerRef: RefObject<HTMLButtonElement | null>;
  isOpen: boolean;
  onClose: () => void;
}) {
  useIsomorphicLayoutEffect(() => {
    const root = overlayRef.current;
    const trigger = triggerRef.current;
    if (!root || !trigger || typeof window === 'undefined') return;

    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-motion='menu-item']"));
    const utils = Array.from(root.querySelectorAll<HTMLElement>("[data-motion='menu-util']"));
    const FOCUSABLE =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), input, select, textarea';

    let lockedY = 0;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function lock() {
      lockedY = window.scrollY || document.documentElement.scrollTop || 0;
      const b = document.body;
      b.style.position = 'fixed';
      b.style.top = `-${lockedY}px`;
      b.style.left = '0';
      b.style.right = '0';
      b.style.width = '100%';
      b.setAttribute('data-scroll-locked', 'true');
    }

    function unlock() {
      const b = document.body;
      b.style.position = '';
      b.style.top = '';
      b.style.left = '';
      b.style.right = '';
      b.style.width = '';
      b.removeAttribute('data-scroll-locked');
      window.scrollTo(0, lockedY);
    }

    function focusables(): HTMLElement[] {
      const inside = Array.from(root!.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );
      return [trigger!, ...inside];
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const list = focusables();
      if (!list.length) return;
      const first = list[0]!;
      const last = list[list.length - 1]!;
      const i = list.indexOf(document.activeElement as HTMLElement);

      if (i === -1) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      } else if (e.shiftKey && i === 0) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && i === list.length - 1) {
        e.preventDefault();
        first.focus();
      }
    }

    function announce(open: boolean) {
      document.dispatchEvent(new CustomEvent(MENU_EVENT, { detail: { open, root } }));
    }

    if (isOpen) {
      lock();
      announce(true);
      document.addEventListener('keydown', onKeyDown, true);

      if (isReduced) {
        gsap.set(root, { clipPath: 'inset(0 0 0% 0)' });
        gsap.set(items.concat(utils), { yPercent: 0, opacity: 1 });
      } else {
        gsap.set(items, { yPercent: 110, opacity: 1 });
        gsap.set(utils, { opacity: 0, yPercent: 40 });
        const tl = gsap.timeline();
        tl.fromTo(
          root,
          { clipPath: 'inset(0 0 100% 0)' },
          { clipPath: 'inset(0 0 0% 0)', duration: 0.45, ease: MOTION_EASE.cinematic },
        );
        tl.to(
          items,
          {
            yPercent: 0,
            duration: MOTION_DURATION.slow,
            ease: MOTION_EASE.cinematic,
            stagger: 0.06,
          },
          '-=0.18',
        );
        tl.to(
          utils,
          {
            opacity: 1,
            yPercent: 0,
            duration: MOTION_DURATION.base,
            ease: MOTION_EASE.entrance,
            stagger: 0.05,
          },
          '-=0.35',
        );
      }

      // Focus first focusable item
      const list = focusables();
      (list[1] || trigger).focus({ preventScroll: true });
    }

    return () => {
      if (isOpen) {
        unlock();
        announce(false);
        document.removeEventListener('keydown', onKeyDown, true);
        gsap.set([root, ...items, ...utils], { clearProps: 'all' });
      }
    };
  }, [overlayRef, triggerRef, isOpen, onClose]);
}
