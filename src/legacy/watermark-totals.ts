import { graphqlClient, graphql } from '../graphql';

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
    console.error('GraphQL Errors:', response.error);
    throw new Error('Failed to fetch watermark campaign totals');
  }
  return response.data!.watermarkCampaignTotals;
}
