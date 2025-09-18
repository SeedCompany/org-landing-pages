# Org Landing Pages

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

Org Landing Pages is a dynamic web application for creating and managing campaign landing pages. Built with Astro + React + Tailwind CSS + Sanity CMS, it provides server-side rendering with integrated content management.

## Working Effectively

### Bootstrap and Setup
- Check Node.js version: `node --version` (requires Node 24+, current environment has Node 20.19.5)
- Enable Corepack for Yarn: `corepack enable`
- Copy environment variables from `src/env.d.ts` to `.env.local` with appropriate values:
  ```bash
  PUBLIC_SANITY_PROJECT_ID=your_project_id
  PUBLIC_SANITY_DATASET=staging_or_production
  PUBLIC_API_URL=http://localhost:8367
  PUBLIC_STRIPE_KEY=your_stripe_key
  PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_key
  ```

### Install Dependencies
- `yarn install` -- takes 1 minute 7 seconds. NEVER CANCEL. Set timeout to 5+ minutes.
- Check for duplicates: `yarn dedupe --check` -- takes < 1 second

### Development Workflow
- Start development server: `yarn dev` -- starts in ~1 second, runs on http://localhost:4321
- The dev server includes:
  - Hot reload for code changes
  - Integrated Sanity Studio at http://localhost:4321/studio
  - TypeScript compilation
  - Tailwind CSS processing

### Build and Production
- Build application: `yarn build` -- takes 26 seconds. NEVER CANCEL. Set timeout to 10+ minutes.
- Preview production build: `yarn preview` -- starts preview server on http://localhost:4321
- Start production server: `yarn start` -- runs production build on http://localhost:4321
- Build creates `dist/` directory with client and server assets (~11MB total)

### Code Quality and Validation
- TypeScript check: `yarn type-check` -- takes 5-7 seconds. NEVER CANCEL. Set timeout to 5+ minutes.
- Lint code: `yarn lint` -- takes 60 seconds. **WARNING**: Currently has pre-existing ESLint error in `src/pages/campaigns/[slug].astro:34` with TypeScript rule. This is a known issue.
- **ALWAYS run both type-check and lint before committing** even though lint currently fails

### Sanity CMS Integration
- Validate schema: `yarn sanity schema validate` -- takes 5 seconds. Shows warnings about import.meta in CJS format (expected).
- Generate types: `yarn sanity:gen` -- **FAILS in restricted environments** due to network access to Sanity API (fgpinugl.api.sanity.io)
- **NOTE**: Sanity commands require network access to Sanity Cloud. In restricted environments, they will fail with `ENOTFOUND` errors.

## Validation Scenarios

**ALWAYS test these complete scenarios after making changes:**

### Basic Development Flow
1. Start dev server with `yarn dev`
2. Navigate to http://localhost:4321 in browser
3. Verify main landing page loads with:
   - Header navigation with Seed Company logo
   - "God's Word Transforms Lives" hero section
   - Stories and content sections
   - Footer with contact information
4. Navigate to http://localhost:4321/studio for Sanity CMS access
5. Stop dev server (Ctrl+C)

### Production Build Flow
1. Run `yarn build` and wait for completion (26 seconds)
2. Run `yarn preview` to test production build
3. Verify same functionality as development
4. Stop preview server

### Code Quality Flow
1. Run `yarn type-check` - should pass without errors
2. Run `yarn lint` - currently fails on pre-existing issue, this is expected
3. **Do not modify code to fix the existing lint error** unless specifically tasked to do so

## Repository Structure

### Key Directories
- `src/` - Application source code
  - `components/` - Astro and React components
  - `pages/` - Astro page routes
  - `layouts/` - Page layout templates
  - `lib/` - Utility functions
  - `schemaTypes/` - Sanity schema definitions
  - `styles/` - Global styles
- `public/` - Static assets (images, fonts, etc.)
- `dist/` - Build output (generated, not committed)
- `.astro/` - Astro generated types (not committed)

### Key Files
- `package.json` - Dependencies and scripts
- `astro.config.mjs` - Astro configuration with React, Tailwind, and Sanity integrations
- `sanity.config.ts` - Sanity CMS configuration
- `sanity.cli.ts` - Sanity CLI configuration
- `tailwind.config.mjs` - Tailwind CSS configuration
- `eslint.config.mjs` - ESLint configuration
- `tsconfig.json` - TypeScript configuration
- `src/env.d.ts` - Environment variable types
- `Dockerfile` - Production deployment

### Template System
The application supports multiple campaign templates:
- Marketing Template
- Sustainers Template  
- Church Template
- Advocates Template
- Investor Reps Template

Templates are configured via Sanity CMS and use the safelist in `tailwind.config.mjs`.

## CI/CD Pipeline

The `.github/workflows/ci.yml` runs:
1. Node setup and dependency installation
2. Duplicate dependency check
3. Sanity schema validation
4. Sanity type generation
5. TypeScript checking
6. ESLint (continues on error due to known issue)
7. Production build

**CRITICAL**: The CI lint step continues on error due to the pre-existing ESLint issue. Do not be alarmed by lint failures in CI.

## Common Issues and Workarounds

### Known Issues
- **ESLint Error**: Pre-existing error in `src/pages/campaigns/[slug].astro:34` with `@typescript-eslint/no-misused-promises` rule
- **Sanity API Access**: Commands like `yarn sanity:gen` fail in restricted environments due to network limitations
- **Font Warnings**: Development server shows warnings about font loading, these are non-critical
- **Large Bundle Warning**: Vite warns about large chunks (especially Sanity Studio), this is expected

### Environment Limitations
- Node version requirement is 24+ but current environment has 20.19.4 (still works)
- Sanity API calls require external network access
- External resource loading (images, fonts from CDNs) may be blocked

### Troubleshooting
- If `yarn install` fails, ensure Corepack is enabled: `corepack enable`
- If Sanity commands fail, check network connectivity to `*.sanity.io`
- If build is slow, this is normal - builds can take up to 26 seconds
- If dev server seems unresponsive, wait at least 30 seconds for startup

## Package Manager Details
- Uses Yarn 4.9.1 with Plug'n'Play (PnP)
- Dependencies are cached in `.yarn/cache` (not committed)
- Lockfile: `yarn.lock` (committed)
- Configuration: `.yarnrc.yml`

NEVER use npm commands - always use yarn for consistency with the project setup.