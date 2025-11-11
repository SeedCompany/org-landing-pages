import { zodResolver } from '@hookform/resolvers/zod';
import {
  useForm as useRHForm,
  type FieldValues,
  type UseFormProps,
  type Control,
} from 'react-hook-form';
import * as z from 'zod/v4/core';

/**
 * Like {@link import('react-hook-form').useForm},
 * but it gets its type from the zod schema, which is connected to validation as well.
 *
 * Also, other defaults we want for the app could go here.
 */
export const useForm = <
  Input extends FieldValues,
  Output,
  Context extends object,
  Schema extends z.$ZodType<Output, Input> = z.$ZodType<Output, Input>,
>(
  schema: Schema,
  props?: Omit<
    UseFormProps<z.input<Schema>, Context, z.output<Schema>>,
    'resolver' | 'formControl'
  >,
) => {
  const context = { ...props?.context, schema } as Context & { schema: Schema };
  return useRHForm<z.input<Schema>, Context & { schema: Schema }, z.output<Schema>>({
    ...props,
    context,
    resolver: zodResolver<Input, Context, Output, Schema>(schema, {
      error: (issue) => {
        if (issue.code === 'invalid_type' && issue.input == null) {
          return { message: 'Required' };
        }
        return undefined;
      },
    }),
  });
};

export type ControlOf<Schema extends z.$ZodType> = Control<
  z.input<Schema> extends infer Input extends FieldValues ? Input : never,
  { schema: Schema },
  z.output<Schema>
>;

/**
 * Just a type helper that can be passed around to help infer the form shape.
 */
export const controlType = <Schema extends z.$ZodType>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  schema: Schema,
): ControlOf<Schema> | undefined => undefined;
