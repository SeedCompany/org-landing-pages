import type { PartnerCampaign } from './partnerBySlug.groq';

type RawTier = NonNullable<PartnerCampaign['donationTiers']>[number];
export type TierWithStart = RawTier & { startAmount: number };

/**
 * Tiers only store an `endAmount` in Sanity. A tier's starting point is the
 * previous tier's `endAmount` (0 for the first), so this assumes the array
 * is already ordered lowest-to-highest by the content editor.
 */
export const withStartAmounts = (tiers: RawTier[]): TierWithStart[] => {
  let previousEnd = 0;
  return tiers.map((tier) => {
    const startAmount = previousEnd;
    previousEnd = tier.endAmount ?? previousEnd;
    return { ...tier, startAmount };
  });
};
