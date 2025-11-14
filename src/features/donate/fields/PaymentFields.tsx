import type { Lens } from '@hookform/lenses';
import { PaymentElement, useElements } from '@stripe/react-stripe-js';
import type { StripePaymentElementOptions } from '@stripe/stripe-js';
import { useEffect } from 'react';
import { useController, useWatch } from 'react-hook-form';
import { css } from 'styled-system/css';
import type { JsxStyleProps } from 'styled-system/types';
import { controlType } from '~/common/form';
import { DonateInput } from '../donate.schema.ts';

const options: StripePaymentElementOptions = {
  layout: 'tabs',
  paymentMethodOrder: ['card', 'apple_pay', 'google_pay'],
};

export const PaymentFields = ({ lens, css: cssProp }: { lens: Lens<boolean> } & JsxStyleProps) => {
  const form = useController(lens.interop());
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

  return (
    <PaymentElement
      options={options}
      onChange={(e) => {
        form.field.onChange(e.complete);
      }}
      className={css(cssProp)}
    />
  );
};
