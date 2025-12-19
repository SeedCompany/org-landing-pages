import { defineSemanticTokens } from '@pandacss/dev';

const palette = {
  1: { value: { _light: '#fcfdfa', _dark: '#11120d' } },
  a1: { value: { _light: '#66990005', _dark: '#11910002' } },
  // subtle background
  2: { value: { _light: '#f9fbf1', _dark: '#181913' } },
  a2: { value: { _light: '#92b7000e', _dark: '#d8f44a09' } },

  // UI element background
  3: { value: { _light: '#f2f9d1', _dark: '#24261b' } },
  a3: { value: { _light: '#b7de002e', _dark: '#e4fa8017' } },

  // Hovered UI element background
  4: { value: { _light: '#e9f2c2', _dark: '#2f3121' } },
  a4: { value: { _light: '#a4c9003d', _dark: '#ecfb8623' } },

  // Active / Selected UI element background
  5: { value: { _light: '#dfe7b8', _dark: '#3a3d28' } },
  a5: { value: { _light: '#8da90047', _dark: '#ebfb8c30' } },

  // Subtle borders and separators
  6: { value: { _light: '#d1d9aa', _dark: '#464a30' } },
  a6: { value: { _light: '#758d0055', _dark: '#ebfc913e' } },

  // UI element borders and focus rings
  7: { value: { _light: '#c0c89a', _dark: '#555a39' } },
  a7: { value: { _light: '#60750065', _dark: '#edfd924f' } },

  // Hovered UI element border
  8: { value: { _light: '#aab184', _dark: '#676d45' } },
  a8: { value: { _light: '#4f5e017b', _dark: '#effe9763' } },

  // Solid backgrounds
  9: { value: { _light: '#41452b', _dark: '#bdc597' } },
  a9: { value: { _light: '#1b1f00d4', _dark: '#f5ffc2c1' } },

  // Hovered solid backgrounds
  10: { value: { _light: '#52563b', _dark: '#b3ba8c' } },
  a10: { value: { _light: '#1e2300c4', _dark: '#f4febdb6' } },

  // Low-contrast text
  11: { value: { _light: '#72794e', _dark: '#cad2a3' } },
  a11: { value: { _light: '#343e00b1', _dark: '#f5ffc5cf' } },

  // High-contrast text
  12: { value: { _light: '#3b3f25', _dark: '#e8efc7' } },
  a12: { value: { _light: '#1a1e00da', _dark: '#f8ffd4ee' } },
};

export const scForest = defineSemanticTokens.colors({
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
