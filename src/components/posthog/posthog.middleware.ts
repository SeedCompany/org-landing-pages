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

  const response = await next();
  if (!response.headers.get('Content-Type')?.includes('text/html')) {
    return response;
  }

  const injector = new HtmlHeadInjector(`<meta name="ph:distinct-id" content="${distinctId}" />`);
  const injectedHtml = response.body?.pipeThrough(injector);

  const headers = new Headers(response.headers);
  headers.delete('content-length'); // avoid mismatched length
  return new Response(injectedHtml, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
});

class HtmlHeadInjector extends TransformStream {
  constructor(injection: string) {
    let injected = false;
    const marker = '<head>';
    super({
      transform(chunk: AllowSharedBufferSource, controller) {
        if (injected) {
          controller.enqueue(chunk);
          return;
        }
        let text = new TextDecoder().decode(chunk);
        // Assuming <head> is declared
        // and not split across chunks since it is basically the first thing sent.
        if (text.includes(marker)) {
          text = text.replace(marker, marker + injection);
          controller.enqueue(new TextEncoder().encode(text));
          injected = true;
        } else {
          controller.enqueue(chunk);
        }
      },
    });
  }
}
