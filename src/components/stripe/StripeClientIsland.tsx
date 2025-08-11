import { ClientStripeWrapper } from './ClientStripeWrapper.tsx';
import { type DonateProps, DonationForm } from '../DonationForm.tsx';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

// TODO - remove the key
const RECAPTCHA_KEY = '6Ld99uUUAAAAAFC2zFV9A2ifvQnZirPaL9tBcM5v';

export const StripeClientIsland = ({ formProps }: { formProps: DonateProps }) => {
  return (
    <ClientStripeWrapper>
      <GoogleReCaptchaProvider
        reCaptchaKey={RECAPTCHA_KEY}
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
