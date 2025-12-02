import { defineField, defineType } from 'sanity';
import { DonationFormSchema } from '~/features/donate/sanity';
import { ImageRadioInput } from '../components/ImageRadioInput';
import TemplateThumbnailMarketing from '../components/templates/MarketingTemplate.png';
import TemplateThumbnailSustainers from '../components/templates/SustainersTemplate.png';

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
  name: 'campaign',
  title: 'Campaign',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'cta', title: 'Call to Actions' },
    { name: 'template', title: 'Templates' },
    { name: 'faq', title: 'FAQs' },
    { name: 'templateContent', title: 'Template Content' },
    { name: 'donationForm', title: 'Donation Form' },
    { name: 'campaignData', title: 'Campaign Data' },
  ],
  fields: [
    defineField({
      name: 'campaignName',
      title: 'Campaign Name',
      type: 'string',
    }),
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      description: 'This title appears in the browser tab and is important for SEO.',
    }),
    // Template Selection
    defineField({
      name: 'templateType',
      title: 'Campaign Template',
      type: 'string',
      group: 'template',
      components: { input: ImageRadioInput },
      options: {
        list: [
          {
            title: 'Marketing Template',
            value: 'marketing',
            // @ts-expect-error fixme
            imageSrc:
              'https://cdn.sanity.io/media-libraries/ml0ZDygBMJD9/images/99e113372471d08ff56150c0c7dc0cf895b341ab-265x159.png',
          },
          {
            title: 'Sustainers Template',
            value: 'sustainers',
            // @ts-expect-error fixme
            imageSrc:
              'https://cdn.sanity.io/media-libraries/ml0ZDygBMJD9/images/ad2f9a0ecd9c0299f3264f8c0a5e43ef8feade63-265x159.png',
          },
          {
            title: 'Church Template',
            value: 'church',
            // @ts-expect-error fixme
            imageSrc:
              'https://cdn.sanity.io/media-libraries/ml0ZDygBMJD9/images/5c407b29b41d2723b538de4566e54058be399bb8-265x159.png',
          },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    // Hero Section
    defineField({
      name: 'heroTemplate',
      title: 'Hero Template',
      type: 'string',
      group: 'hero',
      hidden: ({ document }) => document?.templateType !== 'church',
      options: {
        list: [
          { title: 'Hero Layout 1 - Full Width Image', value: 'heroFullWidth' },
          { title: 'Hero Layout 2 - Split Image/Text', value: 'heroSplit' },
          { title: 'Hero Layout 3 - Centered Text', value: 'heroCentered' },
        ],
        layout: 'radio',
      },
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.templateType === 'church' && !value) {
            return 'A hero template must be selected for Church campaigns';
          }
          return true;
        }),
    }),
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
      hidden: ({ document }) => document?.templateType !== 'church',
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
        Rule.required()
          .min(5)
          .max(100)
          .warning('Alt text should be between 5 and 100 characters long'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'hero',
      options: {
        source: 'campaignName',
        maxLength: 96,
        slugify: (input) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 96),
      },
      validation: (Rule) => Rule.required().warning('A slug is required'),
    }),
    // About Section
    defineField({
      name: 'aboutSections',
      title: 'About Sections',
      type: 'array',
      group: 'templateContent',
      of: [
        {
          type: 'object',
          name: 'aboutSection',
          title: 'About Section',
          fields: [
            defineField({
              name: 'template',
              title: 'About Template',
              type: 'string',
              options: {
                list: [
                  { title: 'Text Only', value: 'aboutTextOnly' },
                  { title: 'Image Left', value: 'aboutImageLeft' },
                  { title: 'Image Right', value: 'aboutImageRight' },
                ],
                layout: 'radio',
              },
              validation: (Rule) => Rule.required(),
              hidden: ({ document }) => document?.templateType !== 'church',
            }),
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
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              hidden: ({ parent, document }) =>
                parent?.template === 'aboutTextOnly' || document?.templateType !== 'church',
            }),
            defineField({
              name: 'imageAlt',
              title: 'Image Alt Text',
              type: 'string',
              hidden: ({ parent, document }) =>
                parent?.template === 'aboutTextOnly' || document?.templateType !== 'church',
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  if (
                    (context.parent as any)?.template !== 'aboutTextOnly' &&
                    context.document?.templateType === 'church' &&
                    !value
                  ) {
                    return 'Alt text is required for images';
                  }
                  return true;
                }),
            }),
            defineField({
              name: 'stats',
              title: 'Statistics',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'stat',
                  title: 'Statistic',
                  fields: [
                    defineField({
                      name: 'value',
                      title: 'Value',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'description',
                      title: 'Description',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'icon',
                      title: 'Icon',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Calendar', value: 'lucide:calendar' },
                          { title: 'Book', value: 'lucide:book' },
                          { title: 'Users', value: 'lucide:users' },
                        ],
                      },
                    }),
                  ],
                },
              ],
              hidden: ({ document }) => document?.templateType !== 'marketing',
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
      of: [richTextBlock],
    }),
    // CTA
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      group: 'cta',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Button Link',
      type: 'url',
      group: 'cta',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    }),
    // Template-Specific Sections
    defineField({
      name: 'sections',
      title: 'Template Sections',
      type: 'array',
      group: 'templateContent',
      of: [
        {
          type: 'object',
          name: 'sustainerSection',
          title: 'Sustainer Section',
          fields: [
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Section Description',
              type: 'text',
            }),
            defineField({
              name: 'benefits',
              title: 'Benefits',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'benefit',
                  title: 'Benefit',
                  fields: [
                    defineField({
                      name: 'title',
                      title: 'Benefit Title',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'description',
                      title: 'Benefit Description',
                      type: 'text',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'icon',
                      title: 'Icon',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Check', value: 'lucide:check' },
                          { title: 'Heart', value: 'lucide:heart' },
                          { title: 'Star', value: 'lucide:star' },
                        ],
                      },
                    }),
                  ],
                },
              ],
            }),
            defineField({
              name: 'quote',
              title: 'Quote',
              type: 'object',
              fields: [
                defineField({
                  name: 'text',
                  title: 'Quote Text',
                  type: 'text',
                }),
                defineField({
                  name: 'source',
                  title: 'Quote Source',
                  type: 'string',
                }),
              ],
            }),
          ],
        },
      ],
      hidden: ({ document }) => document?.templateType !== 'sustainers',
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
              hidden: ({ parent, document }) => document?.templateType !== 'church',
              options: {
                list: [
                  { title: 'Accordion', value: 'faqAccordion' },
                  { title: 'Grid', value: 'faqGrid' },
                  { title: 'List', value: 'faqList' },
                ],
                layout: 'radio',
              },
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  if (context.document?.templateType === 'church' && !value) {
                    return 'An FAQ template must be selected for Church campaigns';
                  }
                  return true;
                }),
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
    // Contact Email
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'email',
      validation: (Rule) => Rule.required().warning('A valid email is required'),
    }),
    // Campaign Data
    defineField({
      name: 'leadSource',
      title: 'Lead Source',
      type: 'string',
      group: 'campaignData',
    }),
    defineField({
      name: 'subSource',
      title: 'subSource',
      type: 'string',
      group: 'campaignData',
    }),
    defineField({
      name: 'description',
      title: 'Campaign Description',
      type: 'text',
      group: 'campaignData',
    }),
    defineField({
      name: 'campaignFocus',
      title: 'Campaign Focus',
      type: 'string',
      group: 'campaignData',
    }),
    defineField({
      name: 'campaignStartDate',
      title: 'Campaign Start Date',
      type: 'date',
      group: 'campaignData',
    }),
    defineField({
      name: 'campaignEndDate',
      title: 'Campaign End Date',
      type: 'date',
      group: 'campaignData',
    }),
    defineField({
      name: 'partners',
      title: 'Partners',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'partner',
          title: 'Partner',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'logo',
              title: 'Logo',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'url',
            }),
          ],
        },
      ],
      hidden: ({ document }) => document?.templateType !== 'sustainers',
    }),
    { ...DonationFormSchema, group: 'donationForm' },
  ],
});
