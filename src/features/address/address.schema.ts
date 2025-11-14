import { z } from 'zod/v4/mini';
import { usStateCodes } from './us-state-codes.ts';
import { setHas } from '@seedcompany/common';

const nonEmpty = [z.trim(), z.minLength(1, 'Required')];

export const address = z.object({
  line1: z.string().check(...nonEmpty),
  line2: z.nullish(z.string()),
  city: z.string().check(...nonEmpty),
  state: z.string().check(
    ...nonEmpty,
    z.refine(
      (val) => setHas(usStateCodes, val.toUpperCase()),
      'Not a valid US state/territory code',
    ),
  ),
  zip: z.string().check(...nonEmpty, z.regex(/^[0-9]{5}$/, 'Please use 5-digit zip code')),
  country: z
    .string()
    .check(...nonEmpty, z.regex(/^[a-zA-Z]{2}$/, 'Please use 2-character country code')),
});
