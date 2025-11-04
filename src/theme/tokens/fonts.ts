import pandaPreset from '@pandacss/preset-panda';
import { defineTokens } from '@pandacss/dev';

const base = pandaPreset.theme.tokens.fonts as Record<
  'sans' | 'serif' | 'mono',
  { value: string[] }
>;

export const fonts = defineTokens.fonts({
  rader: { value: [`'Rader'`, ...base.sans.value] },
  sentinel: { value: [`'Sentinel'`, ...base.serif.value] },
  gotham: { value: [`'Montserrat'`, ...base.sans.value] },
  mono: { value: [`'Red Hat Mono Variable'`, ...base.mono.value] },
  sans: { value: `{fonts.gotham}` },
  serif: { value: `{fonts.sentinel}` },
});
