"use client";
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Products() {
    const route = useRouter()
    route.push('/products/grocery')
    return (
        <div className='flex'>
        </div>
    )
}
