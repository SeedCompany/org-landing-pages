import { z } from 'zod/v4/mini';
import { type FunctionComponent as Component, useMemo } from 'react';
import { difference } from 'remeda';
import { Grid } from 'styled-system/jsx';
import { Form, SubmitButton, useForm } from '~/common/form';
import { AddressFields } from '~/features/address';
import { InvestorFields } from '~/features/investor-input';
import { AmountField } from '../fields/AmountField.tsx';
import { DonateInput, useDonateSchema } from '../donate.schema.ts';
import { BackButton, Buttons, type DonateStepProps } from './_util.tsx';

const fieldComps: Record<string, Component> = {
  type: InvestorFields.Type,
  email: InvestorFields.Email,
  firstName: InvestorFields.FirstName,
  lastName: InvestorFields.LastName,
  phone: InvestorFields.Phone,
  mailingAddress: Address,
};

function Address() {
  return (
    <InvestorFields.Address>
      <AddressFields.Line1 />
      <AddressFields.Line2 />
      <AddressFields.City />
      <Grid columns={{ sm: 2 }}>
        <AddressFields.State />
        <AddressFields.ZipCode />
      </Grid>
    </InvestorFields.Address>
  );
}

export const InvestorStep = ({
  investor,
  amount,
  values,
  onBack,
  onSubmit,
}: DonateStepProps<Pick<z.infer<typeof DonateInput>, 'amount' | 'investor'>>) => {
  const DonateInput = useDonateSchema();
  const { subShape, components } = useMemo(() => {
    const fields: Array<keyof z.infer<typeof DonateInput>['investor']> = difference(
      investor?.include ?? ['type', 'email', 'firstName', 'lastName', 'phone', 'mailingAddress'],
      investor?.hide ?? [],
    );
    const subShape = z.object({
      amount: DonateInput.shape.amount,
      investor: z.pick(
        DonateInput.shape.investor,
        Object.fromEntries(fields.map((f) => [f, true] as const)),
      ),
    });

    const components = fields.map((field) => ({ field, Comp: fieldComps[field]! }));
    return { subShape, components };
  }, [investor, DonateInput]);

  const form = useForm(subShape, { values });
  const lens = form.useLens();

  return (
    <Form form={form} onSubmit={onSubmit}>
      {!amount?.hideOther && <AmountField lens={lens.focus('amount')} />}
      <InvestorFields.Root lens={lens.focus('investor')}>
        {components.map(({ field, Comp }) => (
          <Comp key={field} />
        ))}
      </InvestorFields.Root>
      <Buttons>
        <SubmitButton>Go To Payment</SubmitButton>
        <BackButton onClick={() => onBack(form.getValues())} />
      </Buttons>
    </Form>
  );
};
