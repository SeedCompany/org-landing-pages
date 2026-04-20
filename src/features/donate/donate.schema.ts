import { createContext, createElement, useContext, type ReactNode } from 'react';
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
  paymentComplete: z.boolean().check(z.refine((val) => val === true, 'Please complete payment')),
});

const Ctx = createContext<typeof DonateInput>(DonateInput);

export const DonateSchemaProvider = ({
  value,
  children,
}: {
  value: typeof DonateInput;
  children: ReactNode;
}) => createElement(Ctx.Provider, { value }, children);

export const useDonateSchema = () => useContext(Ctx);
