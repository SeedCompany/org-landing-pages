import { createContext, forwardRef, useContext, type ComponentProps, type ReactNode } from 'react';

interface FieldState {
  invalid?: boolean;
  disabled?: boolean;
  required?: boolean;
}

const FieldContext = createContext<FieldState>({});

export const useFieldContext = () => useContext(FieldContext);

export type RootProps = ComponentProps<'div'> & FieldState;

export const Root = forwardRef<HTMLDivElement, RootProps>(function FieldRoot(
  { invalid, disabled, required, className = '', children, ...props },
  ref,
) {
  return (
    <FieldContext.Provider value={{ invalid, disabled, required }}>
      <div
        ref={ref}
        data-invalid={invalid ? '' : undefined}
        data-disabled={disabled ? '' : undefined}
        className={`flex flex-col gap-1 ${className}`}
        {...props}
      >
        {children}
      </div>
    </FieldContext.Provider>
  );
});

export const Label = forwardRef<HTMLLabelElement, ComponentProps<'label'>>(function FieldLabel(
  { className = '', ...props },
  ref,
) {
  return (
    <label ref={ref} className={`text-sm font-medium text-gray-700 ${className}`} {...props} />
  );
});

export const RequiredIndicator = ({ className = '' }: { className?: string }) => (
  <span className={`text-red-500 ml-0.5 ${className}`} aria-hidden="true">
    *
  </span>
);

export const ErrorText = forwardRef<HTMLParagraphElement, ComponentProps<'p'>>(
  function FieldErrorText({ className = '', ...props }, ref) {
    return <p ref={ref} className={`text-sm text-red-600 ${className}`} {...props} />;
  },
);

export const HelperText = forwardRef<HTMLParagraphElement, ComponentProps<'p'>>(
  function FieldHelperText({ className = '', ...props }, ref) {
    return <p ref={ref} className={`text-sm text-gray-500 ${className}`} {...props} />;
  },
);

export const RootProvider = Root;

export type { FieldState };

export const Context = FieldContext;

// Helper for child components to pick up field state (e.g. Input reading invalid state)
export const useField = useFieldContext;
