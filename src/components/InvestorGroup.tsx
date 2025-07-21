import { useController, type UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import type { donateSchema } from '../schemaTypes/donate.schema.ts';
import { DonationInput } from './DonationInput.tsx';

type DonateFormValues = z.infer<typeof donateSchema>;

interface InvestorGroupProps {
  form: UseFormReturn<DonateFormValues>;
}

export const InvestorGroup = (props: InvestorGroupProps) => {
  const email = useController({
    control: props.form.control,
    name: 'investor.email',
  });
  const line1 = useController({
    control: props.form.control,
    name: 'investor.mailingAddress.line1',
  });
  const line2 = useController({
    control: props.form.control,
    name: 'investor.mailingAddress.line2',
  });
  const city = useController({
    control: props.form.control,
    name: 'investor.mailingAddress.city',
  });
  const state = useController({
    control: props.form.control,
    name: 'investor.mailingAddress.state',
  });
  const zip = useController({
    control: props.form.control,
    name: 'investor.mailingAddress.zip',
  });
  return (
    <>
      <DonationInput
        placeholder="Email"
        label="Email"
        fieldName="email"
        type="email"
        error={email.fieldState.invalid}
        {...email.field}
      />
      <DonationInput
        placeholder="Address Line 1"
        label="Address Line 1"
        fieldName="line1"
        error={line1.fieldState.invalid}
        {...line1.field}
      />
      <DonationInput
        placeholder="Address Line 2"
        label="Address Line 2"
        fieldName="line2"
        error={line2.fieldState.invalid}
        {...line2.field}
      />
      <DonationInput
        placeholder="City"
        label="City"
        fieldName="city"
        error={city.fieldState.invalid}
        {...city.field}
      />
      <DonationInput
        placeholder="State"
        label="State"
        fieldName="state"
        error={state.fieldState.invalid}
        {...state.field}
      />
      <DonationInput
        placeholder="Zip Code"
        label="Zip Code"
        fieldName="zip"
        error={zip.fieldState.invalid}
        {...zip.field}
      />
    </>
  );
};
