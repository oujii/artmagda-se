import type {Metadata} from 'next'
import Image from 'next/image'
import {sanityFetch} from '@/sanity/lib/live'
import {productsQuery, settingsQuery} from '@/sanity/lib/queries'

export const metadata: Metadata = {
  title: 'Butik',
  description: 'Köp posters, kort, brickor och konst av Magda Korotynska.',
}

export default async function ShopPage() {
  const {data: products} = await sanityFetch({query: productsQuery})
  const {data: settings} = await sanityFetch({query: settingsQuery, stega: false})

  const contactEmail = settings?.contactInfo?.email || 'magda@artmagda.se'
  const swish = settings?.contactInfo?.swish

  // Group by collection
  const items = products || []
  const collections = new Map<string, typeof items>()
  const uncollected: typeof items = []
  for (const p of items) {
    if (p.collection) {
      if (!collections.has(p.collection)) collections.set(p.collection, [])
      collections.get(p.collection)!.push(p)
    } else {
      uncollected.push(p)
    }
  }

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">Butik</h1>
        <p className="text-stone-600 mb-4 max-w-2xl">
          Illustrerade posters, kort, brickor och mer. Frakt tillkommer.
        </p>
        <p className="text-sm text-muted mb-12">
          Beställ via{' '}
          <a href={`mailto:${contactEmail}`} className="text-accent hover:text-accent-hover">
            {contactEmail}
          </a>
          {swish && <> eller Swish: {swish}</>}
        </p>

        {/* Collections */}
        {Array.from(collections.entries()).map(([name, items]) => (
          <section key={name} className="mb-16">
            <h2 className="text-2xl font-serif text-stone-900 mb-8">{name}</h2>
            <ProductGrid products={items} />
          </section>
        ))}

        {/* Uncollected products */}
        {uncollected.length > 0 && (
          <section>
            {collections.size > 0 && (
              <h2 className="text-2xl font-serif text-stone-900 mb-8">Övrigt</h2>
            )}
            <ProductGrid products={uncollected} />
          </section>
        )}

        {items.length === 0 && (
          <p className="text-stone-500 text-center py-12">Butiken uppdateras snart!</p>
        )}
      </div>
    </div>
  )
}

function ProductGrid({products}: {products: any[]}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product: any) => (
        <div key={product._id} className="group">
          <div className="relative aspect-square overflow-hidden bg-stone-100 mb-3">
            {product.imageUrl && (
              <Image
                src={product.imageUrl}
                alt={product.title || ''}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
              />
            )}
            {product.soldOut && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white text-sm font-medium tracking-wide uppercase">
                  Slutsåld
                </span>
              </div>
            )}
          </div>
          <h3 className="font-serif text-stone-900">{product.title}</h3>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-accent font-medium">{product.price} kr</span>
            {product.size && <span className="text-sm text-muted">{product.size}</span>}
          </div>
          {product.material && <p className="text-xs text-muted mt-1">{product.material}</p>}
          {product.description && (
            <p className="text-sm text-stone-600 mt-2">{product.description}</p>
          )}
          {product.stripePaymentLink && !product.soldOut && (
            <a
              href={product.stripePaymentLink}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-3 px-5 py-2 bg-accent text-white text-sm font-medium hover:bg-accent-hover transition-colors"
            >
              Köp
            </a>
          )}
        </div>
      ))}
    </div>
  )
}
