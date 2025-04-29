import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import dotenv from 'dotenv';

dotenv.config();

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET;
const apiVersion = process.env.SANITY_API_VERSION;


if (!projectId || !dataset || !apiVersion) {
  throw new Error('Missing required environment variables: SANITY_PROJECT_ID, SANITY_DATASET, or SANITY_API_VERSION');
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
});

const builder = imageUrlBuilder(client);

export function urlFor(source: object | null | undefined): string | undefined {
  if (!source) {
    return undefined;
  }
  return builder.image(source).url();
}