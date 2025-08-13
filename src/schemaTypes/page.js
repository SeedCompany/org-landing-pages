import { defineField, defineType } from 'sanity';
import ImageRadioInput from '../components/ImageRadioInput.jsx';

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
  name: 'page',
  title: 'Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'cta', title: 'Call to Actions' },
    { name: 'template', title: 'Templates' },
    { name: 'content', title: 'Content' },
    { name: 'video', title: 'Video' },
    { name: 'donation', title: 'Donation' },
    { name: 'faq', title: 'FAQs' },
  ],
  fields: [
    // Template Selection
    defineField({
      name: 'templateType',
      title: 'Page Template',
      type: 'string',
      group: 'template',
      components: { input: ImageRadioInput },
      options: {
        list: [
          {
            title: 'Giving Campaign',
            value: 'givingCampaign',
            imageSrc: '../static/GivingCampaign_Template.png',
          },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    // Hero Section
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'array',
      group: 'hero',
      of: [richTextBlock],
      validation: (Rule) => Rule.required(),
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
        source: 'title',
        maxLength: 96,
        slugify: (input) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 96),
      },
      validation: (Rule) => Rule.required().warning('A slug is required'),
    }),
    // Content Section
    defineField({
      name: 'contentSection',
      title: 'Content Section',
      type: 'array',
      group: 'content',
      of: [richTextBlock],
    }),
    // Video Section
    defineField({
      name: 'video',
      title: 'Video',
      type: 'object',
      group: 'video',
      fields: [
        defineField({
          name: 'src',
          title: 'Video URL',
          type: 'url',
          validation: (Rule) => Rule.uri({ scheme: ['https'] }),
        }),
        defineField({
          name: 'poster',
          title: 'Poster Image',
          type: 'image',
          options: { hotspot: true },
        }),
      ],
    }),
    // Donation Card
    defineField({
      name: 'donationCard',
      title: 'Donation Card',
      type: 'object',
      group: 'donation',
      fields: [
        defineField({
          name: 'title',
          title: 'Card Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Card Description',
          type: 'text',
        }),
      ],
    }),
    // Give Form
    defineField({
      name: 'giveForm',
      title: 'Give Form',
      type: 'object',
      group: 'donation',
      fields: [
        defineField({
          name: 'campaignShortCode',
          title: 'Campaign Short Code',
          type: 'string',
          description: 'ID for donation service (e.g., Stripe or Salesforce)',
        }),
        defineField({
          name: 'donationAmounts',
          title: 'Donation Amounts',
          type: 'array',
          of: [{ type: 'number' }],
          description: 'Predefined donation amounts for the form',
        }),
      ],
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
    // Contact Email
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'email',
      group: 'content',
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
