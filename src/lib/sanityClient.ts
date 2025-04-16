import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = 'fgpinugl';
const dataset = 'production';   
const apiVersion = '2023-10-01';

if (!projectId || !dataset || !apiVersion) {
  throw new Error('Missing required environment variables: PROJECT_ID, DATASET, or API_VERSION');
}

export const client = createClient({
  projectId: projectId,
  dataset: dataset,     
  apiVersion: apiVersion,
  useCdn: false,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: object | null | undefined): string | undefined {
    if (!source) {
        return undefined;
    }
    return builder.image(source).url();
}