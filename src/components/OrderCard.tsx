import React from 'react'
import { getMonthName } from '@/lib/utils';
import Link from 'next/link';
import { IoIosArrowDropdown } from "react-icons/io";
import { OrderDetails } from '@/lib/types';
import Tooltip from './Tooltip';
import { format, getTime } from 'date-fns';
import { genrateReceipt } from '@/lib/utils'
export default function OrderCard({ details }: { details: OrderDetails | null }) {
    const { userName, mobileNumber, address, pincode, amount, isAccepted, isDelivered, payment, products, orderId, time } = details ?? {userName:'', address:''};
    const time_ = details?.orderTime as Date;
    const date = new Date(time_);
    const orderId_ = orderId as string;
    const month = date.toLocaleString('default', { month: 'long' });
    const stringDate = `${date.getDate()} ${month} ${date.getFullYear()}`
    const localTime = format(date, "p")

    return (
        <div className='grid gap-2 md:grid-cols-5  w-full bg-blue-100 rounded-lg px-2 py-1 text-gray-600'>

            <div className='flex flex-col'>
                <p>ORDER PLACED</p>
                <p>{stringDate}</p>
                <p>{localTime}</p>
            </div>
            <div className='flex flex-col'>
                <div>TOTAL</div>
                <div> &#x20B9; {amount}</div>
            </div>
            <div className='flex flex-col'>
                <div>SHIP TO</div>

                <div className='flex items-center  gap-1'>{userName} <Tooltip name={userName} address={address} /></div>
            </div>
            <div className='flex flex-col col-span-2'>
                <div> ORDER # {orderId}</div>
                <div className='flex gap-2'>
                    <button className='text-blue-700 hover:underline'
                    > <Link href={`/orders/${orderId}`}> View order details </Link></button>
                    <button className='text-blue-700 hover:underline'
                        onClick={e => genrateReceipt(orderId_)}

                    >Invoice</button>
                </div>
            </div>
        </div>
    )
}
