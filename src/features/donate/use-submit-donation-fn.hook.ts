import { useElements, useStripe } from '@stripe/react-stripe-js';
import { useCallback } from 'react';
import {
  type DonateInput,
  graphql,
  graphqlClient,
  type Telemetry,
  type VariablesOf,
} from '~/graphql';
import { useCaptchaAction } from '~/recaptcha';

type DonateFormInput = Omit<DonateInput, 'payment' | 'captcha' | 'telemetry'>;

/**
 * Orchestrates submitting a donation with Stripe, Recaptcha, and our GraphQL API.
 * This throws in case of error.
 */
export const useSubmitDonationFn = ({
  returnUrl,
  telemetry,
}: {
  returnUrl: string;
  telemetry?: Telemetry;
}) => {
  const getCaptchaToken = useCaptchaAction('donate');

  const stripe = useStripe();
  const elements = useElements();

  const submit = useCallback(
    async (input: DonateFormInput) => {
      if (!stripe) {
        throw new Error('Stripe was not initialized properly');
      }
      if (!elements) {
        throw new Error('No Stripe Elements found');
      }

      const { error: submitError } = await elements.submit();
      if (submitError) {
        throw Object.assign(new Error(), submitError);
      }
      const { error, confirmationToken } = await stripe.createConfirmationToken({ elements });
      if (error) {
        throw Object.assign(new Error(), error);
      }

      let captchaToken;
      try {
        captchaToken = await getCaptchaToken();
      } catch (error) {
        console.error('Recaptcha error:', error);
        // Continue on without a captcha token, because maybe the API is configured to not require it
      }

      const donation = await createDonation({
        ...input,
        payment: {
          stripe: {
            confirmationToken: confirmationToken.id,
          },
        },
        captcha: { v3: captchaToken },
        telemetry,
      });
      const clientSecret = donation.intent?.clientSecret;
      if (!clientSecret) {
        console.warn('No intent secret given, assuming donation successful');
        return;
      }

      const { error: confirmError } = await stripe.confirmPayment({
        clientSecret,
        confirmParams: {
          confirmation_token: confirmationToken.id,
          return_url: window.location.origin + returnUrl,
        },
      });
      if (confirmError.message) {
        console.error('Stripe confirmation failed:', confirmError);
        throw Object.assign(new Error(), confirmError);
      }
    },
    [stripe, elements, returnUrl, getCaptchaToken, telemetry],
  );

  return { submit };
};

const createDonation = async (input: VariablesOf<typeof DonateDoc>['input']) => {
  try {
    const { error, data } = await graphqlClient.mutation(DonateDoc, { input }).toPromise();
    if (error) {
      throw error;
    }
    return data!.donate;
  } catch (error) {
    // TODO figure out if URQL throws.
    console.error('Error submitting donation:', error);
    throw error;
  }
};
const DonateDoc = graphql(`
  mutation Donate($input: DonateInput!) {
    donate(input: $input) {
      intent {
        clientSecret
      }
    }
  }
`);
