import type { ClientReturn } from '@sanity/client';
import { defineQuery } from 'groq';

export interface Campaign {
  templateType: 'marketing' | 'sustainers' | 'church' | 'advocates' | 'investorReps';
  heroTemplate?: 'heroFullWidth' | 'heroSplit' | 'heroCentered';
  heading: any;
  subheading?: string;
  heroCopy: any;
  heroImage: any;
  heroImageAlt: string;
  video?: { src: string; poster?: any };
  slug: { current: string };
  aboutSections?: {
    template?: 'aboutTextOnly' | 'aboutImageLeft' | 'aboutImageRight';
    title: any;
    content: any;
    image?: any;
    imageAlt?: string;
    stats?: { value: string; description: string; icon?: string }[];
  }[];
  body: any;
  ctaText?: string;
  ctaLink?: string;
  faqs?: { template?: 'faqAccordion' | 'faqGrid' | 'faqList'; question: string; answer: any }[];
  contactEmail: string;
  sections?: {
    title?: string;
    description?: string;
    benefits?: { title: string; description: string; icon?: string }[];
    quote?: { text: string; source?: string };
    video?: any;
  }[];
  partners?: { name: string; logo?: any; link?: string }[];
}

export const campaignBySlug = defineQuery(`*[_type == "campaign" && slug.current == $slug][0] {
  templateType,
  heroTemplate,
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