import { Children, cloneElement, isValidElement, type ComponentProps, type ReactNode } from 'react';

export type IconProps = ComponentProps<'span'> & {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children?: ReactNode;
};

const sizeClass = { sm: 'h-4 w-4', md: 'h-5 w-5', lg: 'h-6 w-6', xl: 'h-8 w-8' };

export const Icon = ({ size = 'md', className = '', children, ...props }: IconProps) => {
  const child = Children.only(children);
  const sized = isValidElement(child)
    ? cloneElement(child as React.ReactElement<{ className?: string }>, {
        className: `${sizeClass[size]} ${(child.props as { className?: string }).className ?? ''}`,
      })
    : child;
  return (
    <span className={`inline-flex items-center justify-center ${className}`} {...props}>
      {sized}
    </span>
  );
};
