/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />
/// <reference types="../sanity.types.ts" />

interface ViteTypeOptions {
  strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
  readonly PUBLIC_SANITY_PROJECT_ID: string;
  readonly PUBLIC_SANITY_DATASET: 'production' | 'staging';
  readonly PUBLIC_STRIPE_KEY: string;
  readonly PUBLIC_RECAPTCHA_SITE_KEY: string;
  readonly PUBLIC_STRIPE_PUBLIC_KEY: string;
  readonly PUBLIC_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
declare namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface ProcessEnv extends ImportMetaEnv {}
}
