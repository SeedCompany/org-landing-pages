/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />
/// <reference types="./sanity/generated/sanity.types.ts" />
/// <reference types="./components/posthog/posthog.d.ts" />

interface ViteTypeOptions {
  strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
  readonly PUBLIC_SANITY_PROJECT_ID: string;
  readonly PUBLIC_SANITY_DATASET: 'production' | 'staging';
  readonly PUBLIC_STRIPE_KEY: string;
  readonly PUBLIC_RECAPTCHA_SITE_KEY: string;
  readonly PUBLIC_API_URL: string;

  readonly PUBLIC_POSTHOG_KEY?: string;
  readonly PUBLIC_POSTHOG_UI_HOST?: string;
  readonly PUBLIC_POSTHOG_API_HOST?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
declare namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface ProcessEnv extends ImportMetaEnv {}
}
