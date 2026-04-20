import { forwardRef, type ComponentProps } from 'react';
import { useFieldContext } from './field.tsx';

export type InputProps = ComponentProps<'input'>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className = '', disabled, ...props },
  ref,
) {
  const field = useFieldContext();
  const isInvalid = field.invalid;
  const isDisabled = disabled ?? field.disabled;

  return (
    <input
      ref={ref}
      aria-invalid={isInvalid || undefined}
      disabled={isDisabled}
      className={[
        'block w-full rounded-md border px-3 py-2 text-sm shadow-sm',
        'placeholder:text-gray-400',
        'focus:outline-none focus:ring-2 focus:ring-offset-0',
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
