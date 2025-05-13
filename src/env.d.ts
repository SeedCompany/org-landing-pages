/// <reference types="@sanity/astro/module" />

interface ViteTypeOptions {
  strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
  readonly SANITY_PROJECT_ID: string;
  readonly SANITY_DATASET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
declare namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface ProcessEnv extends ImportMetaEnv {}
}
