import {BasketIcon} from '@sanity/icons'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {defineField, defineType} from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Produkt',
  type: 'document',
  icon: BasketIcon,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({type: 'product'}),
    defineField({
      name: 'title',
      title: 'Namn',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Produktbild',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'productType',
      title: 'Typ',
      type: 'string',
      options: {
        list: [
          {title: 'Poster', value: 'poster'},
          {title: 'Kort', value: 'kort'},
          {title: 'Bricka', value: 'bricka'},
          {title: 'Skärbräda', value: 'skarbrada'},
          {title: 'Underlägg', value: 'underlagg'},
          {title: 'Konstoriginal', value: 'original'},
          {title: 'Övrigt', value: 'ovrigt'},
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Pris (kr)',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'size',
      title: 'Storlek',
      description: 'T.ex. "50 x 70 cm" eller "A4"',
      type: 'string',
    }),
    defineField({
      name: 'material',
      title: 'Material',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Beskrivning',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'collection',
      title: 'Kollektion',
      description: 'Grupperar produkter, t.ex. "Sveriges landskapsblommor"',
      type: 'string',
    }),
    defineField({
      name: 'stripePaymentLink',
      title: 'Köp-länk (Stripe)',
      description: 'Klistra in länken från Stripe för att aktivera köpknappen',
      type: 'url',
    }),
    defineField({
      name: 'soldOut',
      title: 'Slutsåld',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {title: 'title', price: 'price', media: 'image', soldOut: 'soldOut'},
    prepare({title, price, media, soldOut}) {
      return {
        title,
        subtitle: `${price} kr${soldOut ? ' — Slutsåld' : ''}`,
        media,
      }
    },
  },
})
