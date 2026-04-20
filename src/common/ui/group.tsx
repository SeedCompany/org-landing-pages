import { forwardRef, type ComponentProps, type ReactNode } from 'react';

export type GroupProps = ComponentProps<'div'> & {
  attached?: boolean;
  align?: string;
  justify?: string;
  wrap?: string;
  skip?: unknown;
};

export const Group = forwardRef<HTMLDivElement, GroupProps>(function Group(
  {
    attached: _attached,
    align: _align,
    justify: _justify,
    wrap: _wrap,
    skip: _skip,
    className = '',
    ...props
  },
  ref,
) {
  return <div ref={ref} className={`flex items-center ${className}`} {...props} />;
});

export type { ReactNode };
