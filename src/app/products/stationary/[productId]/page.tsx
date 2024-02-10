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


import UpdateCard from '@/components/UpdateCard'
import Loading from '@/components/Loading'
import { useRouter } from 'next/navigation'



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
    const loadingConditon = loading || data === null;

    const router = useRouter();
    const user = useAppSelector(state => state.authReducer.user)

    const isAdmin = user && user!.isAdmin;
    if (!isAdmin) {
        setTimeout(() => {
            router.back()
        }, 5000)
        return (
            <div className='flex flex-col justify-center items-center h-80svh'>
                <h1 className='text-3xl text-blue-400 '>Hey your are not an admin! You cannot view this page</h1>
                <p>Redirecting in 5s</p>
            </div>
        )
    }


    return (
        <div className='flex flex-col justify-center items-center w-full'>

            {loadingConditon ? <Loading /> : <UpdateCard details={data} />}

        </div>
    )
}


