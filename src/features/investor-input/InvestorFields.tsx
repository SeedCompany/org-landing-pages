import { createContext, useContext, type ComponentProps, type ReactNode } from 'react';
import { type Lens } from '@hookform/lenses';
import { z } from 'zod/v4/mini';
import type { InvestorType } from '~/graphql';
import { Button, ButtonGroup, Input, ToggleGroup } from '~/common/ui';
import { Field, useController } from '~/common/form';
import type { createInvestor } from './investor.schema';
import { AddressFields } from '~/features/address';
import { useWatch } from 'react-hook-form';

type InvestorShape = z.infer<typeof createInvestor>;

const InvestorFieldsContext = createContext<Lens<InvestorShape> | null>(null);

const useInvestorContext = () => {
  const ctx = useContext(InvestorFieldsContext);
  if (!ctx) throw new Error('InvestorFields context missing');
  return ctx;
};

export const Context = InvestorFieldsContext;
export const Provider = ({
  value,
  children,
}: {
  value: Lens<InvestorShape>;
  children: ReactNode;
}) => <InvestorFieldsContext.Provider value={value}>{children}</InvestorFieldsContext.Provider>;

export const Root = ({ lens, children }: { lens: Lens<InvestorShape>; children: ReactNode }) => (
  <Provider value={lens}>{children}</Provider>
);

export const Type = () => {
  const {
    field: { value, onChange, ...field },
  } = useController(useInvestorContext().focus('type').interop());
  return (
    <ToggleGroup.Root
      {...field}
      value={value ? [value] : []}
      onValueChange={({ value }) => onChange(value.at(0) ?? null)}
    >
      <ButtonGroup variant="plain" className="w-full flex-wrap gap-1 [&_button]:flex-1">
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
  const props = useController(useInvestorContext().focus('email').interop());
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
  const props = useController(useInvestorContext().focus('firstName').interop());
  const type = useWatch(useInvestorContext().focus('type').interop());
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
  const props = useController(useInvestorContext().focus('lastName').interop());
  const type = useWatch(useInvestorContext().focus('type').interop());
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
  const props = useController(useInvestorContext().focus('phone').interop());
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
  <AddressFields.Root lens={useInvestorContext().focus('mailingAddress')} {...props}>
    {children}
  </AddressFields.Root>
);
