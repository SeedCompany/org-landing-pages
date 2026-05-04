import { forwardRef, type ComponentProps, type ReactNode } from 'react';

export type GroupProps = ComponentProps<'div'>;

export const Group = forwardRef<HTMLDivElement, GroupProps>(function Group(
  { className = '', ...props },
  ref,
) {
  return <div ref={ref} className={`flex items-center ${className}`} {...props} />;
});

export type { ReactNode };
