'use client';

import React, { createContext, useContext, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';

interface ProjectTransitionContextType {
  triggerTransition: (href: string) => void;
}

const ProjectTransitionContext = createContext<ProjectTransitionContextType>({
  triggerTransition: () => {},
});

export function useProjectTransition() {
  return useContext(ProjectTransitionContext);
}

/**
 * ProjectTransitionProvider: Calm, non-blocking editorial page wipe for case study navigation.
 * - Clip-path curtain wipe over 600ms.
 * - Navigation is NEVER blocked: Next.js router.push() is triggered immediately or in parallel.
 * - If prefers-reduced-motion is enabled, router navigates instantly with zero animation.
 */
export function ProjectTransitionProvider({ children }: { children: React.ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const triggerTransition = (href: string) => {
    // 1. Reduced motion or mobile viewport: instant route push without heavy curtain wipe
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    if (
      typeof window !== 'undefined' &&
      (window.matchMedia('(prefers-reduced-motion: reduce)').matches || isMobile)
    ) {
      router.push(href);
      return;
    }

    const overlay = overlayRef.current;
    if (!overlay) {
      router.push(href);
      return;
    }

    // 2. Non-blocking animation: push route immediately, execute calm wipe
    router.push(href);

    gsap.fromTo(
      overlay,
      {
        clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
        pointerEvents: 'auto',
      },
      {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration: 0.6,
        ease: 'power3.inOut',
        onComplete: () => {
          gsap.to(overlay, {
            clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
            duration: 0.4,
            ease: 'power3.inOut',
            delay: 0.1,
            onComplete: () => {
              gsap.set(overlay, { pointerEvents: 'none' });
            },
          });
        },
      },
    );
  };

  return (
    <ProjectTransitionContext.Provider value={{ triggerTransition }}>
      {children}
      {/* Wipe Curtain Overlay */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-50 bg-charcoal will-change-transform"
        style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' }}
      />
    </ProjectTransitionContext.Provider>
  );
}
