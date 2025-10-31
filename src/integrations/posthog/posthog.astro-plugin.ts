import type { AstroIntegration } from 'astro';
import path from 'node:path';
import type { PostHogConfig } from 'posthog-js';
import serialize from 'serialize-javascript';

export const posthogAstro = (
  token: string | undefined,
  options: Partial<PostHogConfig>,
): AstroIntegration => ({
  name: 'posthog',
  hooks: {
    'astro:config:setup': ({ injectScript, addMiddleware }) => {
      const middleware = path.resolve('./src/integrations/posthog/posthog.middleware.ts');
      addMiddleware({
        order: 'pre',
        entrypoint: middleware,
      });

      injectScript(
        'page',
        `
        import postHogClient from 'posthog-js';
        globalThis.posthog = postHogClient.init('${token}', {
          loaded: (posthog) => {
            const distinctId = document.querySelector('meta[name="ph:distinct-id"]')?.content;
            if (distinctId && posthog.get_distinct_id() && posthog.get_distinct_id() !== distinctId) {
              posthog.identify(distinctId);
            }
          },
          ...(${serialize(options)})
        });
        `,
      );
    },
  },
});
