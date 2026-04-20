import type { ComponentProps, ReactNode } from 'react';
import { Button } from '~/common/ui';
import type { DonateCommonProps } from '../DonationForm.tsx';

export type DonateStepProps<Values> = DonateCommonProps & {
  values: Values;
  onBack: (dirtyState?: Values) => void;
  onSubmit: (values: Values) => Promise<void>;
};

export const Buttons = ({ children }: { children?: ReactNode }) => (
  <div className="flex flex-row-reverse gap-2 [&_button]:flex-1 [&_button]:uppercase">
    {children}
  </div>
);

export const BackButton = (props: ComponentProps<typeof Button>) => (
  <Button variant="outline" {...props}>
    {props.children ?? 'Go Back'}
  </Button>
);
