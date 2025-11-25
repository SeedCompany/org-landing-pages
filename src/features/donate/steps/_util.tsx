import { HStack, styled } from 'styled-system/jsx';
import type { ComponentProps } from 'react';
import { Button } from '~/common/ui';
import type { DonateCommonProps } from '../DonationForm.tsx';

export type DonateStepProps<Values> = DonateCommonProps & {
  values: Values;
  onBack: (dirtyState?: Values) => void;
  onSubmit: (values: Values) => Promise<void>;
};

export const Buttons = styled(HStack, {
  base: {
    flexDir: 'row-reverse',
    '& button': { flex: '1', textTransform: 'uppercase' },
  },
});

export const BackButton = (props: ComponentProps<typeof Button>) => (
  <Button variant="outline" css={{ colorPalette: 'gray' }} {...props}>
    {props.children ?? 'Go Back'}
  </Button>
);
