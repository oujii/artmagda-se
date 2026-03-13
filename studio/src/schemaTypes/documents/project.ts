import {ImageIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Projekt',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL-namn',
      description: 'Klicka "Generate" för att skapa automatiskt från titeln',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          {title: 'Barnböcker', value: 'barnbocker'},
          {title: 'Kartor', value: 'kartor'},
          {title: 'Tidskrifter & Vetenskap', value: 'tidskrifter'},
          {title: 'Reklam & Grafisk design', value: 'reklam'},
          {title: 'Konst', value: 'konst'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Bild',
      description: 'Huvudbilden som visas i portfolion',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Fler bilder',
      description: 'Extra bilder som visas på detaljsidan',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
    defineField({
      name: 'description',
      title: 'Beskrivning',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'featured',
      title: 'Visa på startsidan',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'year',
      title: 'År',
      type: 'string',
    }),
    defineField({
      name: 'client',
      title: 'Förlag / Uppdragsgivare',
      type: 'string',
    }),
    defineField({
      name: 'author',
      title: 'Författare',
      type: 'string',
    }),
  ],
  orderings: [
    {title: 'Titel A–Ö', name: 'titleAsc', by: [{field: 'title', direction: 'asc'}]},
    {title: 'Kategori', name: 'categoryAsc', by: [{field: 'category', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'title', category: 'category', media: 'coverImage'},
    prepare({title, category, media}) {
      const labels: Record<string, string> = {
        barnbocker: 'Barnböcker',
        kartor: 'Kartor',
        tidskrifter: 'Tidskrifter',
        reklam: 'Reklam',
        konst: 'Konst',
      }
      return {title, subtitle: labels[category] || '', media}
    },
  },
})
