import Image from 'next/image'
import Link from 'next/link'
import {sanityFetch} from '@/sanity/lib/live'
import {settingsQuery, featuredProjectsQuery} from '@/sanity/lib/queries'

const categoryLabels: Record<string, string> = {
  barnbocker: 'Barnböcker',
  kartor: 'Kartor',
  tidskrifter: 'Tidskrifter',
  reklam: 'Reklam',
  konst: 'Konst',
}

export default async function Page() {
  const {data: settings} = await sanityFetch({query: settingsQuery})
  const {data: featured} = await sanityFetch({query: featuredProjectsQuery})

  const heroImageUrl = settings?.heroImageUrl
  const heroText = settings?.heroText || 'Illustratör & konstnär'

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative flex items-center justify-center min-h-[80vh] bg-stone-100 overflow-hidden">
        {heroImageUrl && (
          <Image
            src={heroImageUrl}
            alt="Magda Korotynska"
            fill
            className="object-cover opacity-30"
            priority
          />
        )}
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-stone-900 tracking-tight">
            Magda Korotynska
          </h1>
          <p className="text-xl md:text-2xl text-stone-600 font-light">
            {heroText}
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/portfolio"
              className="px-8 py-3 bg-accent text-white text-sm font-medium tracking-wide hover:bg-accent-hover transition-colors"
            >
              Se portfolio
            </Link>
            <Link
              href="/butik"
              className="px-8 py-3 border border-stone-300 text-stone-700 text-sm font-medium tracking-wide hover:border-accent hover:text-accent transition-colors"
            >
              Butik
            </Link>
          </div>
        </div>
      </section>

      {/* Featured projects */}
      {featured && featured.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-12 text-center">
              Utvalda verk
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featured.map((project: any) => (
                <Link
                  key={project._id}
                  href={`/portfolio/${project.slug?.current}`}
                  className="group"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 mb-4">
                    {project.coverImageUrl && (
                      <Image
                        src={project.coverImageUrl}
                        alt={project.title || ''}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    )}
                  </div>
                  <h3 className="text-lg font-serif text-stone-900 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  {project.category && (
                    <p className="text-sm text-muted mt-1">{categoryLabels[project.category] || project.category}</p>
                  )}
                </Link>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                href="/portfolio"
                className="text-accent hover:text-accent-hover text-sm font-medium tracking-wide transition-colors"
              >
                Se alla verk &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
