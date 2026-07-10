import { defineField, defineType } from 'sanity';
import { DonationFormSchema } from '~/features/donate/sanity';

// Partner campaigns reuse the shared donation form, but with a couple of changes,
// leaving the shared schema (and the Campaign/Watermark type) untouched:
//  - the amount "default value", "hide other", and "minimum" options are removed
//    (only presets are used)
//  - the complex shared "investor" field is replaced with a simple "Who can give?"
//    selector (both / individuals only / organizations only)
const giverTypeField = defineField({
  name: 'giverType',
  title: 'Who can give?',
  type: 'string',
  description:
    'Controls the Individual / Organization options on the form. "Both" lets donors choose; the others lock the form to a single giver type.',
  options: {
    layout: 'radio',
    list: [
      { title: 'Individuals and organizations', value: 'both' },
      { title: 'Individuals only', value: 'individual' },
      { title: 'Organizations only', value: 'organization' },
    ],
  },
  initialValue: 'both',
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const partnerDonationForm: any = {
  ...DonationFormSchema,
  group: 'donationForm',
  fields: [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(DonationFormSchema as any).fields
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ?.filter((field: any) => field.name !== 'investor')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((field: any) =>
        field.name === 'amount'
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            { ...field, fields: field.fields?.filter((f: any) => f.name === 'presets') }
          : field,
      ),
    giverTypeField,
  ],
};

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

    // Projects section heading
    defineField({
      name: 'projectsHeading',
      title: 'Projects Section Heading',
      type: 'text',
      rows: 2,
      group: 'content',
      description:
        'Heading shown above the opportunity cards. Add a line break to split it across two lines. If left blank, defaults to "Unlock a Project. / Join the Mission.".',
      initialValue: 'Unlock a Project.\nJoin the Mission.',
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
              description: 'Optional. Longer-form copy shown on the card when provided.',
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
            defineField({
              name: 'languageProjects',
              title: 'Language Projects (optional)',
              type: 'object',
              description:
                'Optional. When one or more projects are added, a link appears on this card that opens a modal listing them. Leave empty to hide the link.',
              options: { collapsible: true, collapsed: true },
              // If this section is used at all (heading/link text set), it must contain
              // at least one project.
              validation: (Rule) =>
                Rule.custom(
                  (
                    value:
                      | { heading?: string; linkText?: string; projects?: unknown[] }
                      | undefined,
                  ) => {
                    if (!value) return true;
                    const inUse = Boolean(
                      value.heading || value.linkText || value.projects?.length,
                    );
                    if (inUse && !value.projects?.length) {
                      return 'Add at least one project, or clear the heading/link text to remove this section.';
                    }
                    return true;
                  },
                ),
              fields: [
                defineField({
                  name: 'heading',
                  title: 'Modal Heading',
                  type: 'string',
                  description: 'Optional heading shown at the top of the modal.',
                }),
                defineField({
                  name: 'linkText',
                  title: 'Link Text',
                  type: 'string',
                  description:
                    'Optional. Defaults to "Learn more about these specific projects" if left blank.',
                }),
                defineField({
                  name: 'projects',
                  title: 'Projects',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      name: 'languageProject',
                      fields: [
                        defineField({
                          name: 'languageName',
                          title: 'Language Name',
                          type: 'string',
                          validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                          name: 'sensitivity',
                          title: 'Sensitivity',
                          type: 'string',
                          options: {
                            layout: 'radio',
                            list: [
                              { title: 'Low', value: 'low' },
                              { title: 'Medium', value: 'medium' },
                              { title: 'High', value: 'high' },
                            ],
                          },
                          validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                          name: 'country',
                          title: 'Country / Region',
                          type: 'string',
                          description:
                            'Optional. Hidden for High sensitivity projects — those display "Sensitive" publicly and never store a country.',
                          // High sensitivity → field hidden so no country is ever entered/stored.
                          // The GROQ query also strips it and the modal shows "Sensitive".
                          hidden: ({ parent }) =>
                            (parent as { sensitivity?: string })?.sensitivity === 'high',
                        }),
                        defineField({
                          name: 'region',
                          title: 'Region',
                          type: 'string',
                          validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                          name: 'milestone',
                          title: 'Milestone',
                          type: 'text',
                          rows: 2,
                          validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                          name: 'amount',
                          title: 'Amount',
                          type: 'number',
                          description: 'Displayed as currency, e.g. $25,000.',
                          validation: (Rule) => Rule.required().min(0),
                        }),
                      ],
                      preview: {
                        select: { title: 'languageName', subtitle: 'region' },
                      },
                    },
                  ],
                }),
              ],
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

    partnerDonationForm,
  ],
});
