import type { CodegenConfig as Codegen } from '@graphql-codegen/cli';
import {
  addTypenameSelectionDocumentTransform,
  type ClientPresetConfig,
  preset as clientPreset,
} from '@graphql-codegen/client-preset';
import type { TypeScriptTypedDocumentNodesConfig } from '@graphql-codegen/typed-document-node';
import type { TypeScriptPluginConfig } from '@graphql-codegen/typescript';
import type { TypeScriptDocumentsPluginConfig } from '@graphql-codegen/typescript-operations';
import { sortExecutableDocument } from '@graphql-tools/documents';
import { stringifyDocument as urqlPrint } from '@urql/core';
import { configDotenv as dotenv } from 'dotenv';
import { parse } from 'graphql';
import { type IGraphQLConfig as Config, type IGraphQLProject as Project } from 'graphql-config';
import { createHash } from 'node:crypto';
import { env } from 'node:process';
// noinspection ES6UnusedImports -- WebStorm wants this installed to evaluate this file.
import type {} from 'ts-node';
import type { Writable } from 'type-fest';

// WebStorm doesn't load .env files by default.
dotenv({ path: ['.env.local', '.env'] });

type CodegenConfig = TypeScriptTypedDocumentNodesConfig &
  TypeScriptPluginConfig &
  TypeScriptDocumentsPluginConfig;

const scalars = {
  URL: 'string',
  PositiveFloat: 'number',
  NonNegativeFloat: 'number',
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
        './src/integrations/graphql/generated/schema.ts': {
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
    endpoints: {
      default: API_URL.toString(),
    },
    codegen: {
      config: commonGenConfig,
      generates: {
        './src/integrations/graphql/generated/': {
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
            onExecutableDocumentNode: (docNode) => {
              // Sort the document the same way the hashing algorithm does and
              // then actually save that sorting in the printed JSON document.
              // This way when printing at runtime for APQ, the document will be in the same order.
              // https://github.com/dotansimha/graphql-code-generator/blob/76a71d9105059176e1265cc4eee78b334fd57d53/packages/presets/client/src/index.ts#L209
              // See the comment block below for why.
              const { definitions: oldDefs } = docNode;
              const { definitions: newDefs } = sortExecutableDocument(docNode);
              // Replace the definitions' array by mutating it in-place so that codegen picks it up.
              (oldDefs as Writable<typeof oldDefs>).splice(0, oldDefs.length, ...newDefs);
            },
            persistedDocuments: {
              hashAlgorithm: (normalizedPrintedDoc) => {
                /**
                 * GraphQL codegen gives us their version of a normalized document which replaces
                 * all whitespace/newlines with a single space.
                 * urql's persisted exchange does something different. It replaces leading indentation
                 * but keeps line breaks and internal indentation.
                 * Because of this, we need to reparse and print the document according to urql.
                 * The hash has to match the printed query the client will send when the server
                 * doesn't have the hash saved.
                 * The performance of this doesn't matter because this hashing happens at build time.
                 * The deployed process also only prints the doc when the server doesn't have it saved.
                 */
                const printedDoc = urqlPrint(parse(normalizedPrintedDoc));
                return createHash('sha256').update(printedDoc).digest('hex');
              },
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
