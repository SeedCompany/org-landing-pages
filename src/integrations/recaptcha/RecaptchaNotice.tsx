import { styled } from 'styled-system/jsx';
import { Link } from '~/common/ui';
import type { ComponentProps } from 'react';

export const RecaptchaNotice = (props: ComponentProps<typeof NoticeRoot>) => (
  <NoticeRoot {...props}>
    This site is protected by reCAPTCHA and the Google{' '}
    <Link
      variant="plain"
      href="https://policies.google.com/privacy"
      target="_blank"
      rel="noreferrer"
    >
      Privacy Policy
    </Link>{' '}
    and{' '}
    <Link variant="plain" href="https://policies.google.com/terms" target="_blank" rel="noreferrer">
      Terms of Service
    </Link>{' '}
    apply.
  </NoticeRoot>
);

const NoticeRoot = styled('div', {
  base: { fontSize: 'xs', color: 'fg.subtle' },
});
