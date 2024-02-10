"use client";
import ProductForm from '@/components/ProductForm';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'


type IFormInput = {
    name: string,
    description: string,
    inStock: number,
    price: number,
    discountedPrice: number,
    isFeatured: boolean,
    file: FileList

}
export default function Products() {

    const { register, handleSubmit, formState: { errors }, control } = useForm<IFormInput>()
    const onSubmit = handleSubmit(async (data) => { })

    return (
        <div className='flex flex-col w-full rounded-xl mt-5 gap-2 items-center h-screen'>
            <div className='backdrop-blur w-full md:w-1/2'>
                <ProductForm/>
            </div>
        </div>
    )
}
