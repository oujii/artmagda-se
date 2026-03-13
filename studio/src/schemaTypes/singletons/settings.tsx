import {CogIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const settings = defineType({
  name: 'settings',
  title: 'Inställningar',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'startsida', title: 'Startsidan'},
    {name: 'kontakt', title: 'Kontaktuppgifter'},
    {name: 'socialt', title: 'Sociala medier'},
  ],
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Bild på startsidan',
      type: 'image',
      options: {hotspot: true},
      group: 'startsida',
    }),
    defineField({
      name: 'heroText',
      title: 'Text under namnet',
      type: 'string',
      initialValue: 'Illustratör & konstnär',
      group: 'startsida',
    }),
    defineField({
      name: 'footerText',
      title: 'Text i sidfoten',
      type: 'string',
      group: 'startsida',
    }),
    defineField({
      name: 'contactInfo',
      title: 'Kontaktuppgifter',
      type: 'object',
      group: 'kontakt',
      fields: [
        defineField({name: 'address', title: 'Adress', type: 'string'}),
        defineField({name: 'phone', title: 'Telefon', type: 'string'}),
        defineField({name: 'email', title: 'E-post', type: 'string'}),
        defineField({name: 'swish', title: 'Swish-nummer', type: 'string'}),
      ],
    }),
    defineField({
      name: 'socialMedia',
      title: 'Sociala medier',
      type: 'object',
      group: 'socialt',
      fields: [
        defineField({name: 'instagram', title: 'Instagram', type: 'url'}),
        defineField({name: 'facebook', title: 'Facebook', type: 'url'}),
      ],
    }),
    // Hidden fields used by the site internally
    defineField({name: 'title', title: 'Sidtitel', type: 'string', hidden: true}),
    defineField({name: 'description', title: 'Beskrivning', type: 'text', hidden: true}),
    defineField({name: 'ogImage', title: 'Delningsbild', type: 'image', hidden: true}),
  ],
  preview: {
    prepare() {
      return {title: 'Inställningar'}
    },
  },
})
