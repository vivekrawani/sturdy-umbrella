"use client"
import React, { useEffect } from 'react'
type Params = {
    params: {
        productId: string
    }
}

import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { getProduct } from '@/lib/features/products/productSlice'
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
/*
{
    "productId": "08c9cb10-abca-11ee-b603-41f8d67b82ec",
    "size": "",
    "discountedPrice": 385,
    "price": 398,
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/johar-basket.appspot.com/o/images%2F1704459468233.jpg?alt=media&token=54b3f60a-0969-42d3-8e2b-8f37a4df90d8",
    "name": "FIGARO Olive oil (200 ml)",
    "description": "Olive oil ",
    "gst": 0,
    "isFeatured": false,
    "inStock": 9
}
*/
