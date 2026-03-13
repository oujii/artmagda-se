'use client'

import Image from 'next/image'
import Link from 'next/link'
import {useState} from 'react'

const categories = [
  {value: 'all', label: 'Alla'},
  {value: 'barnbocker', label: 'Barnböcker'},
  {value: 'kartor', label: 'Kartor'},
  {value: 'tidskrifter', label: 'Tidskrifter'},
  {value: 'reklam', label: 'Reklam'},
  {value: 'konst', label: 'Konst'},
]

const categoryLabels: Record<string, string> = {
  barnbocker: 'Barnböcker',
  kartor: 'Kartor',
  tidskrifter: 'Tidskrifter',
  reklam: 'Reklam',
  konst: 'Konst',
}

type Project = {
  _id: string
  title: string | null
  slug: {current: string | null} | null
  category: string | null
  year: string | null
  client: string | null
  coverImageUrl: string | null
  featured: boolean | null
}

export default function PortfolioGrid({projects}: {projects: Project[]}) {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`px-4 py-2 text-sm transition-colors border ${
              activeCategory === cat.value
                ? 'bg-accent text-white border-accent'
                : 'bg-white text-stone-600 border-stone-200 hover:border-accent hover:text-accent'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((project) => (
          <Link
            key={project._id}
            href={`/portfolio/${project.slug?.current}`}
            className="group"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 mb-3">
              {project.coverImageUrl && (
                <Image
                  src={project.coverImageUrl}
                  alt={project.title || ''}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
              )}
            </div>
            <h3 className="font-serif text-stone-900 group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-muted">
              {[categoryLabels[project.category || ''], project.year].filter(Boolean).join(' — ')}
            </p>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-stone-500 text-center py-12">Inga projekt i denna kategori ännu.</p>
      )}
    </>
  )
}
