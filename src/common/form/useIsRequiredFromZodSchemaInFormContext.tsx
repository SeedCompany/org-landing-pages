import { useFormContext } from 'react-hook-form';
import { z } from 'zod/v4/mini';
import { useMemo } from 'react';

export const useIsRequiredFromZodSchemaInFormContext = (name: string) => {
  const form = useFormContext();
  return useMemo(() => {
    const { schema } = form.control._options.context as { schema: z.ZodMiniObject };
    const fieldSchema = name
      .split('.')
      .reduce((schema, key) => schema.def.shape[key] as z.ZodMiniObject, schema) as z.ZodMiniType;
    return fieldSchema.def.type !== 'optional' && fieldSchema._zod.def.type !== 'nullable';
  }, [form, name]);
};
