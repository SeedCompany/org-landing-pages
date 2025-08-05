import { defineField, defineType } from 'sanity';
import ImageRadioInput from '../../studio/components/ImageRadioInput.jsx';

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
        fields: [{ title: 'URL', name: 'href', type: 'url' }],
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
    { name: 'campaignData', title: 'Campaign Data' },
  ],
  fields: [
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
            imageSrc: 'https://cdn.sanity.io/media-libraries/ml0ZDygBMJD9/images/99e113372471d08ff56150c0c7dc0cf895b341ab-265x159.png',
          },
          {
            title: 'Sustainers Template',
            value: 'sustainers',
            imageSrc: 'https://cdn.sanity.io/media-libraries/ml0ZDygBMJD9/images/ad2f9a0ecd9c0299f3264f8c0a5e43ef8feade63-265x159.png',
          },
          {
            title: 'Church Template',
            value: 'church',
            imageSrc: 'https://cdn.sanity.io/media-libraries/ml0ZDygBMJD9/images/5c407b29b41d2723b538de4566e54058be399bb8-265x159.png',
          },
        ],
      },
    }),
    // Hero Section
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'array',
      group: 'hero',
      of: [richTextBlock],
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
        source: 'heading',
        maxLength: 96,
        slugify: (input) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 96),
      },
      validation: (Rule) => Rule.required().warning('A slug is required'),
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
    // Contact Email
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'email',
      validation: (Rule) => Rule.required().email().warning('A valid email is required'),
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
  ],
});
