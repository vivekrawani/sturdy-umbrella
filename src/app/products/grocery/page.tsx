import Card from '@/components/Card'
import React from 'react'
import { getProductCollection } from '@/db/firebase';

export default async function Grocery() {
  const products = await getProductCollection('grocery');
  return (
    <div className='flex flex-wrap'>
    {
      products.map((val : any)=> <Card  key={val.productId} details={val}/>)
    }
     
    </div>
  )
}
