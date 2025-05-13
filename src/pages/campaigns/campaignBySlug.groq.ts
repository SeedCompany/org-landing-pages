import type { ClientReturn } from '@sanity/client';
import { defineQuery } from 'groq';

// This isn't the best name.
// It should be more specific to this actual use case,
// to make room for different campaign projections.
// A common example of two different projections is list v detail.
export type Campaign = ClientReturn<typeof campaignBySlug>;

export const campaignBySlug = defineQuery(`*[_type == "campaign" && slug.current == $slug][0] {
  heading,
  heroCopy,
  body,
  heroImage,
  heroImageAlt,
  ctaText,
  ctaLink,
  templateType,
  contactEmail,
  faqs[] { question, answer },
  sections[] {
    _type,
    _type == "sustainerSection" => {
      title,
      description,
      benefits[] { title, description, icon },
      quote { text, source }
    },
    _type == "advocateSection" => { quote, video }
  },
  partners[]{
    name,
    logo
  }
}`);
