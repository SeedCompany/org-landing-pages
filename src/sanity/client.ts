import type { ClientReturn } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import type { QueryParams } from 'sanity';
import { sanityClient as client } from 'sanity:client';

const imageBuilder = imageUrlBuilder(client);

export const sanityClient = {
  fetch: <Groq extends string>(
    query: Groq,
    params?: QueryParams,
  ): Promise<ClientReturn<Groq, unknown>> => {
    return client.fetch(query, params);
  },
  image: (source: SanityImageSource) => imageBuilder.image(source),
};
