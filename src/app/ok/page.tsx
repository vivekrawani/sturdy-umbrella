"use client"
import Modal from '@/components/Modal'
import React, { useState } from 'react'
import FileUpload from '@/components/FileUpload'
import { ReactNode, useRef } from 'react'
import { Button, FormControl, FormErrorMessage, FormLabel, Icon, InputGroup } from '@chakra-ui/react'
import { useForm, UseFormRegisterReturn } from 'react-hook-form'
import { FiFile } from 'react-icons/fi'
import axios from 'axios'

import OrderCard from '@/components/OrderCard'

type FormValues = {
  search: string
}

export default function Ok() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()
  const onSubmit = handleSubmit(async (data) => {
    console.log('On Submit: ', data)
    const { search } = data;
    const res = await axios.get('/api/search')
    console.log(res.data);
  })
  return (
    <div className='flex mx-4'>



  
    </div>
  )
}
