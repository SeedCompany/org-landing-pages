/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import * as ops from './operations';

type Documents = {
    "\n  mutation Donate($input: DonateInput!) {\n    donate(input: $input) {\n      intent {\n        clientSecret\n      }\n    }\n  }\n": typeof ops.DonateDocument,
    "\n        query WatermarkCampaign {\n          watermarkCampaignTotals {\n            amount\n          }\n        }\n      ": typeof ops.WatermarkCampaignDocument,
    "\n  query SponsorDetail($id: ID!) {\n    globalTranslationLeader(id: $id) {\n      id\n      shortCode\n      name\n      region\n      gender\n      focus\n      biography\n      image\n      funding {\n        remaining(applyPledges: true)\n      }\n    }\n  }\n": typeof ops.SponsorDetailDocument,
    "\n  fragment sponsorCard on GlobalTranslationLeader {\n    id\n    shortCode\n    name\n    region\n    gender\n    focus\n    biography\n    image\n    funding {\n      remaining(applyPledges: true)\n    }\n  }\n": typeof ops.SponsorCardFragmentDoc,
    "\n  query SponsorList {\n    globalTranslationLeaders {\n      items {\n        ...sponsorCard\n      }\n    }\n  }\n": typeof ops.SponsorListDocument,
};
const documents: Documents = {
    "\n  mutation Donate($input: DonateInput!) {\n    donate(input: $input) {\n      intent {\n        clientSecret\n      }\n    }\n  }\n": ops.DonateDocument,
    "\n        query WatermarkCampaign {\n          watermarkCampaignTotals {\n            amount\n          }\n        }\n      ": ops.WatermarkCampaignDocument,
    "\n  query SponsorDetail($id: ID!) {\n    globalTranslationLeader(id: $id) {\n      id\n      shortCode\n      name\n      region\n      gender\n      focus\n      biography\n      image\n      funding {\n        remaining(applyPledges: true)\n      }\n    }\n  }\n": ops.SponsorDetailDocument,
    "\n  fragment sponsorCard on GlobalTranslationLeader {\n    id\n    shortCode\n    name\n    region\n    gender\n    focus\n    biography\n    image\n    funding {\n      remaining(applyPledges: true)\n    }\n  }\n": ops.SponsorCardFragmentDoc,
    "\n  query SponsorList {\n    globalTranslationLeaders {\n      items {\n        ...sponsorCard\n      }\n    }\n  }\n": ops.SponsorListDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the ops.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Donate($input: DonateInput!) {\n    donate(input: $input) {\n      intent {\n        clientSecret\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Donate($input: DonateInput!) {\n    donate(input: $input) {\n      intent {\n        clientSecret\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        query WatermarkCampaign {\n          watermarkCampaignTotals {\n            amount\n          }\n        }\n      "): (typeof documents)["\n        query WatermarkCampaign {\n          watermarkCampaignTotals {\n            amount\n          }\n        }\n      "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SponsorDetail($id: ID!) {\n    globalTranslationLeader(id: $id) {\n      id\n      shortCode\n      name\n      region\n      gender\n      focus\n      biography\n      image\n      funding {\n        remaining(applyPledges: true)\n      }\n    }\n  }\n"): (typeof documents)["\n  query SponsorDetail($id: ID!) {\n    globalTranslationLeader(id: $id) {\n      id\n      shortCode\n      name\n      region\n      gender\n      focus\n      biography\n      image\n      funding {\n        remaining(applyPledges: true)\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment sponsorCard on GlobalTranslationLeader {\n    id\n    shortCode\n    name\n    region\n    gender\n    focus\n    biography\n    image\n    funding {\n      remaining(applyPledges: true)\n    }\n  }\n"): (typeof documents)["\n  fragment sponsorCard on GlobalTranslationLeader {\n    id\n    shortCode\n    name\n    region\n    gender\n    focus\n    biography\n    image\n    funding {\n      remaining(applyPledges: true)\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SponsorList {\n    globalTranslationLeaders {\n      items {\n        ...sponsorCard\n      }\n    }\n  }\n"): (typeof documents)["\n  query SponsorList {\n    globalTranslationLeaders {\n      items {\n        ...sponsorCard\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;