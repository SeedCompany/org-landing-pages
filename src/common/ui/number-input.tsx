import { createContext, forwardRef, useContext, type ComponentProps, type ReactNode } from 'react';
import { useFieldContext } from './field.tsx';

interface NumberInputState {
  value?: string;
  onValueChange?: (detail: { value: string }) => void;
  formatOptions?: Intl.NumberFormatOptions;
  clampValueOnBlur?: boolean;
  required?: boolean;
}

const NumberInputContext = createContext<NumberInputState>({});

export type RootProps = NumberInputState & {
  children?: ReactNode;
  name?: string;
  disabled?: boolean;
};

export const Root = ({
  children,
  onValueChange,
  value,
  formatOptions,
  clampValueOnBlur,
  required,
  name: _name,
  disabled: _disabled,
  ...rest
}: RootProps & Record<string, unknown>) => (
  <NumberInputContext.Provider
    value={{ value, onValueChange, formatOptions, clampValueOnBlur, required }}
  >
    <div {...(rest as ComponentProps<'div'>)}>{children}</div>
  </NumberInputContext.Provider>
);

export type InputProps = ComponentProps<'input'>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function NumberInputInput(
  { className = '', disabled, onBlur, ...props },
  ref,
) {
  const ctx = useContext(NumberInputContext);
  const field = useFieldContext();
  const isInvalid = field.invalid;
  const isDisabled = disabled ?? field.disabled;

  return (
    <input
      ref={ref}
      type="text"
      inputMode="decimal"
      value={ctx.value ?? props.value ?? ''}
      onChange={(e) => ctx.onValueChange?.({ value: e.target.value })}
      onBlur={onBlur}
      disabled={isDisabled}
      required={ctx.required ?? props.required}
      aria-invalid={isInvalid || undefined}
      className={[
        'block w-full rounded-md border px-3 py-2 text-sm shadow-sm',
        'placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0',
        isInvalid ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500',
        isDisabled ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : 'bg-white',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  );
});

export const Context = NumberInputContext;

// Unused exports kept for type compatibility
export const Control = ({ children }: { children?: ReactNode }) => <>{children}</>;
export const Label = ({ children }: { children?: ReactNode; className?: string }) => (
  <>{children}</>
);
export const ValueText = ({ children }: { children?: ReactNode }) => <>{children}</>;
export const Scrubber = () => null;
export const IncrementTrigger = () => null;
export const DecrementTrigger = () => null;
export const RootProvider = Root;
