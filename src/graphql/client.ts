import { fetchExchange, Client, mapExchange } from '@urql/core';
import { persistedExchange } from '@urql/exchange-persisted';

const trailingSlash = (str: string) => (str.endsWith('/') ? str : str + '/');
const GQL_API = new URL('graphql', trailingSlash(import.meta.env.PUBLIC_API_URL));

const clientInfo = {
  name: 'seed.bible',
};

export const graphqlClient = new Client({
  url: GQL_API.toString(),
  exchanges: [
    mapExchange({
      onOperation: (operation) => {
        operation.extensions ??= {};
        operation.extensions.client = clientInfo;
      },
    }),
    persistedExchange({
      enableForMutation: true,
      enableForSubscriptions: true,
      generateHash: (query, doc) => {
        const { hash } = (doc as unknown as { __meta__: { hash: string } }).__meta__;
        return Promise.resolve(hash);
      },
    }),
    fetchExchange,
  ],
  fetchOptions: {
    headers: {
      'graphql-client-name': clientInfo.name,
    },
  },
});
