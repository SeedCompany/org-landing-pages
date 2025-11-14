import { forwardRef } from 'react';
import { css, cx } from 'styled-system/css';
import { Button, type ButtonProps } from './button';

export type IconButtonProps = ButtonProps;

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(props, ref) {
    return (
      <Button
        ref={ref}
        {...props}
        className={cx(css({ px: '0', py: '0' }, props.css), props.className)}
      />
    );
  },
);
