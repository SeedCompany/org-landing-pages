import { InfoIcon, AlertCircleIcon, CheckCircleIcon, AlertTriangleIcon } from 'lucide-react';
import { forwardRef, type ComponentProps, type ReactNode } from 'react';

type AlertStatus = 'info' | 'error' | 'success' | 'warning';

const statusStyles: Record<AlertStatus, string> = {
  info: 'bg-blue-50 border-blue-200 text-blue-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  success: 'bg-green-50 border-green-200 text-green-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
};

const StatusIcon = ({ status }: { status: AlertStatus }) => {
  const cls = 'h-5 w-5 shrink-0';
  if (status === 'error') return <AlertCircleIcon className={cls} />;
  if (status === 'success') return <CheckCircleIcon className={cls} />;
  if (status === 'warning') return <AlertTriangleIcon className={cls} />;
  return <InfoIcon className={cls} />;
};

type RootProps = ComponentProps<'div'> & { status?: AlertStatus };

export type { RootProps };

export const Root = forwardRef<HTMLDivElement, RootProps>(function AlertRoot(
  { status = 'info', className = '', children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      role="alert"
      className={`flex items-start gap-3 rounded-md border p-3 text-sm ${statusStyles[status]} ${className}`}
      data-status={status}
      {...props}
    >
      {children}
    </div>
  );
});

export const Indicator = ({ children }: { children?: ReactNode }) => (
  <span className="shrink-0 mt-0.5">{children ?? <StatusIcon status="info" />}</span>
);

export const Content = ({
  children,
  className = '',
}: {
  children?: ReactNode;
  className?: string;
}) => <div className={`flex-1 ${className}`}>{children}</div>;

export const Title = ({ children }: { children?: ReactNode }) => (
  <p className="font-medium">{children}</p>
);

export const Description = ({ children }: { children?: ReactNode }) => (
  <p className="mt-1">{children}</p>
);
