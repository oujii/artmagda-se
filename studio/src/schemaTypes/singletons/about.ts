import {UserIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'Om Magda',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Rubrik',
      type: 'string',
      initialValue: 'Om Magda',
    }),
    defineField({
      name: 'portrait',
      title: 'Porträttbild',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'bio',
      title: 'Biografi',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'exhibitions',
      title: 'Utställningar',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'year',
              title: 'År',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Utställning',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'venue',
              title: 'Plats',
              type: 'string',
            }),
          ],
          preview: {
            select: {title: 'title', year: 'year', venue: 'venue'},
            prepare({title, year, venue}) {
              return {
                title: `${year}: ${title}`,
                subtitle: venue,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Om Magda'}
    },
  },
})
