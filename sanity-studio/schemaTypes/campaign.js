import {defineField, defineType} from 'sanity'
import ImageRadioInput from '../components/ImageRadioInput'

export default defineType({
    name: 'campaign',
    title: 'Campaign',
    type: 'document',
    groups: [
      {
        name: 'hero',
        title: 'Hero Section',
      },
      {
        name: 'cta',
        title: 'Call to Actions',
      },
      {
        name: 'template',
        title: 'Templates'
      },
    ],
    fields: [
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'array',
            group: 'hero',
            of: [
                {
                    type: 'block',
                    marks: {
                        decorators: [
                          {title: 'Strong', value: 'strong'},
                          {title: 'Emphasis', value: 'em'},
                        ],
                        // Add annotations to the block type
                        annotations: [
                          {
                            name: 'link',
                            type: 'object',
                            title: 'URL',
                            fields: [
                              {
                                title: 'URL',
                                name: 'href',
                                type: 'url'
                              }
                            ]
                          },
                          // Add the textColor annotation
                          {
                            name: 'textColor',
                            title: 'Text Color',
                            type: 'textColor' 
                          }
                        ]
                    },                    
                }
            ],
            //validation: (Rule) => Rule.required().min(5).max(100).warning('A heading should be between 5 and 100 characters long')
        }),
        defineField({
            name: 'heroCopy',
            title: 'Hero Copy',
            type: 'array',
            group: 'hero',
            of: [
                {
                    type: 'block',
                    // Add marks to the block type
                    marks: {
                        // Existing decorators (like bold, italic) should be included here if you have them
                        decorators: [
                          {title: 'Strong', value: 'strong'},
                          {title: 'Emphasis', value: 'em'},
                          // Add other decorators if needed
                        ],
                        // Add annotations to the block type
                        annotations: [
                          {
                            name: 'link',
                            type: 'object',
                            title: 'URL',
                            fields: [
                              {
                                title: 'URL',
                                name: 'href',
                                type: 'url'
                              }
                            ]
                          },
                          // Add the textColor annotation
                          {
                            name: 'textColor',
                            title: 'Text Color',
                            type: 'textColor' // This type is provided by the simpler-color-input plugin
                          }
                        ]
                    }
                }
            ],
        }),
        defineField({
            name: 'heroImage',
            title: 'Hero Image',
            type: 'image',
            group: 'hero',
            options: {
                hotspot: true
            },
            options: {
                hotspot: true
            },
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'heroImageAlt',
            title: 'Hero Image Alt Text',
            type: 'string',
            group: 'hero',
            validation: (Rule) => Rule.required().min(5).max(100).warning('Alt text should be between 5 and 100 characters long') // Updated warning message
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            group: 'hero',
            options: {
                source: 'heading',
                maxLength: 96,
                slugify: (input) => input
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                    .slice(0, 96)
            },
            validation: (Rule) => Rule.required().warning('A slug is required')
        }),
        defineField({
            name: 'body',
            title: 'Body Copy',
            type: 'array',
            of: [
                {
                  type: 'block',
                  marks: {
                      decorators: [
                        {title: 'Strong', value: 'strong'},
                        {title: 'Emphasis', value: 'em'},
                      ],
                      // Add annotations to the block type
                      annotations: [
                        {
                          name: 'link',
                          type: 'object',
                          title: 'URL',
                          fields: [
                            {
                              title: 'URL',
                              name: 'href',
                              type: 'url'
                            }
                          ]
                        },
                        // Add the textColor annotation
                        {
                          name: 'textColor',
                          title: 'Text Color',
                          type: 'textColor' 
                        }
                      ]
                  }
              }
            ],
        }),
        defineField({
            name: 'ctaText',
            title: 'CTA Button Text',
            description: 'Add text for the call to action button',
            type: 'string',
            group: 'cta',
        }),
        defineField({
            name: 'ctaLink',
            title: 'CTA Button Link',
            description: 'Add a link for the call to action button',
            type: 'url',
            group: 'cta',
            validation: Rule => Rule.uri({
                scheme: ['http', 'https', 'mailto', 'tel']
            })
        }),
        defineField({
            name: 'templateType',
            title: 'Page Template',
            type: 'string',
            group: 'template',
            components: {
                input: ImageRadioInput
            },
            options: {
                list: [
                    {title: 'Sustainers Template', value: 'sustainers', imageSrc: '/static/Sustainer_Template.png'}, // Example path
                    {title: 'Advocates Template', value: 'advocates', imageSrc: '/static/Advocates_Template.png'}, // Example path
                    {title: 'Investor Reps Template', value: 'investorReps', imageSrc: '/static/Investor_Rep_Template.png'}, // Example path
                    {title: 'Marketing Template', value: 'marketing', imageSrc: '/static/Marketing_Template.png'}, // Example path
                ],
            },
        }),

        defineField({
            name: 'contactEmail',
            title: 'Contact Email',
            type: 'email',
            validation: (Rule) => Rule.required().email().warning('A valid email is required'),
            description: 'Add a contact email for the campaign',
        })
    ],
})
