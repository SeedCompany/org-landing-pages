import { defineField, defineType } from 'sanity';

// Event pages are informational, not "giving" pages (e.g. an advisory council
// sharing a charter and event schedule) — no donation form, tiers, or CTA fields.
// Self-contained for the same reason as partnerCampaign.ts: independence from
// unrelated schema changes.

const richTextBlock = {
  type: 'block',
  marks: {
    decorators: [
      { title: 'Strong', value: 'strong' },
      { title: 'Emphasis', value: 'em' },
    ],
    annotations: [
      {
        name: 'link',
        type: 'object',
        title: 'URL',
        fields: [
          {
            title: 'URL',
            name: 'href',
            type: 'url',
          },
          {
            name: 'target',
            type: 'string',
            title: 'Open in new tab',
            options: {
              list: [
                { title: 'Same tab', value: '_self' },
                { title: 'New tab', value: '_blank' },
              ],
              layout: 'radio',
            },
            initialValue: '_self',
          },
        ],
      },
      {
        name: 'textColor',
        title: 'Text Color',
        type: 'textColor',
      },
    ],
  },
};

export default defineType({
  name: 'eventPage',
  title: 'Event Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'content', title: 'Content' },
    { name: 'schedule', title: 'Schedule' },
    { name: 'faq', title: 'FAQs' },
    { name: 'settings', title: 'Settings' },
  ],
  fields: [
    defineField({
      name: 'eventName',
      title: 'Event Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'settings',
      options: {
        source: 'eventName',
        maxLength: 96,
        slugify: (input) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      group: 'settings',
      description: 'Appears in the browser tab and is important for SEO.',
      validation: (Rule) => Rule.required(),
    }),

    // Hero
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'array',
      group: 'hero',
      of: [richTextBlock],
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroCopy',
      title: 'Hero Copy',
      type: 'array',
      group: 'hero',
      of: [richTextBlock],
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      group: 'hero',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImageAlt',
      title: 'Hero Image Alt Text',
      type: 'string',
      group: 'hero',
      validation: (Rule) =>
        Rule.required().min(5).max(100).warning('Alt text should be between 5 and 100 characters'),
    }),
    defineField({
      name: 'logoBackground',
      title: 'Add logo background',
      type: 'boolean',
      group: 'hero',
      description:
        'Places the logo on a light background — helps a dark logo stay legible on the dark hero.',
      initialValue: false,
    }),

    // Video (optional)
    defineField({
      name: 'video',
      title: 'Video',
      type: 'object',
      group: 'content',
      description: 'Optional. If provided, a video player will appear on the page.',
      fields: [
        defineField({
          name: 'src',
          title: 'Video URL',
          type: 'url',
          description:
            'Paste a Vimeo or YouTube link (a normal share link works), or a direct video file URL (.mp4).',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'poster',
          title: 'Poster Image URL',
          type: 'url',
        }),
      ],
    }),

    // About Sections
    defineField({
      name: 'aboutSections',
      title: 'About Sections',
      type: 'array',
      group: 'content',
      description: 'Use these for charter details, background, or any other informational copy.',
      of: [
        {
          type: 'object',
          name: 'aboutSection',
          title: 'About Section',
          fields: [
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'array',
              of: [richTextBlock],
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
    }),

    // Schedule
    defineField({
      name: 'scheduleHeading',
      title: 'Schedule Heading',
      type: 'string',
      group: 'schedule',
      initialValue: 'Schedule',
    }),
    defineField({
      name: 'scheduleIntro',
      title: 'Schedule Intro',
      type: 'array',
      group: 'schedule',
      description: 'Optional short blurb shown below the schedule heading.',
      of: [richTextBlock],
    }),
    defineField({
      name: 'scheduleDays',
      title: 'Schedule Days',
      type: 'array',
      group: 'schedule',
      of: [
        {
          type: 'object',
          name: 'scheduleDay',
          title: 'Day',
          fields: [
            defineField({
              name: 'dayLabel',
              title: 'Day Label',
              type: 'string',
              description: 'e.g. "Day 1 — Monday, September 15"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'timeSlots',
              title: 'Time Slots',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'timeSlot',
                  title: 'Time Slot',
                  fields: [
                    defineField({
                      name: 'time',
                      title: 'Time',
                      type: 'string',
                      description: 'e.g. "9:00 – 10:30 AM"',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'title',
                      title: 'Title',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'summary',
                      title: 'Short Summary',
                      type: 'text',
                      rows: 2,
                      description: 'Always visible under the title.',
                    }),
                    defineField({
                      name: 'details',
                      title: 'More Details',
                      type: 'array',
                      of: [richTextBlock],
                      description:
                        'Optional. When provided, an "expand" toggle appears to reveal this longer copy.',
                    }),
                  ],
                  preview: {
                    select: { title: 'title', subtitle: 'time' },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: { title: 'dayLabel' },
          },
        },
      ],
    }),

    // FAQs
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      group: 'faq',
      of: [
        {
          type: 'object',
          name: 'faq',
          title: 'FAQ',
          fields: [
            defineField({
              name: 'template',
              title: 'FAQ Template',
              type: 'string',
              options: {
                list: [
                  { title: 'Accordion', value: 'faqAccordion' },
                  { title: 'Grid', value: 'faqGrid' },
                  { title: 'List', value: 'faqList' },
                ],
                layout: 'radio',
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'array',
              of: [richTextBlock],
            }),
          ],
        },
      ],
    }),
  ],
});
