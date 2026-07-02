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
        // Partner campaign template palette (Seed brand)
        partnerDark: '#323232', // Black
        partnerCream: '#F7F1E7', // Natural
        partnerCreamText: '#CDC3B0', // Stone
        partnerRust: '#A8654C', // Terracotta
        partnerRustHover: '#8c5341', // Terracotta (darkened for hover)
        partnerDisabled: '#C1B1A8', // Granite
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
