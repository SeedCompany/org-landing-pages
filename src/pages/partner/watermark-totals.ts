import { fetchCampaignTotals } from '../campaigns/_components/campaign-totals.ts';

// TODO: Replace 'Watermark' with campaignData.sfCode once the Salesforce campaign
// for this partner has been created. The sfCode field is already in the partnerCampaign
// schema and wired into the GROQ query — just pass it in as a parameter here.
// fetchCampaignTotals accepts any Salesforce campaign code string.
export const fetchPartnerTotals = async (sfCode: string) => {
  try {
    return await fetchCampaignTotals(sfCode);
  } catch {
    // TODO: Remove this fallback once the Salesforce campaign exists and sfCode is wired up.
    // Verify that the live page is showing $0 total before shipping — if it is, the sfCode
    // is not resolving correctly and needs to be fixed before launch.
    return { amount: 0 };
  }
};
