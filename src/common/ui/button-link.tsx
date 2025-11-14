import { forwardRef } from 'react';
import { Button, type ButtonProps } from './button';

// A <a> button
// asChild doesn't work in .astro files, so it is here in .tsx to be rendered by React.
export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonProps & { href: string }>(
  function ButtonLink({ href, children, ...props }, ref) {
    return (
      <Button ref={ref as never} {...props} asChild>
        <a href={href}>{children}</a>
      </Button>
    );
  },
);
