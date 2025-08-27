import { ClientStripeWrapper } from './ClientStripeWrapper.tsx';
import { type DonateProps, DonationForm } from '../DonationForm.tsx';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import type { ReactNode } from 'react';

export const StripeClientIsland = ({
  formProps,
  campaignProgress,
}: {
  formProps: DonateProps;
  campaignProgress?: ReactNode;
}) => {
  return (
    <ClientStripeWrapper>
      <GoogleReCaptchaProvider
        reCaptchaKey={import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY}
        scriptProps={{
          async: true,
          defer: true,
          appendTo: 'head',
        }}
      >
        <DonationForm campaignProgress={campaignProgress} formProps={formProps} />
      </GoogleReCaptchaProvider>
    </ClientStripeWrapper>
  );
};
