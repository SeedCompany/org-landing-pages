import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'orgAddress',
  title: 'Org Address',
  type: 'document',
  fields: [
    defineField({
      name: 'orgName',
      title: 'Organization Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mailingAddress',
      title: 'Mailing Address',
      type: 'text',
      rows: 4,
      description: 'One line per row, e.g. "ATTN: Finance", street, suite, city/state/zip.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      description: 'U.S. phone number, e.g. "(817) 557-2121".',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
    }),
  ],
  preview: {
    select: { title: 'orgName', subtitle: 'mailingAddress' },
  },
});
