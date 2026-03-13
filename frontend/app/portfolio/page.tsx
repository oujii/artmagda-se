import type {Metadata} from 'next'
import {sanityFetch} from '@/sanity/lib/live'
import {allProjectsQuery} from '@/sanity/lib/queries'
import PortfolioGrid from './PortfolioGrid'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Barnböcker, kartor, tidskrifter, reklam och konst av Magda Korotynska.',
}

export default async function PortfolioPage() {
  const {data: projects} = await sanityFetch({query: allProjectsQuery})

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">Portfolio</h1>
        <p className="text-stone-600 mb-12 max-w-2xl">
          Över 30 års arbete med barnböcker, kartor, tidskrifter, reklam och konst.
        </p>
        <PortfolioGrid projects={projects || []} />
      </div>
    </div>
  )
}
