import type { ComponentProps as PropsOf } from 'react';
import { DonationForm as Form } from './DonationForm.tsx';
import { StripeProvider } from '~/stripe';
import { RecaptchaProvider } from '~/recaptcha';

export { getDonationProps } from './sanity';

export const DonationForm = (props: PropsOf<typeof Form>) => (
  <StripeProvider>
    <RecaptchaProvider>
      <Form {...props} />
    </RecaptchaProvider>
  </StripeProvider>
);
