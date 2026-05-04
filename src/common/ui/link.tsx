import { forwardRef, type ComponentProps } from 'react';

export type LinkProps = ComponentProps<'a'> & {
  variant?: 'plain' | 'underline';
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { className = '', variant = 'underline', ...props },
  ref,
) {
  const variantClass =
    variant === 'plain' ? 'hover:underline' : 'underline decoration-current hover:opacity-80';
  return <a ref={ref} className={`${variantClass} ${className}`} {...props} />;
});
