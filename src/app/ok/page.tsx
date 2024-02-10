"use client"
import Modal from '@/components/Modal'
import React, { useState } from 'react'
import FileUpload from '@/components/FileUpload'
import { ReactNode, useRef } from 'react'
import { Button, FormControl, FormErrorMessage, FormLabel, Icon, InputGroup } from '@chakra-ui/react'
import { useForm, UseFormRegisterReturn } from 'react-hook-form'
import { FiFile } from 'react-icons/fi'
import axios from 'axios'

type FormValues = {
  search: string
}

export default function Ok() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()
  const onSubmit = handleSubmit(async (data) => {

    console.log('On Submit: ', data)
    const { search } = data;
    const res = await axios.get('/api/search', {
      headers: {
        data: search
      }
    })

    console.log(res.data);


  })

  const validateFiles = (value: FileList) => {
    if (value.length < 1) {
      return 'Files is required'
    }
    for (const file of Array.from(value)) {
      const fsMb = file.size / (1024 * 1024)
      const MAX_FILE_SIZE = 10
      if (fsMb > MAX_FILE_SIZE) {
        return 'Max file size 10mb'
      }
    }
    return true
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <FormControl>
          <FormLabel>{'Search'}</FormLabel>
          <input type='text' {...register('search')} />
        </FormControl>

        <button>Submit</button>
      </form>

    </div>
  )
}
