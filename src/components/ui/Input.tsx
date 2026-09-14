'use client';

import { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, helperText, icon, ...props }, ref) => {
    const id = props.id || props.name;
    const isPassword = type === 'password';
    const [showPassword, setShowPassword] = useState(false);

    const actualType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
              {icon}
            </div>
          )}

          <input
            id={id}
            type={actualType}
            className={cn(
              'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition-all duration-200 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-primary-400',
              icon && 'pl-11',
              isPassword && 'pr-11',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
              className,
            )}
            ref={ref}
            {...props}
          />

          {/* Nút Ẩn / Hiện Mật khẩu */}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 focus:outline-none"
              title={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 transition-transform active:scale-95" />
              ) : (
                <Eye className="h-4 w-4 transition-transform active:scale-95" />
              )}
            </button>
          )}
        </div>
        {error && <p className="text-sm font-medium text-red-500">{error}</p>}
        {helperText && !error && <p className="text-sm text-slate-500">{helperText}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
