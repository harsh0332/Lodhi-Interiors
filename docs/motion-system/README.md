# Lodhi Interiors — Motion System Documentation

This document serves as the permanent specification and architectural reference for the Lodhi Interiors motion system. Originally prototyped in `/motion` as standalone vanilla HTML/CSS/JS modules, the entire system has been ported into the Next.js App Router codebase using custom React hooks, GSAP 3.12.5, ScrollTrigger, and Lenis 1.1.18.

---

## 1. Core Principles & Non-Negotiables

1. **Scroll Authority**:
   - Exactly **one** Lenis smooth-scroll instance (`components/motion/LenisProvider.tsx`) and **one** ScrollTrigger bridge ticker in the entire application.
   - Modules/hooks never construct Lenis or call `gsap.ticker.add` directly.
   - `html[data-motion-engine="on"]` is written by the engine upon mount, gating pre-animation styles so no-JS and server renders paint immediately in their final readable state.

2. **Zero Layout Shift (CLS = 0)**:
   - Only `transform`, `opacity`, `filter`, and `clip-path` are ever animated.
   - Never animate layout geometry (`width`, `height`, `top`, `left`, `margin`, `padding`).
   - Every image frame reserves its aspect ratio (`aspect-ratio` or Next.js `Image` dimensions) so reflows are strictly prevented.

3. **Accessibility & Reduced Motion**:
   - Every animation hook executes within `gsap.context()` and handles 3 branches via `gsap.matchMedia()`:
     - **Desktop**: `(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)`
     - **Mobile**: `(max-width: 899px), (hover: none), (pointer: coarse)`
     - **Reduced Motion**: `(prefers-reduced-motion: reduce)`
   - Under `prefers-reduced-motion: reduce`:
     - Lenis is disabled (native scrolling only).
     - Every module clears props or defaults to instant static state.
     - Global CSS in `styles/globals.css` forces `opacity: 1 !important`, `transform: none !important`, `clip-path: none !important`.

4. **Lifecycle & Memory Management**:
   - All motion hooks use `useIsomorphicLayoutEffect` (SSR-safe).
   - All GSAP tweens and ScrollTriggers are isolated within `gsap.context(..., root)`.
   - On unmount, `ctx.revert()` tears down all triggers, tweens, and observers, ensuring `ScrollTrigger.getAll().length` returns cleanly to zero.

---

## 2. Motion Tokens

Defined in `components/motion/tokens.ts` and aligned with CSS variables in `styles/globals.css`:

### Durations
| Token | Seconds | CSS Variable | Use Case |
|---|---|---|---|
| `fast` | `0.25s` | `--dur-fast` | Micro-interactions, interface snaps, mobile toggles |
| `base` | `0.5s` | `--dur-base` | Content arrivals, fades, copy reveals |
| `slow` | `0.7s` | `--dur-slow` | Complex card movements, subtle transitions |
| `cinematic` | `0.9s` | `--dur-cinematic` | Editorial photography reveals, hero unblur |

