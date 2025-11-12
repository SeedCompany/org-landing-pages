import { z } from 'zod/v4/mini';
import type { CreateInvestor } from '~/graphql';
import { address } from '~/features/address';

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
  mailingAddress: address,
});

// Check if the schema conforms to the GraphQL input type
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _conformsToGQLInput: CreateInvestor | undefined = undefined as
  | z.input<typeof createInvestor>
  | undefined;
