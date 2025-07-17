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
  const [lib] = useState(() => {
    const stripe = loadStripe(import.meta.env.STRIPE_PUBLIC_KEY);
    console.log('Stripe Public Key:', import.meta.env.STRIPE_PUBLIC_KEY); // Debug
    console.log('Stripe Loaded:', !!stripe); // Debug
    return stripe;
  });

  if (!lib) {
    console.error('Stripe failed to load');
    return <div>Loading Stripe...</div>;
  }

  return (
    <Elements stripe={lib} options={elementsOptions}>
      {children}
    </Elements>
  );
};
