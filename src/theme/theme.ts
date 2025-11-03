import { type ExtendableOptions, type PartialTheme } from '@pandacss/types';
import { animationStyles } from './animation-styles.ts';
import { green } from './colors/green.ts';
import { red } from './colors/red.ts';
import { slate } from './colors/slate.ts';
import { conditions } from './conditions.ts';
import { globalCss } from './global-css.ts';
import { keyframes } from './keyframes.ts';
import { layerStyles } from './layer-styles.ts';
import { recipes, slotRecipes } from './recipes';
import { textStyles } from './text-styles.ts';
import { colors } from './tokens/colors.ts';
import { durations } from './tokens/durations.ts';
import { shadows } from './tokens/shadows.ts';
import { zIndex } from './tokens/z-index.ts';

const theme = {
  animationStyles: animationStyles,
  recipes: recipes,
  slotRecipes: slotRecipes,
  keyframes: keyframes,
  layerStyles: layerStyles,
  textStyles: textStyles,

  tokens: {
    colors,
    durations,
    zIndex,
  },

  semanticTokens: {
    colors: {
      fg: {
        default: {
          value: {
            _light: '{colors.gray.12}',
            _dark: '{colors.gray.12}',
          },
        },

        muted: {
          value: {
            _light: '{colors.gray.11}',
            _dark: '{colors.gray.11}',
          },
        },

        subtle: {
          value: {
            _light: '{colors.gray.10}',
            _dark: '{colors.gray.10}',
          },
        },
      },
      border: {
        value: {
          _light: '{colors.gray.4}',
          _dark: '{colors.gray.4}',
        },
      },
      error: {
        value: {
          _light: '{colors.red.9}',
          _dark: '{colors.red.9}',
        },
      },

      green,
      red,
      // Park UI requires a gray color available
      gray: slate,
    },

    shadows,

    radii: {
      l1: { value: '{radii.xs}' },
      l2: { value: '{radii.sm}' },
      l3: { value: '{radii.md}' },
    },
  },
} satisfies PartialTheme;

export const setupTheme = () =>
  ({
    theme: {
      extend: theme,
    },

    globalCss: globalCss,
    conditions: conditions,
  }) satisfies ExtendableOptions;
