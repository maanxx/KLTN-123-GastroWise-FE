import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus-ring',
          // Variant
          variant === 'primary' &&
            'bg-primary-500 text-white shadow-md shadow-primary-500/20 hover:bg-primary-600 hover:shadow-lg',
          variant === 'secondary' &&
            'bg-secondary-500 text-white shadow-md shadow-secondary-500/20 hover:bg-secondary-600 hover:shadow-lg',
          variant === 'outline' &&
            'border-2 border-primary-500 bg-transparent text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-950',
          variant === 'ghost' &&
            'bg-transparent text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
          variant === 'danger' && 'bg-red-500 text-white hover:bg-red-600',
          // Size
          size === 'sm' && 'px-4 py-2 text-xs',
          size === 'md' && 'px-6 py-3 text-sm',
          size === 'lg' && 'px-8 py-4 text-base',
          size === 'icon' && 'p-3',
          // States
          (disabled || isLoading) && 'cursor-not-allowed opacity-50 active:scale-100',
          !disabled && !isLoading && 'active:scale-[0.98]',
          className,
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export { Button };
