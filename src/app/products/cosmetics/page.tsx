export const dynamic = 'force-dynamic';
import Card from '@/components/Card';
import { getProductCollection } from '@/db/firebase'
import React from 'react'

export default async function Cosmetics() {
  const products = await getProductCollection('cosmetics');
  products.sort((a,b)=>a.inStock - b.inStock);
  return (
    <div className='grid md:grid-cols-4 place-items-center'>
    {
      products.map((val : any)=> <Card  key={val.productId} details={val} category='cosmetics' />)
    }
     
    </div>
  )
}

