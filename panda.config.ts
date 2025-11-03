import { defineConfig } from '@pandacss/dev';
import { setupTheme } from '~/theme/theme';

export default defineConfig({
  // region codegen config
  // Putting this outside of src, and path-aliasing-it as `styled-system/*`
  // Park UI assumes this path, and I'm kinda fine with it.
  // This does straddle the line between a library & src.
  // It is generated code from a library, but it is tailored to our theme.
  outdir: './generated/styled-system',
  include: ['./src/**/*.{ts,tsx,astro}'],
  // Prevent building with an invalid theme setup.
  validation: 'error',
  // endregion

  // region styling options
  jsxFramework: 'react',
  /**
   * Only allow styles via `css` prop, not top level.
   * The main benefits are:
   * - runtime performance & bundle size.
   *   > Removing style props will reduce the size of the generated code due
   *   > to not having to check which props are style props at runtime.
   * - fewer options == more consistency
   * - it is easier to start here restricted, and then loosen later, but not
   *   the other way around.
   *
   * Cons of this are the `all` option is terser, esp for single use
   * ```tsx
   * <styled.div mx="6" />
   * ```
   * instead of
   * ```tsx
   * <styled.div css={{ mx: '6' }} />
   * ```
   *
   * Another con I'm just discovering is Park UI writes with `all`,
   * so those components would need to be adapted on import.
   */
  jsxStyleProps: 'minimal',
  // For CSS props that the theme defines (tokens), don't allow non-theme values.
  // The "[...]" escape hatch is still available when needed.
  strictTokens: true,
  // Certain CSS props allow loose values, block that.
  // The "[...]" escape hatch is still available when needed.
  strictPropertyValues: true,
  // endregion

  // region actual theme/styles
  preflight: true, // CSS reset
  ...setupTheme(),

  plugins: [
    // Park UI uses a different color system (Radix) than Panda's built-in preset.
    // Strip out those preset colors but keep the other built-in stuff.
    // https://www.radix-ui.com/colors
    {
      name: 'Remove Panda Preset Colors',
      hooks: {
        'preset:resolved': ({ utils, preset, name }) =>
          name === '@pandacss/preset-panda'
            ? utils.omit(preset, ['theme.tokens.colors', 'theme.semanticTokens.colors'])
            : preset,
      },
    },
  ],
  // endregion
});
