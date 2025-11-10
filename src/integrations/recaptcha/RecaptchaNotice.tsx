import { css } from 'styled-system/css';
import type { JsxStyleProps } from 'styled-system/types';
import { Link } from '~/common/ui';

export const RecaptchaNotice = ({ css: cssProp }: JsxStyleProps) => (
  <div className={css({ fontSize: 'xs', color: 'fg.subtle' }, cssProp)}>
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
  </div>
);
