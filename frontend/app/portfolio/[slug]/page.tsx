import type {Metadata} from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import {sanityFetch} from '@/sanity/lib/live'
import {client} from '@/sanity/lib/client'
import {projectQuery, projectSlugsQuery} from '@/sanity/lib/queries'
import CustomPortableText from '@/app/components/PortableText'

const categoryLabels: Record<string, string> = {
  barnbocker: 'Barnböcker',
  kartor: 'Kartor',
  tidskrifter: 'Tidskrifter & Vetenskap',
  reklam: 'Reklam & Grafisk design',
  konst: 'Konst',
}

type Props = {
  params: Promise<{slug: string}>
}

export async function generateStaticParams() {
  const data = await client.fetch(projectSlugsQuery)
  return (data || []).map((p: any) => ({slug: p.slug}))
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params
  const {data: project} = await sanityFetch({query: projectQuery, params: {slug}, stega: false})
  if (!project) return {}
  return {
    title: project.title,
    description: `${project.title} — ${categoryLabels[project.category || ''] || ''} av Magda Korotynska`,
  }
}

export default async function ProjectPage({params}: Props) {
  const {slug} = await params
  const {data: project} = await sanityFetch({query: projectQuery, params: {slug}})

  if (!project) notFound()

  const meta = [
    project.category && categoryLabels[project.category],
    project.client,
    project.author && `Text: ${project.author}`,
    project.year,
  ].filter(Boolean)

  return (
    <article className="py-12 md:py-20">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Back link */}
        <Link
          href="/portfolio"
          className="text-sm text-muted hover:text-accent transition-colors mb-8 inline-block"
        >
          &larr; Tillbaka till portfolio
        </Link>

        <h1 className="text-3xl md:text-5xl font-serif text-stone-900 mb-4">{project.title}</h1>

        {meta.length > 0 && (
          <p className="text-muted mb-8">{meta.join(' — ')}</p>
        )}

        {/* Cover image */}
        {project.coverImageUrl && (
          <div className="relative w-full aspect-[4/3] mb-12 bg-stone-100 overflow-hidden">
            <Image
              src={project.coverImageUrl}
              alt={project.title || ''}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        )}

        {/* Description */}
        {project.description && (
          <div className="max-w-2xl mb-12">
            <CustomPortableText value={project.description} />
          </div>
        )}

        {/* Gallery */}
        {project.images && project.images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.images.map((img: any) => (
              <div key={img._key} className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                {img.asset?.url && (
                  <Image
                    src={img.asset.url}
                    alt={img.alt || project.title || ''}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
