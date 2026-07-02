import { defineField, defineType } from 'sanity';
import { DonationFormSchema } from '~/features/donate/sanity';

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
  name: 'partnerCampaign',
  title: 'Partner Campaign',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'content', title: 'Content' },
    { name: 'donationTiers', title: 'Donation Tiers' },
    { name: 'faq', title: 'FAQs' },
    { name: 'donationForm', title: 'Donation Form' },
    { name: 'settings', title: 'Settings' },
  ],
  fields: [
    defineField({
      name: 'campaignName',
      title: 'Campaign Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'settings',
      options: {
        source: 'campaignName',
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
    defineField({
      name: 'sfCode',
      title: 'Salesforce Code',
      type: 'string',
      group: 'settings',
      description: 'The unique short code for this campaign in Salesforce.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'campaignStartDate',
      title: 'Campaign Start Date',
      type: 'date',
      group: 'settings',
      description: 'Controls when the donation CTA becomes active.',
    }),
    defineField({
      name: 'campaignEndDate',
      title: 'Campaign End Date',
      type: 'date',
      group: 'settings',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      group: 'settings',
      description: 'Text shown on the mobile donation button once giving is open.',
      initialValue: 'Ready to Give?',
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

    // Body
    defineField({
      name: 'body',
      title: 'Body Copy',
      type: 'array',
      group: 'content',
      of: [richTextBlock],
    }),

    // Donation Tiers
    defineField({
      name: 'donationTiers',
      title: 'Donation Tiers',
      type: 'array',
      group: 'donationTiers',
      of: [
        {
          type: 'object',
          name: 'donationTier',
          title: 'Donation Tier',
          fields: [
            defineField({
              name: 'projectHeader',
              title: 'Project Header',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'startAmount',
              title: 'Start Amount ($)',
              type: 'number',
              validation: (Rule) => Rule.required().min(0),
            }),
            defineField({
              name: 'endAmount',
              title: 'End Amount ($)',
              type: 'number',
              validation: (Rule) => Rule.required().min(0),
            }),
            defineField({
              name: 'peopleGroups',
              title: 'Number of People Groups',
              type: 'number',
              validation: (Rule) => Rule.required().min(1),
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'imageAlt',
              title: 'Image Alt Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'projectDescription',
              title: 'Project Description',
              type: 'text',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'projectBullets',
              title: 'Project Bullets',
              type: 'array',
              of: [{ type: 'string' }],
            }),
            defineField({
              name: 'hidden',
              title: 'Hidden Until Unlocked',
              type: 'boolean',
              description:
                'If enabled, this tier only appears once the current amount reaches its start amount.',
              initialValue: false,
            }),
          ],
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

    { ...DonationFormSchema, group: 'donationForm' },
  ],
});
