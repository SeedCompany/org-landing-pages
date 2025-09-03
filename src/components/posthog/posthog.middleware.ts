import { defineMiddleware } from 'astro:middleware';
import crypto from 'node:crypto';
import { PostHog } from 'posthog-node';

export const onRequest = defineMiddleware(async (context, next) => {
  const key = import.meta.env.PUBLIC_POSTHOG_KEY;
  if (!key) {
    return await next();
  }

  const cookie = context.cookies.get(`ph_${key}_posthog`);
  const prevDistinctId =
    (cookie?.json() as { distinct_id?: string } | undefined)?.distinct_id || undefined;
  const distinctId = prevDistinctId ?? crypto.randomUUID();

  context.locals.posthog = Object.assign(
    new PostHog(key, {
      host: import.meta.env.PUBLIC_POSTHOG_UI_HOST,
      bootstrap: {
        distinctId,
      },
    }),
    {
      distinctId,
    },
  );

  const injection = `<meta name="ph:distinct-id" content="${distinctId}" />`;

  const response = await next();
  if (!response.headers.get('Content-Type')?.includes('text/html')) {
    return response;
  }
  const html = await response.text();

  const marker = '</head>';
  const injectedHtml = html.includes(marker)
    ? html.replace(marker, `${injection}\n${marker}`)
    : `${injection}\n${html}`;

  const headers = new Headers(response.headers);
  headers.delete('content-length'); // avoid mismatched length
  return new Response(injectedHtml, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
});
