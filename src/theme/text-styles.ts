import { defineTextStyles } from '@pandacss/dev';

export const textStyles = defineTextStyles({
  xs: { value: { fontSize: 'xs', lineHeight: '1.125rem' } },
  sm: { value: { fontSize: 'sm', lineHeight: '1.25rem' } },
  md: { value: { fontSize: 'md', lineHeight: '1.5rem' } },
  lg: { value: { fontSize: 'lg', lineHeight: '1.75rem' } },
  xl: { value: { fontSize: 'xl', lineHeight: '1.875rem' } },
  '2xl': { value: { fontSize: '2xl', lineHeight: '2rem' } },
  '3xl': { value: { fontSize: '3xl', lineHeight: '2.375rem' } },
  '4xl': { value: { fontSize: '4xl', lineHeight: '2.75rem', letterSpacing: '-0.02em' } },
  '5xl': { value: { fontSize: '5xl', lineHeight: '3.75rem', letterSpacing: '-0.02em' } },
  '6xl': { value: { fontSize: '6xl', lineHeight: '4.5rem', letterSpacing: '-0.02em' } },
  '7xl': { value: { fontSize: '7xl', lineHeight: '5.75rem', letterSpacing: '-0.02em' } },

  title1: {
    description: 'Page Titles. It should be used sparingly.',
    value: {
      fontFamily: '{fonts.rader}',
      fontSize: { base: '5xl', sm: '7xl' },
      letterSpacing: '-0.02em',
      textWrap: 'balance',
      textTransform: 'uppercase',
    },
  } as const,

  // TODO sizing??

  header1: {
    description: 'Big Headers.',
    value: {
      fontFamily: '{fonts.serif}',
    },
  },
  header2: {
    value: {
      fontFamily: '{fonts.sans}',
    },
  },
  header4: {
    value: {
      fontFamily: '{fonts.mono}',
      fontWeight: '{fontWeights.semibold}',
    },
  },

  body1: {
    value: {
      fontFamily: '{fonts.sans}',
    },
  },
  body2: {
    value: {
      fontFamily: '{fonts.sans}',
      fontSize: 'sm',
    },
  },
  body3: {
    value: {
      fontFamily: '{fonts.mono}',
    },
  },
});
