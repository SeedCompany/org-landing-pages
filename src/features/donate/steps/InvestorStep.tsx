import { z } from 'zod/v4/mini';
import { Grid } from 'styled-system/jsx';
import { Form, SubmitButton, useForm } from '~/common/form';
import { AddressFields } from '~/features/address';
import { InvestorFields } from '~/features/investor-input';
import { AmountField } from '../fields/AmountField.tsx';
import { DonateInput } from '../donate.schema.ts';
import { BackButton, Buttons, type DonateStepProps } from './_util.tsx';

const Shape = z.pick(DonateInput, {
  amount: true,
  investor: true,
});

export const InvestorStep = ({
  values,
  onBack,
  onSubmit,
}: DonateStepProps<z.infer<typeof Shape>>) => {
  const form = useForm(Shape, { values });
  const lens = form.useLens();

  return (
    <Form form={form} onSubmit={onSubmit}>
      <AmountField lens={lens.focus('amount')} />
      <InvestorFields.Root lens={lens.focus('investor')}>
        <InvestorFields.Type />
        <InvestorFields.Email />
        <InvestorFields.FirstName />
        <InvestorFields.LastName />
        <InvestorFields.Phone />
        <InvestorFields.Address>
          <AddressFields.Line1 />
          <AddressFields.Line2 />
          <AddressFields.City />
          <Grid columns={{ sm: 2 }}>
            <AddressFields.State />
            <AddressFields.ZipCode />
          </Grid>
        </InvestorFields.Address>
      </InvestorFields.Root>
      <Buttons>
        <SubmitButton>Go To Payment</SubmitButton>
        <BackButton onClick={() => onBack(form.getValues())} />
      </Buttons>
    </Form>
  );
};
