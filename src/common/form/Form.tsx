import {
  type FieldValues,
  FormProvider,
  type SubmitHandler,
  type UseFormReturn,
} from 'react-hook-form';
import type { ComponentProps, ReactNode } from 'react';

export const Form = <T extends FieldValues, C, TT = T>({
  form,
  onSubmit,
  children,
  className = '',
  ...rest
}: {
  form: UseFormReturn<T, C, TT>;
  onSubmit: SubmitHandler<TT>;
  children: ReactNode;
} & Omit<ComponentProps<'form'>, 'onSubmit'>) => {
  const submit = form.handleSubmit(
    async (values) => {
      try {
        await onSubmit(values);
      } catch (e) {
        console.error(e);
        form.setError('root', { message: (e as Error).message });
      }
    },
    (e) => console.warn('Invalid submission', e),
  );
  return (
    <FormProvider {...form}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form className={`flex flex-col gap-4 ${className}`} onSubmit={submit} {...rest}>
        {children}
      </form>
    </FormProvider>
  );
};
