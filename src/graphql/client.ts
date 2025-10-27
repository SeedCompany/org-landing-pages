import { fetchExchange, Client } from '@urql/core';
import { persistedExchange } from '@urql/exchange-persisted';

const trailingSlash = (str: string) => (str.endsWith('/') ? str : str + '/');
const GQL_API = new URL('graphql', trailingSlash(import.meta.env.PUBLIC_API_URL));

export const graphqlClient = new Client({
  url: GQL_API.toString(),
  exchanges: [
    persistedExchange({
      enableForMutation: true,
      enableForSubscriptions: true,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-member-access
      generateHash: (query, document) => (document as any).__meta__.hash,
    }),
    fetchExchange,
  ],
});
