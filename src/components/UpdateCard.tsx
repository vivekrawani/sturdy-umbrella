import Image from "next/image";
import { useRef, useState } from "react"
import { FiFile } from 'react-icons/fi';
import FileUpload from './FileUpload'
import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure,
    FormControl,
    FormErrorMessage, Icon, Textarea
} from '@chakra-ui/react'
import { useForm} from 'react-hook-form'
import { useToast } from '@chakra-ui/react'
interface IFormInput {
    name: string
    description: string
    file_?: FileList
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
export default function UpdateCard({ details }: any) {
    const { imageUrl = null, price = 0, discountedPrice = 0, description = '', inStock = 0, name = '', productId = '', isFeatured = false } = details;
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
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
    const onSubmit = handleSubmit((data) => {
        console.log("data : ", data)
        toast({
            title: 'Test',
            description: "Ok",
            status: 'success',
            duration: 5000,
            isClosable: true,
        })
        onClose();

    })
    const formRef = useRef<HTMLFormElement>() as React.MutableRefObject<HTMLFormElement>;
    const MyModal = () => (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update Details</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={onSubmit} >
                    <ModalBody>
                        <FormControl isInvalid={!!errors.file_}>
                            <div className="grid grid-cols-2">
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name"
                                    className="w-full px-4 py-3 rounded-full bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none "
                                    {...register("name")}
                                />
                                <label htmlFor="price">Price</label>
                                <input type="number" id="price"
                                    className="w-full px-4 py-3 rounded-full bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none "
                                    {...register("price", {min:0})}
                                />
                                <label htmlFor="discountedPrice">Discounted Price</label>
                                <input type="number" id="discountedPrice"
                                    className="w-full px-4 py-3 rounded-full bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none "
                                    {...register("discountedPrice", {min:0})}
                                />
                                <label htmlFor="inStock">In Stock</label>
                                <input type="number" id="inStock"
                                    className="w-full px-4 py-3 rounded-full bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none "
                                    {...register("inStock", {min:0})}
                                />
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
                                    register={register('file_')}
                                >
                                    <Button leftIcon={<Icon as={FiFile} />}>
                                        Upload
                                    </Button>
                                </FileUpload>
                            </div>
                            <FormErrorMessage>
                                {errors.file_ && errors?.file_.message}
                            </FormErrorMessage>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} type='submit' >
                            Submit
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Close</Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )











    return (
        <div className="flex flex-row justify-around  md:w-1/2  m-4 bg-white rounded-3xl py-4 mx-4">
            <div className=" h-max-32 w-max-32 p-2 rounded-full ">
                <Image src={imageUrl}
                    width={250}
                    height={250}
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
                <div className="w-full text-center">

                    <button className="bg-blue-500 rounded-full p-3"
                        onClick={onOpen}
                    >Update Details</button>
                    {isOpen && <MyModal />}
                </div>
            </div>
        </div>


    )
}
