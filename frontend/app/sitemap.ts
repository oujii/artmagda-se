import {MetadataRoute} from 'next'
import {sanityFetch} from '@/sanity/lib/live'
import {sitemapData} from '@/sanity/lib/queries'
import {headers} from 'next/headers'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allContent = await sanityFetch({query: sitemapData})
  const headersList = await headers()
  const sitemap: MetadataRoute.Sitemap = []
  const host = headersList.get('host') as string
  const domain = host.startsWith('http') ? host : `https://${host}`

  sitemap.push({
    url: domain,
    lastModified: new Date(),
    priority: 1,
    changeFrequency: 'monthly',
  })

  // Static pages
  for (const path of ['/portfolio', '/butik', '/om-magda', '/kontakt']) {
    sitemap.push({
      url: `${domain}${path}`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: 'monthly',
    })
  }

  if (allContent?.data) {
    for (const p of allContent.data) {
      let url: string | undefined
      let priority: number | undefined
      let changeFrequency: 'monthly' | 'never' | undefined

      switch (p._type) {
        case 'project':
          url = `${domain}/portfolio/${p.slug}`
          priority = 0.7
          changeFrequency = 'monthly'
          break
        case 'page':
          url = `${domain}/${p.slug}`
          priority = 0.8
          changeFrequency = 'monthly'
          break
        case 'post':
          url = `${domain}/posts/${p.slug}`
          priority = 0.5
          changeFrequency = 'never'
          break
      }

      if (!url) continue
      sitemap.push({
        lastModified: p._updatedAt || new Date(),
        priority,
        changeFrequency,
        url,
      })
    }
  }

  return sitemap
}
