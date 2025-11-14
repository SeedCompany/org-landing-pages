import { useMemo } from 'react';
import { z } from 'zod/v4/mini';
import { Form, SubmitButton, SubmitError, useForm } from '~/common/form';
import { RecaptchaNotice } from '~/recaptcha';
import { DonateInput, useDonateSchema } from '../donate.schema.ts';
import { PaymentFields } from '../fields/PaymentFields.tsx';
import { BackButton, Buttons, type DonateStepProps } from './_util.tsx';

const getShape = (donateInput: typeof DonateInput) =>
  z.pick(donateInput, {
    paymentComplete: true,
    // Stripe needs these two fields to inform its UI
    amount: true,
    cadence: true,
  });

export const PaymentStep = ({
  values,
  onBack,
  onSubmit,
}: DonateStepProps<z.infer<ReturnType<typeof getShape>>>) => {
  const DonateInput = useDonateSchema();
  const Shape = useMemo(() => getShape(DonateInput), [DonateInput]);

  const form = useForm(Shape, { values });
  const lens = form.useLens();

  return (
    <Form form={form} onSubmit={onSubmit}>
      <p>
        Giving {USD.format(values.amount)} {values.cadence === 'Monthly' ? 'monthly' : 'today'}
      </p>

      <SubmitError />

      <PaymentFields lens={lens.focus('paymentComplete')} />
      <Buttons>
        <SubmitButton>Give Now</SubmitButton>
        <BackButton onClick={() => onBack()} />
      </Buttons>
      <RecaptchaNotice css={{ mt: '3' }} />
    </Form>
  );
};

const USD = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});
