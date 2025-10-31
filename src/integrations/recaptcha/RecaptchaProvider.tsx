import type { ReactNode } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

interface ChildrenProp {
  children?: ReactNode | undefined;
}

export const RecaptchaProvider = ({ children }: ChildrenProp) => (
  <GoogleReCaptchaProvider
    reCaptchaKey={import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY}
    scriptProps={{
      async: true,
      defer: true,
      appendTo: 'head',
    }}
  >
    {children}
  </GoogleReCaptchaProvider>
);
