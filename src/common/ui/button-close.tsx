import { XIcon } from 'lucide-react';
import { forwardRef } from 'react';
import { css, cx } from 'styled-system/css';
import { IconButton, type IconButtonProps } from './button-icon';

export type CloseButtonProps = IconButtonProps;

export const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>(
  function CloseButton(props, ref) {
    return (
      <IconButton
        variant="plain"
        aria-label="Close"
        ref={ref}
        {...props}
        className={cx(css({ colorPalette: 'gray' }, props.css), props.className)}
      >
        {props.children ?? <XIcon />}
      </IconButton>
    );
  },
);
