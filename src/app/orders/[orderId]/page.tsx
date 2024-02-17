"use client"
import { getOrder } from '@/lib/features/orders/orderSlice'
import { useAppSelector } from '@/lib/hooks'
import { useAppDispatch } from '@/lib/store'
import { Image } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Card from '@/components/OrderDetailsCard'
import OrdersCard from '@/components/OrdersCard'
type Params = {
    params: {
        orderId: string
    }
}
import { useDisclosure } from '@chakra-ui/react'
import Dialog from '@/components/Dialog'
export default function Order({ params }: Params) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen:isOpenD, onOpen:onOpenD, onClose: onCloseD } = useDisclosure()
    const order = useAppSelector(state => state.orderReducers.single)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getOrder(params.orderId))
    }, [params.orderId])

    const userId = order.orderDetails?.userId as string

    const orderStatus = (order.orderDetails?.isAccepted === false) ? 'Accept Order' : 'Confirm Order'

    return (
        <div>
            <div>
                {
                    order?.products?.length > 0 && order!.products!.map(product => <Card details={product} key={product.productId} />)
                }
            </div>
            <div>
               {order?.orderDetails &&  <OrdersCard details={order.orderDetails} />}
            </div>
            <div className='flex w-full justify-center gap-5'>
            
                <button onClick={onOpen}
                 className='bg-green-600 text-white rounded-lg p-2'>{orderStatus}</button>
                <button onClick={onOpenD}
                 className='bg-red-600 text-white rounded-lg p-2'>Cancel Order</button>
            </div>
           {isOpen && <Dialog isOpen={isOpen} onOpen={onOpen} onClose={onClose} actionType={orderStatus} orderId={params.orderId} userId={userId}/>}
           {isOpenD && <Dialog isOpen={isOpenD} onOpen={onOpenD} onClose={onCloseD} actionType={'Delete'} orderId={params.orderId} userId={userId}/>}
        </div>
    )
}
