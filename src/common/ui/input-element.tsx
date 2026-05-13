import type { ComponentProps } from 'react';

export type InputElementProps = ComponentProps<'div'> & {
  placement?: 'start' | 'end';
};

export const InputElement = ({
  placement = 'start',
  className = '',
  ...props
}: InputElementProps) => (
  <div
    className={`absolute top-1/2 -translate-y-1/2 flex items-center justify-center w-10 text-gray-500 ${placement === 'end' ? 'right-0' : 'left-0'} ${className}`}
    {...props}
  />
);
