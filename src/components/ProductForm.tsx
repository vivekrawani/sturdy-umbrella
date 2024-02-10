import Image from "next/image";
import { useRef, useState } from "react"
import { FiFile } from 'react-icons/fi';
import FileUpload from './FileUpload'
import { FcUpload } from "react-icons/fc";
import axios from 'axios'
import {
    Button,
    FormControl,
    Toast,

} from '@chakra-ui/react'

import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react'

import { useForm } from 'react-hook-form'
import { useToast } from '@chakra-ui/react'
import { capitalizeFirstLetter } from "@/lib/utils";
const categories = [
    "cosmetics", "stationary", "grocery"
]
export default function ProductForm() {

    const { register, handleSubmit, formState: { errors }, control } = useForm();
    const toast = useToast()

    const onSubmit = handleSubmit(async (data) => {        
        const res = await axios.post('/api/products', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        console.log(res);
        toast({
            title: 'Added New Product',
            status: 'success',
            duration: 5000,
            isClosable: true,
        })
        
    });
    const inputs = [
        {
            id: "name",
            name: "Name",
            type: "text"
        },
        {
            id: "price",
            name: "Price",
            type: "number"
        },
        {
            id: "discountedPrice",
            name: "Discounted Price",
            type: "number"
        },
        {
            id:"size",
            name:"Size",
            type:"text"
        }
    ]
    return (
        <div className="flex flex-col px-5">

            <form onSubmit={onSubmit} >

                <FormControl >
                    <div className="flex gap-5 flex-col">
                        {
                            inputs.map((val) => (
                                <div className="flex flex-col md:flex-row md:justify-center md:items-center gap-3" key={val.id}>
                                    <label htmlFor={val.id} className="">{val.name}</label>
                                    <input type={val.type} id={val.id}
                                        className="w-full px-4 py-1 col-span-2 rounded-lg  mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none "
                                        {...register(val.id)}
                                    />
                                </div>
                            )
                            )
                        }



                        {/* <input type="number" id="inStock" min={0}
                                        className="w-full px-4 py-1 col-span-2 rounded-lg bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none "
                                        {...register("inStock")}
                                    /> */}
                        <div className="w-full flex  items-center gap-3">
                            <label htmlFor="inStock" className="">In Stock</label>
                            <NumberInput min={0}>
                                <NumberInputField className="rounded-lg   border focus:border-blue-500 focus:bg-white focus:outline-none"

                                    {...register("inStock")} />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <label htmlFor="description">Description</label>
                        <textarea
                            className="w-full px-4 py-1 col-span-2 rounded-lg  mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                            {...register("description")} />
                        <div className="flex justify-evenly">
                            <label className="flex items-center relative w-max cursor-pointer select-none">
                                <span className=" mr-3">Is Featured</span>
                                <input type="checkbox"
                                    {...register("isFeatured")}
                                    className="appearance-none transition-colors cursor-pointer w-14 h-7 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-500 bg-red-500" />
                                <span className="absolute font-medium text-xs uppercase right-1 text-white"> OFF </span>
                                <span className="absolute font-medium text-xs uppercase right-8 text-white"> ON </span>
                                <span className="w-7 h-7 right-7 absolute rounded-full transform transition-transform bg-gray-100" />
                            </label>
                            <select {...register('category')}
                                className="px-3 py-2">
                                {
                                    categories.map(val => <option key={val} value={val}>{capitalizeFirstLetter(val)}</option>)
                                }

                            </select>
                        </div>
                        <div className="flex justify-center items-center">

                            <FileUpload
                                accept={'image/*'}
                                register={register('file')}
                            >
                                <Button leftIcon={<FcUpload />}
                                    className="w-min" >
                                    Upload
                                </Button>
                            </FileUpload>

                            <Button colorScheme='blue' mr={3} type='submit' >
                                Submit
                            </Button>
                        </div>
                    </div>
                </FormControl>



            </form>

        </div>
    )
}
