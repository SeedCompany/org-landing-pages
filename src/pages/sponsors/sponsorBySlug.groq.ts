import type { ClientReturn } from '@sanity/client';
import { defineQuery } from 'groq';

export type Sponsor = ClientReturn<typeof sponsorBySlug> & {};

export const sponsorBySlug = defineQuery(`*[_type == "sponsor" && slug.current == $slug][0] {
  name,
  slug,
  region,
  gender,
  gtlId,
  focus,
  bio,
  image,
  isSponsored,
  templateType,
  heroTemplate,
  pageTitle,
  heading,
  subheading,
  heroCopy,
  heroImage,
  heroImageAlt,
  video { src, poster },
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
