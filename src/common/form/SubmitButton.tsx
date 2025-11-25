import type { ComponentProps } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '~/common/ui';

export const SubmitButton = ({ children, ...props }: ComponentProps<typeof Button>) => {
  const { formState: state } = useFormContext();

  // can submit if valid, or if a submission has not been tried yet.
  const canSubmit = state.isValid || state.submitCount === 0;

  return (
    <Button
      {...props}
      type="submit"
      disabled={props.disabled ?? !canSubmit}
      loading={props.loading ?? state.isSubmitting}
    >
      {children ?? 'Submit'}
    </Button>
  );
};
