import type { ComponentProps as PropsOf } from 'react';
import { RecaptchaProvider } from '~/recaptcha';
import { StripeProvider } from '~/stripe';
import { DonationForm } from './DonationForm.tsx';

export const DonationFormIsland = (props: PropsOf<typeof DonationForm>) => (
  <StripeProvider>
    <RecaptchaProvider>
      <DonationForm {...props} />
    </RecaptchaProvider>
  </StripeProvider>
);
