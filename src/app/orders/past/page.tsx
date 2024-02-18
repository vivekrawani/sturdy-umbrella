"use client";

import Loading from '@/components/Loading';
import OrdersCard from '@/components/OrderCard'
import { getOrders, getPastOrders } from '@/lib/features/orders/orderSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useEffect } from 'react';
export default function Orders() {
  const dispatch = useAppDispatch();
  const data = useAppSelector(state => state.orderReducers.pastOrders)
  useEffect(() => {
    dispatch(getPastOrders())
  }, [dispatch])
  return (
    <div className='flex flex-col mt-6 mx-4 gap-5 justify-center items-center'>
     
        {
          data?.length > 0 ? (data?.map(v=><OrdersCard details={v} key={v?.orderId} />)) : <div className='w-full h-screen'><Loading /></div>
        }

      </div>
    
  )
}
