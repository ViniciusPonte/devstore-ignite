import { z } from 'zod'
import data from '../data.json'
import { ProductProps } from '@/app/(store)/product/[slug]/interface'

export async function GET(_: Request, { params }: ProductProps) {
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const slug = z.string().parse(params.slug)

  const product = data.products.find((product) => product.slug === slug)

  if (!product)
    return Response.json({ message: 'Product not found' }, { status: 400 })

  return Response.json(product)
}
