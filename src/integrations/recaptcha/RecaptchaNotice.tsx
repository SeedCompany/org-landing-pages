import type { ComponentProps } from 'react';
import { Link } from '~/common/ui';

export const RecaptchaNotice = ({ className = '', ...props }: ComponentProps<'div'>) => (
  <div className={`text-xs text-gray-500 ${className}`} {...props}>
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
