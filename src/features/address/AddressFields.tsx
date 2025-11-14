import { type Lens } from '@hookform/lenses';
import { createContext } from '@ark-ui/react/utils';
import type { ComponentProps, ReactNode } from 'react';
import { z } from 'zod/v4/mini';
import { Field, useController } from '~/common/form';
import { Input } from '~/common/ui';
import type { address } from './address.schema';
import { StateSelect } from './StateSelect.tsx';

type AddressShape = z.infer<typeof address>;

const [Provider, useContext, Context] = createContext<
  Omit<ComponentProps<typeof Root>, 'children'>
>({
  name: 'AddressFields',
});
export { Provider, Context };

export const Root = ({
  children,
  ...props
}: {
  lens: Lens<AddressShape>;
  type?: 'billing' | 'shipping';
  children: ReactNode;
}) => <Provider value={props}>{children}</Provider>;

export const Line1 = () => {
  const { lens, type } = useContext();
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
  const { lens, type } = useContext();
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
  const { lens, type } = useContext();
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
  const { lens, type } = useContext();
  const props = useController(lens.focus('state').interop());
  const {
    field: { onChange, value, ...field },
  } = props;
  return (
    <Field {...props}>
      <StateSelect
        {...field}
        value={value ? [value] : []}
        onValueChange={(e) => onChange(e.value[0])}
        autoCompetePrefix={type}
      />
    </Field>
  );
};

export const ZipCode = () => {
  const { lens, type } = useContext();
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
  const { lens, type } = useContext();
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
