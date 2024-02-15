import React from 'react'
import { getMonthName } from '@/lib/utils';
import Link from 'next/link';
import { IoIosArrowDropdown } from "react-icons/io";
import { OrderDetails } from '@/lib/types';
import Tooltip from './Tooltip';
export default function OrderCard({ details }: { details: OrderDetails | null }) {
    const { userName, mobileNumber, address, pincode, amount, isAccepted, isDelivered, payment, products, orderId, time } = details ?? {userName:'', address:''};
    const time_ = details?.orderTime as Date;
    const date = new Date(time_);
    const month = date.toLocaleString('default', { month: 'long' });
    const stringDate = `${date.getDate()} ${month} ${date.getFullYear()}`
  

    return (
        <div className='flex flex-col md:flex-row justify-between w-full bg-blue-100 rounded-lg px-2 py-1 text-gray-600'>

            <div className='flex flex-col'>
                <p>ORDER PLACED</p>
                <p>{stringDate}</p>
            </div>
            <div className='flex flex-col'>
                <p>TOTAL</p>
                <p> &#x20B9; {amount}</p>
            </div>
            <div className='flex flex-col'>
                <p>SHIP TO</p>

                <p className='flex justify-center items-center gap-1'>{userName} <Tooltip name={userName} address={address} /></p>
            </div>
            <div className='flex flex-col'>
                <p> ORDER # {orderId}</p>
                <div className='flex gap-2'>
                    <button className='text-blue-700 hover:underline'
                    > <Link href={`/orders/${orderId}`}> View order details </Link></button>
                    {/* <button className='text-blue-700 hover:underline'
                    
                    >Invoice</button> */}
                </div>
            </div>
        </div>
    )
}
