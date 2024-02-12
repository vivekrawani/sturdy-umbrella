"use client";
import React from 'react'
import { Image } from '@chakra-ui/react';
import jsPDF from "jspdf";

const createHeaders = (keys: any) => {
  var result = [];
  for (var i = 0; i < keys.length; i += 1) {
    result.push({
      id: keys[i],
      name: keys[i],
      prompt: keys[i],
      width: 65,
      align: "center",
      padding: 0
    });
  }
  return result;
}

const generateData = (products: any[], total : string) => {
  let result = [];
  const rupee: string = '\u20B9';
  for (var i = 0; i < products.length; i += 1) {
    const x = products[i];

    let data = {
      "Sl No.": (i + 1).toString(),
      "Particular": x.name,
      "Rate    ": (x.discountedPrice).toString(),
      "Quantity": (x.count).toString(),
      "Amount": (x.discountedPrice * x.count).toString()
    };
    result.push(data);
  }
 let data = {
    "Sl No.":"",
    "Particular":"",
    "Rate    ": "",
    "Quantity": "Total",
    "Amount": total
  }
  result.push(data)
  return result;
};



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

export default function OrdersCard({ details }:any) {
  const { userName, mobileNumber, address, pincode, amount, isAccepted, isDelivered, payment, products, orderId } = details;
  const generateReceipt = () => {
    const appName = "Johar Basket"
    const ShopAddress = "Near Chhat Talab Phulsarai"
    const shopAddress = "Ramgarh - 829101(Jharkhand)"
    const shopMob = "+91 9431728628"
    const doc = new jsPDF({ putOnlyUsedFonts: true });

    const headers: any[] = createHeaders([
      "Sl No.",
      "Particular",
      "Rate    ",
      "Quantity",
      "Amount"
    ]);
    doc.text(appName, 10, 10);
    const ds = doc.getFontSize()
    doc.setFontSize(10)
    doc.text(ShopAddress, 10, 20)
    doc.text(shopAddress, 10, 25)
    doc.text(shopMob, 10, 30)
    doc.table(10, 35, generateData(products, amount), headers, { autoSize: true });
    doc.save(orderId)

  }
  return (
    <div className='bg-gray-50 px-5 my-4 rounded-lg '>
      <div className='grid grid-cols-2 bg-blue-50 rounded-lg p-2'>
        <div className='text-semibold'>Order Id</div> <div className='text-sm  '>{orderId}</div>
        <div className='text-semibold'>Total Amount</div> <div className='text-sm text-red text-end'> &#x20B9;{amount}</div>
        <div className='text-semibold'>Ordered By</div> <div className='text-sm font-semibold text-end'>{userName}</div>
        <div className='text-semibold'>Mobile Number</div> <div className='text-sm text-end'>{mobileNumber}</div>
        <div className='text-semibold'>Address</div> <div className='text-sm text-end '>{address}</div>
        <div className='text-semibold'>Pincode</div> <div className='text-sm text-end'>{pincode}</div>
        <div onClick={generateReceipt}
          className='hover:text-blue-900 hover:cursor-pointer text-sm underline max-w-max'
        >View Receipt</div>
      </div>
    </div>
  )
}
