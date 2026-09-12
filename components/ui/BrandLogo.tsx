'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface BrandLogoProps {
  /** Size variant of the logotype */
  size?: 'sm' | 'md' | 'lg';
  /** Color tone: 'light' (bone on dark), 'dark' (charcoal on light), or 'auto' (inherits text-current) */
  tone?: 'light' | 'dark' | 'auto';
  /** Whether to render the studio founder subtitle */
  showTagline?: boolean;
  /** Additional container styling */
  className?: string;
  /** Optional click handler (e.g. closing mobile menu) */
  onClick?: () => void;
}

/**
 * Architectural Insignia Mark:
 * An interlocking architectural monogram of "L" & "I" with precision draftsman framing.
 * Features hover-driven micro-interactions:
 * - Corner drafting guides expand outward (scale-110)
 * - Inner gold cantilever bar illuminates with luminous gleam
 * - Central structural apex responds dynamically
 */
function ArchitecturalInsignia({ tone = 'auto', className }: { tone?: 'light' | 'dark' | 'auto'; className?: string }) {
  const accentColor = '#C5A265';
  const primaryStroke = tone === 'light' ? '#F6F3EE' : tone === 'dark' ? '#1A1A18' : 'currentColor';

  return (
    <div className={cn('relative flex-shrink-0 transition-transform duration-500 ease-out group-hover:scale-105', className)}>
      <svg
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 md:h-12 md:w-12 transition-all duration-500 ease-out"
        aria-hidden="true"
      >
        {/* Outer Corner Drafting Guides (Expands & illuminates with gold on hover) */}
        <g className="transition-all duration-500 ease-out origin-center group-hover:scale-115">
          {/* Top-Left Bracket */}
          <path d="M4 12V4H12" stroke={primaryStroke} strokeWidth="1.2" strokeLinecap="square" className="opacity-70 group-hover:opacity-100 group-hover:stroke-accent transition-all duration-300" />
          {/* Top-Right Bracket */}
          <path d="M32 4H40V12" stroke={primaryStroke} strokeWidth="1.2" strokeLinecap="square" className="opacity-70 group-hover:opacity-100 group-hover:stroke-accent transition-all duration-300" />
          {/* Bottom-Right Bracket */}
          <path d="M40 32V40H32" stroke={primaryStroke} strokeWidth="1.2" strokeLinecap="square" className="opacity-70 group-hover:opacity-100 group-hover:stroke-accent transition-all duration-300" />
          {/* Bottom-Left Bracket */}
          <path d="M12 40H4V32" stroke={primaryStroke} strokeWidth="1.2" strokeLinecap="square" className="opacity-70 group-hover:opacity-100 group-hover:stroke-accent transition-all duration-300" />
        </g>

        {/* Fine Architectural Grid Hairlines */}
        <line x1="22" y1="2" x2="22" y2="42" stroke={primaryStroke} strokeWidth="0.5" strokeDasharray="1.5 3" className="opacity-25 group-hover:opacity-60 group-hover:stroke-accent/70 transition-all duration-300" />
        <line x1="2" y1="22" x2="42" y2="22" stroke={primaryStroke} strokeWidth="0.5" strokeDasharray="1.5 3" className="opacity-25 group-hover:opacity-60 group-hover:stroke-accent/70 transition-all duration-300" />

        {/* The Monogram: Architectural "L" & "I" Formwork */}
        {/* Monolith Pillar "I" */}
        <rect
          x="20.5"
          y="10"
          width="3"
          height="24"
          fill={primaryStroke}
          className="transition-all duration-300 ease-out group-hover:fill-accent group-hover:-translate-y-0.5"
        />

        {/* Horizontal Cantilever Beam "L" */}
        <path
          d="M13 14V33.5H31"
          stroke={primaryStroke}
          strokeWidth="2.4"
          strokeLinecap="square"
          strokeLinejoin="miter"
          className="transition-all duration-300 ease-out group-hover:stroke-accent"
        />

        {/* Pulse Concentric Ring around Center Node on Hover */}
        <circle
          cx="22"
          cy="22"
          r="6.5"
          stroke={accentColor}
          strokeWidth="0.75"
          className="opacity-0 scale-50 transition-all duration-500 ease-out origin-center group-hover:opacity-60 group-hover:scale-100"
        />

        {/* Warm Golden Ratio Accent Knot (Radiant gleam on hover) */}
        <circle
          cx="22"
          cy="22"
          r="2.5"
          fill={accentColor}
          className="transition-all duration-500 ease-out origin-center group-hover:scale-125 group-hover:drop-shadow-[0_0_10px_rgba(197,162,101,0.9)]"
        />

        {/* Precision Bevel Corner Notches */}
        <rect x="29" y="32" width="3" height="3" fill={accentColor} className="transition-all duration-400 ease-out origin-center group-hover:scale-125 group-hover:drop-shadow-[0_0_6px_rgba(197,162,101,0.8)]" />
        <rect x="12" y="12" width="2" height="2" fill={accentColor} className="transition-all duration-400 ease-out origin-center group-hover:scale-125 group-hover:drop-shadow-[0_0_6px_rgba(197,162,101,0.8)]" />
      </svg>
    </div>
  );
}

