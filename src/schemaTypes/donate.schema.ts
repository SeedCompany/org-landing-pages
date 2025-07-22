import { z } from 'zod';
import { investorSchema } from './investor.schema';
import { paymentSchema } from './payment.schema';
import { telemetrySchema } from './telemetry.schema';

const captcha = z.object({
  v2: z.string().nullable(),
  v3: z.string().nullable(),
});

const donationIntent = z
  .object({
    custom: z.string().nullable(),
    deptId: z.string().nullable(),
    gau: z.string().nullable(),
    giveCode: z.string().nullable(),
    label: z.string().nullable(),
    project: z.string().nullable(),
  })
  .nullable();

const targets = z.object({
  amount: z
    .number({
      required_error: 'Must have an amount',
      invalid_type_error: 'Must be a whole number.',
    })
    .int('Must be a whole number')
    .positive('Must be a positive number'),
    // .transform((val) => val.toString()),
  intent: donationIntent,
});

export const donateSchema = z.object({
  cadence: z.enum(['Monthly', 'OneTime']),
  captcha: captcha,
  investor: investorSchema,
  memo: z.string().nullable(),
  payment: paymentSchema,
  targets: targets,
  telemetry: telemetrySchema,
});
