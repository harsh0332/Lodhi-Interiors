import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  tone?: 'light' | 'dark';
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Button: Architectural button with two variants only.
 * - Primary: Text with 1px animated underline changing origin on hover.
 * - Secondary: 1px outline filling with charcoal on hover (or bone on dark).
 * Meets 44px touch target, visible accent focus ring, and link polymorphism.
 */
export function Button({
  variant = 'primary',
  tone = 'light',
  href,
  target,
  rel,
  children,
  className,
  ...props
}: ButtonProps) {
  const baseClasses = cn(
    'relative inline-flex items-center justify-center font-sans text-[0.875rem] font-medium tracking-[0.03em] transition-all duration-300 min-h-[44px] cursor-pointer select-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bone',
  );

  const primaryClasses = cn(
    'py-2 px-1 text-current group',
    "after:content-[''] after:absolute after:bottom-2 after:left-0 after:right-0 after:h-[1px] after:bg-current",
    'after:origin-left after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-out',
  );

  const secondaryClasses = cn(
    'px-6 py-2.5 rounded-sm border transition-colors duration-300',
    tone === 'dark'
      ? 'border-bone/30 text-bone hover:bg-bone hover:text-charcoal hover:border-bone focus-visible:ring-offset-charcoal'
      : 'border-charcoal/30 text-charcoal hover:bg-charcoal hover:text-bone hover:border-charcoal',
  );

  const variantClasses = variant === 'primary' ? primaryClasses : secondaryClasses;
  const combinedClasses = cn(baseClasses, variantClasses, className);

  if (href) {
    const isExternal =
      href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:');
    if (isExternal) {
      return (
        <a
          href={href}
          target={target || (href.startsWith('http') ? '_blank' : undefined)}
          rel={rel || (href.startsWith('http') ? 'noopener noreferrer' : undefined)}
          className={combinedClasses}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
