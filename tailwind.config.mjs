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
    'hero-gradient',
    'section-gradient',
  ],
  theme: {
    extend: {
      colors: {
        watermarkGreen: '#29B67E',
        watermarkDarkBlue: '#1D3638',
        watermarkAccentGrey: '#D6D4C9',
        lightGray: '#ebebec',
      },
      fontFamily: {
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
      backgroundImage: {
        'hero-bg-overlay': 'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, #ebebeb 100%)',
        'bg-gradient': 'linear-gradient(to bottom, #ebebec 0%, #ebebec 50%, #ffffff 100%)',
      },
    },
  },
  plugins: [typography],
};
