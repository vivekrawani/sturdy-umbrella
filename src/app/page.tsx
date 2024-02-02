"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'


export default function Home() {
  const router = useRouter();
  const user = true;
  if (!user) {
    router.push('/login')
  }
  return (
    <div className='p-2 flex'>
      <h1 className='text-3xl'>Hey</h1>
    </div>

  )
}
