import Image from 'next/image';
import Link from 'next/link'
import React from 'react'

function truncateString(str:string, num:number) {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  }

export default function Card({ details }: any) {
    const { imageUrl = null, price = 0, discountedPrice = 0, description = '', inStock = 0, name = '' } = details;
    return (




        <Link href="" className="c-card m-4 block bg-white shadow-md hover:shadow-xl rounded-lg p-2 h-96 w-64">
            <div className=" h-max-12 flex justify-center">
                <Image
                    src={imageUrl}
                    alt={name}
                    width={100}
                    height={100}
                />
            </div>
            <div className="p-4">
                <h2 className="mt-2 mb-2  font-bold">{name}</h2>

                <div className="mt-3 flex items-center gap-2">
                    <span className='text-sm font-bold'>Original Price</span>  <span className=" text-sm">₹{price}</span>
                </div>
                <div className="mt-3 flex items-center  gap-2">
                    <span className='text-sm font-bold'>Discounted Price Price</span> <span className="text-sm">₹{discountedPrice}</span>
                </div>
                <div className="mt-3 flex items-center  gap-2">
                    <span className='text-sm font-bold'>In Stock</span>    <span className="text-sm">{inStock}</span>
                </div>
                <p className="text-sm">{truncateString(description, 100)}</p>
            </div>
        </Link>


    )
}
