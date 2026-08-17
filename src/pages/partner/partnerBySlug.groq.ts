import type { ClientReturn } from '@sanity/client';
import { defineQuery } from 'groq';

export type PartnerCampaign = NonNullable<ClientReturn<typeof partnerBySlug, unknown>>;

export const partnerBySlug =
  defineQuery(`*[_type == "partnerCampaign" && slug.current == $slug][0] {
  campaignName,
  pageTitle,
  heading,
  subheading,
  heroCopy,
  heroImage,
  heroImageAlt,
  logoBackground,
  slug,
  video { src, poster },
  projectsHeading,
  aboutSections[] {
    title,
    content
  },
  ctaText,
  campaignStartDate,
  campaignEndDate,
  donationTiers[] {
    endAmount,
    peopleGroups,
    projectsUnlocked,
    image { asset->{ url } },
    imageAlt,
    projectHeader,
    projectDescription,
    projectBullets,
    hidden,
    languageProjects {
      heading,
      linkText,
      projects[] {
        languageName,
        // Country is never returned for high-sensitivity projects, regardless of what is stored.
        "country": select(sensitivity == "high" => null, country),
        region,
        milestone,
        sensitivity,
        amount
      }
    }
  },
  faqs[] { template, question, answer },
  sfCode,
  donationForm {...}
}`);
