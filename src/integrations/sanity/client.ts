import type { SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { sanityClient as _configuredClient } from 'sanity:client';

// TS treats the client as a different type since they come from different packages.
// @sanity/client vs. sanity:client
// Typecast so TS understands the client is actually the one from the canonical package, not the wrapper.
const baseClient = _configuredClient as unknown as SanityClient;

const imageBuilder = imageUrlBuilder(baseClient);

export const sanityClient = Object.assign(Object.create(baseClient) as SanityClient, {
  image: (source: SanityImageSource) => imageBuilder.image(source),
});
