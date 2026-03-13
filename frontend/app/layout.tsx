import './globals.css'

import type {Metadata} from 'next'
import {IBM_Plex_Mono, Josefin_Sans} from 'next/font/google'
import {draftMode} from 'next/headers'
import {VisualEditing} from 'next-sanity/visual-editing'
import {Toaster} from 'sonner'

import DraftModeToast from '@/app/components/DraftModeToast'
import Footer from '@/app/components/Footer'
import Header from '@/app/components/Header'
import {SanityLive} from '@/sanity/lib/live'
import {handleError} from '@/app/client-utils'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    template: '%s | Magda Korotynska',
    default: 'Magda Korotynska — Illustratör & Konstnär',
  },
  description: 'Magda Korotynska — illustratör och konstnär i Stockholm. Barnböcker, kartor, tidskrifter, konst och tryck.',
  openGraph: {
    locale: 'sv_SE',
    type: 'website',
    siteName: 'Magda Korotynska',
  },
}

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
})

const josefinSans = Josefin_Sans({
  variable: '--font-josefin',
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const {isEnabled: isDraftMode} = await draftMode()

  return (
    <html lang="sv" className={`${josefinSans.variable} ${ibmPlexMono.variable}`}>
      <body>
        {isDraftMode && (
          <>
            <DraftModeToast />
            <VisualEditing />
          </>
        )}
        <SanityLive onError={handleError} />
        <Header />
        <main className="min-h-screen pt-20">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
