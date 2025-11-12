import { useLens } from '@hookform/lenses';
import { FormProvider } from 'react-hook-form';
import { styled } from 'styled-system/jsx';
import { stack } from 'styled-system/patterns';
import { type DonationCadence, type Telemetry } from '~/graphql';
import { RecaptchaNotice } from '~/recaptcha';
import { Alert, Button } from '~/common/ui';
import { useForm } from '~/common/form';
import { AddressFields } from '~/features/address';
import { InvestorFields } from '~/features/investor-input';
import { useSubmitDonationFn } from './use-submit-donation-fn.hook.ts';
import { DonateInput } from './donate.schema.ts';
import { GiveByCheck } from './GiveByCheck.tsx';
import { PaymentFields } from './fields/PaymentFields.tsx';
import { CadenceField } from './fields/CadenceField.tsx';
import { AmountField } from './fields/AmountField.tsx';

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

  const onSubmit = form.handleSubmit(
    async ({ amount, ...input }) => {
      console.log('Submitting', { amount, ...input });
      try {
        await submitDonation({
          ...input,
          targets: [{ amount }],
        });
      } catch (e) {
        console.error(e);
        form.setError('root', {
          message: (e as Error).message,
        });
      }
    },
    (errors) => {
      console.warn('Not submitting, because invalid', errors);
    },
  );

  const state = form.formState;
  // can submit if valid, or if a submission has not been tried yet.
  const canSubmit = state.isValid || state.submitCount === 0;

  return (
    <FormProvider {...form}>
      <styled.form onSubmit={(e) => void onSubmit(e)} className={stack({})}>
        {form.formState.errors.root && (
          <Alert.Root status="error">
            <Alert.Indicator />
            <Alert.Content>{form.formState.errors.root.message}</Alert.Content>
          </Alert.Root>
        )}
        <CadenceField lens={lens.focus('cadence')} />
        <AmountField
          lens={lens.focus('amount')}
          presets={presetAmounts[form.getValues('cadence')]}
        />
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
            <AddressFields.State />
            <AddressFields.ZipCode />
          </InvestorFields.Address>
        </InvestorFields.Root>
        <PaymentFields />
        <RecaptchaNotice />
        <GiveByCheck memo={telemetry?.referrer ?? undefined} />
        <Button type="submit" disabled={!canSubmit}>
          Submit
        </Button>
      </styled.form>
    </FormProvider>
  );
};
