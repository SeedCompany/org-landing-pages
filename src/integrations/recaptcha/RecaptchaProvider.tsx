import { type ReactNode, useCallback } from 'react';
import {
  ReCaptchaProvider as Provider,
  useReCaptcha as useInstance,
} from '@wojtekmaj/react-recaptcha-v3';

interface ChildrenProp {
  children?: ReactNode | undefined;
}

export const RecaptchaProvider = ({ children }: ChildrenProp) => (
  <Provider
    reCaptchaKey={import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY}
    scriptProps={{
      async: true,
      defer: true,
      appendTo: 'head',
    }}
  >
    {children}
  </Provider>
);

export const useCaptchaAction = (action: string) => {
  const ctx = useInstance();
  return useCallback(() => ctx.executeRecaptcha?.(action), [ctx, action]);
};
