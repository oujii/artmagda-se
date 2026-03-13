import {defineQuery} from 'next-sanity'

export const settingsQuery = defineQuery(`
  *[_type == "settings"][0] {
    ...,
    "heroImageUrl": heroImage.asset->url
  }
`)

// Portfolio
export const allProjectsQuery = defineQuery(`
  *[_type == "project"] | order(title asc) {
    _id,
    title,
    slug,
    category,
    year,
    client,
    "coverImageUrl": coverImage.asset->url,
    featured
  }
`)

export const featuredProjectsQuery = defineQuery(`
  *[_type == "project" && featured == true] | order(title asc) {
    _id,
    title,
    slug,
    category,
    "coverImageUrl": coverImage.asset->url
  }
`)

export const projectQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    year,
    client,
    author,
    coverImage,
    "coverImageUrl": coverImage.asset->url,
    images[] {
      _key,
      alt,
      asset-> { _id, url, metadata { dimensions } }
    },
    description,
    featured
  }
`)

export const projectSlugsQuery = defineQuery(`
  *[_type == "project" && defined(slug.current)] {
    "slug": slug.current
  }
`)

// Products / Shop
export const productsQuery = defineQuery(`
  *[_type == "product"] | order(coalesce(orderRank, "~") asc, title asc) {
    _id,
    title,
    productType,
    price,
    size,
    material,
    "imageUrl": image.asset->url,
    description,
    stripePaymentLink,
    soldOut,
    collection
  }
`)

// About page
export const aboutPageQuery = defineQuery(`
  *[_type == "aboutPage"][0] {
    _id,
    title,
    portrait,
    "portraitUrl": portrait.asset->url,
    bio,
    exhibitions
  }
`)

// Pages (CMS-driven)
export const getPageQuery = defineQuery(`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => {
        ...,
        link {
          ...,
          _type == "link" => {
            ...,
            "page": page->slug.current,
            "post": post->slug.current
          }
        }
      },
      _type == "infoSection" => {
        ...
      },
    }
  }
`)

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]{
    "slug": slug.current
  }
`)

// Blog posts
export const allPostsQuery = defineQuery(`
  *[_type == "post"] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    date,
    "author": author->{
      firstName,
      lastName,
      picture
    }
  }
`)

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    date,
    content,
    coverImage,
    "author": author->{
      firstName,
      lastName,
      picture
    }
  }
`)

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]{
    "slug": slug.current
  }
`)

// Sitemap
export const sitemapData = defineQuery(`
  *[_type in ["page", "post", "project"] && defined(slug.current)]{
    _type,
    "slug": slug.current,
    _updatedAt
  }
`)
