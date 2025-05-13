import { env } from 'node:process';
import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: env.SANITY_PROJECT_ID,
    dataset: env.SANITY_DATASET,
  },
  autoUpdates: true,
});
