import type {Metadata, ResolvingMetadata} from 'next'
import {notFound} from 'next/navigation'
import {type PortableTextBlock} from 'next-sanity'
import Link from 'next/link'

import PortableText from '@/app/components/PortableText'
import SanityImage from '@/app/components/SanityImage'
import DateComponent from '@/app/components/Date'
import {sanityFetch} from '@/sanity/lib/live'
import {client} from '@/sanity/lib/client'
import {postPagesSlugs, postQuery} from '@/sanity/lib/queries'
import {resolveOpenGraphImage} from '@/sanity/lib/utils'

type Props = {
  params: Promise<{slug: string}>
}

export async function generateStaticParams() {
  const data = await client.fetch(postPagesSlugs)
  return data || []
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params
  const {data: post} = await sanityFetch({query: postQuery, params, stega: false})
  const previousImages = (await parent).openGraph?.images || []
  const ogImage = resolveOpenGraphImage(post?.coverImage)

  return {
    title: post?.title,
    description: post?.excerpt,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  } satisfies Metadata
}

export default async function PostPage(props: Props) {
  const params = await props.params
  const {data: post} = await sanityFetch({query: postQuery, params})

  if (!post?._id) {
    return notFound()
  }

  return (
    <article className="py-12 md:py-20">
      <div className="container mx-auto px-6 max-w-3xl">
        <Link
          href="/"
          className="text-sm text-muted hover:text-accent transition-colors mb-8 inline-block"
        >
          &larr; Tillbaka
        </Link>

        <h1 className="text-3xl md:text-5xl font-serif text-stone-900 mb-4">{post.title}</h1>

        <div className="flex items-center gap-4 text-sm text-muted mb-8">
          {post.author?.firstName && post.author?.lastName && (
            <span>{post.author.firstName} {post.author.lastName}</span>
          )}
          {post.date && (
            <time dateTime={post.date}>
              <DateComponent dateString={post.date} />
            </time>
          )}
        </div>

        {post.coverImage?.asset?._ref && (
          <div className="mb-10">
            <SanityImage
              id={post.coverImage.asset._ref}
              alt={post.coverImage.alt || ''}
              className="w-full"
              width={1024}
              height={538}
              mode="cover"
              hotspot={post.coverImage.hotspot}
              crop={post.coverImage.crop}
            />
          </div>
        )}

        {post.content?.length && (
          <PortableText value={post.content as PortableTextBlock[]} />
        )}
      </div>
    </article>
  )
}
