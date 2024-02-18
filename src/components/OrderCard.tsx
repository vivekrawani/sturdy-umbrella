"use client";
import React from 'react'

import Link from 'next/link';
import { IoIosArrowDropdown } from "react-icons/io";
import { OrderDetails } from '@/lib/types';
import Tooltip from './Tooltip';
import { format } from 'date-fns';
import { OrderAction } from '@/lib/constants';
import { useDisclosure } from '@chakra-ui/react'
import Dialog from '@/components/Dialog'
export default function OrderCard({ details }: { details: OrderDetails | null }) {
    const { userName, mobileNumber, address, pincode, amount, isAccepted, isDelivered, payment, products, orderId, time,userId } = details ?? { userName: '', address: '' , orderId:'', userId : ''};
    const time_ = details?.orderTime as Date;
    const date = new Date(time_);
    const month = date.toLocaleString('default', { month: 'long' });
    const stringDate = `${date.getDate()} ${month} ${date.getFullYear()}`
    const localTime = format(date, "p")
    const isPending = isAccepted && (!isDelivered);
    const isNew = (!isAccepted) && (!isDelivered);
    let orderStatus = isPending ? OrderAction.CONFIRM_ORDER : OrderAction.ACCEPT_ORDER;
   
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isOpenD, onOpen: onOpenD, onClose: onCloseD } = useDisclosure()
   
    return (
        <div className='grid gap-2 md:grid-cols-5  w-full bg-blue-100 rounded-lg px-2 py-1 pb-2 text-gray-600'>

            <div className='flex flex-col'>
                <p>ORDER PLACED</p>
                <p>{stringDate}</p>
                <p>{localTime}</p>
                {isPending && <p> Expected Delivery : {time}</p>}
            </div>
            <div className='flex flex-col'>
                <p>TOTAL</p>
                <p> &#x20B9; {amount}</p>
            </div>
            <div className='flex flex-col'>
                <p>SHIP TO</p>

                <p className='flex items-center  gap-1'>{userName} <Tooltip name={userName} address={address} /></p>
            </div>
            <div className='flex flex-col col-span-2'>
                <p> ORDER # {orderId}</p>
                <div className='flex gap-2'>
                    <button className='text-blue-700 hover:underline'
                    > <Link href={`/orders/${orderId}`}> View order details </Link></button>
                    {/* <button className='text-blue-700 hover:underline'
                    
                    >Invoice</button> */}
                </div>
            </div>
            {(isPending || isNew) &&
                <div className='flex justify-between col-span-5'>
                    <div className='ml-10 py-1 px-2 text-white bg-green-500 rounded-lg cursor-pointer'
                    onClick={onOpen}
                    >{orderStatus} </div>
                    <div className='mr-10 py-1 px-2 text-white bg-red-500 rounded-lg cursor-pointer'
                    onClick={onOpenD}
                    >Cancel</div>
                </div>
            }
             {isOpen && <Dialog isOpen={isOpen} onOpen={onOpen} onClose={onClose} actionType={orderStatus} orderId={orderId} userId={userId} />}
            {isOpenD && <Dialog isOpen={isOpenD} onOpen={onOpenD} onClose={onCloseD} actionType={'Cancel'} orderId={orderId} userId={userId} />}
        </div>
    )
}
