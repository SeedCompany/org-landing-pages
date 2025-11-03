import { type ExtendableOptions, type PartialTheme } from '@pandacss/types';

const theme = {} satisfies PartialTheme;

export const setupTheme = () =>
  ({
    theme: {
      extend: theme,
    },
  }) satisfies ExtendableOptions;
