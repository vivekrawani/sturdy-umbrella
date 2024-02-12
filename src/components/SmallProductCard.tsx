import React from 'react'
import type { Product } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
type Props = {
  details: Product
}
export default function SmallProductCard({ details }: Props) {
  return (
    <Link href={`/products/${details.productId}`}
   
    >
      <div className='flex gap-2 '>

        <Image src={details.imageUrl} width={50} height={50} alt={details.name} />
        <div className='font-bold text-emerald-200'>{details.name}</div>
      </div>
    </Link>
  )
}
