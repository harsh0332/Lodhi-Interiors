import React from 'react';
import { cn } from '@/lib/utils';

export type SectionTone = 'light' | 'paper' | 'dark';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  tone?: SectionTone;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  fullWidth?: boolean;
  as?: React.ElementType;
}

/**
 * Section: Core layout wrapper managing architectural vertical rhythm and colour tones.
 * - Tones: light (bone), paper (paper band), dark (charcoal with inverted text)
 * - Vertical rhythm: 96px mobile (py-24), 160px desktop (py-40)
 * - Container: 1280px max, 20px gutters mobile (px-5), 48px desktop (px-12)
 */
export function Section({
  tone = 'light',
  children,
  className,
  containerClassName,
  fullWidth = false,
  as: Component = 'section',
  ...props
}: SectionProps) {
  const toneClasses: Record<SectionTone, string> = {
    light: 'bg-bone text-charcoal',
    paper: 'bg-paper text-charcoal',
    dark: 'bg-charcoal text-bone',
  };

  return (
    <Component
      className={cn(
        'relative w-full py-24 transition-colors md:py-40',
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      {fullWidth ? (
        children
      ) : (
        <div className={cn('mx-auto w-full max-w-container px-5 md:px-12', containerClassName)}>
          {children}
        </div>
      )}
    </Component>
  );
}
