import { z } from 'zod/v4/mini';
import type { CreateInvestor } from '~/graphql';

const usStateCodes = [
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY',
  'DC',
  'AS',
  'GU',
  'MP',
  'PR',
  'VI',
  'FM',
  'MH',
  'PW',
];

const mailingAddress = z.object({
  line1: z.string('Address line 1 is required'),
  line2: z.nullish(z.string()),
  city: z.string('City is required'),
  state: z.string('State is required').check(
    z.trim(),
    z.refine(
      (val) => usStateCodes.includes(val.toUpperCase()),
      'Not a valid US state/territory code',
    ),
  ),
  zip: z
    .string('Zip code is required')
    .check(
      z.minLength(5, 'Should be at least 5 characters'),
      z.maxLength(5, 'Please use only 5-digit zip code'),
      z.trim(),
      z.toUpperCase(),
    ),
  country: z.string(),
});

export const createInvestor = z.object({
  type: z.enum(['Individual', 'Organization']),
  email: z.email('Email is required'),
  firstName: z.nullable(z.string('First name is required')),
  lastName: z.string('Last name is required'),
  phone: z
    .string('Phone number is required')
    .check(
      z.trim(),
      z.minLength(10, 'Please enter phone number with area code (10 digits)'),
      z.maxLength(10, 'Please enter phone number with area code (10 digits)'),
    ),
  mailingAddress,
});

// Check if the schema conforms to the GraphQL input type
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _conformsToGQLInput: CreateInvestor | undefined = undefined as
  | z.input<typeof createInvestor>
  | undefined;
