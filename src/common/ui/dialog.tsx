import { createPortal } from 'react-dom';
import {
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useState,
  type ComponentProps,
  type ReactNode,
} from 'react';

interface DialogState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DialogContext = createContext<DialogState>({ open: false, setOpen: () => undefined });

export type RootProps = {
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const Root = ({ children, open: controlledOpen, onOpenChange }: RootProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = (v: boolean) => {
    setInternalOpen(v);
    onOpenChange?.(v);
  };
  return <DialogContext.Provider value={{ open, setOpen }}>{children}</DialogContext.Provider>;
};

type AsChildProps = { asChild?: boolean; children?: ReactNode; className?: string };

const withAsChild = (
  props: AsChildProps & Record<string, unknown>,
  onClick: () => void,
): ReactNode => {
  const { asChild, children, ...rest } = props;
  if (asChild && isValidElement(children)) {
    return cloneElement(children as React.ReactElement<Record<string, unknown>>, {
      ...rest,
      onClick,
    });
  }
  return (
    <button type="button" onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

export const Trigger = forwardRef<HTMLButtonElement, ComponentProps<'button'> & AsChildProps>(
  function DialogTrigger(props, _ref) {
    const { setOpen } = useContext(DialogContext);
    return <>{withAsChild(props as AsChildProps & Record<string, unknown>, () => setOpen(true))}</>;
  },
);

export const CloseTrigger = forwardRef<HTMLButtonElement, ComponentProps<'button'> & AsChildProps>(
  function DialogCloseTrigger(props, _ref) {
    const { setOpen } = useContext(DialogContext);
    return (
      <>{withAsChild(props as AsChildProps & Record<string, unknown>, () => setOpen(false))}</>
    );
  },
);

export const Backdrop = () => {
  const { open } = useContext(DialogContext);
  if (!open || typeof document === 'undefined') return null;
  return createPortal(
    <div className="fixed inset-0 bg-black/50 z-40" aria-hidden="true" />,
    document.body,
  );
};

export const Positioner = ({ children }: { children?: ReactNode }) => {
  const { open, setOpen } = useContext(DialogContext);
  if (!open || typeof document === 'undefined') return null;
  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && setOpen(false)}
    >
      {children}
    </div>,
    document.body,
  );
};

export const Content = ({
  children,
  className = '',
}: {
  children?: ReactNode;
  className?: string;
}) => (
  <div
    role="dialog"
    aria-modal="true"
    className={`relative bg-white rounded-lg shadow-xl max-w-md w-full ${className}`}
    onClick={(e) => e.stopPropagation()}
  >
    {children}
  </div>
);

export const Header = ({ asChild, children, ...props }: AsChildProps & ComponentProps<'div'>) => {
  if (asChild && isValidElement(children))
    return cloneElement(
      children as React.ReactElement<Record<string, unknown>>,
      props as Record<string, unknown>,
    );
  return (
    <div className="p-6 pb-0 flex flex-col items-center gap-2" {...props}>
      {children}
    </div>
  );
};

export const Body = ({ asChild, children, ...props }: AsChildProps & ComponentProps<'div'>) => {
  if (asChild && isValidElement(children))
    return cloneElement(
      children as React.ReactElement<Record<string, unknown>>,
      props as Record<string, unknown>,
    );
  return (
    <div className="px-6 py-4" {...props}>
      {children}
    </div>
  );
};

export const Footer = ({
  children,
  className = '',
}: {
  children?: ReactNode;
  className?: string;
}) => <div className={`px-6 pb-6 flex justify-end gap-2 ${className}`}>{children}</div>;

export const Title = ({
  children,
  className = '',
}: {
  children?: ReactNode;
  className?: string;
}) => <h2 className={`text-lg font-semibold text-gray-900 ${className}`}>{children}</h2>;

export const Description = ({
  children,
  className = '',
}: {
  children?: ReactNode;
  className?: string;
}) => <p className={`text-sm text-gray-500 ${className}`}>{children}</p>;

export const Context = DialogContext;
export const RootProvider = Root;
export const ActionTrigger = CloseTrigger;
