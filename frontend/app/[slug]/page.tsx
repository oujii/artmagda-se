import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {sanityFetch} from '@/sanity/lib/live'
import {client} from '@/sanity/lib/client'
import {getPageQuery, pagesSlugs} from '@/sanity/lib/queries'

type Props = {
  params: Promise<{slug: string}>
}

export async function generateStaticParams() {
  const data = await client.fetch(pagesSlugs)
  return data || []
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const {data: page} = await sanityFetch({query: getPageQuery, params, stega: false})
  return {title: page?.name, description: page?.heading}
}

export default async function Page(props: Props) {
  const params = await props.params
  const {data: page} = await sanityFetch({query: getPageQuery, params})

  if (!page?._id) notFound()

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-6 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-serif text-stone-900">{page.heading}</h1>
        {page.subheading && (
          <p className="mt-4 text-lg text-stone-600">{page.subheading}</p>
        )}
      </div>
    </div>
  )
}
