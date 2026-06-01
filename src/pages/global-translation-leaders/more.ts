import type { APIRoute } from 'astro';
import * as editorJs from '~/editorjs';
import { graphql, graphqlClient, useFragment } from '~/graphql';
import { portableText } from '~/sanity';
import { SponsorCardFragment, type SponsorCardData } from './_SponsorCard';

const SponsorListPageDoc = graphql(`
  query SponsorListPage($after: PaginationCursor!) {
    globalTranslationLeaders(first: 25, after: $after) {
      items {
        ...sponsorCard
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`);

export const GET: APIRoute = async ({ url }) => {
  const after = url.searchParams.get('after');
  if (!after) {
    return new Response(JSON.stringify({ error: 'Missing after parameter' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { data } = await graphqlClient.query(SponsorListPageDoc, { after }).toPromise();
  const list = data?.globalTranslationLeaders;

  const items: SponsorCardData[] = (list?.items ?? []).map((item) => {
    const sponsor = useFragment(SponsorCardFragment, item);
    return {
      id: sponsor.id,
      shortCode: sponsor.shortCode,
      name: sponsor.name,
      region: sponsor.region,
      gender: sponsor.gender,
      focus: sponsor.focus,
      image: sponsor.image,
      endDate: sponsor.endDate,
      funding: { remaining: sponsor.funding.remaining },
      biographyHtml: portableText.toHTML(editorJs.toPortableText(sponsor.biography)),
    };
  });

  return new Response(
    JSON.stringify({
      items,
      cursor: list?.pageInfo.endCursor ?? null,
      hasNextPage: list?.pageInfo.hasNextPage ?? false,
    }),
    { headers: { 'Content-Type': 'application/json' } },
  );
};
