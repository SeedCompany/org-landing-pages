import type { ClientReturn } from '@sanity/client';
import { defineQuery } from 'groq';

export type EventPage = NonNullable<ClientReturn<typeof eventBySlug, unknown>>;

export const eventBySlug = defineQuery(`*[_type == "eventPage" && slug.current == $slug][0] {
  eventName,
  pageTitle,
  heading,
  subheading,
  heroCopy,
  heroImage,
  heroImageAlt,
  logoBackground,
  slug,
  video { src, poster },
  aboutSections[] {
    title,
    content
  },
  scheduleHeading,
  scheduleIntro,
  scheduleDays[] {
    dayLabel,
    timeSlots[] {
      time,
      title,
      summary,
      details
    }
  },
  faqs[] { template, question, answer }
}`);
