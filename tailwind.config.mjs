// @ts-check
import typography from '@tailwindcss/typography';

/** @type {import("tailwindcss").Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  safelist: [
    'template-sustainers',
    'template-advocates',
    'template-investor-reps',
    'template-marketing',
  ],
  theme: {
    extend: {
      colors: {
        scForest: '#41452b',
        scForestHover: '#52563b',
        scForestTint: 'rgba(164, 201, 0, 0.24)',
        watermarkGreen: '#29B67E',
        watermarkDarkBlue: '#1D3638',
        watermarkAccentGrey: '#D6D4C9',
        watermarkDisabled: '#41452b',
      },
      fontFamily: {
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        rader: ['Rader', 'ui-sans-serif', 'sans-serif'],
        sentinel: ['Sentinel', 'ui-serif', 'serif'],
        lato: ['Lato', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
        'dm-serif': ['DM Serif Text', 'serif'],
        gotham: ['Gotham', 'sans-serif'],
        'gotham-office': ['Gotham Office', 'sans-serif'],
      },
      screens: {
        xxs: '430px',
        tiny: '400px',
      },
    },
  },
  plugins: [typography],
};
