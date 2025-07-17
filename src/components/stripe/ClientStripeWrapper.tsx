'use client'; // Ensure client-side rendering
import { StripeProvider } from './StripeProvider';

export const ClientStripeWrapper = ({ children }: { children: React.ReactNode }) => {
  return <StripeProvider>{children}</StripeProvider>;
};
