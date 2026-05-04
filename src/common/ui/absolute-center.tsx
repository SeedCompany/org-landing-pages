import type { ComponentProps } from 'react';

export type AbsoluteCenterProps = ComponentProps<'div'>;

export const AbsoluteCenter = ({ className = '', ...props }: AbsoluteCenterProps) => (
  <div
    className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${className}`}
    {...props}
  />
);
