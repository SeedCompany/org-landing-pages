import { forwardRef } from 'react';
import { Button, type ButtonProps } from './button';

export type IconButtonProps = ButtonProps;

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { className = '', ...props },
  ref,
) {
  return <Button ref={ref} className={`p-2 ${className}`} {...props} />;
});
