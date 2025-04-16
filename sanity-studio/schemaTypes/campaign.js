import {defineField, defineType} from 'sanity'

export default defineType({
    name: 'campaign',
    title: 'Campaign',
    type: 'document',
    fields: [
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
            validation: (Rule) => Rule.required().min(5).max(100).warning('A heading should be between 5 and 100 characters long')
        }),
        defineField({
            name: 'heroCopy',
            title: 'Hero Copy',
            type: 'array',
            of: [
                {type: 'block'}
            ],
        }),
        defineField({
            name: 'heroImage',
            title: 'Hero Image',
            type: 'image',
            options: {
                hotspot: true
            },
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'heroImageAlt',
            title: 'Hero Image Alt Text',
            type: 'string',
            validation: (Rule) => Rule.required().min(5).max(100).warning('A heading should be between 5 and 100 characters long')
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
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
                {type: 'block'}
            ],  
        }),
        defineField({
            name: 'ctaText',
            title: 'CTA Button Text',
            description: 'Add a call to action button',
            type: 'string',
        }),
        defineField({
            name: 'ctaLink',
            title: 'CTA Button Link',
            description: 'Add a link for the call to action button',
            type: 'string',
        }),
        defineField({
            name: 'templateType',
            title: 'Page Template',
            type: 'string',
            options: {
                list: [
                    {title: 'Sustainers Template', value: 'sustainers', image: 'https://cdn-icons-png.flaticon.com/512/1040/1040204.png'},
                    {title: 'Advocates Template', value: 'advocates', image: 'https://cdn-icons-png.flaticon.com/512/1040/1040204.png'},
                    {title: 'Investor Reps Template', value: 'investorReps', image: 'https://cdn-icons-png.flaticon.com/512/1040/1040204.png'},
                    {title: 'Marketing Template', value: 'marketing', image: 'https://cdn-icons-png.flaticon.com/512/1040/1040204.png'},
                ],
                layout:  'radio',
                direction: 'horizontal'
            },
            preview: {
                select: {
                    title: 'heading',
                    media: 'heroImage'
                },
                prepare({title, media}) {
                    return {
                        title,
                        media
                    }
                }
            }
        }),
        defineField({
            name: 'contactEmail',
            title: 'Contact Email',
            type: 'string',
            validation: (Rule) => Rule.required().email().warning('A valid email is required'),
            description: 'Add a contact email for the campaign',
        })
    ]
})