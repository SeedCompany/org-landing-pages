import { z } from 'zod';

const contactPreferences = z.object({
  methods: z.enum(['Email', 'Phone', 'Text']).nullable(),
  times: z.enum(['Afternoon', 'Evening', 'Morning']).nullable(),
});

const mailingAddress = z.object({
  city: z.string(),
  country: z.string(),
  line1: z.string(),
  line2: z.string().nullable(),
  state: z
    .string()
    .trim()
    .min(2, 'Should be 2 character state symbol. Incorrect: Texas, Correct: TX')
    .max(
      2,
      'Should be 2 character state symbol. Incorrect: Texas, Correct: TX',
    ),
  zip: z.string(),
});

export const investorSchema = z.object({
  contactPreferences: contactPreferences,
  email: z.string().email(),
  firstName: z.string().nullable(),
  lastName: z.string(),
  mailingAddress: mailingAddress,
  phone: z
    .string()
    .trim()
    .min(10, 'Phone number should be at least 10 digits')
    .nullable(),
  type: z.enum(['Individual', 'Organization']),
});
