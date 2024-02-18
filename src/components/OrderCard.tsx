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
import { genrateReceipt } from '@/lib/utils';
export default function OrderCard({ details }: { details: OrderDetails | null }) {
    const { userName, mobileNumber, address, pincode, amount, isAccepted, isDelivered, payment, products, orderId, time, userId, orderAcceptTime } = details ?? { userName: '', address: '', orderId: '', userId: '', orderAcceptTime: 'now' };
    const time_ = details?.orderTime || new Date();
    const date = new Date(time_);
    const orderTime = format(date, "PPp")
    const isPending = isAccepted && (!isDelivered);
    const isNew = (!isAccepted) && (!isDelivered);
    let orderStatus = isPending ? OrderAction.CONFIRM_ORDER : OrderAction.ACCEPT_ORDER;

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isOpenD, onOpen: onOpenD, onClose: onCloseD } = useDisclosure()
    return (
        <div className='grid gap-2 md:grid-cols-5  w-full bg-blue-100 rounded-lg px-2 py-1 pb-2 text-gray-600'>

            <div className='flex flex-col'>
                {isNew && <><div>ORDER PLACED</div>
                    <div>{orderTime}</div>
                </>}
                {isPending && <> <div><div>  ACCEPTED AT </div> <div>{(orderAcceptTime)?.toString()}</div> </div><div className='flex flex-col'> <div>EXPECTED DELIVERY :</div> <div>{time}</div> </div></>}
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
                        onClick={e => genrateReceipt(orderId)}

                    >Invoice</button>
                </div>
            </div>
            {(isPending || isNew) &&
                <div className='flex justify-start gap-10 col-span-5'>
                    <div className='ml-10 py-1 px-2 text-white bg-green-500 rounded-lg cursor-pointer'
                        onClick={onOpen}
                    >{orderStatus} </div>
                    {
                        orderStatus === OrderAction.ACCEPT_ORDER && <div className='mr-10 py-1 px-2 text-white bg-red-500 rounded-lg cursor-pointer'
                            onClick={onOpenD}
                        >Cancel</div>
                    }
                </div>
            }
            {isOpen && <Dialog isOpen={isOpen} onOpen={onOpen} onClose={onClose} actionType={orderStatus} orderId={orderId} userId={userId} />}
            {isOpenD && <Dialog isOpen={isOpenD} onOpen={onOpenD} onClose={onCloseD} actionType={'Cancel'} orderId={orderId} userId={userId} />}
        </div>
    )
}
