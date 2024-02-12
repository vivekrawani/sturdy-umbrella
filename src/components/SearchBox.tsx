import { useAppSelector } from '@/lib/hooks'
import React from 'react'
import type { Product } from '@/lib/types';
import { useState } from 'react';
import { searchRegEx } from '@/lib/utils';
import SmallProductCard from './SmallProductCard';

export default function SearchBox() {
  const all = useAppSelector(state => state.productReducer.all)
  const [inputVal, setInputVal] = useState<string>('');
  const [filteredProduct, setFilteredProduct] = useState<Product[]>([]);
  const handleChange = (e: any) => {
    setInputVal(e.target.value)
    if (inputVal.length >= 1) {
      const filteredProduct = searchRegEx(inputVal, all)
      setFilteredProduct(filteredProduct)
    }
  }

  return (
    <div className='absolute top-15 z-50 border-2 border-red-100 transition-colors ease-in-out w-full h-max bg left-1/2 p-2 rounded-lg  bg-black backdrop-blur backdrop-brightness-10 backdrop-opacity-10'>
      <input className='p-2 rounded-full outline-none w-full my-2'
      placeholder='enter atleast 3 letters'
        value={inputVal}
        onChange={e => handleChange(e)}
      />
      <hr />
      {
        filteredProduct.length>0 &&  <div className='flex flex-col h-max-screen overflow-scroll'>
        {
          filteredProduct.map(product=><SmallProductCard key={product.productId} details={product}/>)
        }
      </div>
      }
     
    </div>
  )
}
