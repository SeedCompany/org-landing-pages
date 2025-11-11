import type { DonationCadence as Cadence } from '~/graphql';
import { Button, ButtonGroup, ToggleGroup } from '~/common/ui';
import { controlType, useController } from '~/common/form';
import { DonateInput } from '../donate.schema.ts';

export const CadenceField = () => {
  const {
    field: { value, onChange, ...field },
  } = useController({
    control: controlType(DonateInput),
    name: 'cadence',
  });
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
          '& button': {
            flexGrow: '1',
          },
        }}
      >
        <ToggleGroup.Item value={'OneTime' satisfies Cadence} asChild>
          <Button>One-Time Donation</Button>
        </ToggleGroup.Item>
        <ToggleGroup.Item value={'Monthly' satisfies Cadence} asChild>
          <Button>Monthly Donation</Button>
        </ToggleGroup.Item>
      </ButtonGroup>
    </ToggleGroup.Root>
  );
};
