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
      className={
        showOther ? undefined : 'max-h-0 overflow-hidden opacity-0 pointer-events-none mt-0'
      }
    >
      <NumberInput.Root
        {...field}
        required={false}
        formatOptions={formatOptions}
        clampValueOnBlur={false}
        value={value ? new Intl.NumberFormat(undefined, formatOptions).format(value) : ''}
        onValueChange={(e) => {
          onChange(e.value === '' ? null : Number(e.value.slice(0, 10).replaceAll(/[^0-9]/g, '')));
        }}
      >
        <InputGroup startElement={<DollarSignIcon className="h-4 w-4" />}>
          <NumberInput.Input
            placeholder="Amount"
            onBlur={onBlur}
            ref={otherInputRef}
            tabIndex={showOther ? 0 : -1}
          />
        </InputGroup>
      </NumberInput.Root>
    </Field>
  );

  return (
    <div>
      {presets && presets.length > 0 && (
        <ToggleGroup.Root
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
        >
          <ButtonGroup
            variant="plain"
            size="xl"
            className="w-full flex-wrap gap-1 [&_button]:flex-auto"
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
