import { PaymentElement, useElements } from '@stripe/react-stripe-js';
import type { StripePaymentElementOptions } from '@stripe/stripe-js';
import { useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import { css } from 'styled-system/css';
import type { JsxStyleProps } from 'styled-system/types';
import { controlType } from '~/common/form';
import { DonateInput } from '../donate.schema.ts';

const options: StripePaymentElementOptions = {
  layout: 'tabs',
  paymentMethodOrder: ['card', 'apple_pay', 'google_pay'],
};

export const PaymentFields = ({ css: cssProp }: JsxStyleProps) => {
  const elements = useElements();

  const [cadence, amount] = useWatch({
    control: controlType(DonateInput),
    name: ['cadence', 'amount'],
  });
  useEffect(() => {
    elements?.update({
      mode: cadence === 'Monthly' ? 'subscription' : 'payment',
    });
  }, [cadence]);
  useEffect(() => {
    // Constrain to stripe's limits.
    // Out of bound amounts cause stripe to hide the payment fields.
    if (amount && amount > 0 && amount < 1e6) {
      elements?.update({ amount: amount * 100 });
    }
  }, [amount]);

  return <PaymentElement options={options} className={css(cssProp)} />;
};