### Easing Functions
| Token | GSAP Ease | CSS Cubic Bezier | Use Case |
|---|---|---|---|
| `entrance` | `power2.out` | `cubic-bezier(0.22, 0.61, 0.36, 1)` | Arriving elements |
| `exit` | `power2.in` | `cubic-bezier(0.55, 0.06, 0.68, 0.19)` | Exiting elements |
| `cinematic` | `expo.out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Photography clip-path wipes & scale reveals |
| `snap` | `power4.out` | `cubic-bezier(0.2, 0, 0, 1)` | Interactive slider handle tracking |

### Stagger
| Token | Seconds | Use Case |
|---|---|---|
| `base` | `0.08s` | Headlines, list items, action buttons |

---

## 3. Ported Modules Overview

### Module 01: Hero & First-Load Sequence
- **Hook**: `useHeroSequence(rootRef)` (`components/motion/useHeroSequence.ts`)
- **Target**: `components/sections/Hero.tsx`
- **Behavior**:
  - Image unblur (`filter: blur(12px) -> blur(0px)`) and scale settling (`scale: 1.05 -> 1`) over 900ms.
  - Runtime DOM text-line measurement with fallback to guarantee no word collision on font swap.
  - Staggered line rise (`yPercent: 110 -> 0`, 600ms per line, 80ms stagger).
  - Lede copy and CTA buttons fade up 16px.
  - Scroll cue fades in and breathes gently.
  - Desktop parallax (`data-motion-speed="0.08"`) with text depth multiplier `2.0`.

### Module 02: Selected Work Editorial Gallery
- **Hook**: `useSelectedWorkGallery(rootRef)` (`components/motion/useSelectedWorkGallery.ts`)
- **Target**: `components/sections/SelectedWork.tsx`
- **Behavior**:
  - Each architectural card scales in (`scale: 1.05 -> 1`, `opacity: 0 -> 1`) upon entering viewport (`top 85%`).
  - Staggered caption reveal (`y: 12 -> 0`, `opacity: 0 -> 1`).
  - Subtle overscan parallax on media items during continuous scroll.

### Module 03: Route Transition (Work Index → Case Study)
- **Engine**: `components/motion/ProjectTransition.tsx`
- **Targets**: `components/ui/ProjectCard.tsx`, `components/motion/CaseStudyParallax.tsx`, `app/work/[slug]/page.tsx`
- **Behavior**:
  - Click on project card captures bounding client rect (`captureTransition`).
  - FLIP expansion: destination page creates high-priority clone layer matched to source rect.
  - Expanding clone smoothly matches destination aspect ratio via animated `clip-path` and uniform scale over 600ms (`expo.out`).
  - Destination heading unmasks (`yPercent: 110 -> 0`) under the arriving photo.
  - 1500ms freshness timeout and watchdog timer prevent orphaned overlays.
  - Mobile runs composited 250ms cross-fade for maximum frame rate on mobile GPUs.

### Module 04: Pinned Process Sequence & Numbers Counter
- **Hooks**: `useProcessSequence(rootRef)`, `useCounters(rootRef)` (`components/motion/useProcessSequence.ts`, `components/motion/useCounters.ts`)
- **Targets**: `components/sections/ProcessStages.tsx`, `components/sections/Numbers.tsx`
- **Behavior**:
  - Process: Desktop left-hand stage index pins while stages scroll; updates active stage indicators with font-load guards (`document.fonts.ready`).
  - Numbers: Viewport-triggered count-up using `toLocaleString('en-IN')` with reserved `ch` container width to eliminate layout jitter.

### Module 05: Header & Nav Overlay
- **Hooks**: `useHeaderMotion(headerRef)`, `useNavOverlay(isOpen, onClose, overlayRef)` (`components/motion/useHeaderMotion.ts`)
- **Targets**: `components/sections/Header.tsx`, `components/sections/MobileNav.tsx`
- **Behavior**:
  - Header: Scroll hysteresis (hides when scrolling down past 120px, reveals when scrolling up by 8px).
  - Nav Overlay: Fullscreen architectural clip-path wipe (`circle(0% at top right)` to `circle(150% at top right)`), staggered navigation link reveals, focus trap, and body scroll locking.

### Module 06: Case Study Media System
- **Hooks**: `useCaseFullbleed(rootRef)`, `useCaseGallery(rootRef)`, `useCaseCompare(rootRef)` (`components/motion/useCaseStudyMedia.ts`)
- **Targets**: `components/ui/FullBleedImage.tsx`, `components/sections/CaseStudyGallery.tsx`, `components/ui/BeforeAfterComparison.tsx`
- **Behavior**:
  - **06A (Full-Bleed Reveals)**: Alternating clip-path wipes (`up` / `down`) with internal image scale settling (`1.06 -> 1`). Batched via `ScrollTrigger.batch()`. Gated on `whenPaintable()`.
  - **06B (Touch Scroller / Gallery)**: Touch horizontal scroll-snap with 78% peek on mobile; staggered grid fade-up on desktop.
  - **06C (Before/After Comparison)**: Desktop interactive split divider operable via pointer drag or keyboard arrows (Shift for 10%, Home/End for extremes). Stacks cleanly on mobile touch screens with hidden divider.

### Module 07: Closing CTA, Footer, Cursor & Sticky Mobile Bar
- **Hooks**: `useClosingCTAMotion(rootRef)`, `useFooterReveal(rootRef)`, `useCustomCursor(cursorRef)`, `useStickyMobileBar(barRef)` (`components/motion/useFooterMotion.ts`)
- **Targets**: `components/sections/ClosingCTA.tsx`, `components/sections/Footer.tsx`, `components/ui/CustomCursor.tsx`, `components/sections/StickyMobileBar.tsx`
- **Behavior**:
  - **07A (Closing CTA)**: Masked headline rise (`yPercent: 108 -> 0`) and staggered buttons (`0.08s`).
  - **07B (Footer Reveal)**: Staggered entrance of structural columns and studio NAP blocks.
  - **07C (Custom Cursor)**: Desktop brass trailing ring running via `gsap.quickTo` on the shared ticker (no separate rAF loops). Scales over interactive elements.
  - **07D (Sticky Mobile Bar)**: Bottom quick-action bar for mobile devices. Slides up once hero is scrolled past, automatically hides near footer.

---

## 4. Reduced Motion Guarantee

For all users with `prefers-reduced-motion: reduce`:
- CSS overrides in `styles/globals.css` ensure all content is visible at full opacity and default geometry immediately.
- Lenis smooth-scrolling is bypassed in favor of native OS scroll behavior.
- All interactive elements (e.g. Before/After slider) remain fully usable via keyboard and direct manipulation without motion tweens.
