import { fetchExchange, Client, mapExchange } from '@urql/core';
import { persistedExchange } from '@urql/exchange-persisted';

const trailingSlash = (str: string) => (str.endsWith('/') ? str : str + '/');
const GQL_API = new URL('graphql', trailingSlash(import.meta.env.PUBLIC_API_URL));

const git = {
  hash: import.meta.env.PUBLIC_GIT_HASH || undefined,
  branch: import.meta.env.PUBLIC_GIT_BRANCH || undefined,
};
const clientInfo = {
  name: 'seed.bible',
  version: git.hash && git.branch ? `${git.hash} (${git.branch})` : 'local',
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
      'graphql-client-version': clientInfo.version,
    },
  },
});
