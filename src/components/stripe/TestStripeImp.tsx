import React from 'react';
import { PaymentElement } from '@stripe/react-stripe-js';

export const TestStripeImp = () => {
  return (
    <div>
      <h2>Test Stripe Element</h2>
      <PaymentElement />
    </div>
  );
};
