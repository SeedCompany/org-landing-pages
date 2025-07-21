import { zodResolver } from '@hookform/resolvers/zod';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import type { StripePaymentElementOptions } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { type FieldErrors, useController, useForm } from 'react-hook-form';
import { z } from 'zod';
import { donateSchema } from '../schemaTypes/donate.schema.ts';
import { DonationInput } from './DonationInput.tsx';

type DonateFormValues = z.infer<typeof donateSchema>;

export type DonateProps = {
  hideInvestorType?: 'Individual' | 'Organization';
  enableRecurring?: boolean;
  onSubmit?: () => void;
};

export const DonationForm = ({ formProps }: { formProps: DonateProps }) => {
  const [giveAs, setGiveAs] = useState<'Individual' | 'Organization'>('Individual');
  const [isRecurring, setIsRecurring] = useState(false);
  const form = useForm<DonateFormValues>({
    defaultValues: {},
    resolver: zodResolver(donateSchema),
  });

  const stripe = useStripe();
  const elements = useElements();

  // @ts-expect-error I dunno what message to put
  const submitForm = async ({ variables }) => {
    console.log(variables);
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
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          variables,
        }),
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const result = await response.json();

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (result.errors) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
        throw new Error(result.errors.map((err) => err.message).join(', '));
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      return { data: result.data };
    } catch (error) {
      console.error('Error submitting donation:', error);
      throw error;
    }
  };

  const onSubmit = form.handleSubmit(
    // @ts-expect-error I hate frontend
    async (formData: DonateFormValues) => {
      console.log(formData);
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
                  amount: formData.targets.amount || 75,
                },
              ],
            },
          },
        });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
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
  const email = useController({
    control: form.control,
    name: 'investor.email',
  });
  const line1 = useController({
    control: form.control,
    name: 'investor.mailingAddress.line1',
  });
  const line2 = useController({
    control: form.control,
    name: 'investor.mailingAddress.line2',
  });
  const city = useController({
    control: form.control,
    name: 'investor.mailingAddress.city',
  });
  const state = useController({
    control: form.control,
    name: 'investor.mailingAddress.state',
  });
  const zip = useController({
    control: form.control,
    name: 'investor.mailingAddress.zip',
  });

  const paymentElementOptions: StripePaymentElementOptions = {
    paymentMethodOrder: ['card', 'apple_pay', 'google_pay'],
  };
  useEffect(() => {
    if (elements) {
      elements.update({
        mode: isRecurring ? 'subscription' : 'payment',
        amount: (form.getValues('targets.amount') || 75) * 100,
      });
    }
  }, [elements, form, isRecurring]);

  return (
    <div>
      <div>
        {!formProps.hideInvestorType && (
          <>
            <span>Give As:</span>
            {/* this needs to be a selector */}
            <div>
              <span>Individual</span>
              <span>Organization</span>
            </div>
          </>
        )}
        {formProps.enableRecurring && (
          <>
            <div className="flex items-center justify-between gap-3">
              <div className="group relative inline-flex w-11 shrink-0 rounded-full bg-gray-200 p-0.5 outline-offset-2 outline-indigo-600 ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out has-[:checked]:bg-indigo-600 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 dark:bg-white/5 dark:outline-indigo-500 dark:ring-white/10 dark:has-[:checked]:bg-indigo-500">
                <span className="size-5 rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out group-has-[:checked]:translate-x-5" />
                <input
                  id="recurring"
                  name="recurring"
                  type="checkbox"
                  aria-labelledby="recurring-label"
                  aria-describedby="recurring-description"
                  className="absolute inset-0 appearance-none focus:outline-none"
                />
              </div>

              <div className="text-sm">
                <label id="recurring-label" className="font-medium text-gray-900">
                  Make this a recurring donation?
                </label>
                <span id="recurring-description" className="text-gray-500"></span>
              </div>
            </div>
            {/*<div>*/}
            {/*  /!* this also needs to be a switch *!/*/}
            {/*  <span>One-Time Donation</span>*/}
            {/*  <span>Monthly Gift</span>*/}
            {/*</div>*/}
          </>
        )}
        <form
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            void onSubmit();
          }}
        >
          <DonationInput
            placeholder="First name"
            label="First name"
            error={firstName.fieldState.invalid}
            required
            {...firstName.field}
          />
          <DonationInput
            placeholder="Last name"
            label="Last name"
            error={lastName.fieldState.invalid}
            required
            {...lastName.field}
          />
          <DonationInput
            placeholder="Email"
            label="Email"
            type="email"
            error={email.fieldState.invalid}
            {...email.field}
          />
          <DonationInput
            placeholder="Address Line 1"
            label="Address Line 1"
            error={line1.fieldState.invalid}
            {...line1.field}
          />
          <DonationInput
            placeholder="Address Line 2"
            label="Address Line 2"
            error={line2.fieldState.invalid}
            {...line2.field}
          />
          <DonationInput
            placeholder="City"
            label="City"
            error={city.fieldState.invalid}
            {...city.field}
          />
          <DonationInput
            placeholder="State"
            label="State"
            fieldName="state"
            error={state.fieldState.invalid}
            {...state.field}
          />
          <DonationInput
            placeholder="Zip Code"
            label="Zip Code"
            error={zip.fieldState.invalid}
            {...zip.field}
          />
          <PaymentElement id="payment-element" options={paymentElementOptions} />
          <button type="submit" disabled={form.formState.isSubmitting}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
