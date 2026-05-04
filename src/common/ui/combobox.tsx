// Combobox is not currently used in the codebase — stub exports for type compatibility
import type { ReactNode } from 'react';

export type RootProps<T = unknown> = {
  children?: ReactNode;
  value?: string[];
  onValueChange?: (detail: { value: string[]; items: T[] }) => void;
};

export const Root = <T,>({ children }: RootProps<T>) => <>{children}</>;
export const RootProvider = Root;
export const ClearTrigger = ({ children }: { children?: ReactNode }) => <>{children}</>;
export const Content = ({ children }: { children?: ReactNode }) => <>{children}</>;
export const Control = ({ children }: { children?: ReactNode }) => <>{children}</>;
export const Empty = ({ children }: { children?: ReactNode }) => <>{children}</>;
export const IndicatorGroup = ({ children }: { children?: ReactNode }) => <>{children}</>;
export const Input = ({ children }: { children?: ReactNode }) => <>{children}</>;
export const Item = ({ children }: { children?: ReactNode }) => <>{children}</>;
export const ItemGroup = ({ children }: { children?: ReactNode }) => <>{children}</>;
export const ItemGroupLabel = ({ children }: { children?: ReactNode }) => <>{children}</>;
export const ItemText = ({ children }: { children?: ReactNode }) => <>{children}</>;
export const Label = ({ children }: { children?: ReactNode }) => <>{children}</>;
export const List = ({ children }: { children?: ReactNode }) => <>{children}</>;
export const Positioner = ({ children }: { children?: ReactNode }) => <>{children}</>;
export const Trigger = ({ children }: { children?: ReactNode }) => <>{children}</>;
export const ItemIndicator = ({ children }: { children?: ReactNode }) => <>{children}</>;
export const Context = null;
