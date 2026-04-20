import {
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  type ComponentProps,
  type ReactNode,
} from 'react';

interface ToggleGroupState {
  value: string[];
  onValueChange: (detail: { value: string[] }) => void;
}

const ToggleGroupContext = createContext<ToggleGroupState>({
  value: [],
  onValueChange: () => undefined,
});

export type RootProps = ComponentProps<'div'> & {
  value?: string[];
  onValueChange?: (detail: { value: string[] }) => void;
  variant?: string;
  size?: string;
  css?: unknown;
  name?: string;
  disabled?: boolean;
};

export const Root = forwardRef<HTMLDivElement, RootProps>(function ToggleGroupRoot(
  {
    value = [],
    onValueChange = () => undefined,
    variant: _variant,
    size: _size,
    css: _css,
    className = '',
    ...props
  },
  ref,
) {
  return (
    <ToggleGroupContext.Provider value={{ value, onValueChange }}>
      <div ref={ref} className={`flex ${className}`} {...props} />
    </ToggleGroupContext.Provider>
  );
});

export type ItemProps = ComponentProps<'button'> & {
  value: string;
  asChild?: boolean;
  children?: ReactNode;
};

export const Item = forwardRef<HTMLButtonElement, ItemProps>(function ToggleGroupItem(
  { value, asChild, children, className = '', ...props },
  ref,
) {
  const ctx = useContext(ToggleGroupContext);
  const isSelected = ctx.value.includes(value);

  const handleClick = () => ctx.onValueChange({ value: [value] });

  if (asChild && isValidElement(children)) {
    const child = children as React.ReactElement<Record<string, unknown>>;
    return cloneElement(child, {
      ...props,
      ref,
      'data-selected': isSelected ? '' : undefined,
      'aria-pressed': isSelected,
      onClick: handleClick,
      className: `${(child.props as { className?: string }).className ?? ''} ${className}`.trim(),
    });
  }

  return (
    <button
      type="button"
      ref={ref}
      {...props}
      data-selected={isSelected ? '' : undefined}
      aria-pressed={isSelected}
      onClick={handleClick}
      className={className}
    >
      {children}
    </button>
  );
});

export { ToggleGroupContext as Context };
export const RootProvider = Root;
