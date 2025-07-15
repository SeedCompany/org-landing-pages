import { z } from 'zod';

export const telemetrySchema = z.object({
  app: z.string(),
  feature: z.string(),
  referrer: z.string(),
  sourceName: z.string(),
  sourceUrl: z.string().url(),
});
