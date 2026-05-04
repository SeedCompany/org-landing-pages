// Segment group is not currently used in the codebase — stub exports for type compatibility
import type { ReactNode } from 'react';

export type RootProps = {
  value?: string;
  onValueChange?: (detail: { value: string }) => void;
  orientation?: 'horizontal' | 'vertical';
  children?: ReactNode;
  className?: string;
};

export const Root = ({ children }: RootProps) => <>{children}</>;
export const RootProvider = Root;
export const Indicator = ({ children }: { children?: ReactNode }) => <>{children}</>;
export const Item = ({ children }: { children?: ReactNode }) => <>{children}</>;
export const ItemControl = ({ children }: { children?: ReactNode }) => <>{children}</>;
export const ItemHiddenInput = () => null;
export const ItemText = ({ children }: { children?: ReactNode }) => <>{children}</>;
export const Label = ({ children }: { children?: ReactNode }) => <>{children}</>;
export const Items = ({ children }: { children?: ReactNode }) => <>{children}</>;
export const Context = null;
