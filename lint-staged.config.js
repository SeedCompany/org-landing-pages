/** @type {import('lint-staged').Configuration} */
export default {
  '**/*.{js,mjs,ts,tsx,astro}': (files) => {
    // auto fix & format
    const cmd = `LINT_STAGED=1 yarn eslint --fix ${files.join(' ')}`;
    // but don't block the commit
    return `sh -c '${cmd} || true'`;
  },
};
