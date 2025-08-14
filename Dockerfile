ARG NODE_VERSION=24
ARG NODE_IMAGE=public.ecr.aws/docker/library/node:${NODE_VERSION}-slim

FROM ${NODE_IMAGE} AS base-runtime

RUN <<EOF
set -e

apt-get update

# Install wget/curl for health checks
apt-get install -y --no-install-recommends ca-certificates wget curl

# Clean up cache to reduce image size
apt-get clean -q -y
rm -rf /var/lib/apt/lists/*

corepack enable

EOF

WORKDIR /app
ENV NODE_ENV=production

FROM base-runtime AS builder

# Install dependencies (in separate docker layer from app code)
COPY .yarn .yarn
COPY package.json yarn.lock .yarnrc.yml ./
ENV VERBOSE_YARN_LOG=discard \
    # Use the local cache folder so libs are correctly copied in runtime stage
    YARN_ENABLE_GLOBAL_CACHE=false
RUN yarn install --immutable

COPY . .

ARG SANITY_PROJECT_ID
ARG SANITY_DATASET
ARG RECAPTCHA_SITE_KEY
ARG STRIPE_PUBLIC_KEY
ARG API_URL
ENV PUBLIC_SANITY_PROJECT_ID=$SANITY_PROJECT_ID \
    PUBLIC_SANITY_DATASET=$SANITY_DATASET \
    PUBLIC_RECAPTCHA_SITE_KEY=$RECAPTCHA_SITE_KEY \
    PUBLIC_STRIPE_KEY=$STRIPE_PUBLIC_KEY \
    PUBLIC_API_URL=$API_URL

RUN yarn sanity:gen && yarn build

# Clear all downloaded libraries to reduce image size
RUN yarn cache clean --all
# Re-install prod dependencies
RUN yarn workspaces focus --all --production

FROM base-runtime AS runtime

COPY --from=builder /app/.yarn ./.yarn
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json /app/yarn.lock /app/.yarnrc.yml /app/.pnp.* ./
COPY --from=builder /app/sanity.cli.ts /app/sanity.config.ts /app/sanity.types.ts /app/schema.json ./
COPY --from=builder /app/dist ./dist

# Cache current yarn version
RUN corepack install

LABEL org.opencontainers.image.title="Seed Landing Pages"
LABEL org.opencontainers.image.vendor="Seed Company"
LABEL org.opencontainers.image.source=https://github.com/SeedCompany/org-landing-pages

ENV HOST="0.0.0.0" PORT=80
EXPOSE 80

CMD ["yarn", "start"]

ARG GIT_HASH
ARG GIT_BRANCH
RUN echo GIT_HASH=$GIT_HASH > .env
RUN echo GIT_BRANCH=$GIT_BRANCH >> .env
