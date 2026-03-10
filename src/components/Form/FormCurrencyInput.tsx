import { useFormContext, Controller, type FieldValues, type Path } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { cn } from '@/lib/cn'

interface FormCurrencyInputProps<T extends FieldValues> {
  name: Path<T>
  label?: string
  required?: boolean
  disabled?: boolean
  placeholder?: string
  helperText?: string
  containerClassName?: string
  labelClassName?: string
}

export function FormCurrencyInput<T extends FieldValues>({
  name,
  label,
  required,
  disabled,
  placeholder = '0.00',
  helperText,
  containerClassName,
  labelClassName,
}: FormCurrencyInputProps<T>) {
  const { control } = useFormContext<T>()

  return (
    <div className={cn('w-full', containerClassName)}>
      {label && (
        <label className={cn('block text-sm font-medium text-gray-700 mb-1.5', labelClassName)}>
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <NumericFormat
              value={field.value ?? ''}
              onValueChange={(values) => {
                field.onChange(values.floatValue ?? null)
              }}
              thousandSeparator=","
              decimalSeparator="."
              decimalScale={2}
              fixedDecimalScale
              allowNegative={false}
              disabled={disabled}
              placeholder={placeholder}
              className={cn(
                'w-full px-3 py-2.5 border rounded-lg text-sm outline-none transition-all',
                'text-gray-900 placeholder:text-gray-400',
                'focus:ring-2 focus:ring-violet-500 focus:border-violet-500',
                fieldState.error
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 hover:border-gray-400',
                disabled && 'bg-gray-50 cursor-not-allowed opacity-60'
              )}
            />
            {fieldState.error && (
              <p className="mt-1 text-xs text-red-500">{fieldState.error.message}</p>
            )}
            {helperText && !fieldState.error && (
              <p className="mt-1 text-xs text-gray-500">{helperText}</p>
            )}
          </>
        )}
      />
    </div>
  )
}
