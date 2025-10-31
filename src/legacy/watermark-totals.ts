import { graphql, graphqlClient } from '~/graphql';

export async function fetchWatermarkTotals() {
  const response = await graphqlClient
    .query(
      graphql(`
        query WatermarkCampaign {
          watermarkCampaignTotals {
            amount
          }
        }
      `),
      {},
    )
    .toPromise();
  if (response.error) {
    throw new Error('Failed to fetch watermark campaign totals', {
      cause: response.error,
    });
  }
  return response.data!.watermarkCampaignTotals;
}
