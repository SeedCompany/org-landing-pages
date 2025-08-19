import { zodResolver } from '@hookform/resolvers/zod';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import type { StripePaymentElementOptions } from '@stripe/stripe-js';
import { useCallback, useEffect, useState } from 'react';
import { type FieldErrors, useController, useForm } from 'react-hook-form';
import { z } from 'zod';
import { donateSchema } from '../schemaTypes/donate.schema.ts';
import { DonationInput } from './DonationInput.tsx';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { DonationPresets } from './DonationPresets.tsx';
import { RecurringDonationSwitcher } from './RecurringDonationSwitcher.tsx';
import { CampaignGivingInfo } from './CampaignGivingInfo.tsx';
import { DonationButton } from './DonationButton.tsx';

const trailingSlash = (str: string) => (str.endsWith('/') ? str : str + '/');

const GQL_API = new URL('graphql', trailingSlash(import.meta.env.PUBLIC_API_URL));

type DonateFormValues = z.infer<typeof donateSchema>;

// Defining the type for the GraphQL variables
interface DonateInput {
  input: {
    cadence: string;
    investor: {
      firstName: string | null;
      lastName: string;
      email: string;
      mailingAddress: {
        line1: string;
        line2: string | null | undefined;
        city: string;
        state: string;
        zip: string;
        country: string | null;
      };
      type: string;
    };
    payment: {
      stripe: { confirmationToken: string };
    };
    targets: { amount: number }[];
    captcha: {
      v2: string | null;
      v3: string;
    };
    telemetry?: {
      app?: string | null;
      feature?: string | null;
      referrer?: string | null;
      sourceName?: string | null;
      sourceUrl?: string | null;
    };
  };
}

// again defining some graphQL typing to get past errors:
interface GraphQLResponse {
  data?: {
    donate: {
      intent: {
        clientSecret: string;
      };
    };
  };
  errors?: Array<{
    message: string;
    [key: string]: unknown; // Allow for additional error fields
  }>;
}

// more defining of the return type for submitForm
interface SubmitFormResponse {
  data: {
    donate: {
      intent: {
        clientSecret: string;
      };
    };
  };
}

export type DonateProps = {
  hideInvestorType?: 'Individual' | 'Organization';
  enableRecurring?: boolean;
  campaignTotals?: boolean;
  presetAmounts?: { recurring: number[]; oneTime: number[] };
  onSubmit?: () => void;
  telemetry?: {
    app?: string | null;
    feature?: string | null;
    referrer?: string | null;
    sourceName?: string | null;
    sourceUrl?: string | null;
  };
};

