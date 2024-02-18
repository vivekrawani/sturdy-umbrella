"use client";

import Loading from '@/components/Loading';
import OrdersCard from '@/components/OrderCard'
import { getOrders } from '@/lib/features/orders/orderSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useEffect, useState } from 'react';
export default function Orders() {
  const dispatch = useAppDispatch();
  const data = useAppSelector(state => state.orderReducers.data)
  useEffect(() => {
    dispatch(getOrders())
  }, [dispatch])

  const[value, setValue] = useState('All')

  return (
    <div className='flex flex-col mt-6 mx-4 gap-5 justify-center items-center '>
      <div className='w-full justify-end flex gap-4 items-center'>
        <label htmlFor="time-range" className='text-white font-bold text-md'></label>

        <select name="time-range" id="time-range" className='rounded-md min-w-max px-2 py-1' value={value} onChange={e=>{
          setValue(e.target.value)
        }}>
          <option value="All">All</option>
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="7days">Past 7 days</option>
        </select>
        {value}

      </div>
      {
        data!.length > 0 ? (data!.reduce((acc: any[], v) => {
          if (v?.isAccepted === false && v.isDelivered === false) {
            acc.push(<OrdersCard details={v} key={v.orderId} />)
          }
          return acc;
        }, []
        )) : <div className='w-full h-screen'><Loading /></div>
      }
    </div>

  )
}
