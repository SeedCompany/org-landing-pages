/** @type {import('lint-staged').Configuration} */
export default {
  // auto fix & format, but don't block the commit
  '**/*.{js,mjs,ts,tsx,astro}': `sh -c 'yarn eslint --fix "$@" || true'`,
};
