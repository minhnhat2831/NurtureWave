import React from 'react';
import Select from 'react-select';
import { cn } from '@/lib/cn';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  isDisabled?: boolean;
}

export interface BaseSelectProps {
  label?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
  labelClassName?: string;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string | number;
  onChange?: (value: string | number | null) => void;
  onBlur?: () => void;
  name?: string;
  isClearable?: boolean;
  isSearchable?: boolean;
}

export const BaseSelect: React.FC<BaseSelectProps> = ({
  label,
  error,
  helperText,
  containerClassName,
  labelClassName,
  options,
  placeholder = 'Select an option',
  required,
  disabled,
  value,
  onChange,
  onBlur,
  name,
  isClearable = true,
  isSearchable = true,
}) => {
    // Map options to react-select format
    const selectOptions = options.map((opt) => ({
      value: opt.value,
      label: opt.label,
      isDisabled: opt.disabled || opt.isDisabled,
    }));

    // Find selected option
    const selectedOption = selectOptions.find((opt) => opt.value === value) || null;

    const handleChange = (newValue: SelectOption | null) => {
      if (onChange) {
        onChange(newValue ? newValue.value : null);
      }
    };

    return (
      <div className={cn('w-full', containerClassName)}>
        {label && (
          <label className={cn('block text-sm font-medium text-gray-700 mb-1.5', labelClassName)}>
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}
        <Select
          name={name}
          options={selectOptions}
          value={selectedOption}
          onChange={handleChange}
          onBlur={onBlur}
          isDisabled={disabled}
          isClearable={isClearable}
          isSearchable={isSearchable}
          placeholder={placeholder}
          classNamePrefix="select"
          unstyled
          classNames={{
            control: () =>
              cn(
                'w-full px-3 py-2 border rounded-lg text-sm outline-none transition-all bg-white cursor-pointer',
                'hover:border-gray-400',
                error
                  ? 'border-red-500 ring-2 ring-red-500/20'
                  : 'border-gray-300 focus-within:ring-2 focus-within:ring-violet-500 focus-within:border-violet-500',
                disabled && 'bg-gray-50 cursor-not-allowed opacity-60'
              ),
            valueContainer: () => 'gap-1',
            input: () => 'text-gray-900',
            placeholder: () => 'text-gray-400 text-sm',
            singleValue: () => 'text-gray-900 text-sm',
            menu: () =>
              'mt-1 p-1 border border-gray-200 bg-white rounded-lg shadow-lg z-[9999]',
            menuList: () => 'space-y-0.5 max-h-[200px] overflow-y-auto',
            option: ({ isFocused, isSelected }) =>
              cn(
                'px-3 py-2 text-sm rounded-md cursor-pointer transition-colors',
                isSelected
                  ? 'bg-violet-500 text-white'
                  : isFocused
                  ? 'bg-gray-100'
                  : 'text-gray-900',
                'hover:bg-gray-100 hover:text-gray-900'
              ),
            indicatorSeparator: () => 'hidden',
            dropdownIndicator: () => 'text-gray-400 hover:text-gray-600 transition-colors',
            clearIndicator: () => 'text-gray-400 hover:text-gray-600 transition-colors pr-1',
          }}
          noOptionsMessage={() => 'No options'}
        />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        {helperText && !error && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
      </div>
    );
};
