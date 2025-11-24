/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import * as ops from './operations';

type Documents = {
    "\n  mutation Donate($input: DonateInput!) {\n    donate(input: $input) {\n      intent {\n        clientSecret\n      }\n    }\n  }\n": typeof ops.DonateDocument,
    "\n        query WatermarkCampaign {\n          watermarkCampaignTotals {\n            amount\n          }\n        }\n      ": typeof ops.WatermarkCampaignDocument,
};
const documents: Documents = {
    "\n  mutation Donate($input: DonateInput!) {\n    donate(input: $input) {\n      intent {\n        clientSecret\n      }\n    }\n  }\n": ops.DonateDocument,
    "\n        query WatermarkCampaign {\n          watermarkCampaignTotals {\n            amount\n          }\n        }\n      ": ops.WatermarkCampaignDocument,
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

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;