import { defineSemanticTokens } from '@pandacss/dev';

// SC Dark Blue (#1d3638) ran through Radix palette generator

const palette = {
  // app background
  1: { value: { _light: '#fbfefe', _dark: '#0d1213' } },
  a1: { value: { _light: '#00c0c004', _dark: '#' } },
  // subtle background
  2: { value: { _light: '#f4fafb', _dark: '#131a1b' } },
  a2: { value: { _light: '#008ca30b', _dark: '#' } },

  // UI element background
  3: { value: { _light: '#e6f5f7', _dark: '#182829' } },
  a3: { value: { _light: '#0099ae19', _dark: '#' } },

  // Hovered UI element background
  4: { value: { _light: '#d6eff1', _dark: '#193234' } },
  a4: { value: { _light: '#009ca829', _dark: '#0066bb03' } },

  // Active / Selected UI element background
  5: { value: { _light: '#c5e6e8', _dark: '#213d3f' } },
  a5: { value: { _light: '#00929a3a', _dark: '#40e2f90b' } },

  // Subtle borders and separators
  6: { value: { _light: '#b0d9dc', _dark: '#29494b' } },
  a6: { value: { _light: '#00858f4f', _dark: '#73f4fc3f' } },

  // UI element borders and focus rings
  7: { value: { _light: '#9bc7ca', _dark: '#34595c' } },
  a7: { value: { _light: '#00717864', _dark: '#7ff3fd51' } },

  // Hovered UI element border
  8: { value: { _light: '#83aeb2', _dark: '#467073' } },
  a8: { value: { _light: '#0059617c', _dark: '#92f8ff69' } },

  // Solid backgrounds
  9: { value: { _light: '#1d3638', _dark: '#5d878a' } },
  a9: { value: { _light: '#001c1fe2', _dark: '#a7f9ff82' } },

  // Hovered solid backgrounds
  10: { value: { _light: '#30494b', _dark: '#507a7d' } },
  a10: { value: { _light: '#001f21cf', _dark: '#9cf8ff74' } },

  // Low-contrast text
  11: { value: { _light: '#4a7477', _dark: '#94c0c4' } },
  a11: { value: { _light: '#003b40b5', _dark: '#bffaffc0' } },

  // High-contrast text
  12: { value: { _light: '#20393b', _dark: '#c9eff2' } },
  a12: { value: { _light: '#001d1fdf', _dark: '#d3fbfef2' } },
};

export const scDarkBlue = defineSemanticTokens.colors({
  solid: {
    bg: { DEFAULT: palette['9'], hover: palette['10'] },
    fg: { value: '#fff' },
  },
  subtle: {
    bg: { DEFAULT: palette.a3, hover: palette.a4, active: palette.a5 },
    fg: palette.a11,
  },
  surface: {
    bg: { DEFAULT: palette.a2, active: palette.a3 },
    border: { DEFAULT: palette.a6, hover: palette.a7 },
    fg: palette.a11,
  },
  outline: {
    bg: { hover: palette.a2, active: palette.a3 },
    border: palette.a7,
    fg: palette.a11,
  },
  plain: {
    bg: { hover: palette.a3, active: palette.a4 },
    fg: palette.a11,
  },
  // Leaving this for now, because I'm not sure what Park UI requires.
  // But I'd like to remove this, and stick to semantic tokens only.
  ...palette,
});
