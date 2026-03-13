import {BasketIcon, CogIcon, ImageIcon, UserIcon} from '@sanity/icons'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S: StructureBuilder, context) =>
  S.list()
    .title('Innehåll')
    .items([
      S.documentTypeListItem('project').title('Portfolio').icon(ImageIcon),
      orderableDocumentListDeskItem({
        type: 'product',
        title: 'Butik',
        icon: BasketIcon,
        S,
        context,
      }),
      S.divider(),
      S.listItem()
        .title('Om Magda')
        .child(S.document().schemaType('aboutPage').documentId('41f5832f-94d9-4233-a578-bb670f9cb318'))
        .icon(UserIcon),
      S.listItem()
        .title('Inställningar')
        .child(S.document().schemaType('settings').documentId('1dd2c213-fb28-4411-86f4-d111febdd5f2'))
        .icon(CogIcon),
    ])
