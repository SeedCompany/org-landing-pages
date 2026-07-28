import { fetchCampaignTotals } from '../campaigns/_components/campaign-totals.ts';

/**
 * Fetches the raised total for a partner campaign from the GraphQL endpoint,
 * keyed by its Salesforce campaign code (the campaign's `sfCode`).
 *
 * Returns `{ amount: 0 }` (and logs) when there's no code or the lookup fails,
 * so a transient error never takes down the whole campaign page. A live page
 * stuck at $0 means the campaign's `sfCode` doesn't resolve in Salesforce.
 */
export const fetchPartnerTotals = async (sfCode: string | null | undefined) => {
  if (!sfCode) return { amount: 0 };
  try {
    return await fetchCampaignTotals(sfCode);
  } catch (error) {
    console.error(`Failed to fetch campaign totals for sfCode "${sfCode}"`, error);
    return { amount: 0 };
  }
};
