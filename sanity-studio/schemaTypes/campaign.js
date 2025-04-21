// sanity-studio/schemaTypes/campaign.js

import {defineField, defineType} from 'sanity'
// 1. Import your custom component
import ImageRadioInput from '../components/ImageRadioInput'

export default defineType({
    name: 'campaign',
    title: 'Campaign',
    type: 'document',
    // groups: [

    // ],
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
            validation: (Rule) => Rule.required().min(5).max(100).warning('Alt text should be between 5 and 100 characters long') // Updated warning message
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
            description: 'Add text for the call to action button', // Updated description
            type: 'string',
        }),
        defineField({
            name: 'ctaLink', // Matches the field name from your first screenshot's context more closely than 'ctaButtonLink'
            title: 'CTA Button Link',
            description: 'Add a link for the call to action button',
            type: 'url', // Use 'url' type for better validation
            validation: Rule => Rule.uri({
                scheme: ['http', 'https', 'mailto', 'tel'] // Optional: restrict allowed schemes
            })
        }),
        // --- MODIFIED TEMPLATE FIELD ---
        defineField({
            name: 'templateType', // Keep your original name
            title: 'Page Template',
            type: 'string',
             // 2. Assign the custom component using the 'components' property in v3
            components: {
                input: ImageRadioInput
            },
            options: {
                list: [
                    // 3. Update list items with imageSrc pointing to your static files
                    //    Replace placeholder URLs with your actual static paths
                    {title: 'Sustainers  Template', value: 'sustainers', imageSrc: '/static/Sustainer_Template.png'}, // Example path
                    {title: 'Advocates Template', value: 'advocates', imageSrc: '/static/Advocates_Template.png'}, // Example path
                    {title: 'Investor Reps Template', value: 'investorReps', imageSrc: '/static/Investor_Rep_Template.png'}, // Example path
                    {title: 'Marketing Template', value: 'marketing', imageSrc: '/static/Marketing_Template.png'}, // Example path
                ],
                // 4. Remove layout and direction, the custom component handles this
                // layout: 'radio', // REMOVED
                // direction: 'horizontal' // REMOVED
            },
            // Keep your preview settings if needed, though they don't directly apply to the template selection itself
            // preview: { ... } // This preview is for the document list, not the field itself
        }),
        // --- END MODIFIED TEMPLATE FIELD ---
        defineField({
            name: 'contactEmail',
            title: 'Contact Email',
            type: 'string', // Use 'email' type for built-in validation
            validation: (Rule) => Rule.required().email().warning('A valid email is required'),
            description: 'Add a contact email for the campaign',
        })
    ],
    // Define the document preview for the list view if you haven't already in a separate preview config
    preview: {
        select: {
            title: 'heading',
            media: 'heroImage'
        },
        prepare({title, media}) {
            return {
                title: title || 'Untitled Campaign',
                media: media
            }
        }
    }
})