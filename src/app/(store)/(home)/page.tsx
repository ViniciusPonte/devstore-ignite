import { ProductCard } from '@/components/product-card'
import { api } from '@/data/api'
import { Product } from '@/data/types/products'
import { Metadata } from 'next'

async function getFeaturedProducts(): Promise<Product[]> {
  const response = await api('/product/featured', {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })

  const products = await response.json()

  return products
}

export const metadata: Metadata = {
  title: 'Home',
}

export default async function Home() {
  const [highlightedProduct, ...otherProducts] = await getFeaturedProducts()

  return (
    <div className="grid max-h-[860px] grid-cols-9 grid-rows-6 gap-6">
      <ProductCard
        id={highlightedProduct.id}
        image={highlightedProduct.image}
        price={highlightedProduct.price}
        slug={highlightedProduct.slug}
        title={highlightedProduct.title}
        variant="lg"
      />

      {otherProducts.map((product) => {
        return (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.image}
            price={product.price}
            slug={product.slug}
            title={product.title}
            variant="md"
          />
        )
      })}
    </div>
  )
}
