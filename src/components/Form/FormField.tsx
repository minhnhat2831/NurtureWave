import { useFormContext, Controller, type FieldValues, type Path } from 'react-hook-form';
import { BaseInput, type BaseInputProps } from './BaseInput';
import { BaseTextArea, type BaseTextAreaProps } from './BaseTextArea';
import { BaseSelect, type BaseSelectProps } from './BaseSelect';
import { BaseDatePicker, type BaseDatePickerProps } from './BaseDatePicker';

// Generic form field wrapper types
type FormFieldBase<T extends FieldValues> = {
  name: Path<T>;
};

type FormInputProps<T extends FieldValues> = FormFieldBase<T> &
  Omit<BaseInputProps, 'error' | 'name'>;

type FormTextAreaProps<T extends FieldValues> = FormFieldBase<T> &
  Omit<BaseTextAreaProps, 'error' | 'name'>;

type FormSelectProps<T extends FieldValues> = FormFieldBase<T> &
  Omit<BaseSelectProps, 'error' | 'name'>;

type FormDatePickerProps<T extends FieldValues> = FormFieldBase<T> &
  Omit<BaseDatePickerProps, 'error' | 'name'>;

type FormNumberInputProps<T extends FieldValues> = FormFieldBase<T> &
  Omit<BaseInputProps, 'error' | 'name' | 'type'>;

// FormInput - Connected to React Hook Form using Controller
export function FormInput<T extends FieldValues>({
  name,
  ...props
}: FormInputProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <BaseInput
          {...field}
          error={fieldState.error?.message}
          {...props}
        />
      )}
    />
  );
}

// FormTextArea - Connected to React Hook Form using Controller
export function FormTextArea<T extends FieldValues>({
  name,
  ...props
}: FormTextAreaProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <BaseTextArea
          {...field}
          error={fieldState.error?.message}
          {...props}
        />
      )}
    />
  );
}

// FormSelect - Connected to React Hook Form using Controller
export function FormSelect<T extends FieldValues>({
  name,
  ...props
}: FormSelectProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <BaseSelect
          {...field}
          error={fieldState.error?.message}
          {...props}
        />
      )}
    />
  );
}

// FormDatePicker - Connected to React Hook Form using Controller
export function FormDatePicker<T extends FieldValues>({
  name,
  ...props
}: FormDatePickerProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <BaseDatePicker
          {...field}
          error={fieldState.error?.message}
          {...props}
        />
      )}
    />
  );
}

// FormNumberInput - Connected to React Hook Form using Controller
export function FormNumberInput<T extends FieldValues>({
  name,
  ...props
}: FormNumberInputProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <BaseInput
          {...field}
          type="number"
          error={fieldState.error?.message}
          {...props}
        />
      )}
    />
  );
}

// Aliases for RHF naming convention
export const RHFInput = FormInput;
export const RHFTextArea = FormTextArea;
export const RHFSelect = FormSelect;
export const RHFDatePicker = FormDatePicker;
export const RHFNumberInput = FormNumberInput;
