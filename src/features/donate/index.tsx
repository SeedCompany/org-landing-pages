import { DonationForm as Form, type DonateFormProps } from './DonationForm.tsx';
import { StripeProvider } from '~/stripe';
import { RecaptchaProvider } from '~/recaptcha';
import { useMemo } from 'react';

export { getDonationProps } from './sanity';

export const DonationForm = (props: DonateFormProps) => {
  const stripeOptions = useMemo(
    () =>
      props.cadence?.options === 'Monthly' ? { setup_future_usage: 'off_session' as const } : {},
    [props.cadence?.options],
  );
  return (
    <RecaptchaProvider>
      <StripeProvider options={stripeOptions}>
        <Form {...props} />
      </StripeProvider>
    </RecaptchaProvider>
  );
};
