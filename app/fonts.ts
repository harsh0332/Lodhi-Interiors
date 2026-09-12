import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';

/**
 * Editorial Serif: High-contrast architectural display font.
 * Preloaded ONLY for the weights used in the LCP heading (400, 600).
 * Matches fallback font metrics (Georgia) to prevent layout shifts.
 */
export const serifFont = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  preload: true,
  fallback: ['Georgia', 'serif'],
  adjustFontFallback: true,
});

/**
 * Neutral Grotesque: Clean, geometric sans-serif for UI and body text.
 * Secondary font: preload disabled to prioritize LCP bandwidth.
 * Matches fallback font metrics (system-ui) to prevent layout shifts.
 */
export const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600'],
  preload: false,
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
  adjustFontFallback: true,
});
