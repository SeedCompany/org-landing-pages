import { z } from 'zod/v4/mini';
import { investorSchema } from './investor.schema';

export const donateSchema = z.object({
  investor: investorSchema,
});
