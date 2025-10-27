import type { ClientReturn } from '@sanity/client';
import type { QueryParams } from 'sanity';
import { sanityClient as client } from 'sanity:client';

export const sanityClient = {
  fetch: <Groq extends string>(
    query: Groq,
    params?: QueryParams,
  ): Promise<ClientReturn<Groq, unknown>> => {
    return client.fetch(query, params);
  },
};
