import { createListCollection, Portal } from '@ark-ui/react';
import type { IterableItem } from '@seedcompany/common';
import { Select } from '~/common/ui';
import { usStateCodes } from './us-state-codes';

type StateCode = IterableItem<typeof usStateCodes>;

const states = createListCollection({
  items: [...usStateCodes],
});

export const StateSelect = ({
  autoCompetePrefix,
  ...props
}: Omit<Select.RootProps<StateCode>, 'collection'> & {
  autoCompetePrefix?: 'billing' | 'shipping';
}) => (
  <Select.Root aria-label="State" lazyMount {...props} collection={states}>
    {/* Just for autocomplete */}
    <Select.HiddenSelect
      autoComplete={`${autoCompetePrefix ?? ''} address-level1`}
      onChange={(e) =>
        props.onValueChange?.({
          value: [e.target.value],
          items: [e.target.value as StateCode],
        })
      }
    />

    <Select.Control>
      <Select.Trigger>
        <Select.ValueText placeholder="State" />
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Trigger>
    </Select.Control>

    <Portal>
      <Select.Positioner>
        <Select.Content>
          {[...usStateCodes].map((code) => (
            <Select.Item item={code} key={code}>
              {code}
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Portal>
  </Select.Root>
);
