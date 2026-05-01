import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, type StripeElementsOptions } from '@stripe/stripe-js';
import { useState, useMemo } from 'react';
import type { ReactNode } from 'react';

interface StripeProviderProps {
  children?: ReactNode;
  options?: {
    setup_future_usage?: 'off_session' | 'on_session' | null;
    amount?: number;
    currency?: string;
  };
}

const BASE_OPTIONS: StripeElementsOptions = {
  mode: 'payment',
  amount: 7500,
  currency: 'usd',
  appearance: {
    labels: 'floating',
    variables: {
      colorPrimary: '#28b67e',
      fontFamily: `'Montserrat', ui-sans-serif, system-ui, sans-serif`,
    },
  },
  fonts: [{ cssSrc: 'https://fonts.googleapis.com/css2?family=Montserrat:ital@0;1&display=swap' }],
};

export const StripeProvider = ({ children, options }: StripeProviderProps) => {
  const [lib] = useState(async () => {
    return await loadStripe(import.meta.env.PUBLIC_STRIPE_KEY, {
      developerTools: { assistant: { enabled: import.meta.env.DEV } },
    });
  });

  const mergedOptions = useMemo(
    () => ({
      ...BASE_OPTIONS,
      ...options,
    }),
    [options],
  );

  return (
    <Elements stripe={lib} options={mergedOptions as StripeElementsOptions}>
      {children}
    </Elements>
  );
};
