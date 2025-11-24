import type { SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { sanityClient as _configuredClient } from 'sanity:client';

// TS treats the client as a different type since they come from different packages.
// @sanity/client vs. sanity:client
// Typecast so TS understands the client is actually the one from the canonical package, not the wrapper.
const baseClient = _configuredClient as unknown as SanityClient;

const imageBuilder = imageUrlBuilder(baseClient);

const extra = {
  image: (source: SanityImageSource) => imageBuilder.image(source),
};

export const sanityClient = new Proxy(baseClient, {
  get(_, p) {
    if (p in extra) {
      return extra[p as keyof typeof extra];
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const out = Reflect.get(baseClient, p);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    return typeof out === 'function' ? out.bind(baseClient) : out;
  },
}) as SanityClient & typeof extra;