/**
 * BrandLogo: Primary architectural identity for LODHI INTERIORS.
 * - Sized generously with high architectural clarity.
 * - Displays Cormorant Garamond serif with distinctive balance.
 * - Interactive hover animation: Insignia expands & shimmers, golden architectural underline sweeps.
 */
export function BrandLogo({
  size = 'md',
  tone = 'auto',
  showTagline = true,
  className,
  onClick,
}: BrandLogoProps) {
  const toneClasses =
    tone === 'light'
      ? 'text-bone'
      : tone === 'dark'
        ? 'text-charcoal'
        : 'text-current';

  const titleSizes = {
    sm: 'text-[1.35rem] md:text-[1.5rem]',
    md: 'text-[1.65rem] md:text-[2.05rem] lg:text-[2.25rem]',
    lg: 'text-[2rem] md:text-[2.65rem] lg:text-[3rem]',
  };

  const gapSizes = {
    sm: 'gap-2.5',
    md: 'gap-3 md:gap-3.5',
    lg: 'gap-4 md:gap-5',
  };

  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn(
        'group inline-flex items-center outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
        gapSizes[size],
        toneClasses,
        className,
      )}
      aria-label="Lodhi Interiors — Home"
    >
      {/* 1. Architectural Insignia Monogram */}
      <ArchitecturalInsignia tone={tone} />

      {/* 2. Bespoke Logotype Typography */}
      <div className="flex flex-col justify-center">
        {/* Main Name Lockup */}
        <div className="relative pb-0.5">
          <div className="flex items-baseline tracking-[-0.015em] transition-all duration-300 ease-out group-hover:tracking-[0.01em]">
            <span className={cn('font-serif font-normal leading-none transition-transform duration-300 group-hover:translate-x-0.5', titleSizes[size])}>
              Lodhi
            </span>
            <span
              className={cn(
                'ml-2 font-serif font-light italic leading-none transition-all duration-300 group-hover:text-accent group-hover:translate-x-1',
                titleSizes[size],
              )}
            >
              Interiors
            </span>
          </div>

          {/* Golden Architectural Underline with Glowing Leading Dot (Sweeps on cursor hover) */}
          <div
            className="absolute bottom-0 left-0 flex h-[1.5px] w-full origin-left scale-x-0 items-center justify-end bg-gradient-to-r from-accent/30 via-accent to-accent transition-transform duration-500 ease-out group-hover:scale-x-100"
            aria-hidden="true"
          >
            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent shadow-[0_0_8px_rgba(197,162,101,0.9)]" />
          </div>
        </div>

        {/* Subtitle / Founder Attribution */}
        {showTagline && (
          <div className="mt-1 flex items-center space-x-2 font-sans text-ui-label tracking-[0.12em] transition-all duration-400 group-hover:tracking-[0.16em]">
            <span className="opacity-75 transition-opacity group-hover:opacity-100 text-[0.72rem] md:text-[0.78rem] uppercase font-medium">
              by Soumya Lodhi
            </span>
            <span className="h-1 w-1 rounded-full bg-accent opacity-60 transition-transform duration-300 group-hover:scale-125" aria-hidden="true" />
            <span className="opacity-60 transition-opacity group-hover:opacity-90 text-[0.7rem] md:text-[0.75rem] uppercase font-normal tracking-[0.12em]">
              Bhopal
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
