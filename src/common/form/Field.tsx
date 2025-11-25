import { type FieldPath, type FieldValues } from 'react-hook-form';
import { type ReactNode } from 'react';
import { Field as UIField } from '../ui';
import type { ControllerRenderProps } from './Controller.tsx';

export const Field = <Values extends FieldValues, const Name extends FieldPath<Values>>({
  // our props
  label,
  helperText,
  // render props
  field,
  fieldState,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  formState,
  required,
  // Field.Root props
  children,
  ...rest
}: ControllerRenderProps<Values, Name> & {
  label?: ReactNode;
  helperText?: ReactNode;
} & UIField.RootProps) => (
  <UIField.Root
    required={required}
    disabled={field.disabled}
    invalid={fieldState.invalid}
    {...rest}
  >
    {label && (
      <UIField.Label>
        {label}
        {required && <UIField.RequiredIndicator />}
      </UIField.Label>
    )}

    {children}

    {fieldState.error?.message ? (
      <UIField.ErrorText>{fieldState.error.message}</UIField.ErrorText>
    ) : helperText ? (
      <UIField.HelperText>{helperText}</UIField.HelperText>
    ) : null}
  </UIField.Root>
);
