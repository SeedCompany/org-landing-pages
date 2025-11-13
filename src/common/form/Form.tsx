import {
  type FieldValues,
  FormProvider,
  type SubmitHandler,
  type UseFormReturn,
} from 'react-hook-form';
import type { ReactNode } from 'react';
import { styled } from 'styled-system/jsx';
import { stack } from 'styled-system/patterns';
import type { JsxStyleProps } from 'styled-system/types';

export const Form = <T extends FieldValues, C, TT = T>({
  form,
  onSubmit,
  children,
  ...rest
}: {
  form: UseFormReturn<T, C, TT>;
  onSubmit: SubmitHandler<TT>;
  children: ReactNode;
  className?: string;
} & JsxStyleProps) => {
  const submit = form.handleSubmit(
    async (values) => {
      try {
        await onSubmit(values);
      } catch (e) {
        console.error(e);
        form.setError('root', {
          message: (e as Error).message,
        });
      }
    },
    (e) => console.warn('Invalid submission', e),
  );
  return (
    <FormProvider {...form}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <StyledForm {...rest} onSubmit={submit}>
        {children}
      </StyledForm>
    </FormProvider>
  );
};

const StyledForm = styled('form', {
  base: stack.raw(),
});
