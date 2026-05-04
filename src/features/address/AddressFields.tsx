import { type Lens } from '@hookform/lenses';
import { createContext, useContext, type ComponentProps, type ReactNode } from 'react';
import { z } from 'zod/v4/mini';
import { Field, useController } from '~/common/form';
import { Input } from '~/common/ui';
import type { address } from './address.schema';
import { StateSelect } from './StateSelect.tsx';

type AddressShape = z.infer<typeof address>;

type AddressContext = Omit<ComponentProps<typeof Root>, 'children'>;

const AddressFieldsContext = createContext<AddressContext | null>(null);

const useAddressContext = () => {
  const ctx = useContext(AddressFieldsContext);
  if (!ctx) throw new Error('AddressFields context missing');
  return ctx;
};

export const Context = AddressFieldsContext;
export const Provider = ({ value, children }: { value: AddressContext; children: ReactNode }) => (
  <AddressFieldsContext.Provider value={value}>{children}</AddressFieldsContext.Provider>
);

export const Root = ({
  children,
  ...props
}: {
  lens: Lens<AddressShape>;
  type?: 'billing' | 'shipping';
  children: ReactNode;
}) => <Provider value={props}>{children}</Provider>;

export const Line1 = () => {
  const { lens, type } = useAddressContext();
  const props = useController(lens.focus('line1').interop());
  return (
    <Field {...props}>
      <Input
        placeholder="Address Line 1"
        autoComplete={`${type ?? ''} address-line1`}
        {...props.field}
        value={props.field.value ?? ''}
      />
    </Field>
  );
};

export const Line2 = () => {
  const { lens, type } = useAddressContext();
  const props = useController(lens.focus('line2').interop());
  return (
    <Field {...props}>
      <Input
        placeholder="Address Line 2"
        autoComplete={`${type ?? ''} address-line2`}
        {...props.field}
        value={props.field.value ?? ''}
      />
    </Field>
  );
};

export const City = () => {
  const { lens, type } = useAddressContext();
  const props = useController(lens.focus('city').interop());
  return (
    <Field {...props}>
      <Input
        placeholder="City"
        autoComplete={`${type ?? ''} address-level2`}
        {...props.field}
        value={props.field.value ?? ''}
      />
    </Field>
  );
};

export const State = () => {
  const { lens, type } = useAddressContext();
  const props = useController(lens.focus('state').interop());
  const {
    field: { onChange, value, ...field },
  } = props;
  return (
    <Field {...props}>
      <StateSelect
        {...field}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={`${type ?? ''} address-level1`}
      />
    </Field>
  );
};

export const ZipCode = () => {
  const { lens, type } = useAddressContext();
  const props = useController(lens.focus('zip').interop());
  return (
    <Field {...props}>
      <Input
        placeholder="Zip Code"
        autoComplete={`${type ?? ''} postal-code`}
        {...props.field}
        value={props.field.value ?? ''}
        inputMode="decimal"
      />
    </Field>
  );
};

export const CountryCode = () => {
  const { lens, type } = useAddressContext();
  const props = useController(lens.focus('country').interop());
  return (
    <Field {...props}>
      <Input
        placeholder="Country Code"
        autoComplete={`${type ?? ''} country`}
        {...props.field}
        value={props.field.value ?? ''}
      />
    </Field>
  );
};
