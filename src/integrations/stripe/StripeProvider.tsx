import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, type StripeElementsOptions } from '@stripe/stripe-js';
import { useState } from 'react';
import type { ReactNode } from 'react';

interface ChildrenProp {
  children?: ReactNode | undefined;
}

const elementsOptions: StripeElementsOptions = {
  mode: 'payment',
  amount: 7500,
  currency: 'usd',
  appearance: {
    variables: {
      fontFamily: [
        `'Montserrat'`,
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ].join(', '),
    },
  },
  fonts: [
    {
      // This seems like the easiest way to get the font to load 3rd party.
      // Since currently we bundle the font & don't have hosted static url we can use.
      // or even a dynamic one we can reference here & have it work in vite dev.
      // This does mean that the user will have to load two different versions of this font.
      cssSrc: 'https://fonts.googleapis.com/css2?family=Montserrat:ital@0;1&display=swap',
    },
  ],
};

export const StripeProvider = ({ children }: ChildrenProp) => {
  const [lib] = useState(async () => {
    return await loadStripe(import.meta.env.PUBLIC_STRIPE_KEY);
  });

  return (
    <Elements stripe={lib} options={elementsOptions}>
      {children}
    </Elements>
  );
};
