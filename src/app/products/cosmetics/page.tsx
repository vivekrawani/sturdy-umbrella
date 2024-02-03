import Card from '@/components/Card';
import { getProductCollection } from '@/db/firebase'
import React from 'react'

export default async function Cosmetics() {
  const products = await getProductCollection('cosmetics');
  return (
    <div className='grid place-items-center'>
    {
      products.map((val : any)=> <Card  key={val.productId} details={val} />)
    }
     
    </div>
  )
}
/**
 * 
 * 
productId
size
discountedPrice
price
imageUrl
name
description
gst
inStock
isFeatured
 */