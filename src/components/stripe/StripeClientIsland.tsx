import { ClientStripeWrapper } from './ClientStripeWrapper.tsx';
import { type DonateProps, DonationForm } from '../DonationForm.tsx';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export const StripeClientIsland = ({ formProps }: { formProps: DonateProps }) => {
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
        <DonationForm formProps={formProps} />
      </GoogleReCaptchaProvider>
    </ClientStripeWrapper>
  );
};
