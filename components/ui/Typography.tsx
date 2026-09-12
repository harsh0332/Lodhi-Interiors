import React from 'react';
import { cn } from '@/lib/utils';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

/**
 * Display: Largest fluid editorial serif headline.
 * Scale: clamp(2.75rem, 8vw, 6rem), line-height 1.02, tracking -0.02em
 */
export function Display({ children, className, as: Component = 'h1', ...props }: TypographyProps) {
  return (
    <Component
      className={cn('font-serif text-fluid-display font-normal text-current', className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3;
  children: React.ReactNode;
  className?: string;
}

/**
 * Heading: Semantic heading primitive mapping level to h1, h2, h3 and fluid scale.
 * Level 1: clamp(2.25rem, 5.5vw, 4rem), serif, line-height 1.08
 * Level 2: clamp(1.6rem, 3.4vw, 2.5rem), serif, line-height 1.15
 * Level 3: clamp(1.15rem, 2vw, 1.5rem), sans, weight 500
 */
export function Heading({ level, children, className, ...props }: HeadingProps) {
  if (level === 1) {
    return (
      <h1 className={cn('font-serif text-fluid-h1 font-normal text-current', className)} {...props}>
        {children}
      </h1>
    );
  }

  if (level === 2) {
    return (
      <h2 className={cn('font-serif text-fluid-h2 font-normal text-current', className)} {...props}>
        {children}
      </h2>
    );
  }

  return (
    <h3 className={cn('font-sans text-fluid-h3 font-medium text-current', className)} {...props}>
      {children}
    </h3>
  );
}

/**
 * Body: Standard editorial body copy with line-height 1.65 and max-width 68ch.
 */
export function Body({ children, className, as: Component = 'p', ...props }: TypographyProps) {
  return (
    <Component
      className={cn(
        'max-w-content font-sans text-fluid-body font-normal leading-[1.65] text-current',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * Caption: Secondary descriptive text in greige.
 * Scale: 0.8125rem (13px), sans
 */
export function Caption({
  children,
  className,
  as: Component = 'span',
  ...props
}: TypographyProps) {
  return (
    <Component
      className={cn('font-sans text-ui-caption font-normal tracking-normal text-greige', className)}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * Label: Technical / categorization metadata text.
 * Scale: 0.8125rem (13px), sans, tracking 0.08em uppercase
 */
export function Label({ children, className, as: Component = 'span', ...props }: TypographyProps) {
  return (
    <Component
      className={cn(
        'font-sans text-ui-label font-medium uppercase tracking-[0.08em] text-current',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
