'use client';

import React, { createContext, useContext, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';
import { MOTION_DURATION, MOTION_EASE, MOTION_STAGGER } from './tokens';

const STORE_KEY = 'lodhi:tx';
const LAST_KEY = 'lodhi:tx:last';
const MAX_AGE = 1500;
const FLIP_DURATION = 0.6;
const FADE_DURATION = 0.25;

interface TransitionState {
  key: string;
  src: string;
  alt: string;
  rect: { x: number; y: number; w: number; h: number };
  t: number;
  dir: 'forward' | 'backward';
  from: string;
}

interface ProjectTransitionContextType {
  triggerTransition: (href: string) => void;
  captureTransition: (sourceEl: HTMLElement, href: string, key?: string) => void;
}

const ProjectTransitionContext = createContext<ProjectTransitionContextType>({
  triggerTransition: () => {},
  captureTransition: () => {},
});

export function useProjectTransition() {
  return useContext(ProjectTransitionContext);
}

function writeState(state: TransitionState) {
  try {
    sessionStorage.setItem(STORE_KEY, JSON.stringify(state));
    if (state.key) sessionStorage.setItem(LAST_KEY, state.key);
  } catch {}
}

function readState(): TransitionState | null {
  try {
    const raw = sessionStorage.getItem(STORE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function clearState() {
  try {
    sessionStorage.removeItem(STORE_KEY);
  } catch {}
}

function isReduced(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function isCoarse(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(hover: none), (pointer: coarse), (max-width: 899px)').matches;
}

function isSlow(): boolean {
  if (typeof navigator === 'undefined') return false;
  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
  };
  const c = nav.connection;
  if (!c) return false;
  if (c.saveData) return true;
  return ['slow-2g', '2g', '3g'].includes(c.effectiveType || '');
}

let activeLayer: HTMLDivElement | null = null;
let activeTl: gsap.core.Timeline | null = null;
let watchdogTimer: ReturnType<typeof setTimeout> | null = null;

function getLayer(): HTMLDivElement {
  if (activeLayer && activeLayer.isConnected) return activeLayer;
  const el = document.createElement('div');
  el.className = 'lodhi-tx-layer';
  el.setAttribute('data-motion-tx-layer', '');
  el.setAttribute('aria-hidden', 'true');
  document.body.appendChild(el);
  activeLayer = el;
  return el;
}

function teardown() {
  if (activeTl) {
    activeTl.kill();
    activeTl = null;
  }
  if (watchdogTimer) {
    clearTimeout(watchdogTimer);
    watchdogTimer = null;
  }
  if (activeLayer) {
    activeLayer.remove();
    activeLayer = null;
  }
}

function makeClone(state: TransitionState, dest: DOMRect): HTMLImageElement {
  const img = document.createElement('img');
  img.className = 'lodhi-tx-clone';
  img.decoding = 'sync';
  img.src = state.src;
  img.alt = '';
  img.style.left = `${dest.left}px`;
  img.style.top = `${dest.top}px`;
  img.style.width = `${dest.width}px`;
  img.style.height = `${dest.height}px`;
  getLayer().appendChild(img);
  return img;
}

function revealParts(root: HTMLElement) {
  return {
    masks: Array.from(root.querySelectorAll<HTMLElement>("[data-motion='mask'] > *")),
    fades: Array.from(root.querySelectorAll<HTMLElement>("[data-motion='fade-up']")),
  };
}

function revealTimeline(root: HTMLElement, tl: gsap.core.Timeline, at: number) {
  const p = revealParts(root);
  if (p.masks.length) {
    tl.fromTo(
      p.masks,
      { y: 0, yPercent: 110 },
      {
        y: 0,
        yPercent: 0,
        duration: MOTION_DURATION.slow,
        ease: MOTION_EASE.cinematic,
        stagger: MOTION_STAGGER.tight,
      },
      at,
    );
  }
  if (p.fades.length) {
    tl.fromTo(
      p.fades,
      { opacity: 0, y: 14 },
      {
        opacity: 1,
        y: 0,
        duration: MOTION_DURATION.base,
        ease: MOTION_EASE.entrance,
        stagger: MOTION_STAGGER.base,
      },
      at + 0.12,
    );
  }
}

function revealNow(root: HTMLElement) {
  const p = revealParts(root);
  if (p.masks.length) gsap.set(p.masks, { y: 0, yPercent: 0 });
  if (p.fades.length) gsap.set(p.fades, { opacity: 1, y: 0 });
}

/**
 * useRouteTransitionPlay: Executes the destination phase of Module 03 when
 * mounting the case study page.
 */
export function useRouteTransitionPlay(
  scopeRef: React.RefObject<HTMLElement | null>,
  destinationKey?: string,
) {
  useIsomorphicLayoutEffect(() => {
    const scope = scopeRef.current || document.body;
    if (!scope || typeof window === 'undefined') return;

    const state = readState();
    clearState();

    if (!state || !gsap || isReduced() || isSlow() || document.hidden) {
      revealNow(scope);
      return;
    }

    if (Date.now() - state.t > MAX_AGE) {
      revealNow(scope);
      return;
    }

    const hit =
      (destinationKey &&
        scope.querySelector<HTMLElement>(`[data-transition-key="${destinationKey}"]`)) ||
      (state.key &&
        scope.querySelector<HTMLElement>(`[data-transition-key="${state.key}"]`)) ||
      scope.querySelector<HTMLElement>("[data-motion='transition-target']");

    if (!hit) {
      revealNow(scope);
      return;
    }

    const img = (hit.matches('img') ? hit : hit.querySelector('img')) as HTMLImageElement | null;
    if (!img) {
      revealNow(scope);
      return;
    }

    const dest = img.getBoundingClientRect();
    if (!dest.width || !dest.height) {
      revealNow(scope);
      return;
    }

    if (isCoarse()) {
      // Mobile crossfade
      const clone = makeClone(state, dest);
      const tl = gsap.timeline({ onComplete: teardown, onInterrupt: teardown });
      activeTl = tl;
      tl.fromTo(clone, { opacity: 1 }, { opacity: 0, duration: FADE_DURATION, ease: MOTION_EASE.entrance }, 0);
      revealTimeline(scope, tl, 0);
      watchdogTimer = setTimeout(teardown, 900);
    } else {
      // Desktop FLIP transition
      const s = Math.max(state.rect.w / dest.width, state.rect.h / dest.height);
      const dx = state.rect.x + state.rect.w / 2 - (dest.left + dest.width / 2);
      const dy = state.rect.y + state.rect.h / 2 - (dest.top + dest.height / 2);
      const ix = Math.max(0, (((dest.width * s - state.rect.w) / 2 / s) / dest.width) * 100);
      const iy = Math.max(0, (((dest.height * s - state.rect.h) / 2 / s) / dest.height) * 100);

      const clone = makeClone(state, dest);
      const tl = gsap.timeline({ onComplete: teardown, onInterrupt: teardown });
      activeTl = tl;

      tl.fromTo(
        clone,
        {
          x: dx,
          y: dy,
          scale: s,
          clipPath: `inset(${iy}% ${ix}% ${iy}% ${ix}%)`,
          force3D: true,
        },
        {
          x: 0,
          y: 0,
          scale: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: FLIP_DURATION,
          ease: MOTION_EASE.cinematic,
        },
        0,
      ).to(clone, { opacity: 0, duration: 0.16, ease: 'none' }, FLIP_DURATION - 0.14);

      revealTimeline(scope, tl, 0.28);
      watchdogTimer = setTimeout(teardown, 1400);
    }

    return () => {
      teardown();
    };
  }, [scopeRef, destinationKey]);
}

/**
 * ProjectTransitionProvider: Provides captureTransition and triggerTransition.
 * Navigation is NEVER blocked: Next.js router.push() fires immediately.
 */
export function ProjectTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const captureTransition = useCallback(
    (sourceEl: HTMLElement, href: string, key?: string) => {
      // Navigation fires immediately without awaiting animation
      router.push(href);

      if (isReduced() || isSlow()) return;

      const img = (sourceEl.matches('img') ? sourceEl : sourceEl.querySelector('img')) as HTMLImageElement | null;
      if (!img) return;

      const r = img.getBoundingClientRect();
      if (!r.width || !r.height) return;

      const txKey = key || sourceEl.getAttribute('data-transition-key') || '';

      writeState({
        key: txKey,
        src: img.currentSrc || img.src,
        alt: img.alt || '',
        rect: { x: r.left, y: r.top, w: r.width, h: r.height },
        t: Date.now(),
        dir: 'forward',
        from: window.location.pathname,
      });

      // Exit decorative fade of sibling items
      const page = sourceEl.closest<HTMLElement>('[data-motion-module]') || document.body;
      const items = Array.from(page.querySelectorAll<HTMLElement>('[data-motion-item]')).filter(
        (n) => n !== sourceEl && !n.contains(sourceEl) && !sourceEl.contains(n),
      );
      if (items.length) {
        gsap.to(items, {
          opacity: 0,
          y: 10,
          duration: MOTION_DURATION.fast,
          ease: MOTION_EASE.exit,
          overwrite: true,
        });
      }
    },
    [router],
  );

  const triggerTransition = useCallback(
    (href: string) => {
      router.push(href);
    },
    [router],
  );

  return (
    <ProjectTransitionContext.Provider value={{ triggerTransition, captureTransition }}>
      {children}
    </ProjectTransitionContext.Provider>
  );
}
