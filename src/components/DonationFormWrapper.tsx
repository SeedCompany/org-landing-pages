import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { DonationForm, type DonateProps } from './DonationForm';
import { type ReactNode } from 'react';

const stripePromise = loadStripe(import.meta.env.PUBLIC_STRIPE_KEY);

interface DonationFormWrapperProps {
  formProps: DonateProps;
  campaignProgress?: ReactNode;
  disableDialog?: boolean;
}

export const DonationFormWrapper = ({ formProps, campaignProgress, disableDialog }: DonationFormWrapperProps) => {
  const options = {
    mode: 'payment' as const,
    amount: 100, 
    currency: 'usd',
    appearance: {
      theme: 'stripe' as const,
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <DonationForm 
        formProps={formProps}
        campaignProgress={campaignProgress}
        disableDialog={disableDialog}
      />
    </Elements>
  );
};