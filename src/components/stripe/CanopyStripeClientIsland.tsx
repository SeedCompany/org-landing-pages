import { ClientStripeWrapper } from './ClientStripeWrapper.tsx';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import type { ReactNode } from 'react';
import { type CanopyDonateProps, CanopyDonationForm } from '../Canopy/CanopyDonationForm.tsx';

export const CanopyStripeClientIsland = ({
  formProps,
  campaignProgress,
}: {
  formProps: CanopyDonateProps;
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
        <CanopyDonationForm campaignProgress={campaignProgress} formProps={formProps} />
      </GoogleReCaptchaProvider>
    </ClientStripeWrapper>
  );
};
