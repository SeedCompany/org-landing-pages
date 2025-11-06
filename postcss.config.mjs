// @ts-check
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import panda from '@pandacss/dev/postcss';

export default {
  plugins: [panda(), tailwindcss(), autoprefixer()],
};
