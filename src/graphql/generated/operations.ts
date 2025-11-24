import type * as Schema from './schema.ts';

import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type DonateMutationVariables = Schema.Exact<{
  input: Schema.DonateInput;
}>;


export type DonateMutation = { readonly __typename: 'Mutation', readonly donate: { readonly __typename: 'DonateOutput', readonly intent?: { readonly __typename: 'StripePaymentIntent', readonly clientSecret?: string | null } | null } };

export type WatermarkCampaignQueryVariables = Schema.Exact<{ [key: string]: never; }>;


export type WatermarkCampaignQuery = { readonly __typename: 'Query', readonly watermarkCampaignTotals: { readonly __typename: 'WatermarkCampaignTotals', readonly amount: number } };


export const DonateDocument = {"__meta__":{"hash":"d061bcd4cb2432f9df51139f474897993188f45b9248ffd133ee9f7ea6ff0d26"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Donate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DonateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"donate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"intent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"clientSecret"}}]}}]}}]}}]} as unknown as DocumentNode<DonateMutation, DonateMutationVariables>;
export const WatermarkCampaignDocument = {"__meta__":{"hash":"1e11fcfe8697edb14e21bf1163fbeb17ab688fccfd831bc327bff989c30fe922"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WatermarkCampaign"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"watermarkCampaignTotals"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}}]}}]} as unknown as DocumentNode<WatermarkCampaignQuery, WatermarkCampaignQueryVariables>;