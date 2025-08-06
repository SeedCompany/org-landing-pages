import { z } from 'zod';

const mailingAddress = z.object({
  city: z.string(),
  country: z.string().nullable().optional(),
  line1: z.string(),
  line2: z.string().nullable().optional(),
  state: z
    .string()
    .trim()
    .min(2, 'Should be 2 character state symbol. Incorrect: Texas, Correct: TX')
    .max(2, 'Should be 2 character state symbol. Incorrect: Texas, Correct: TX'),
  zip: z.string(),
});

export const investorSchema = z.object({
  email: z.string().email(),
  firstName: z.string().nullable(),
  lastName: z.string(),
  mailingAddress: mailingAddress,
});
