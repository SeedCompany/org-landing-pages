import type { Lens } from '@hookform/lenses';
import type { NonEmptyArray } from '@seedcompany/common';
import type { ReactNode } from 'react';
import type { DonationCadence as Cadence } from '~/graphql';
import { Button, ButtonGroup, ToggleGroup } from '~/common/ui';
import { useController } from '~/common/form';

const defaultLabels: Record<Cadence, ReactNode> = {
  OneTime: 'One-Time Donation',
  Monthly: 'Monthly Donation',
};

export const CadenceField = ({
  lens,
  labels,
  options = ['OneTime', 'Monthly'],
}: {
  lens: Lens<Cadence>;
  labels?: typeof defaultLabels;
  options?: NonEmptyArray<Cadence>;
}) => {
  const {
    field: { value, onChange, ...field },
  } = useController(lens.interop());
  return (
    <ToggleGroup.Root
      variant="outline"
      {...field}
      value={value ? [value] : []}
      onValueChange={({ value }) => onChange(value.at(0) ?? null)}
    >
      <ButtonGroup
        variant="plain"
        size="xl"
        css={{
          width: 'full',
          '--group-gap': 'spacing.1',
          flexWrap: 'wrap',
          '& button': {
            flexGrow: '1',
          },
        }}
      >
        {options.map((cadence) => (
          <ToggleGroup.Item key={cadence} value={cadence} asChild>
            <Button>{(labels ?? defaultLabels)[cadence]}</Button>
          </ToggleGroup.Item>
        ))}
      </ButtonGroup>
    </ToggleGroup.Root>
  );
};
