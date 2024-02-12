"use client"
import { getOrder } from '@/lib/features/orders/orderSlice'
import { useAppSelector } from '@/lib/hooks'
import { useAppDispatch } from '@/lib/store'
import { Image } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import Card from '@/components/OrderDetailsCard'
import OrdersCard from '@/components/OrdersCard'
type Params = {
    params: {
        orderId: string
    }
}

export default function Order({ params }: Params) {
    const order = useAppSelector(state => state.orderReducers.single)
    const dispatch = useAppDispatch()
    console.log(order);

    useEffect(() => {
        dispatch(getOrder(params.orderId))
    }, [dispatch, params.orderId])
    return (
        <div>{JSON.stringify(params.orderId)}
            <div>
                {
                    order.products!.map(product => <Card details={product} key={product.productId} />)
                }
            </div>
            <div>
                <OrdersCard details={order.orderDetails}/>
            </div>
            <div className='flex w-full justify-center gap-5'>
                <button className='bg-green-600 text-white rounded-lg p-2'>Accept Order</button>
                <button className='bg-red-600 text-white rounded-lg p-2'>Cancel Order</button>
            </div>

        </div>
    )
}
