import type { ComponentProps as PropsOf } from 'react';
import { RecaptchaProvider } from '~/recaptcha';
import { StripeProvider } from '~/stripe';
import { DonationForm as DonationFormOld } from './DonationForm.tsx';
import { DonationForm } from '~/features/donate/DonationForm.tsx';

export const DonationFormIsland = (props: PropsOf<typeof DonationFormOld>) => (
  <StripeProvider>
    <RecaptchaProvider>
      <DonationFormOld {...props} />
    </RecaptchaProvider>
  </StripeProvider>
);

export const DonationFormIsland2 = (props: PropsOf<typeof DonationForm>) => (
  <StripeProvider>
    <RecaptchaProvider>
      <DonationForm {...props} />
    </RecaptchaProvider>
  </StripeProvider>
);
