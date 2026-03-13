import Link from 'next/link'

import {sanityFetch} from '@/sanity/lib/live'
import {allPostsQuery} from '@/sanity/lib/queries'
import DateComponent from '@/app/components/Date'

type PostItem = {
  _id: string
  title: string
  slug: string
  excerpt?: string | null
  date?: string | null
  author?: {
    firstName?: string | null
    lastName?: string | null
    picture?: {
      asset?: {_ref: string}
      hotspot?: {x: number; y: number}
      crop?: {top: number; bottom: number; left: number; right: number}
      alt?: string
    }
  } | null
}

const Post = ({post}: {post: PostItem}) => {
  const {_id, title, slug, excerpt, date, author} = post

  return (
    <article
      key={_id}
      className="border border-stone-200 p-6 bg-white flex flex-col justify-between transition-colors hover:border-accent relative"
    >
      <Link className="hover:text-accent transition-colors" href={`/posts/${slug}`}>
        <span className="absolute inset-0 z-10" />
      </Link>
      <div>
        <h3 className="text-2xl font-serif mb-4">{title}</h3>
        <p className="line-clamp-3 text-sm leading-6 text-stone-600 max-w-[70ch]">{excerpt}</p>
      </div>
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-stone-100">
        {author && author.firstName && author.lastName && (
          <span className="text-sm text-stone-600">
            {author.firstName} {author.lastName}
          </span>
        )}
        {date && (
          <time className="text-muted text-xs font-mono" dateTime={date}>
            <DateComponent dateString={date} />
          </time>
        )}
      </div>
    </article>
  )
}

export const AllPosts = async () => {
  const {data} = await sanityFetch({query: allPostsQuery})

  if (!data || data.length === 0) {
    return null
  }

  return (
    <div>
      <h2 className="text-3xl font-serif text-stone-900 mb-2">Inlägg</h2>
      <div className="pt-6 space-y-6">
        {data.map((post: PostItem) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  )
}
