import React from 'react'
import Card from '@/components/Card';
import { getProductCollection } from '@/db/firebase';
export default async function Stationary() {
  const products = await getProductCollection('stationary');
  return (
    <div className='grid md:grid-cols-4 place-items-center'>
    {
      products.map((val : any)=> <Card  key={val.productId} details={val} category='stationary'/>)
    }
     
    </div>
  )
}
