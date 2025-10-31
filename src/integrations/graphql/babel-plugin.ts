import type { PluginItem } from '@babel/core';
import { babelOptimizerPlugin } from '@graphql-codegen/client-preset';

export const graphqlBabelPlugin: PluginItem = [
  babelOptimizerPlugin,
  {
    artifactDirectory: './src/integrations/graphql/generated',
    gqlTagName: 'graphql',
  },
];
