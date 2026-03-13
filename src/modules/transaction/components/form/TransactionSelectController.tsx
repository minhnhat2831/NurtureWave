import { BaseSelect } from "@/components/common"
import type { BaseSelectProps, SelectOption } from "@/components/Form"
import { Controller, useFormContext } from "react-hook-form"

interface TransactionSelectControllerProps
  extends Omit<
    BaseSelectProps,
    "name" | "value" | "onChange" | "error" | "options" | "label" | "required"
  > {
  name: string
  label?: string
  options: SelectOption[]
  required?: boolean
  value?: string | number
  onChange?: (value: string | number | null) => void
}

export default function TransactionSelectController({
  name,
  label,
  options,
  required,
  helperText,
  containerClassName,
  labelClassName,
  placeholder,
  disabled,
  value,
  isSearchable,
  isClearable,
  menuPortalTarget,
  menuPosition,
  onChange,
}: TransactionSelectControllerProps) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <BaseSelect
          label={label}
          name={field.name}
          value={value ?? field.value ?? ""}
          options={options}
          required={required}
          helperText={helperText}
          containerClassName={containerClassName}
          labelClassName={labelClassName}
          disabled={disabled}
          placeholder={placeholder}
          isSearchable={isSearchable}
          isClearable={isClearable}
          menuPortalTarget={menuPortalTarget}
          menuPosition={menuPosition}
          error={fieldState.error?.message}
          onBlur={field.onBlur}
          onChange={(nextValue) => {
            field.onChange(nextValue)
            onChange?.(nextValue)
          }}
        />
      )}
    />
  )
}
