import { defineTokens } from '@pandacss/dev';

/**
 * Seed Company Brand Colors
 * https://www.figma.com/slides/QPk4bEjOUMcz3CY6vNQYTX/Brand-Guide-update-2025?node-id=1-1373&t=UOQ1dxiIQCIWj4eu-0
 */
const sc = defineTokens.colors({
  // Primaries
  green: { value: '#28b67e' },
  darkBlue: { value: '#1d3638' },
  // Neutrals
  natural: { value: '#f7f1e7' },
  stone: { value: '#cdc3b0' },
  // Grays
  white: { value: '#ffffff' },
  lightGray: { value: '#ebebec' },
  darkGray: { value: '#636466' },
  black: { value: '#323232' },
  // Pacific
  sea: { value: '#03424b' },
  gold: { value: '#b68b55' },
  sand: { value: '#d4bc9d' },
  // Americas
  forest: { value: '#41452b' },
  terracotta: { value: '#a8654c' },
  granite: { value: '#c1b1a8' },
  // Africa
  burnt: { value: '#812f13' },
  sun: { value: '#e35c2a' },
  desert: { value: '#f7ae6c' },
  // Europe and the Middle East
  shadow: { value: '#5c3d34' },
  dusk: { value: '#c08863' },
  dawn: { value: '#d2cfaf' },
  // Asia
  depth: { value: '#414e46' },
  coral: { value: '#e96c50' },
  peach: { value: '#f8ae85' },
});

const black = defineTokens.colors({
  DEFAULT: { value: '#000000' },
  // "a" prefix here stands for "alpha"
  a1: { value: 'rgba(0, 0, 0, 0.05)' },
  a2: { value: 'rgba(0, 0, 0, 0.1)' },
  a3: { value: 'rgba(0, 0, 0, 0.15)' },
  a4: { value: 'rgba(0, 0, 0, 0.2)' },
  a5: { value: 'rgba(0, 0, 0, 0.3)' },
  a6: { value: 'rgba(0, 0, 0, 0.4)' },
  a7: { value: 'rgba(0, 0, 0, 0.5)' },
  a8: { value: 'rgba(0, 0, 0, 0.6)' },
  a9: { value: 'rgba(0, 0, 0, 0.7)' },
  a10: { value: 'rgba(0, 0, 0, 0.8)' },
  a11: { value: 'rgba(0, 0, 0, 0.9)' },
  a12: { value: 'rgba(0, 0, 0, 0.95)' },
});

const white = defineTokens.colors({
  DEFAULT: { value: '#ffffff' },
  a1: { value: 'rgba(255, 255, 255, 0.05)' },
  a2: { value: 'rgba(255, 255, 255, 0.1)' },
  a3: { value: 'rgba(255, 255, 255, 0.15)' },
  a4: { value: 'rgba(255, 255, 255, 0.2)' },
  a5: { value: 'rgba(255, 255, 255, 0.3)' },
  a6: { value: 'rgba(255, 255, 255, 0.4)' },
  a7: { value: 'rgba(255, 255, 255, 0.5)' },
  a8: { value: 'rgba(255, 255, 255, 0.6)' },
  a9: { value: 'rgba(255, 255, 255, 0.7)' },
  a10: { value: 'rgba(255, 255, 255, 0.8)' },
  a11: { value: 'rgba(255, 255, 255, 0.9)' },
  a12: { value: 'rgba(255, 255, 255, 0.95)' },
});

const inherit = defineTokens.colors({
  DEFAULT: { value: 'inherit' },
});
const current = defineTokens.colors({
  DEFAULT: { value: 'currentColor' },
});
const transparent = defineTokens.colors({
  DEFAULT: { value: 'rgb(0 0 0 / 0)' },
});

export const colors = {
  sc,

  black,
  white,

  inherit,
  current,
  transparent,
};
