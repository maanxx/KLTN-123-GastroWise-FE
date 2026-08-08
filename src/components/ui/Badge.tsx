import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'outline';
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors',
          variant === 'default' && 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100',
          variant === 'primary' && 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300',
          variant === 'secondary' && 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900/30 dark:text-secondary-300',
          variant === 'accent' && 'bg-accent-100 text-accent-800 dark:bg-accent-900/30 dark:text-accent-300',
          variant === 'outline' && 'border border-slate-200 text-slate-800 dark:border-slate-700 dark:text-slate-100',
          className,
        )}
        {...props}
      />
    );
  },
);

Badge.displayName = 'Badge';

export { Badge };
