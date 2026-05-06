import { many } from '@seedcompany/common';
import type { ComponentProps as PropsOf } from 'react';
import { DonationForm as Form } from './DonationForm.tsx';
import { StripeProvider } from '~/stripe';
import { RecaptchaProvider } from '~/recaptcha';

export { getDonationProps } from './sanity';

export const DonationForm = (props: PropsOf<typeof Form>) => {
  const initialCadence =
    (props.cadence?.options ? many(props.cadence.options) : undefined)?.at(0) ?? 'OneTime';
  return (
    <StripeProvider initialMode={initialCadence === 'Monthly' ? 'subscription' : 'payment'}>
      <RecaptchaProvider>
        <Form {...props} />
      </RecaptchaProvider>
    </StripeProvider>
  );
};
