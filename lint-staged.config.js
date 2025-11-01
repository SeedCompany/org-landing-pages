/** @type {import('lint-staged').Configuration} */
export default {
  // auto fix & format, but don't block the commit
  '**/*.{js,mjs,ts,tsx,astro}': `sh -c 'LINT_STAGED=1 yarn eslint --fix "$@" || true'`,
};
