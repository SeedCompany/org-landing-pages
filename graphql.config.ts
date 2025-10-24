import type { CodegenConfig as Codegen } from '@graphql-codegen/cli';
import { preset as clientPreset } from '@graphql-codegen/client-preset';
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
        './src/graphql/generated/schema.ts': {
          plugins: ['typescript'],
          config: {
            onlyOperationTypes: true,
            inputMaybeValue: 'T | null | undefined',
          } satisfies TypeScriptPluginConfig,
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
          preset: {
            ...clientPreset,
            //region Re-work client preset
            // gql -> graphql-fn-typed
            // graphql -> operations & schema
            buildGeneratesSection: async (options) => {
              let entries = await clientPreset.buildGeneratesSection(options);

              // we will do our own index file, since we're adjusting filenames, this is easier.
              entries = entries.filter((x) => !x.filename.endsWith('index.ts'));

              const gqlTag = entries.find((x) => x.filename.endsWith('graphql-fn-typed.ts'))!;
              const gqlTagPlugin = gqlTag.pluginMap['gen-dts']!;
              gqlTag.pluginMap['gen-dts'] = {
                ...gqlTagPlugin,
                plugin: async (...args) => {
                  const res = (await gqlTagPlugin.plugin(...args)) as string;
                  return (
                    "import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';\n" +
                    "import * as ops from './operations';\n\n" +
                    res
                      .replace(/^(.|\n)+(?=type Documents =)/, '')
                      .replaceAll(/types\./g, 'ops.')
                      .replaceAll("import('./graphql')", "import('./operations')")
                  );
                },
              };

              const ops = entries[0]!;
              ops.plugins.shift(); // no eslint disable
              ops.plugins.shift(); // no typescript schema
              ops.plugins.shift(); // replacing typescript-operations below
              ops.plugins.unshift({
                'typescript-operations': {
                  // preResolveTypes: true,
                  namespacedImportName: 'Schema',
                } satisfies TypeScriptDocumentsPluginConfig,
              });
              ops.plugins.unshift({
                ['add']: { content: `import type * as Schema from './schema.ts';\n` },
              });

              return entries;
            },
            //endregion
          },
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
