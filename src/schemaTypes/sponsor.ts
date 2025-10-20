import { type Rule } from '@sanity/types';

export default {
  name: 'sponsor',
  title: 'Sponsor',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'gtlId',
        maxLength: 96,
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'region',
      title: 'Region',
      type: 'string',
      options: {
        list: [
          { title: 'Africa', value: 'Africa' },
          { title: 'Pacific', value: 'Pacific' },
          { title: 'Asia', value: 'Asia' },
          { title: 'Americas', value: 'Americas' },
          { title: 'Europe', value: 'Europe' },
        ],
      },
    },
    {
      name: 'gender',
      title: 'Gender',
      type: 'string',
      options: {
        list: [
          { title: 'Male', value: 'Male' },
          { title: 'Female', value: 'Female' },
        ],
      },
    },
    {
      name: 'gtlId',
      title: 'GTL ID',
      type: 'string',
    },
    {
      name: 'focus',
      title: 'Focus',
      type: 'string',
    },
    {
      name: 'bio',
      title: 'Biography',
      type: 'text',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'isSponsored',
      title: 'Is Sponsored',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'gtlId',
      media: 'image',
    },
  },
};