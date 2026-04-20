import { XIcon } from 'lucide-react';
import { forwardRef } from 'react';
import { IconButton, type IconButtonProps } from './button-icon';

export type CloseButtonProps = IconButtonProps;

export const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>(function CloseButton(
  { children, ...props },
  ref,
) {
  return (
    <IconButton variant="plain" aria-label="Close" ref={ref} {...props}>
      {children ?? <XIcon className="h-4 w-4" />}
    </IconButton>
  );
});
