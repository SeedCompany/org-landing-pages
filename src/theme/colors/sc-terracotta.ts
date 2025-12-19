import { defineSemanticTokens } from '@pandacss/dev';

const palette = {
  1: { value: { _light: '#fefdfc', _dark: '#15100e' } },
  a1: { value: { _light: '#aa550003', _dark: '#de000005' } },
  // subtle background
  2: { value: { _light: '#fff8f5', _dark: '#1e1512' } },
  a2: { value: { _light: '#ff4d000a', _dark: '#fe5a240e' } },

  // UI element background
  3: { value: { _light: '#feece6', _dark: '#321d15' } },
  a3: { value: { _light: '#f53e0019', _dark: '#fb662e24' } },

  // Hovered UI element background
  4: { value: { _light: '#fce1d6', _dark: '#462011' } },
  a4: { value: { _light: '#ed450029', _dark: '#ff551139' } },

  // Active / Selected UI element background
  5: { value: { _light: '#fad4c7', _dark: '#542918' } },
  a5: { value: { _light: '#e93c0038', _dark: '#ff662a48' } },

  // Subtle borders and separators
  6: { value: { _light: '#f3c7b7', _dark: '#633625' } },
  a6: { value: { _light: '#d5390048', _dark: '#ff7d4b58' } },

  // UI element borders and focus rings
  7: { value: { _light: '#ebb5a1', _dark: '#7a4733' } },
  a7: { value: { _light: '#c937005e', _dark: '#fe8b5e71' } },

  // Hovered UI element border
  8: { value: { _light: '#df9a81', _dark: '#9d5b42' } },
  a8: { value: { _light: '#bf33007e', _dark: '#ff8f6596' } },

  // Solid backgrounds
  9: { value: { _light: '#a8654c', _dark: '#a8654c' } },
  a9: { value: { _light: '#832400b3', _dark: '#ff966ea2' } },

  // Hovered solid backgrounds
  10: { value: { _light: '#945c47', _dark: '#9a583f' } },
  a10: { value: { _light: '#6b1d00b8', _dark: '#ff8d6193' } },

  // Low-contrast text
  11: { value: { _light: '#905843', _dark: '#f2a98e' } },
  a11: { value: { _light: '#691d00bc', _dark: '#feb195f2' } },

  // High-contrast text
  12: { value: { _light: '#42322d', _dark: '#ffddd1' } },
  a12: { value: { _light: '#1a0600d2', _dark: '#ffddd1' } },
};

export const scTerracotta = defineSemanticTokens.colors({
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
