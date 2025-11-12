import { z } from 'zod/v4/mini';
import { createInvestor } from '~/features/investor-input';

export const DonateInput = z.object({
  cadence: z.enum(['OneTime', 'Monthly']),
  amount: z
    .int()
    .check(
      z.gt(0, 'Donation amount must be at least $1.'),
      z.lt(1e6, 'For donations of $1M or more, please contact us directly.'),
    ),
  investor: createInvestor,
});
