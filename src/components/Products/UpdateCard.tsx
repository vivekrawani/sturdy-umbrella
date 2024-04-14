"use client";
import {Image} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react"
import { FiFile } from 'react-icons/fi';
import FileUpload from '../FileUpload'
import axios from 'axios'
import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure,
    FormControl,
    FormErrorMessage, Icon, Textarea
} from '@chakra-ui/react'

import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react'

import { FcHighPriority } from "react-icons/fc";

import { useForm } from 'react-hook-form'
import { useToast } from '@chakra-ui/react'
import { usePathname, useRouter } from "next/navigation";
import { getStringBetween } from "@/lib/utils";
import { useAppDispatch } from "@/lib/store";
import { getProduct } from "@/lib/features/products/productSlice";
import { useAppSelector } from "@/lib/hooks";
interface IFormInput {
    name: string
    description: string
    file?: FileList
    inStock: number
    price: number
    discountedPrice: number
    isFeatured: boolean
}
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
export default function UpdateCard({ collection, id }: { collection: string, id: string }) {
    // const { imageUrl = null, price = 0, discountedPrice = 0, description = '', inStock = 0, name = '', productId = '', isFeatured = false } = details;
    const toast = useToast()
    const [loading, setLoading] = useState<boolean>(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const single = useAppSelector(state => state.productReducer.single);
    const imageUrl = single?.imageUrl as string;
    const price = single?.price;
    const discountedPrice = single?.discountedPrice;
    const description = single?.description;
    const inStock = single?.inStock;
    const name = single?.name as string;
    const productId = single?.productId;
    const isFeatured = single?.isFeatured;

    useEffect(() => {
        dispatch(getProduct({ id: id, collection: collection }))
    }, [dispatch, id, collection])
   


    const formRef = useRef<HTMLFormElement>() as React.MutableRefObject<HTMLFormElement>;
    const MyModal = () => {
        const { register, handleSubmit, formState: { errors }, control } = useForm<IFormInput>({
            defaultValues: {
                name,
                description,
                inStock,
                price,
                discountedPrice,
                isFeatured,
            }
        },)
        const onSubmit = handleSubmit(async (data) => {
            setLoading(true)
            const paths = getStringBetween(pathname)
            const sub = paths[2];
            const _id = paths[3];
            const response = await axios.patch(`/api/products/${sub}/${_id}`, data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            setLoading(false)
            onClose();
            toast({
                title: 'Update',
                description: "Update was successful",
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
            router.push('/products/grocery');
        })
        return (
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Details</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={onSubmit} >
                        <ModalBody>
                            <FormControl isInvalid={!!errors.file}>
                                <div className="grid grid-cols-3">
                                    <label htmlFor="name" className="py-4">Name</label>
                                    <input type="text" id="name"
                                        className="w-full px-4 py-3 col-span-2 rounded-full bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none "
                                        {...register("name")}
                                    />
                                    <label htmlFor="price" className="py-4">Price</label>
                                    <input type="number" id="price" min={0}
                                        className="w-full px-4 py-3 col-span-2 rounded-full bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none "
                                        {...register("price")}
                                    />
                                    <label htmlFor="discountedPrice" className="py-4">Discounted Price</label>
                                    <input type="number" id="discountedPrice" min={0}
                                        className="w-full px-4 py-3 col-span-2 rounded-full bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none "
                                        {...register("discountedPrice")}
                                    />
                                    <label htmlFor="inStock" className="py-4">In Stock</label>
                                    {/* <input type="number" id="inStock" min={0}
                                        className="w-full px-4 py-3 col-span-2 rounded-full bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none "
                                        {...register("inStock")}
                                    /> */}
                                    <div className="w-full px-4 py-1 col-span-2 rounded-full bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none">

                                        <NumberInput min={0}>
                                            <NumberInputField className="focus:bg-white focus:outline-none"  {...register("inStock")} />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-5">
                                    <label htmlFor="description">Description</label>
                                    <Textarea
                                        size={'sm'}
                                        {...register("description")} />
                                    <label className="flex items-center relative w-max cursor-pointer select-none">
                                        <span className=" mr-3">Is Featured</span>
                                        <input type="checkbox"
                                            {...register("isFeatured")}
                                            className="appearance-none transition-colors cursor-pointer w-14 h-7 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-500 bg-red-500" />
                                        <span className="absolute font-medium text-xs uppercase right-1 text-white"> OFF </span>
                                        <span className="absolute font-medium text-xs uppercase right-8 text-white"> ON </span>
                                        <span className="w-7 h-7 right-7 absolute rounded-full transform transition-transform bg-gray-200" />
                                    </label>
                                    <FileUpload
                                        accept={'image/*'}
                                        register={register('file')}
                                    >
                                        <Button leftIcon={<Icon as={FiFile} />} >
                                            Upload
                                        </Button>
                                    </FileUpload>
                                </div>
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} type='submit' isLoading={loading} >
                                Submit
                            </Button>
                            <Button variant='ghost' onClick={onClose}>Close</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        )
    }

    const handleDelete = async () => {
        setDeleteLoading(true)
        const paths = getStringBetween(pathname)
        const sub = paths[2];
        const _id = paths[3];
        const res = await axios.delete(`/api/products/${sub}/${_id}`)
        setDeleteLoading(false)
        onCloseD()
        toast({
            title: 'Delete',
            description: "Item was deleted",
            status: 'success',
            duration: 5000,
            isClosable: true,
        })
        router.push('/products/grocery');

    }
    const { isOpen: isOpenD, onOpen: onOpenD, onClose: onCloseD } = useDisclosure()
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
    const DeleteModal = () => {
        return (
            <Modal isOpen={isOpenD} onClose={onCloseD} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirm Delete</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className="flex gap-4 text-lg">
                            <FcHighPriority className="text-3xl" />
                            Do you realy want to remove this item?
                        </div>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onCloseD}>
                            Close
                        </Button>
                        <Button colorScheme="red" onClick={handleDelete} isLoading={deleteLoading}>Delete</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        )
    }
    const loadingConditon = (single === null) || loading;
    return (
        <div className='flex flex-row justify-center items-center h-80svh'>
            {loadingConditon ? <div className='loader'></div> :
                <div className="grid grid-cols-2 justify-around  md:w-1/2  m-4 bg-white rounded-3xl py-4 mx-4">
                    <div className=" h-max-32 w-max-32 p-2 rounded-full ">

                        <Image src={imageUrl}
                            boxSize='250px'
                            alt={name} />
                    </div>
                    <div className="flex flex-col justify-around">
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
                        </div>
                    </div>
                    <div className="col-span-2 ">
                        <div className="w-full flex flex-row gap-2 px-3 py-1">
                            <button className="bg-blue-500 rounded-full p-3 text-emerald-50 w-1/2 "
                                onClick={onOpen}
                            >Update Details</button>
                            <button className="bg-red-500 rounded-full p-3 text-emerald-50 w-1/2 "
                                onClick={onOpenD}
                            >Delete</button>


                        </div>
                        {isOpen && <MyModal />}
                        {isOpenD && <DeleteModal />}
                    </div>
                </div>
            }


        </div>
    )
}
