import { z } from 'zod';
import { investorSchema } from './investor.schema';

export const donateSchema = z.object({
  cadence: z.enum(['Monthly', 'OneTime']).default('OneTime'),
  investor: investorSchema,
});
