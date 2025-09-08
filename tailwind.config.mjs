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
        watermarkGreen: '#29B67E',
        watermarkDarkBlue: '#1D3638',
        watermarkAccentGrey: '#D6D4C9',
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
        'dm-serif': ['DM Serif Text', 'serif'],
      },
      screens: {
        xxs: '430px',
        tiny: '400px',
      },
    },
  },
  plugins: [typography],
};
