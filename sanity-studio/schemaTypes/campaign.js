import { defineField, defineType } from 'sanity';
import ImageRadioInput from '../components/ImageRadioInput';

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
  ],
  fields: [
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
        Rule.required().min(5).max(100).warning('Alt text should be between 5 and 100 characters long'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'hero',
      options: {
        source: 'heading',
        maxLength: 96,
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, '-').slice(0, 96),
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
    // Template Selection
    defineField({
      name: 'templateType',
      title: 'Page Template',
      type: 'string',
      group: 'template',
      components: { input: ImageRadioInput },
      options: {
        list: [
          { title: 'Sustainers Template', value: 'sustainers', imageSrc: '/static/Sustainer_Template.png' },
          { title: 'Advocates Template', value: 'advocates', imageSrc: '/static/Advocates_Template.png' },
          { title: 'Investor Reps Template', value: 'investorReps', imageSrc: '/static/Investor_Rep_Template.png' },
          { title: 'Marketing Template', value: 'marketing', imageSrc: '/static/Marketing_Template.png' },
        ],
      },
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
                          // Add more icons as needed
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
  ],
});