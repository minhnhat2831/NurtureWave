import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';
import { Icons } from '../common';

export interface BaseDatePickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  containerClassName?: string;
}

export const BaseDatePicker = forwardRef<HTMLInputElement, BaseDatePickerProps>(
  ({ label, error, helperText, required, className, containerClassName, ...props }, ref) => {
    return (
      <div className={cn('w-full', containerClassName)}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            type="date"
            className={cn(
              'w-full px-3 py-2 border rounded-lg text-sm transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent',
              'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
              error
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 hover:border-gray-400',
              className
            )}
            {...props}
          />
          
          {/* Calendar Icon */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <Icons.calendar />
          </div>
        </div>

        {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
        {helperText && !error && <p className="mt-1.5 text-sm text-gray-500">{helperText}</p>}
      </div>
    );
  }
);

BaseDatePicker.displayName = 'BaseDatePicker';
