import { env } from 'node:process';
import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: env.PUBLIC_SANITY_PROJECT_ID,
    dataset: env.PUBLIC_SANITY_DATASET,
  },
  autoUpdates: true,
});
