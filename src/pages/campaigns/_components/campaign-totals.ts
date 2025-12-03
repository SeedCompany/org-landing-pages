import { graphql, graphqlClient } from '~/graphql';

const TotalsDoc = graphql(`
  query CampaignTotals($code: ID!) {
    campaignTotals(code: $code) {
      amount
    }
  }
`);

export async function fetchCampaignTotals(code: string) {
  const response = await graphqlClient.query(TotalsDoc, { code }).toPromise();
  if (response.error) {
    throw new Error('Failed to fetch campaign totals', {
      cause: response.error,
    });
  }
  const totals = response.data?.campaignTotals;
  if (!totals) {
    throw new Error('Could not find campaign totals');
  }
  return totals;
}
