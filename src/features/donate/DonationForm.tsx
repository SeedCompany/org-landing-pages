import { many, type Many } from '@seedcompany/common';
import {
  type FunctionComponent as Component,
  type ReactNode,
  useReducer,
  useRef,
  useState,
} from 'react';
import { pickBy } from 'remeda';
import { Stack, styled } from 'styled-system/jsx';
import type { PartialDeep } from 'type-fest';
import { z } from 'zod/v4/mini';
import { type DonationCadence as Cadence, type DonationIntent, type Telemetry } from '~/graphql';
import { useSubmitDonationFn } from './use-submit-donation-fn.hook.ts';
import { DonateInput, DonateSchemaProvider } from './donate.schema.ts';
import type { DonateStepProps } from './steps/_util.tsx';
import { IntroStep } from './steps/IntroStep.tsx';
import { InvestorStep } from './steps/InvestorStep.tsx';
import { PaymentStep } from './steps/PaymentStep.tsx';

type DonateInput = z.infer<typeof DonateInput>;

export type DonateCommonProps = {
  cadence?: {
    /**
     * Which cadence options should be shown?
     * The default value is the first item given.
     * If there is only one option, the field is hidden in the form.
     *
     * @example only one-time
     * cadence: 'OneTime'
     */
    options?: Many<Cadence>;
    labels?: Record<Cadence, string>;
  };

  /**
   * Amount input customization.
   */
  amount?: {
    /**
     * A custom minimum value & the message to show when it's not met.
     */
    min?: { value: number; message: string };
  };

  /**
   * Amount preset buttons to show.
   * Optionally vary by cadence.
   */
  presetAmounts?: number[] | Record<Cadence, number[]>;

  /** Customize Investor fields */
  investor?: {
    /** Default values. */
    defaults?: PartialDeep<DonateInput['investor']>;
    /** A custom-ordered list of fields to show */
    include?: ReadonlyArray<keyof DonateInput['investor']>;
    /** Hide these fields. Useful to override defaults. Takes precedence over `include`. */
    hide?: ReadonlyArray<keyof DonateInput['investor']>;
  };

  intent?: DonationIntent;
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
  const [state, setState] = useState<DonateInput>(() => ({
    cadence: (props.cadence?.options ? many(props.cadence.options) : undefined)?.at(0) ?? 'OneTime',
    amount: 0,
    investor: {
      type: 'Individual',
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      ...pickBy(props.investor?.defaults ?? {}, (v) => v != null),
      mailingAddress: {
        line1: '',
        line2: '',
        city: '',
        state: '',
        zip: '',
        country: 'US',
        ...pickBy(props.investor?.defaults?.mailingAddress ?? {}, (v) => v != null),
      },
    },
    paymentComplete: false,
  }));
  const [schema] = useState(() => {
    const { amount, ...rest } = DonateInput.shape;
    return z.object({
      ...rest,
      amount: props.amount?.min
        ? amount.clone({
            ...amount.def,
            checks: [
              // Cloned() to put this check before the default ones.
              // That way we don't say "min is $1...no wait actually its $200"
              z.minimum(props.amount.min.value, props.amount.min.message),
              ...(amount.def.checks ?? []),
            ],
          })
        : amount,
    });
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
      targets: [{ amount, intent: props.intent }],
    });
  };

  const formRef = useRef<HTMLDivElement>(null);
  const scrollToTop = () =>
    formRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });

  const [step, setStep] = useReducer((prev, next: Step | number) => {
    if (typeof next !== 'number') {
      return next;
    }
    const nextIndex = Math.max(0, Math.min(steps.length - 1, steps.indexOf(prev) + next));
    return steps[nextIndex]!;
  }, steps[0]!);

  const stepProps: StepProps = {
    ...props,
    values: state,
    onBack: (dirtyState?: Partial<DonateInput>) => {
      if (dirtyState) {
        setState((prev) => ({ ...prev, ...dirtyState }));
      }
      setStep(-1);
      scrollToTop();
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
      scrollToTop();
    },
  };

  return (
    <DonateSchemaProvider value={schema}>
      <Stack
        data-scope="donate-form"
        data-step={step}
        ref={formRef}
        css={{ scrollMarginTop: '10' }}
      >
        {props.before}
        {Object.entries(declareSteps).map(([key, Component]) => {
          const hideStep = key !== step;
          return (
            <styled.div
              key={key}
              // force DOM to draw layout for all steps
              // this allows stripe elements to show correctly without
              // "popping in" when the step is first shown
              css={
                hideStep
                  ? {
                      position: 'absolute',
                      visibility: 'hidden',
                      pointerEvents: 'none',
                      insetY: '0',
                      overflow: 'hidden',
                    }
                  : {}
              }
              aria-hidden={hideStep ? true : undefined}
              tabIndex={hideStep ? -1 : undefined}
            >
              <Component {...stepProps} />
            </styled.div>
          );
        })}
        {props.after}
      </Stack>
    </DonateSchemaProvider>
  );
};
