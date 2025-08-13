/// <reference types="astro/client" />
/// <reference types="../sanity.types.ts" />

interface ViteTypeOptions {
  strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
  readonly PUBLIC_SANITY_PROJECT_ID: string;
  readonly PUBLIC_SANITY_DATASET: string;
  readonly PUBLIC_PROD: string;
  readonly PUBLIC_STRIPE_PUBLIC_KEY: string;
  readonly PUBLIC_BASE_URL: string;
  readonly PUBLIC_PORT: string;
  readonly PUBLIC_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
declare namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface ProcessEnv extends ImportMetaEnv {}
}
