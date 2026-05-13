import { forwardRef, type ReactNode } from 'react';
import { AbsoluteCenter } from './absolute-center.tsx';
import { Spinner } from './spinner.tsx';

export interface LoaderProps {
  visible?: boolean;
  spinner?: ReactNode;
  spinnerPlacement?: 'start' | 'end';
  text?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export const Loader = forwardRef<HTMLSpanElement, LoaderProps>(function Loader(props, ref) {
  const {
    spinner = <Spinner />,
    spinnerPlacement = 'start',
    children,
    text,
    visible = true,
    className,
  } = props;

  if (!visible) return <>{children}</>;

  if (text) {
    return (
      <span ref={ref} className={`inline-flex items-center gap-2 ${className ?? ''}`}>
        {spinnerPlacement === 'start' && spinner}
        {text}
        {spinnerPlacement === 'end' && spinner}
      </span>
    );
  }

  return (
    <span ref={ref} className={`relative inline-flex ${className ?? ''}`}>
      <AbsoluteCenter className="inline-flex">{spinner}</AbsoluteCenter>
      <span className="invisible">{children}</span>
    </span>
  );
});
