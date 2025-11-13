import { type FunctionComponent as Component, type ReactNode, useReducer, useState } from 'react';
import { Stack, styled } from 'styled-system/jsx';
import { z } from 'zod/v4/mini';
import { type DonationCadence, type Telemetry } from '~/graphql';
import { useSubmitDonationFn } from './use-submit-donation-fn.hook.ts';
import { DonateInput } from './donate.schema.ts';
import type { DonateStepProps } from './steps/_util.tsx';
import { IntroStep } from './steps/IntroStep.tsx';
import { InvestorStep } from './steps/InvestorStep.tsx';
import { PaymentStep } from './steps/PaymentStep.tsx';

type DonateInput = z.infer<typeof DonateInput>;

export type DonateCommonProps = {
  presetAmounts?: Record<DonationCadence, number[]>;
  telemetry?: Telemetry;
};

export type DonateFormProps = DonateCommonProps & {
  before?: ReactNode;
  after?: ReactNode;
};

const declareSteps = {
  intro: IntroStep,
  investor: InvestorStep,
  payment: PaymentStep,
} satisfies Record<string, StepComponent>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StepProps = DonateStepProps<any>;
type StepComponent = Component<StepProps>;
type Step = keyof typeof declareSteps;
const steps = Object.keys(declareSteps) as Step[];

export const DonationForm = (props: DonateFormProps) => {
  const [state, setState] = useState<DonateInput>({
    cadence: 'OneTime',
    amount: 0,
    investor: {
      type: 'Individual',
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      mailingAddress: {
        line1: '',
        line2: '',
        city: '',
        state: '',
        zip: '',
        country: 'US',
      },
    },
    paymentComplete: false,
  });

  const { submit: submitDonation } = useSubmitDonationFn({
    telemetry: props.telemetry,
    returnUrl: '/thank-you',
  });

  const onSubmit = async ({
    // Ignored, just for validation handling
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    paymentComplete: _,
    amount,
    ...input
  }: DonateInput) => {
    console.log('Submitting', { amount, ...input });
    await submitDonation({
      ...input,
      targets: [{ amount }],
    });
  };

  const [step, setStep] = useReducer((prev, next: Step | number) => {
    if (typeof next !== 'number') {
      return next;
    }
    const stepList = Object.keys(declareSteps) as Step[];
    const idx = Math.max(0, Math.min(stepList.length - 1, stepList.indexOf(prev) + next));
    return stepList[idx]!;
  }, steps[0]!);

  const stepProps: StepProps = {
    ...props,
    values: state,
    onBack: (dirtyState?: Partial<DonateInput>) => {
      if (dirtyState) {
        setState((prev) => ({ ...prev, ...dirtyState }));
      }
      setStep(-1);
    },
    onSubmit: async (next: Partial<DonateInput>) => {
      const isLast = step === steps.at(-1);
      if (isLast) {
        // Must await submission here, before state change.
        // state change causes form to re-render with new values,
        // which negates awaiting the submission & showing the spinner.
        await onSubmit({ ...state, ...next });
      }
      setState((prev) => ({ ...prev, ...next }));
      setStep(+1);
    },
  };

  return (
    <Stack data-scope="donate-form" data-step={step}>
      {props.before}
      {Object.entries(declareSteps).map(([key, Component]) => (
        <styled.div key={key} hidden={key !== step ? true : undefined}>
          <Component {...stepProps} />
        </styled.div>
      ))}
      {props.after}
    </Stack>
  );
};
