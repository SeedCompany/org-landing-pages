import { asNonEmptyArray, many } from '@seedcompany/common';
import { z } from 'zod/v4/mini';
import { Form, SubmitButton, useForm } from '~/common/form';
import { CadenceField } from '../fields/CadenceField.tsx';
import { AmountField } from '../fields/AmountField.tsx';
import { GiveByCheck } from '../GiveByCheck.tsx';
import { DonateInput } from '../donate.schema.ts';
import { Buttons, type DonateStepProps } from './_util.tsx';

const Shape = z.pick(DonateInput, {
  cadence: true,
  amount: true,
});

export const IntroStep = ({
  cadence: cadenceProp,
  presetAmounts,
  telemetry,
  values,
  onSubmit,
}: DonateStepProps<z.infer<typeof Shape>>) => {
  const form = useForm(Shape, { values });
  const lens = form.useLens();

  const cadence = asNonEmptyArray(cadenceProp ? many(cadenceProp) : []);
  const showCadence = !cadence || cadence.length !== 1;
  return (
    <Form form={form} onSubmit={onSubmit}>
      {showCadence && <CadenceField lens={lens.focus('cadence')} options={cadence} />}
      <AmountField
        lens={lens.focus('amount')}
        presets={
          presetAmounts
            ? Array.isArray(presetAmounts)
              ? presetAmounts
              : presetAmounts[form.getValues('cadence')]
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
