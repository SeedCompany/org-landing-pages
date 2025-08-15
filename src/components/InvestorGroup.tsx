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
        type="email"
        error={email.fieldState.error}
        {...email.field}
      />
      <DonationInput
        placeholder="Address Line 1"
        label="Address Line 1"
        error={line1.fieldState.error}
        {...line1.field}
      />
      <DonationInput
        placeholder="Address Line 2"
        label="Address Line 2"
        error={line2.fieldState.error}
        {...line2.field}
      />
      <DonationInput
        placeholder="City"
        label="City"
        error={city.fieldState.error}
        {...city.field}
      />
      <DonationInput
        placeholder="State"
        label="State"
        error={state.fieldState.error}
        {...state.field}
      />
      <DonationInput
        placeholder="Zip Code"
        label="Zip Code"
        error={zip.fieldState.error}
        {...zip.field}
      />
    </>
  );
};
