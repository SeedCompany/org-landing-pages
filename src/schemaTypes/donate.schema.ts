import { z } from 'zod';
import { investorSchema } from './investor.schema';

export const donateSchema = z.object({
  investor: investorSchema,
});
