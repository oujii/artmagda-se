import type {Metadata} from 'next'
import Image from 'next/image'
import {sanityFetch} from '@/sanity/lib/live'
import {aboutPageQuery} from '@/sanity/lib/queries'
import CustomPortableText from '@/app/components/PortableText'

export const metadata: Metadata = {
  title: 'Om Magda',
  description: 'Magda Korotynska — illustratör och konstnär utbildad vid Konsthögskolan i Warszawa, verksam i Stockholm sedan 1982.',
}

export default async function AboutPage() {
  const {data: about} = await sanityFetch({query: aboutPageQuery})

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-12">
          {about?.title || 'Om Magda'}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Portrait */}
          {about?.portraitUrl && (
            <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden">
              <Image
                src={about.portraitUrl}
                alt="Magda Korotynska"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />
            </div>
          )}

          {/* Bio */}
          <div className={about?.portraitUrl ? 'md:col-span-2' : 'md:col-span-3'}>
            {about?.bio ? (
              <CustomPortableText value={about.bio} />
            ) : (
              <div className="prose">
                <p>
                  Magda Korotynska är konstnär och illustratör utbildad vid Konsthögskolan i Warszawa.
                  Hon bor och arbetar i Stockholm sedan 1982.
                </p>
                <p>
                  Under mer än 30 år har hon arbetat med reklam, tidskrifter och barnböcker.
                  Bland uppdragsgivarna finns Bonnier Carlsen, Forskning &amp; Framsteg, Åkestam Holst
                  och Sanoma Utbildning.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Exhibitions */}
        {about?.exhibitions && about.exhibitions.length > 0 && (
          <section>
            <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mb-8">Utställningar</h2>
            <div className="space-y-4">
              {about.exhibitions.map((ex: any, i: number) => (
                <div key={ex._key || i} className="flex gap-4 border-b border-stone-200 pb-4">
                  <span className="text-accent font-medium min-w-[4rem]">{ex.year}</span>
                  <div>
                    <p className="text-stone-900">{ex.title}</p>
                    {ex.venue && <p className="text-sm text-muted">{ex.venue}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
