import { Grid } from 'styled-system/jsx';
import { z } from 'zod/v4/mini';
import { type DonationCadence, type Telemetry } from '~/graphql';
import { RecaptchaNotice } from '~/recaptcha';
import { useForm, SubmitButton, SubmitError, Form } from '~/common/form';
import { AddressFields } from '~/features/address';
import { InvestorFields } from '~/features/investor-input';
import { useSubmitDonationFn } from './use-submit-donation-fn.hook.ts';
import { DonateInput } from './donate.schema.ts';
import { GiveByCheck } from './GiveByCheck.tsx';
import { PaymentFields } from './fields/PaymentFields.tsx';
import { CadenceField } from './fields/CadenceField.tsx';
import { AmountField } from './fields/AmountField.tsx';

type DonationInput = z.infer<typeof DonateInput>;

export type DonateFormProps = {
  presetAmounts: Record<DonationCadence, number[]>;
  telemetry?: Telemetry;
};

export const DonationForm = ({ presetAmounts, telemetry }: DonateFormProps) => {
  const form = useForm(DonateInput, {
    mode: 'onTouched',
    defaultValues: {
      cadence: 'OneTime',
      investor: {
        type: 'Individual',
        mailingAddress: {
          // Assuming US for simplicity, adjust as needed
          country: 'US',
        },
      },
    },
  });
  const lens = useLens({ control: form.control });

  const { submit: submitDonation } = useSubmitDonationFn({
    telemetry,
    returnUrl: '/thank-you',
  });

  const onSubmit = async ({
    // Ignored, just for validation handling
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    paymentComplete: _,
    amount,
    ...input
  }: DonationInput) => {
    console.log('Submitting', { amount, ...input });
    await submitDonation({
      ...input,
      targets: [{ amount }],
    });
  };

  return (
    <Form form={form} onSubmit={onSubmit}>
      <SubmitError />
      <CadenceField lens={lens.focus('cadence')} />
      <AmountField lens={lens.focus('amount')} presets={presetAmounts[form.getValues('cadence')]} />
      <InvestorFields.Root lens={lens.focus('investor')}>
        <InvestorFields.Type />
        <InvestorFields.Email />
        <InvestorFields.FirstName />
        <InvestorFields.LastName />
        <InvestorFields.Phone />
        <InvestorFields.Address>
          <AddressFields.Line1 />
          <AddressFields.Line2 />
          <AddressFields.City />
          <Grid columns={{ sm: 2 }}>
            <AddressFields.State />
            <AddressFields.ZipCode />
          </Grid>
        </InvestorFields.Address>
      </InvestorFields.Root>
      <PaymentFields lens={lens.focus('paymentComplete')} />
      <RecaptchaNotice />
      <GiveByCheck memo={telemetry?.referrer ?? undefined} />
      <SubmitButton />
    </Form>
  );
};
