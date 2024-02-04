"use client"
import React from 'react'

import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { getProduct } from '@/lib/features/products/productSlice'
import { useEffect } from 'react'
type Params = {
    params: {
        productId: string
    }
}
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import UpdateCard from '@/components/UpdateCard'



type ProductDetails = {
    productId: string,
    size: any,
    discountedPrice: number,
    price: number,
    imageUrl: string,
    name: string,
    description: string,
    gst: number,
    isFeatured: boolean,
    inStock: number,
    loading: boolean
}

export default function ProductDetails({ params }: Params) {
    const dispatch = useAppDispatch();
    const { data, loading } = useAppSelector(state => state.productReducer)
    useEffect(() => {
        dispatch(getProduct(params.productId))
    }, [params.productId, dispatch])
    
    const loadingConditon = loading || data===null

    return (
        <div className='flex flex-row justify-center items-center h-80svh'>
           
           {loadingConditon ? <div className='loader'></div> : <UpdateCard details={data}/> }
        
        </div>
    )
}


