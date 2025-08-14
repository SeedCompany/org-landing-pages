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
};

export const StripeProvider = ({ children }: ChildrenProp) => {
  const [lib] = useState(async () => {
    return await loadStripe(import.meta.env.PUBLIC_STRIPE_PUBLIC_KEY);
  });

  return (
    <Elements stripe={lib} options={elementsOptions}>
      {children}
    </Elements>
  );
};
