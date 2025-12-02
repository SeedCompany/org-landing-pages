import type { Lens } from '@hookform/lenses';
import { DollarSignIcon } from 'lucide-react';
import { useImperativeHandle, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button, ButtonGroup, InputGroup, NumberInput, ToggleGroup } from '~/common/ui';
import { useController, Field } from '~/common/form';

const formatOptions: Intl.NumberFormatOptions = {
  useGrouping: true,
  maximumFractionDigits: 0,
};
const formatter = new Intl.NumberFormat(undefined, {
  ...formatOptions,
  style: 'currency',
  currency: 'USD',
});

export const AmountField = ({
  lens,
  presets,
  hideOther,
}: {
  lens: Lens<number>;
  presets?: readonly number[];
  hideOther?: boolean;
}) => {
  const formCtx = useFormContext();
  const { name, control } = lens.interop();
  const props = useController({ name, control });
  const {
    field: { value, onChange, ref: fieldRef, onBlur, ...field },
  } = props;

  const isPresetValue = value && presets && presets.includes(value);
  const [showOther, setShowOther] = useState((value && !isPresetValue) || !presets);

  const otherInputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(fieldRef, () => otherInputRef.current);

  const otherInput = !hideOther && (
    <Field
      {...props}
      data-hidden={showOther ? undefined : true}
      css={{
        transitionProperty: '[max-height, opacity, margin]',
        transitionDuration: 'fast',
        opacity: '1',
        maxHeight: '[500px]',
        mt: presets ? `[var(--gap, {spacing.2})]` : undefined,
        _hidden: {
          mt: '0',
          maxHeight: '0',
          pointerEvents: 'none',
          opacity: '0',
        },
      }}
    >
      <NumberInput.Root
        {...field}
        required={false} // don't want to show HTML validation warning while invisible.
        formatOptions={formatOptions}
        clampValueOnBlur={false}
        value={value ? new Intl.NumberFormat(undefined, formatOptions).format(value) : ''}
        onValueChange={(e) => {
          // Limit to 10 digits & convert ourselves so we can always get a number instead of NaN
          // with too many digits.
          onChange(e.value === '' ? null : Number(e.value.slice(0, 10).replaceAll(/[^0-9]/g, '')));
        }}
      >
        <InputGroup startElement={<DollarSignIcon />}>
          <NumberInput.Input
            placeholder="Amount"
            onBlur={onBlur}
            ref={otherInputRef}
            tabIndex={showOther ? 0 : -1} // so keyboard focus while hidden
          />
        </InputGroup>
      </NumberInput.Root>
    </Field>
  );

  return (
    <div>
      {presets && presets.length > 0 && (
        <ToggleGroup.Root
          variant="outline"
          deselectable={false}
          value={isPresetValue ? [String(value)] : value || showOther ? ['other'] : []}
          onValueChange={(e) => {
            const v = e.value.at(0)!;
            if (v === 'other') {
              setShowOther(true);
            } else {
              setShowOther(false);
              onChange(Number(v));
            }
          }}
          data-invalid={
            props.fieldState.invalid && props.formState.submitCount > 0 ? true : undefined
          }
        >
          <ButtonGroup
            variant="plain"
            size="xl"
            css={{
              width: 'full',
              '--group-gap': 'spacing.1',
              flexWrap: 'wrap',
              '& button': {
                flex: '[1 0 25%]',
              },
            }}
          >
            {presets.map((amount) => (
              <ToggleGroup.Item key={amount} value={String(amount)} asChild>
                <Button>{formatter.format(amount)}</Button>
              </ToggleGroup.Item>
            ))}
            {!hideOther && (
              <ToggleGroup.Item
                value="other"
                asChild
                onClick={() => {
                  setTimeout(() => {
                    otherInputRef.current?.focus();
                    formCtx.resetField(name);
                  });
                }}
              >
                <Button>Other</Button>
              </ToggleGroup.Item>
            )}
          </ButtonGroup>
        </ToggleGroup.Root>
      )}
      {otherInput}
    </div>
  );
};
