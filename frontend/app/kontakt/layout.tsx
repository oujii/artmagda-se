import type {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Kontakt',
  description: 'Kontakta Magda Korotynska — illustratör och konstnär i Stockholm.',
}

export default function KontaktLayout({children}: {children: React.ReactNode}) {
  return children
}
