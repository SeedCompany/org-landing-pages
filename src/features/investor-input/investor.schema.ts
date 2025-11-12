import { z } from 'zod/v4/mini';
import type { CreateInvestor } from '~/graphql';
import { address } from '~/features/address';

const nonEmpty = [z.trim(), z.minLength(1, 'Required')];

export const createInvestor = z.object({
  type: z.enum(['Individual', 'Organization']),
  email: z.pipe(z.string().check(...nonEmpty), z.email('Invalid email')),
  firstName: z.nullable(z.string()),
  lastName: z.string().check(...nonEmpty),
  phone: z
    .string()
    .check(...nonEmpty, z.length(10, 'Please enter phone number with area code (10 digits)')),
  mailingAddress: address,
});

// Check if the schema conforms to the GraphQL input type
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _conformsToGQLInput: CreateInvestor | undefined = undefined as
  | z.input<typeof createInvestor>
  | undefined;
