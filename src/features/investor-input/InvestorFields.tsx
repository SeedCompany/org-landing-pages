import { createContext } from '@ark-ui/react/utils';
import { type Lens } from '@hookform/lenses';
import type { ComponentProps, ReactNode } from 'react';
import { z } from 'zod/v4/mini';
import type { InvestorType } from '~/graphql';
import { Button, ButtonGroup, Input, ToggleGroup } from '~/common/ui';
import { Field, useController } from '~/common/form';
import type { createInvestor } from './investor.schema';
import { AddressFields } from '~/features/address';
import { useWatch } from 'react-hook-form';

type InvestorShape = z.infer<typeof createInvestor>;

const [Provider, useContext, Context] = createContext<Lens<InvestorShape>>({
  name: 'InvestorFields',
});
export { Provider, Context };

export const Root = ({ lens, children }: { lens: Lens<InvestorShape>; children: ReactNode }) => (
  <Provider value={lens}>{children}</Provider>
);

export const Type = () => {
  const {
    field: { value, onChange, ...field },
  } = useController(useContext().focus('type').interop());
  return (
    <ToggleGroup.Root
      variant="outline"
      {...field}
      value={value ? [value] : []}
      onValueChange={({ value }) => onChange(value.at(0) ?? null)}
    >
      <ButtonGroup
        variant="plain"
        css={{
          width: 'full',
          '--group-gap': 'spacing.1',
          '& button': {
            flexGrow: '1',
          },
        }}
      >
        <ToggleGroup.Item value={'Individual' satisfies InvestorType} asChild>
          <Button>Individual</Button>
        </ToggleGroup.Item>
        <ToggleGroup.Item value={'Organization' satisfies InvestorType} asChild>
          <Button>Organization</Button>
        </ToggleGroup.Item>
      </ButtonGroup>
    </ToggleGroup.Root>
  );
};

export const Email = () => {
  const props = useController(useContext().focus('email').interop());
  return (
    <Field {...props}>
      <Input
        placeholder="Email"
        autoComplete="email"
        {...props.field}
        value={props.field.value ?? ''}
      />
    </Field>
  );
};

export const FirstName = () => {
  const props = useController(useContext().focus('firstName').interop());
  const type: InvestorType = useWatch({ name: 'investor.type' }) as InvestorType;
  return (
    type === 'Individual' && (
      <Field {...props}>
        <Input
          placeholder="First Name"
          autoComplete="given-name"
          {...props.field}
          value={props.field.value ?? ''}
        />
      </Field>
    )
  );
};

export const LastName = () => {
  const props = useController(useContext().focus('lastName').interop());
  const type: InvestorType = useWatch({ name: 'investor.type' }) as InvestorType;
  return (
    <Field {...props}>
      <Input
        placeholder={type === 'Organization' ? 'Organization Name' : 'Last Name'}
        autoComplete={type === 'Organization' ? '' : 'family-name'}
        {...props.field}
        value={props.field.value ?? ''}
      />
    </Field>
  );
};

export const Phone = () => {
  const props = useController(useContext().focus('phone').interop());
  return (
    <Field {...props}>
      <Input
        placeholder="Phone"
        autoComplete="tel-national"
        {...props.field}
        value={props.field.value ?? ''}
      />
    </Field>
  );
};

export const Address = ({
  children,
  ...props
}: Omit<ComponentProps<typeof AddressFields.Root>, 'lens'>) => (
  <AddressFields.Root lens={useContext().focus('mailingAddress')} {...props}>
    {children}
  </AddressFields.Root>
);
