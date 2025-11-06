import { forwardRef, type ReactNode } from 'react';
import { type HTMLStyledProps, styled } from 'styled-system/jsx';
import { AbsoluteCenter } from './absolute-center.tsx';
import { Spinner } from './spinner.tsx';

export interface LoaderProps extends HTMLStyledProps<'span'> {
  /**
   * Whether the loader is visible
   * @default true
   */
  visible?: boolean | undefined;
  /**
   * The spinner to display when loading
   */
  spinner?: ReactNode | undefined;
  /**
   * The placement of the spinner
   * @default "start"
   */
  spinnerPlacement?: 'start' | 'end' | undefined;
  /**
   * The text to display when loading
   */
  text?: ReactNode | undefined;

  children?: ReactNode;
}

const Span = styled('span', {
  base: {
    display: 'contents',
  },
});

export const Loader = forwardRef<HTMLSpanElement, LoaderProps>(function Loader(props, ref) {
  const {
    spinner = <Spinner size="inherit" css={{ borderWidth: '0.125em', color: 'inherit' }} />,
    spinnerPlacement = 'start',
    children,
    text,
    visible = true,
    ...rest
  } = props;

  if (!visible) return children;

  if (text) {
    return (
      <Span ref={ref} {...rest}>
        {spinnerPlacement === 'start' && spinner}
        {text}
        {spinnerPlacement === 'end' && spinner}
      </Span>
    );
  }

  if (spinner) {
    return (
      <Span ref={ref} {...rest}>
        <AbsoluteCenter css={{ display: 'inline-flex' }}>{spinner}</AbsoluteCenter>
        <Span css={{ visibility: 'hidden' }}>{children}</Span>
      </Span>
    );
  }

  return (
    <Span ref={ref} {...rest}>
      {children}
    </Span>
  );
});
