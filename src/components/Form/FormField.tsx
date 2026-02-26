import { useFormContext, type FieldValues, type Path } from 'react-hook-form';
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

// FormInput - Connected to React Hook Form
export function FormInput<T extends FieldValues>({
  name,
  ...props
}: FormInputProps<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const error = errors[name]?.message as string | undefined;

  return <BaseInput {...register(name)} error={error} {...props} />;
}

// FormTextArea - Connected to React Hook Form
export function FormTextArea<T extends FieldValues>({
  name,
  ...props
}: FormTextAreaProps<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const error = errors[name]?.message as string | undefined;

  return <BaseTextArea {...register(name)} error={error} {...props} />;
}

// FormSelect - Connected to React Hook Form
export function FormSelect<T extends FieldValues>({
  name,
  ...props
}: FormSelectProps<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const error = errors[name]?.message as string | undefined;

  return <BaseSelect {...register(name)} error={error} {...props} />;
}

// FormDatePicker - Connected to React Hook Form
export function FormDatePicker<T extends FieldValues>({
  name,
  ...props
}: FormDatePickerProps<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const error = errors[name]?.message as string | undefined;

  return <BaseDatePicker {...register(name)} error={error} {...props} />;
}
