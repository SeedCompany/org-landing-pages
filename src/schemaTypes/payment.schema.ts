import { z } from 'zod';

const savedPayment = z
  .object({
    id: z.string().trim(),
  })
  .nullable();

const stripePayment = z
  .object({
    confirmationToken: z.string().trim().nullable(),
    default: z.boolean().nullable(),
    save: z.boolean().nullable(),
    token: z.string().nullable(),
  })
  .nullable();

export const paymentSchema = z.object({
  saved: savedPayment,
  stripe: stripePayment,
});
