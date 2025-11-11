import {
  type FieldPath,
  type FieldValues,
  useController as useRHFController,
  type UseControllerProps,
  type UseControllerReturn,
} from 'react-hook-form';
import { type ReactNode } from 'react';
import { useIsRequiredFromZodSchemaInFormContext } from './useIsRequiredFromZodSchemaInFormContext.tsx';

export type ControllerRenderProps<
  Values extends FieldValues,
  Name extends FieldPath<Values>,
> = UseControllerReturn<Values, Name> & {
  required: boolean;
};

/**
 * Like {@link import('react-hook-form').useController},
 * but it handles required fields automatically via Zod Schema.
 */
export function useController<Values extends FieldValues, const Name extends FieldPath<Values>>(
  props: UseControllerProps<Values, Name>,
) {
  const required = useIsRequiredFromZodSchemaInFormContext(props.name);

  const controlled = useRHFController({
    ...props,
    rules: { required, ...props.rules },
  });

  return { ...controlled, required };
}

/**
 * Like {@link import('react-hook-form').Controller},
 * but it handles required fields automatically via Zod Schema.
 */
export function Controller<Values extends FieldValues, const Name extends FieldPath<Values>>({
  render,
  ...props
}: UseControllerProps<Values, Name> & {
  render: (renderProps: ControllerRenderProps<Values, Name>) => ReactNode;
}) {
  return render(useController(props));
}
