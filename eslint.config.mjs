// @ts-check
import { env } from 'node:process';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';
import prettier from 'eslint-plugin-prettier/recommended';
import astro from 'eslint-plugin-astro';

export default tseslint.config(
  globalIgnores([
    '.astro',
    '.yarn',
    'dist',
    '**/generated',
    '**/*.generated.*',
    //
  ]),
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  prettier,
  astro.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['**/*.astro'],
    // Don't attempt to use TypeScript rules in astro files
    // https://github.com/ota-meshi/eslint-plugin-astro/issues/447
    extends: [tseslint.configs.disableTypeChecked],
  },
  // Adjust rules when running in the commit hook
  env.LINT_STAGED
    ? {
        rules: {
          // Disable the worst performers without fixers
          '@typescript-eslint/no-misused-promises': 'off',
          '@typescript-eslint/no-unsafe-assignment': 'off',
          '@typescript-eslint/no-unused-vars': 'off',
          '@typescript-eslint/no-unsafe-argument': 'off',
          '@typescript-eslint/no-unsafe-return': 'off',
          '@typescript-eslint/no-floating-promises': 'off',
          '@typescript-eslint/unbound-method': 'off',
          '@typescript-eslint/no-base-to-string': 'off',
          'no-redeclare': 'off',
          '@typescript-eslint/no-unsafe-member-access': 'off',
          'no-global-assign': 'off',
          '@typescript-eslint/no-unsafe-call': 'off',
          '@typescript-eslint/no-unsafe-enum-comparison': 'off',

          // We will run prettier separately for speed
          'prettier/prettier': 'off',
        },
      }
    : [],
);
