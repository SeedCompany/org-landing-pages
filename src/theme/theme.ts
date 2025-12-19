import { type ExtendableOptions, type PartialTheme } from '@pandacss/types';
import { animationStyles } from './animation-styles.ts';
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
import { fonts } from './tokens/fonts.ts';
import { shadows } from './tokens/shadows.ts';
import { zIndex } from './tokens/z-index.ts';
import { scTerracotta } from '~/theme/colors/sc-terracota.ts';
import { scForest } from '~/theme/colors/scForest.ts';

const theme = {
  animationStyles: animationStyles,
  recipes: recipes,
  slotRecipes: slotRecipes,
  keyframes: keyframes,
  layerStyles: layerStyles,
  textStyles: textStyles,

  tokens: {
    fonts,
    colors,
    durations,
    zIndex,
  },

  semanticTokens: {
    colors: {
      fg: {
        default: { value: '{colors.gray.12}' },
        muted: { value: '{colors.gray.11}' },
        subtle: { value: '{colors.gray.10}' },
      },
      border: { value: '{colors.gray.6}' },

      primary: scForest,
      secondary: scTerracotta,

      error: red,
      // Park UI requires a gray color available
      gray: slate,
    },

    shadows,

    radii: {
      l1: { value: '{radii.xs}' },
      l2: { value: '{radii.sm}' },
      l3: { value: '{radii.md}' },
      l4: { value: '{radii.lg}' },
    },
  },
} satisfies PartialTheme;

export const setupTheme = () =>
  ({
    theme: {
      extend: theme,
    },

    globalVars: {
      extend: {
        // Declare this as a "well-known" var for us to use for spacing.
        '--gap': { syntax: '<length>', inherits: true },
      },
    },
    globalCss: globalCss,
    conditions: conditions,
  }) satisfies ExtendableOptions;
