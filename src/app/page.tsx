"use client";
import Image from 'next/image';
import React, { useState } from 'react'
import { Button, ButtonGroup } from '@chakra-ui/react'
export default function Home() {
  return (
    <div className='p-5 flex flex-col md:flex-row gap-6'>

      <Image src='/landing.svg' height={600} width={600} alt=''/>
      <div className='w-full flex flex-col gap-5 justify-center items-center mt-10 md:mt-0 '>
        <h1 className='font-bold text-3xl'>Welcome Let &apos;s Go</h1>
        <div className='flex flex-col gap-3'>
        <Button colorScheme='blue' className='w-32 p-2 '>Users</Button>
        <Button colorScheme='blue' className='w-32 p-2 '>Products</Button>
        <Button colorScheme='blue' className='w-32 p-2 '>Login</Button>
        <Button colorScheme='blue' className='w-32 p-2 '>Orders</Button>
        </div>
      </div>
    </div>

  )
}
