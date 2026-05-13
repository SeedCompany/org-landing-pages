// Minimal native-select-based implementation.
// The primary consumer (StateSelect) has been rewritten to use a native <select>.
// These stubs are kept for potential future re-use.

import { forwardRef, type ComponentProps, type ReactNode } from 'react';

export type RootProps<T = string> = ComponentProps<'div'> & {
  value?: string[];
  onValueChange?: (detail: { value: string[]; items: T[] }) => void;
  collection?: { items: T[] };
  lazyMount?: boolean;
  'aria-label'?: string;
};

export const Root = <T,>({ children, ...props }: RootProps<T>) => (
  <div {...(props as ComponentProps<'div'>)}>{children}</div>
);

export const HiddenSelect = forwardRef<HTMLSelectElement, ComponentProps<'select'>>(
  function HiddenSelect(props, ref) {
    return <select ref={ref} className="sr-only" {...props} />;
  },
);

export const Control = ({ children }: { children?: ReactNode }) => <>{children}</>;
export const Trigger = ({
  children,
  className = '',
}: {
  children?: ReactNode;
  className?: string;
}) => (
  <button type="button" className={`flex items-center gap-1 ${className}`}>
    {children}
  </button>
);
export const ValueText = ({
  placeholder,
  children,
}: {
  placeholder?: string;
  children?: ReactNode;
}) => <span>{children ?? placeholder}</span>;
export const IndicatorGroup = ({ children }: { children?: ReactNode }) => (
  <span className="ml-1">{children}</span>
);
export const Indicator = () => <span>▾</span>;
export const Positioner = ({ children }: { children?: ReactNode }) => <>{children}</>;
export const Content = ({
  children,
  className = '',
}: {
  children?: ReactNode;
  className?: string;
}) => (
  <div className={`absolute z-50 bg-white border border-gray-200 rounded shadow-lg ${className}`}>
    {children}
  </div>
);
export const Item = ({ children }: { children?: ReactNode; item?: unknown }) => (
  <div className="px-3 py-2 hover:bg-gray-100 cursor-pointer">{children}</div>
);
export const ItemIndicator = () => null;
export const ItemGroup = ({ children }: { children?: ReactNode }) => <>{children}</>;
export const ItemGroupLabel = ({ children }: { children?: ReactNode }) => (
  <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase">{children}</div>
);
export const Label = ({ children }: { children?: ReactNode }) => (
  <label className="text-sm font-medium text-gray-700">{children}</label>
);
export const ClearTrigger = ({ children }: { children?: ReactNode }) => <>{children}</>;
export const List = ({ children }: { children?: ReactNode }) => <>{children}</>;
export const ItemText = ({ children }: { children?: ReactNode }) => <span>{children}</span>;
export const Context = null;
export type ValueChangeDetails<T = string> = { value: string[]; items: T[] };
