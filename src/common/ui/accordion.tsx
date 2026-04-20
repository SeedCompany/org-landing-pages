import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronDownIcon } from 'lucide-react';
import { type ComponentProps, type ReactNode } from 'react';

export type RootProps = ComponentProps<'div'> & {
  collapsible?: boolean;
  multiple?: boolean;
  size?: string;
  indicator?: string;
  css?: unknown;
};

export const Root = ({
  className = '',
  collapsible: _c,
  multiple: _m,
  size: _s,
  indicator: _i,
  css: _css,
  ...props
}: RootProps) => (
  <div className={`divide-y divide-gray-200 border-b border-gray-200 ${className}`} {...props} />
);

export type ItemProps = ComponentProps<'div'> & { value: string };

export const Item = ({ value: _v, className = '', ...props }: ItemProps) => (
  <Disclosure as="div" className={className} {...(props as ComponentProps<typeof Disclosure>)} />
);

export const ItemTrigger = ({
  children,
  className = '',
}: {
  children?: ReactNode;
  className?: string;
}) => (
  <DisclosureButton
    className={`group flex w-full items-center justify-between py-4 text-left text-sm font-medium text-gray-900 hover:text-gray-600 ${className}`}
  >
    {children}
  </DisclosureButton>
);

export const ItemIndicator = ({ children }: { children?: ReactNode }) => (
  <span className="ml-2 shrink-0 transition-transform group-data-[open]:rotate-180">
    {children ?? <ChevronDownIcon className="h-5 w-5" />}
  </span>
);

export const ItemContent = ({
  children,
  className = '',
}: {
  children?: ReactNode;
  className?: string;
}) => <DisclosurePanel className={`pb-4 ${className}`}>{children}</DisclosurePanel>;

export const ItemBody = ({
  children,
  className = '',
}: {
  children?: ReactNode;
  className?: string;
}) => <div className={`text-sm text-gray-600 ${className}`}>{children}</div>;

export const Context = null;
export const RootProvider = Root;
