"use client"
import Modal from '@/components/Modal'
import React, { useState } from 'react'

export default function Ok() {
    const [open,setOpen] = useState(false)
  return (
    <div>
        <button onClick={e=>setOpen(true)}> Click here</button>
       { open && <Modal setOpen={setOpen}/>}
    </div>
  )
}
