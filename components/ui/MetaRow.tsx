import React from 'react';
import { cn } from '@/lib/utils';

export interface MetaRowProps {
  label: string;
  value: React.ReactNode;
  className?: string;
}

/**
 * MetaRow: Definition list row used for project metadata (location, scope, year, area).
 * Hairline 1px border in greige at 30% opacity.
 */
export function MetaRow({ label, value, className }: MetaRowProps) {
  return (
    <div
      className={cn(
        'flex items-baseline justify-between gap-4 border-b border-greige/30 py-3.5 text-current',
        className,
      )}
    >
      <dt className="flex-shrink-0 font-sans text-ui-caption uppercase tracking-[0.06em] text-greige">
        {label}
      </dt>
      <dd className="text-right font-sans text-[0.9375rem] font-medium text-current">{value}</dd>
    </div>
  );
}

export interface MetaListProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * MetaList: Container `<dl>` with top hairline rule for MetaRow items.
 */
export function MetaList({ children, className }: MetaListProps) {
  return <dl className={cn('w-full border-t border-greige/30', className)}>{children}</dl>;
}
