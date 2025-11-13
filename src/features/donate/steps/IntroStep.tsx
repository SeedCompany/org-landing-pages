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
  presetAmounts,
  telemetry,
  values,
  onSubmit,
}: DonateStepProps<z.infer<typeof Shape>>) => {
  const form = useForm(Shape, { values });
  const lens = form.useLens();

  return (
    <Form form={form} onSubmit={onSubmit}>
      <CadenceField lens={lens.focus('cadence')} />
      <AmountField
        lens={lens.focus('amount')}
        presets={presetAmounts?.[form.getValues('cadence')]}
      />
      <Buttons>
        <SubmitButton>Give Now</SubmitButton>
      </Buttons>
      <GiveByCheck memo={telemetry?.referrer ?? undefined} css={{ alignSelf: 'center' }} />
    </Form>
  );
};
