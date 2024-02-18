"use client";

import Loading from '@/components/Loading';
import OrdersCard from '@/components/OrdersCard'
import { getOrders } from '@/lib/features/orders/orderSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useEffect } from 'react';
export default function Orders() {
  const dispatch = useAppDispatch();
  const data = useAppSelector(state => state.orderReducers.data)
  useEffect(() => {
    dispatch(getOrders())
  }, [dispatch])

  return (
    <div className='flex flex-col mt-6 justify-center items-center bg-slate-300 '>
     
        {/* {


          data!.length > 0 ? (data?.map(v => {
            return (
              <OrdersCard key={v!.orderId} details={v} />
            )
          })) : <div className='w-full h-screen'><Loading /></div>
        } */}

      </div>
   
  )
}
