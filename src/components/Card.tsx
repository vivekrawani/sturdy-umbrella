import Link from 'next/link'
import React from 'react'

export default function Card({ details }: any) {
    const { imageUrl=null, price=0, discountedPrice=0, description='', inStock=0, name='' } = details;
    return (
        <div className="antialiased bg-gray-200 text-gray-900 font-sans p-6 min-w-80 ">
            <div className=" mx-auto">
                <div className="flex flex-wrap">
                    <div className="">
                        <Link href="" className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
                            <div className="relative pb-48 overflow-hidden">
                                <img className="absolute inset-0 h-full w-full object-cover"
                                    src={imageUrl} alt=""
                                />
                            </div>
                            <div className="p-4">
                                <h2 className="mt-2 mb-2  font-bold">{name}</h2>
                                <p className="text-sm">{description}</p>
                                <div className="mt-3 flex items-center gap-2">
                                    <span className='text-sm font-bold'>Original Price</span>  <span className=" text-sm">₹{price}</span>
                                </div>
                                <div className="mt-3 flex items-center  gap-2">
                                    <span className='text-sm font-bold'>Discounted Price Price</span> <span className="text-sm">₹{discountedPrice}</span>
                                </div>
                                <div className="mt-3 flex items-center  gap-2">
                                    <span className='text-sm font-bold'>In Stock</span>    <span className="text-sm">{inStock}</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    )
}
