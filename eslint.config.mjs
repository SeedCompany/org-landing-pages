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
);
