import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
  labelClassName?: string;
  required?: boolean;
}

export const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  (
    {
      label,
      error,
      helperText,
      className,
      containerClassName,
      labelClassName,
      required,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn('w-full', containerClassName)}>
        {label && (
          <label className={cn('block text-sm font-medium text-gray-700 mb-1.5', labelClassName)}>
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}
        <input
          ref={ref}
          disabled={disabled}
          className={cn(
            'w-full px-3 py-2 border rounded-lg text-sm outline-none transition-all',
            'placeholder:text-gray-400',
            'focus:ring-2 focus:ring-violet-500 focus:border-violet-500',
            error
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 hover:border-gray-400',
            disabled && 'bg-gray-50 cursor-not-allowed opacity-60',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        {helperText && !error && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
      </div>
    );
  }
);

BaseInput.displayName = 'BaseInput';
