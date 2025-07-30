import { z } from 'zod';

export const telemetrySchema = z.object({
  app: z.string().nullable().optional().default('Campaigns App'),
  feature: z.string(),
  referrer: z.string(),
  sourceName: z.string().nullable().optional(),
  sourceUrl: z.string().url().nullable().optional(),
});
