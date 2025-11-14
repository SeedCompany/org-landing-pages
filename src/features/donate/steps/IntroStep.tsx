import { asNonEmptyArray, many } from '@seedcompany/common';
import { useMemo } from 'react';
import { isArray } from 'remeda';
import { z } from 'zod/v4/mini';
import { Form, SubmitButton, useForm } from '~/common/form';
import { CadenceField } from '../fields/CadenceField.tsx';
import { AmountField } from '../fields/AmountField.tsx';
import { GiveByCheck } from '../GiveByCheck.tsx';
import { DonateInput, useDonateSchema } from '../donate.schema.ts';
import { Buttons, type DonateStepProps } from './_util.tsx';

const getShape = (donateInput: typeof DonateInput) =>
  z.pick(donateInput, {
    cadence: true,
    amount: true,
  });

export const IntroStep = ({
  cadence: cadenceProp,
  amount,
  telemetry,
  values,
  onSubmit,
}: DonateStepProps<z.infer<ReturnType<typeof getShape>>>) => {
  const DonateInput = useDonateSchema();
  const Shape = useMemo(() => getShape(DonateInput), [DonateInput]);
  const form = useForm(Shape, { values });
  const lens = form.useLens();

  const cadence = asNonEmptyArray(cadenceProp?.options ? many(cadenceProp.options) : []);
  const showCadence = !cadence || cadence.length !== 1;
  return (
    <Form form={form} onSubmit={onSubmit}>
      {showCadence && (
        <CadenceField lens={lens.focus('cadence')} options={cadence} labels={cadenceProp?.labels} />
      )}
      <AmountField
        lens={lens.focus('amount')}
        presets={
          amount?.presets
            ? isArray(amount.presets)
              ? amount.presets
              : amount.presets[form.getValues('cadence')]
            : undefined
        }
      />
      <Buttons>
        <SubmitButton size="xl">Give Now</SubmitButton>
      </Buttons>
      <GiveByCheck memo={telemetry?.referrer ?? undefined} css={{ alignSelf: 'center', mt: '2' }} />
    </Form>
  );
};
