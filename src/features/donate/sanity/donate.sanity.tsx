import { defineField, defineArrayMember } from 'sanity';
import { ClockIcon } from '@sanity/icons';
import { keys, mapEntries, type Nil } from '@seedcompany/common';
import { Case } from '@seedcompany/common/case';
import type { DonationCadence as Cadence } from '~/graphql';
import type { Campaign } from '~/sanity/generated/sanity.types.ts';
import { createInvestor } from '~/features/investor-input';
import type { DonateFormProps } from '~/features/donate/DonationForm.tsx';

// Cheat to get the generated shape of this field from a known spot.
// Since there is no other way to get it.
type DonateDataShape = Campaign['donationForm'] & {};

const presets = defineField({
  type: 'array',
  name: 'presets',
  description: (
    <span>
      Predefined donation amounts for <i>this specific cadence</i>.
    </span>
  ),
  of: [{ type: 'number', validation: (rule) => rule.greaterThan(0) }],
});

const cadence = defineField({
  name: 'cadence',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'object',
      name: 'cadence',
      icon: ClockIcon,
      fields: [
        {
          type: 'string',
          name: 'cadence',
          options: {
            layout: 'radio',
            list: [
              { title: 'One Time', value: 'OneTime' satisfies Cadence },
              { title: 'Monthly', value: 'Monthly' satisfies Cadence },
            ],
          },
          validation: (rule) => rule.required(),
        },
        {
          type: 'string',
          name: 'label',
          description: 'A custom label',
        },
        presets,
      ],
      preview: {
        select: { cadence: 'cadence', label: 'label' },
        prepare: (selection) => ({
          title: Case.capital(selection.cadence),
          subtitle: selection.label as string | undefined,
        }),
      },
    }),
  ],
  validation: (rule) => rule.required().unique().min(1),
  initialValue: [
    { _type: 'cadence', cadence: 'OneTime' },
    { _type: 'cadence', cadence: 'Monthly' },
  ],
});

const amount = defineField({
  name: 'amount',
  type: 'object',
  fields: [
    { ...presets, description: 'Predefined amount buttons' },
    defineField({
      type: 'number',
      name: 'defaultValue',
      title: 'Default',
      description: 'The default donation amount selected',
      validation: (rule) => rule.greaterThan(0),
    }),
    defineField({
      type: 'boolean',
      name: 'hideOther',
      description: 'Hide & disallow custom amounts to be entered by user',
    }),
    defineField({
      name: 'min',
      title: 'Minimum',
      type: 'object',
      fields: [
        { type: 'number', name: 'amount', validation: (rule) => rule.required().greaterThan(0) },
        {
          type: 'string',
          name: 'message',
          description: 'Error to show user when minium is not met',
          validation: (rule) => rule.required(),
        },
      ],
    }),
  ],
  options: {
    collapsible: true,
    collapsed: true,
  },
});

const investor = defineField({
  name: 'investor',
  type: 'object',
  description: 'Configure the investor UI',
  fields: [
    defineField({
      name: 'field',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'field',
          fields: [
            {
              type: 'string',
              name: 'name',
              options: {
                list: keys(createInvestor.shape).map((key) => ({
                  title: Case.capital(key),
                  value: key,
                })),
              },
              validation: (rule) => rule.required(),
            },
            {
              type: 'string',
              name: 'defaultValue',
            },
            {
              type: 'boolean',
              name: 'hidden',
            },
          ],
          preview: {
            select: { name: 'name', defaultValue: 'defaultValue' },
            prepare: (selection) => ({
              title: Case.capital(selection.name),
              subtitle: selection.defaultValue as string | undefined,
            }),
          },
        }),
      ],
      initialValue: keys(createInvestor.shape).map((name) => ({ name })),
    }),
  ],
  options: {
    collapsible: true,
    collapsed: true,
  },
});

const giveByMail = defineField({
  name: 'giveByMail',
  type: 'object',
  fields: [
    defineField({
      type: 'boolean',
      name: 'enabled',
      description: 'Whether to show the give by mail UI',
      initialValue: true,
    }),
    defineField({
      name: 'memo',
      title: 'Memo',
      type: 'string',
      description: 'A custom "memo" message to display',
    }),
  ],
  options: {
    collapsible: true,
    collapsed: true,
  },
});

/**
 * Donation Form Sanity schema
 */
export const DonationFormSchema = defineField({
  type: 'object',
  name: 'donationForm',
  description: 'Configure the donation form UI',
  fields: [cadence, amount, investor, giveByMail],
  options: {
    collapsible: true,
    collapsed: true,
  },
});

/**
 * Convert a data field of the schema type to props that can be
 * passed to the <DonateForm />.
 */
export const getDonationProps = (data: DonateDataShape | Nil) =>
  ({
    cadence: {
      options: data?.cadence?.flatMap((opt) => opt.cadence ?? []),
      labels: mapEntries(data?.cadence ?? [], (opt, { SKIP }) =>
        opt.cadence && opt.label ? [opt.cadence, opt.label] : SKIP,
      ).asRecord,
    },
    amount: {
      presets: mapEntries(data?.cadence ?? [], (opt, { SKIP }) => {
        const presets = opt.presets ?? data?.amount?.presets;
        return opt.cadence && presets ? [opt.cadence, presets] : SKIP;
      }).asRecord,
      hideOther: data?.amount?.hideOther,
      defaultValue: data?.amount?.defaultValue,
      min:
        data?.amount?.min?.amount && data.amount?.min?.message
          ? { value: data.amount.min.amount, message: data.amount.min.message }
          : undefined,
    },
    investor: {
      defaults: mapEntries(data?.investor?.field ?? [], (field, { SKIP }) =>
        // default value is string but that doesn't always work. cheating for now.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        field.name && field.defaultValue ? [field.name, field.defaultValue as any] : SKIP,
      ).asRecord,
      include: data?.investor?.field?.flatMap((field) => field.name ?? []) ?? [],
    },
    giveByMail: data?.giveByMail?.enabled ? { memo: data.giveByMail?.memo } : false,
  }) satisfies Partial<DonateFormProps>;
