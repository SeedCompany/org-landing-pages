# Org Landing Pages

Org Landing Pages is a website for investor-facing landing pages.
Built with [Astro](https://docs.astro.build/), styled with [Tailwind CSS](https://tailwindcss.com/docs/),
and dynamic content via [Sanity](https://sanity.io/docs).

## Installation

Clone the repository & install dependencies:
```bash
yarn
```

Run locally:
```bash
yarn dev
```

Further configuration can be provided in via `.env.local`.
See [env.d.ts](./src/env.d.ts) for known vars for reference.


## Folder Structure

These folders are listed in "building-block" order, so files should never "reach up" to things larger than them.
Files should only "reach down" to compose up smaller building blocks.

The main overarching goal is to co-locate files by their subject/business feature rather than what type of file it is.
We want modules of features, not huge-flat lists of components. The former is scalable, the latter is not.

### pages/

These define routes/pages for the site.
They should contain everything needed for that page that is not deemed _re-usable_, which should be a considerable amount of code.
This doesn't mean they need to be single huge files, though. 
Let's take a `/foo` as an example.
Instead of have a single `/foo.astro` file, we can have a `/foo` folder.
The route can live at `/foo/index.astro`.
This makes room for other files to be co-located with this route/page.
Any file/folder with an underscore `_` prefix will be ignored by the router.
So we could have a `/foo/_components` folder with components specific for the `/foo` route.
```
pages/
  foo/
    index.astro
    _components/
      FooHeader.astro
      FooFooter.astro
```

I won't be prescriptive about how these components are organized, only that they're co-located with the route.

### features/

These are re-usable business features grouped by their subject/feature.
The only difference between this and `pages/` is that these are re-usable in multiple pages.

As an example:
```
features/
  donations/
    DonationCardForm.astro
    DonationThankYouSection.astro
```

It is very possible that components are refactored out of `pages/` into `features/` with the need for multiple uses arises.

These shouldn't be generic components.
For example, a `dialog/` is not a business feature, but rather a smaller building block. It would belong in `common/`.

### layouts/

Shells for pages. I imagine we only have a couple of these.
Again, prioritize co-location of files.
This mainly exists for "app-wide" setup-y things.

### integrations/

Similar to `features/`, but for 3rd-party services. I would imagine these would be referenced by all levels above
(`pages/`, `features/`, `layouts/`), since they will contain setup code & per-use code.

It makes sense to organize these by the service they're integrating with, even though they export a variety of different things.

Examples:
```
integrations/
  graphql/
  recaptcha/
  sanity/
  stripe/
```

There should _not_ be any business logic in this folder, only plumbing/transport/integration-setup code.

### common/

This is for generic components/functions/types that are re-usable across the site.
There should be no business logic in this folder.

I've also seen this called `shared/`, but picked `common/` for consistency with our other repos.

Because these are re-usable across the site, we should be a little careful on what we put in here.
It is always fine to have a generic component in a page/ or feature/.
It could later be "promoted" to `common/` if it is deemed a well-formed & needed component/function.

### Other folders

- `public/`       - static assets, but we should try to avoid adding here. 
                    These files can't be imported but have to be referenced with a static path string.
                    Because of this, and other reasons, we shouldn't use this for assets.
                    Co-locate assets with their `pages/`, `features/`.
- `assets/`       - mentioned by Astro docs/boilerplate. We reject in favor of co-location.
- `components/`   - common in UI repos. We reject in favor of co-location. This doesn't include `_components/` inside of `pages/`.
- `legacy/`       - placeholder for code that needs to be refactored into structures mentioned above.
