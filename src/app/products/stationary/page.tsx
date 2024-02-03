import React from 'react'
import Card from '@/components/Card';
import { getProductCollection } from '@/db/firebase';
export default async function Stationary() {
  const products = await getProductCollection('stationary');
  return (
    <div className='flex flex-wrap'>
    {
      products.map((val : any)=> <Card  key={val.productId} details={val}/>)
    }
     
    </div>
  )
}
