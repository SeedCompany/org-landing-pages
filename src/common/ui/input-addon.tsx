import type { ComponentProps } from 'react';

export type InputAddonProps = ComponentProps<'div'>;

export const InputAddon = ({ className = '', ...props }: InputAddonProps) => (
  <div
    className={`inline-flex items-center px-3 border border-gray-300 bg-gray-50 text-sm ${className}`}
    {...props}
  />
);
