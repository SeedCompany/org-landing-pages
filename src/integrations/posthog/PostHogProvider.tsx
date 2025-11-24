import { PostHogProvider as ReactProvider } from 'posthog-js/react';
import { posthog } from 'posthog-js';

export const PostHogProvider = ({ children }: { children: React.ReactNode }) => (
  <ReactProvider client={posthog}>{children}</ReactProvider>
);
