import { defineSemanticTokens } from '@pandacss/dev';

// SC Green (#28b67e) ran through Radix palette generator

const palette = {
  // app background
  1: { value: { _light: '#fafefc', _dark: '#0c130f' } },
  a1: { value: { _light: '#00cc6605', _dark: '#00bb0003' } },
  // subtle background
  2: { value: { _light: '#f3fbf7', _dark: '#121b16' } },
  a2: { value: { _light: '#00aa550c', _dark: '#29f9850b' } },

  // UI element background
  3: { value: { _light: '#e2f8ec', _dark: '#122d20' } },
  a3: { value: { _light: '#00c2581d', _dark: '#1aff911e' } },

  // Hovered UI element background
  4: { value: { _light: '#d0f3df', _dark: '#0f3b28' } },
  a4: { value: { _light: '#00be522f', _dark: '#06ff942d' } },

  // Active / Selected UI element background
  5: { value: { _light: '#bbebd1', _dark: '#154932' } },
  a5: { value: { _light: '#00b45344', _dark: '#22ff9e3c' } },

  // Subtle borders and separators
  6: { value: { _light: '#a0e1bf', _dark: '#1d583e' } },
  a6: { value: { _light: '#00af545f', _dark: '#39fda74d' } },

  // UI element borders and focus rings
  7: { value: { _light: '#7bd2a7', _dark: '#25694a' } },
  a7: { value: { _light: '#00a95584', _dark: '#47fdaa5f' } },

  // Hovered UI element border
  8: { value: { _light: '#34be85', _dark: '#2b7d59' } },
  a8: { value: { _light: '#00ad66cb', _dark: '#4bffb074' } },

  // Solid backgrounds
  9: { value: { _light: '#28b67e', _dark: '#28b67e' } },
  a9: { value: { _light: '#00a966d7', _dark: '#33ffafb1' } },

  // Hovered solid backgrounds
  10: { value: { _light: '#0caa73', _dark: '#0caa73' } },
  a10: { value: { _light: '#00a66cf3', _dark: '#0affaaa4' } },

  // Low-contrast text
  11: { value: { _light: '#00834f', _dark: '#50d399' } },
  a11: { value: { _light: '#00834f', _dark: '#5fffb8d0' } },

  // High-contrast text
  12: { value: { _light: '#113d2a', _dark: '#adf2cd' } },
  a12: { value: { _light: '#002f1bee', _dark: '#b5fed7f2' } },
};

export const scGreen = defineSemanticTokens.colors({
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
