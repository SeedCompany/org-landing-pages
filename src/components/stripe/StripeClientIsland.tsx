import { ClientStripeWrapper } from './ClientStripeWrapper.tsx';
import { type DonateProps, DonationForm } from '../DonationForm.tsx';

export const StripeClientIsland = ({ formProps }: { formProps: DonateProps }) => {
  return (
    <ClientStripeWrapper>
      <DonationForm formProps={formProps} />
    </ClientStripeWrapper>
  );
};
