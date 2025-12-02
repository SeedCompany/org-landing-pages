import type { ClientReturn } from '@sanity/client';
import { defineQuery } from 'groq';

// This isn't the best name.
// It should be more specific to this actual use case,
// to make room for different campaign projections.
// A common example of two different projections is list v detail.
export type Campaign = NonNullable<ClientReturn<typeof campaignBySlug, unknown>>;

export const campaignBySlug = defineQuery(`*[_type == "campaign" && slug.current == $slug][0] {
  templateType,
  heroTemplate,
  pageTitle,
  heading,
  subheading,
  heroCopy,
  heroImage,
  heroImageAlt,
  video { src, poster },
  slug,
  aboutSections[] {
    template,
    title,
    content,
    image,
    imageAlt,
    stats[] { value, description, icon }
  },
  body,
  ctaText,
  ctaLink,
  faqs[] { template, question, answer },
  sfCode,
  donationForm {...},
  contactEmail,
  sections[] {
    _type == "sustainerSection" => {
      title,
      description,
      benefits[] { title, description, icon },
      quote { text, source }
    },
    _type == "advocateSection" => { quote, video }
  },
  partners[] { name, logo, link }
}`);