export const DonationForm = ({ formProps }: { formProps: DonateProps }) => {
  // this will be used eventually but is not a part of the initial Watermark use case
  // const [giveAs, setGiveAs] = useState<'Individual' | 'Organization'>('Individual');
  const [donationCadence, setDonationCadence] = useState<'OneTime' | 'Monthly'>('OneTime');
  const [amount, setAmount] = useState(1);
  const [donationStep, setDonationStep] = useState<'amount' | 'contact' | 'payment'>('amount');
  const [v3RecaptchaToken, setV3RecaptchaToken] = useState<string | null>(null);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const form = useForm<DonateFormValues>({
    resolver: zodResolver(donateSchema),
    mode: 'onBlur',
  });

  const validateContactInfo = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      setDonationStep('payment');
    } else {
      console.error('Validation errors present - please fix before proceeding');
    }
    return;
  };

  const handleNextClick = () => {
    void validateContactInfo();
  };

  const stripe = useStripe();
  const elements = useElements();

  const handleReCaptcha = useCallback(async () => {
    if (!executeRecaptcha) {
      console.error('reCAPTCHA not loaded yet');
      return;
    }
    try {
      const token = await executeRecaptcha('donate');
      setV3RecaptchaToken(token);
    } catch (error) {
      console.error('Recaptcha error:', error);
    }
  }, [executeRecaptcha]);

  useEffect(() => {
    const initializeRecaptcha = async () => {
      await handleReCaptcha();
    };
    void initializeRecaptcha();
  }, [handleReCaptcha]);

  const submitForm = async ({
    variables,
  }: {
    variables: DonateInput;
  }): Promise<SubmitFormResponse> => {
    try {
      const response = await fetch(GQL_API, {
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

      // squashing this ESLint issue for now as this will go away once we integrate GraphQL into the repo
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const result: GraphQLResponse = await response.json();

      if (result.errors) {
        throw new Error(result.errors.map((err) => err.message).join(', '));
      }

      return { data: result.data as SubmitFormResponse['data'] };
    } catch (error) {
      console.error('Error submitting donation:', error);
      throw error;
    }
  };

  const onSubmit = form.handleSubmit(
    async (formData) => {
      const stripeReturnUrl = window.location.origin + '/thank-you';
      try {
        if (!elements) {
          console.error('No Stripe Elements found');
          return;
        }
        const { error: submitError } = await elements.submit();
        if (submitError) {
          console.error('Submit Error:', submitError);
          return;
        }
        if (!stripe) {
          console.error('stripe not initialized properly');
          return;
        }
        const { error, confirmationToken } = await stripe.createConfirmationToken({
          elements,
          params: {
            return_url: stripeReturnUrl,
          },
        });
        if (error) {
          console.error('Confirmation Token Error:', error);
          return;
        }
        // I think data should be the DonateFormValues type here, but struggling to implement it
        const { data } = await submitForm({
          variables: {
            input: {
              cadence: donationCadence,
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
                  country: 'US', // Assuming US for simplicity, adjust as needed
                },
                type: 'Individual',
              },
              payment: {
                stripe: { confirmationToken: confirmationToken.id },
              },
              targets: [
                {
                  amount: amount,
                },
              ],
              captcha: {
                v2: null,
                v3: v3RecaptchaToken || '',
              },
              telemetry: { ...formProps.telemetry },
            },
          },
        });
        const clientSecret = data?.donate.intent?.clientSecret;
        if (!clientSecret) {
          console.error('no client secret');
          return;
        }
        const { error: confirmError } = await stripe.confirmPayment({
          clientSecret,
          confirmParams: {
            confirmation_token: confirmationToken.id,
            return_url: stripeReturnUrl,
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
      console.error('Validation Errors:', errors);
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
        mode: donationCadence === 'Monthly' ? 'subscription' : 'payment',
        amount: amount * 100,
      });
    }
  }, [elements, form, donationCadence, amount]);

  useEffect(() => {
    console.log('form', form.formState.isSubmitting);
  }, [form]);

  return (
    <div className="my-3">
      {donationStep === 'amount' ? (
        <div className="m-2">
          {formProps.campaignTotals && <CampaignGivingInfo />}
          <RecurringDonationSwitcher
            currentType={donationCadence}
            setDonationType={setDonationCadence}
          />
          <DonationPresets
            presetAmounts={formProps?.presetAmounts}
            setAmount={setAmount}
            recurring={donationCadence === 'Monthly'}
            currentAmount={amount}
          />
          <DonationButton
            onClick={() => {
              setDonationStep('contact');
            }}
            type="button"
            className="w-full"
          >
            Give Now
          </DonationButton>
        </div>
      ) : (
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
          <div
            className={`flex items-center justify-between gap-3 m-2 ${donationStep === 'payment' ? 'hidden' : ''}`}
          >
            <div className="text-sm">
              Input payment details for your{' '}
              {donationCadence === 'Monthly' ? 'monthly' : 'one-time'} gift.{' '}
            </div>
          </div>
          <div className={`m-2 ${donationStep === 'payment' ? 'hidden' : ''}`}>
            <label htmlFor="amount" className="block text-sm/6 font-medium text-gray-900">
              Donation Amount
            </label>
            <div>
              <input
                id="amount"
                type="text"
                required
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value))}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          <form
            onSubmit={(e: React.FormEvent) => {
              e.preventDefault();
              void onSubmit();
            }}
          >
            <DonationInput
              placeholder="First name"
              label="First name"
              error={firstName.fieldState.error}
              hidden={donationStep === 'payment'}
              required
              {...firstName.field}
            />
            <DonationInput
              placeholder="Last name"
              label="Last name"
              error={lastName.fieldState.error}
              hidden={donationStep === 'payment'}
              required
              {...lastName.field}
            />
            <DonationInput
              placeholder="Email"
              label="Email"
              type="email"
              error={email.fieldState.error}
              hidden={donationStep === 'payment'}
              {...email.field}
            />
            <DonationInput
              placeholder="Address Line 1"
              label="Address Line 1"
              error={line1.fieldState.error}
              hidden={donationStep === 'payment'}
              {...line1.field}
            />
            <DonationInput
              placeholder="Address Line 2"
              label="Address Line 2"
              error={line2.fieldState.error}
              hidden={donationStep === 'payment'}
              {...line2.field}
            />
            <DonationInput
              placeholder="City"
              label="City"
              error={city.fieldState.error}
              hidden={donationStep === 'payment'}
              {...city.field}
            />
            <DonationInput
              placeholder="State"
              label="State"
              error={state.fieldState.error}
              hidden={donationStep === 'payment'}
              {...state.field}
            />
            <DonationInput
              placeholder="Zip Code"
              label="Zip Code"
              error={zip.fieldState.error}
              hidden={donationStep === 'payment'}
              {...zip.field}
            />
            {donationStep === 'payment' && (
              <>
                <h2 className="mx-2 mb-5">Select Payment Method and Input Details</h2>
                <PaymentElement
                  className="m-2"
                  id="payment-element"
                  options={paymentElementOptions}
                />
                <div className="grid grid-cols-2">
                  <DonationButton
                    buttonType="secondary"
                    onClick={() => {
                      setDonationStep('contact');
                    }}
                    type="button"
                  >
                    Go Back
                  </DonationButton>
                  <DonationButton isSubmitting={form.formState.isSubmitting} type="submit">
                    Give Now
                  </DonationButton>
                </div>
              </>
            )}
            {donationStep !== 'payment' && (
              <div className="grid grid-cols-2">
                <DonationButton
                  buttonType="secondary"
                  onClick={() => {
                    setDonationStep('amount');
                  }}
                  type="button"
                >
                  Go Back
                </DonationButton>
                <DonationButton onClick={handleNextClick} type="button">
                  Go to Payment
                </DonationButton>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
};
