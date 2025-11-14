import {
  Combobox,
  useComboboxItemContext,
  type ComboboxRootBaseProps,
} from '@ark-ui/react/combobox';
import { ark } from '@ark-ui/react/factory';
import { CheckIcon, ChevronsUpDownIcon, XIcon } from 'lucide-react';
import { forwardRef, type JSX } from 'react';
import { createStyleContext, type HTMLStyledProps } from 'styled-system/jsx';
import { type ComboboxVariantProps, combobox } from 'styled-system/recipes';
import type { Assign } from 'styled-system/types';

const { withProvider, withContext } = createStyleContext(combobox);

export type RootProps<T = unknown> = Assign<
  HTMLStyledProps<'div'>,
  ComboboxRootBaseProps<T> & ComboboxVariantProps
>;
export const Root = withProvider(Combobox.Root, 'root', {
  defaultProps: { positioning: { sameWidth: false } },
}) as <T>(props: RootProps<T>) => JSX.Element;

export const RootProvider = withProvider(Combobox.RootProvider, 'root');

export const ClearTrigger = withContext(Combobox.ClearTrigger, 'clearTrigger', {
  defaultProps: { children: <XIcon /> },
});
export const Content = withContext(Combobox.Content, 'content');
export const Control = withContext(Combobox.Control, 'control');
export const Empty = withContext(Combobox.Empty, 'empty');
export const IndicatorGroup = withContext(ark.div, 'indicatorGroup');
export const Input = withContext(Combobox.Input, 'input');
export const Item = withContext(Combobox.Item, 'item');
export const ItemGroup = withContext(Combobox.ItemGroup, 'itemGroup');
export const ItemGroupLabel = withContext(Combobox.ItemGroupLabel, 'itemGroupLabel');
export const ItemText = withContext(Combobox.ItemText, 'itemText');
export const Label = withContext(Combobox.Label, 'label');
export const List = withContext(Combobox.List, 'list');
export const Positioner = withContext(Combobox.Positioner, 'positioner');
export const Trigger = withContext(Combobox.Trigger, 'trigger', {
  defaultProps: { children: <ChevronsUpDownIcon /> },
});

export { ComboboxContext as Context } from '@ark-ui/react/combobox';

const StyledItemIndicator = withContext(Combobox.ItemIndicator, 'itemIndicator');

export const ItemIndicator = forwardRef<HTMLDivElement, HTMLStyledProps<'div'>>(
  function ItemIndicator(props, ref) {
    const item = useComboboxItemContext();

    return item.selected ? (
      <StyledItemIndicator ref={ref} {...props}>
        <CheckIcon />
      </StyledItemIndicator>
    ) : (
      <svg aria-hidden="true" focusable="false" />
    );
  },
);
