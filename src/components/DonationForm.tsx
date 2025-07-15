import { zodResolver } from '@hookform/resolvers/zod';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import type { StripePaymentElementOptions } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { type FieldErrors, useController, useForm } from 'react-hook-form';
import { z } from 'zod';
import { donateSchema } from '../schemaTypes/donate.schema.ts';
import { DonationInput } from './DonationInput.tsx';

type DonateFormValues = z.infer<typeof donateSchema>;

type DonateProps = {
  onSubmit?: () => void;
};

export const DonationForm = (props: DonateProps) => {
  // const [giveAs, setGiveAs] = useState<'Individual' | 'Organization'>('Individual');
  const [isRecurring, setIsRecurring] = useState(false);
  const form = useForm<DonateFormValues>({
    defaultValues: {},
    resolver: zodResolver(donateSchema),
  });

  const stripe = useStripe();
  const elements = useElements();

  // @ts-ignore
  const submitForm = async ({ variables }) => {
    try {
      const response = await fetch('http://localhost:8367/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authentication if needed, e.g.:
          // 'Authorization': `Bearer ${yourToken}`,
        },
        body: JSON.stringify({
          query: `
          mutation Donate($input: DonateInput!) {
            donate(input: $input) {
              intent {
                clientSecret
              }
            }
          }
        `,
          variables,
        }),
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors.map((err) => err.message).join(', '));
      }

      return { data: result.data };
    } catch (error) {
      console.error('Error submitting donation:', error);
      throw error;
    }
  };

  const onSubmit = form.handleSubmit(
    // @ts-expect-error I hate frontend
    async (formData: DonateFormValues) => {
      try {
        if (!elements) {
          console.error('No Stripe Elements found');
          return;
        }
        const { error: submitError } = await elements.submit();
        if (submitError) {
          console.error('Submit Error:', submitError);
          return; // Early return in case of error
        }
        if (!stripe) {
          console.error('stripe not initialized properly');
          return;
        }
        const { error, confirmationToken } = await stripe.createConfirmationToken({
          elements,
          params: {
            return_url: 'https://seedcompany.com/get-involved/thank-you',
          },
        });
        if (error) {
          console.error('Confirmation Token Error:', error);
          return; // Early return in case of error
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { data } = await submitForm({
          variables: {
            input: {
              cadence: 'OneTime',
              investor: {
                firstName: formData.investor.firstName,
                lastName: formData.investor.lastName,
                email: formData.investor.email,
                mailingAddress: {
                  line1: formData.investor.mailingAddress.line1,
                  line2: formData.investor.mailingAddress.line2,
                  city: formData.investor.mailingAddress.city,
                  state: formData.investor.mailingAddress.state,
                  zip: formData.investor.mailingAddress.zip,
                },
                type: 'Individual', // Use state value for Individual/Organization
              },
              payment: {
                stripe: { confirmationToken: confirmationToken.id },
              },
              targets: [
                {
                  amount: parseInt(formData.targets.amount || '75'),
                },
              ],
            },
          },
        });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const clientSecret = data?.donate.intent?.clientSecret;
        if (!clientSecret) {
          console.error('no client secret');
          return;
        }
        const { error: confirmError } = await stripe.confirmPayment({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          clientSecret,
          confirmParams: {
            confirmation_token: confirmationToken.id,
            return_url: 'https://seedcompany.com/get-involved/thank-you/',
          },
        });
        if (confirmError.message) {
          console.error('Confirm Error confirmationToken:', confirmError);
          return; // Early return in case of error
        }
      } catch (err) {
        console.error(err);
      }
    },
    (errors: FieldErrors<DonateFormValues>) => {
      // Handle validation errors here
      console.log('Validation Errors:', errors);
    },
  );

  const firstName = useController({
    control: form.control,
    name: 'investor.firstName',
  });
  const lastName = useController({
    control: form.control,
    name: 'investor.lastName',
  });

  const paymentElementOptions: StripePaymentElementOptions = {
    paymentMethodOrder: ['card', 'apple_pay', 'google_pay'],
  };
  useEffect(() => {
    if (elements) {
      elements.update({
        mode: isRecurring ? 'subscription' : 'payment',
        amount: parseInt(form.getValues('targets.amount') || '75') * 100,
      });
    }
  }, [elements, form, isRecurring]);

  return (
    <div>
      <div>
        <span>Give As:</span>
        <div
        // value={giveAs === 'Individual' ? 0 : 1}
        // onChange={(e) => {
        //   setGiveAs(
        //     // @ts-expect-error instead of creating a custom type, just ignoring for now
        //     e.target.firstChild.textContent,
        //   );
        // }}
        >
          <span>Individual</span>
          <span>Organization</span>
        </div>
        <div>
          <span>One-Time Donation</span>
          {/*<Switch*/}
          {/*  onChange={() => {*/}
          {/*    setIsRecurring(!isRecurring);*/}
          {/*  }}*/}
          {/*/>*/}
          <span>Monthly Gift</span>
        </div>
        <form
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            void onSubmit();
          }}
        >
          <DonationInput
            placeholder="First name"
            error={firstName.fieldState.invalid}
            required
            {...firstName.field}
          />
          <DonationInput
            placeholder="Last name"
            error={lastName.fieldState.invalid}
            required
            {...lastName.field}
          />
          {/*<InvestorGroup form={form} />*/}
          <PaymentElement id="payment-element" options={paymentElementOptions} />
          <button type="submit" disabled={form.formState.isSubmitting}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
