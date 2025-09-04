import { z } from 'zod/v4/mini';

const mailingAddress = z.object({
  city: z.string(),
  country: z.nullish(z.string()),
  line1: z.string(),
  line2: z.nullish(z.string()),
  state: z
    .string()
    .check(
      z.minLength(2, 'Should be 2 character state symbol. Incorrect: Texas, Correct: TX'),
      z.maxLength(2, 'Should be 2 character state symbol. Incorrect: Texas, Correct: TX'),
      z.trim(),
    ),
  zip: z.string(),
});

export const investorSchema = z.object({
  email: z.email(),
  firstName: z.nullable(z.string()),
  lastName: z.string(),
  mailingAddress: mailingAddress,
});
