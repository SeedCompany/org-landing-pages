import type { CodegenConfig as Codegen } from '@graphql-codegen/cli';
import {
  addTypenameSelectionDocumentTransform,
  type ClientPresetConfig,
} from '@graphql-codegen/client-preset';
import type { TypeScriptTypedDocumentNodesConfig } from '@graphql-codegen/typed-document-node';
import type { TypeScriptPluginConfig } from '@graphql-codegen/typescript';
import type { TypeScriptDocumentsPluginConfig } from '@graphql-codegen/typescript-operations';
import { type IGraphQLConfig as Config, type IGraphQLProject as Project } from 'graphql-config';
import { env } from 'node:process';
// WebStorm wants this installed to evaluate this file.
import type {} from 'ts-node';

type CodegenConfig = TypeScriptTypedDocumentNodesConfig &
  TypeScriptPluginConfig &
  TypeScriptDocumentsPluginConfig;

const scalars = {
  URL: 'string',
} satisfies CodegenConfig['scalars'];

const commonGenConfig = {
  useTypeImports: true,
  immutableTypes: true,
  enumsAsTypes: true,
  // Don't create types that could be used mistakenly instead of result selection
  onlyOperationTypes: true,
  scalars,
  defaultScalarType: 'unknown',
} satisfies CodegenConfig;

const trailingSlash = (str: string) => (str.endsWith('/') ? str : str + '/');
const API_URL = new URL('graphql', trailingSlash(env.PUBLIC_API_URL ?? 'http://localhost'));

const schema: Project = {
  schema: API_URL.toString(),
  extensions: {
    codegen: {
      config: commonGenConfig,
      generates: {
        './schema.graphql': {
          plugins: ['schema-ast'],
        },
      },
    } satisfies Codegen,
  },
};

const ops: Project = {
  schema: './schema.graphql',
  documents: ['./src/**/*.{astro,ts,tsx}'],
  extensions: {
    codegen: {
      config: commonGenConfig,
      generates: {
        './src/graphql/generated/': {
          preset: 'client',
          presetConfig: {
            persistedDocuments: {
              hashAlgorithm: 'sha256',
            },
          } satisfies ClientPresetConfig,
          config: {
            includeDirectives: true,
          },
          documentTransforms: [addTypenameSelectionDocumentTransform],
        },
      },
    } satisfies Codegen,
  },
};

export default {
  projects: {
    schema,
    ops,
    // this keeps the watcher from crashing on changes to this file
    default: ops,
  },
} satisfies Config;
