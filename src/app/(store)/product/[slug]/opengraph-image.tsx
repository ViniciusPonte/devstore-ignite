/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og'
import { ProductProps } from './interface'
import { getProduct } from './page'
import colors from 'tailwindcss/colors'
import { env } from '@/env'

export const runtime = 'edge'

export const alt = 'About Acme'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function OgImage({ params }: ProductProps) {
  const product = await getProduct(params.slug)

  const productImageURL = new URL(product.image, env.APP_URL).toString()

  return new ImageResponse(
    (
      <div
        style={{
          background: colors.zinc[950],
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <img
          src={productImageURL}
          alt={product.title}
          style={{ width: '100%' }}
        />
      </div>
    ),
    {
      ...size,
    },
  )
}
