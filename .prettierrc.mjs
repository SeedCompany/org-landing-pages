// @ts-expect-error types are not defined
import * as astro from 'prettier-plugin-astro';

/** @type {import("prettier").Config} */
export default {
  plugins: [/** @type {import("prettier").Plugin} */ (astro)],
  printWidth: 100,
  singleQuote: true,
};
