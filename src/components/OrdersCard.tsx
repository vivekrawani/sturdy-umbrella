import React from 'react'
import { Image } from '@chakra-ui/react';
import Link from 'next/link';

const Card = ({ details }: any) => {
  const { name, imageUrl, price, count, discountedPrice } = details;
  return (
    <div className='flex bg-white px-4 py-2 rounded-md'>
      <Image src={imageUrl} alt={name} boxSize='150px'
        objectFit='contain' />
      <div className='flex flex-col'>
        <div className='text-black font-bold'>
          {name}

        </div>
        <div className=' text-green-500'>
          &#x20B9;{price} x {count}
        </div>
      </div>
    </div>
  )
}

export default function OrdersCard({ details }: any) {
  const { userName, mobileNumber, address, pincode, amount, isAccepted, isDelivered, payment, products, orderId } = details;
  return (
    <div className='bg-gray-50 px-5 my-4 rounded-lg '>
      <Link href={`/orders/${orderId}`}>
        <div className='grid grid-cols-2 bg-blue-50 rounded-lg p-2'>
          <div className='text-semibold'>Order Id</div> <div className='text-sm  '>{orderId}</div>
          <div className='text-semibold'>Total Amount</div> <div className='text-sm text-red text-end'> &#x20B9;{amount}</div>
          <div className='text-semibold'>Ordered By</div> <div className='text-sm font-semibold text-end'>{userName}</div>
          <div className='text-semibold'>Mobile Number</div> <div className='text-sm text-end'>{mobileNumber}</div>
          <div className='text-semibold'>Address</div> <div className='text-sm text-end '>{address}</div>
          <div className='text-semibold'>Pincode</div> <div className='text-sm text-end'>{pincode}</div>

        </div>
      </Link>
    </div>
  )
}
/**
 *  <div onClick={e=>generateReceipt(e)}
          className='hover:text-blue-900 hover:cursor-pointer text-sm underline max-w-max'
        >View Receipt</div>
 */