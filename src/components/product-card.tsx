import { Product } from '@/data/types/products'
import Image from 'next/image'
import Link from 'next/link'
import { tv, VariantProps } from 'tailwind-variants'

const productCard = tv({
  slots: {
    container:
      'group relative flex rounded-lg bg-zinc-900 overflow-hidden justify-center items-end',
    button:
      'absolute h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5',
  },

  variants: {
    variant: {
      sm: {},
      md: {
        container: 'col-span-3 row-span-3',
        button: 'bottom-10 right-10',
      },
      lg: {
        container: 'col-span-6 row-span-6',
        button: 'bottom-28 right-28',
      },
    },
  },

  defaultVariants: {
    variant: 'sm',
  },
})

type ProductProps = Pick<Product, 'id' | 'image' | 'price' | 'slug' | 'title'> &
  VariantProps<typeof productCard>

export function ProductCard({
  slug,
  id,
  image,
  title,
  price,
  variant,
}: ProductProps) {
  const { container, button } = productCard({ variant })

  return (
    <Link href={`/product/${slug}`} key={id} className={container()}>
      <Image
        src={image}
        width={variant === 'sm' ? 480 : 920}
        height={variant === 'sm' ? 480 : 920}
        alt=""
        quality={100}
        className="group-hover:scale-105 transition-transform duration-500"
      />

      <div className={button()}>
        <span className="text-sm truncate">{title}</span>
        <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4  font-semibold">
          {price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </span>
      </div>
    </Link>
  )
}
