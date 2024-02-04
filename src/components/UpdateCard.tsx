import Image from "next/image";
import { useRef, useState } from "react"
import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure,
    FormControl,
    FormLabel,
    NumberInput,
    NumberInputField,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInputStepper,
    Input,
} from '@chakra-ui/react'

import { useToast } from '@chakra-ui/react'

export default function UpdateCard({ details }: any) {
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    function onSubmit(e: any) {
        console.log("here");

        e.preventDefault()
        const formData = new FormData(formRef.current);

        const newPrice = formData.get('price')
        const newDp = formData.get('discountedPrice')
        const isS = formData.get('inStock')
        console.log(newPrice, newDp, isS);

        toast({
            title: 'Test',
            description: "Ok",
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
          onClose();

    }
    const formRef = useRef<HTMLFormElement>() as React.MutableRefObject<HTMLFormElement>;
    const { imageUrl = null, price = 0, discountedPrice = 0, description = '', inStock = 0, name = '', productId = '' } = details;
   

    const MyModal = () => (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <form ref={formRef} onSubmit={e => onSubmit(e)}>

                    <ModalHeader>Update Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <FormControl>
                            <FormLabel htmlFor="price">Price</FormLabel>
                            <Input type="number" name="price" id="price" defaultValue={price} min={0} />

                            <FormLabel htmlFor="discountedPrice">discountedPrice</FormLabel>
                            <Input type="number" name="discountedPrice" id="discountedPrice" defaultValue={discountedPrice} min={0} />

                            <FormLabel htmlFor="inStock">In Stock</FormLabel>
                            <Input type="number" name="inStock" id="inStock" defaultValue={inStock} min={0} />
                            {/* <Input type="number" id='price'
                                {...register("name", {
                                    required: "This is required",
                                    minLength: { value: 4, message: "Minimum length should be 4" },
                                })}
                                defaultValue={price} min={0} />

                            <FormLabel htmlFor="discounted price">Discounted Price</FormLabel>
                            <NumberInput id='discounted price' defaultValue={discountedPrice} min={0}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                            <FormLabel htmlFor="stock">Stock</FormLabel>
                            <NumberInput id='stock' defaultValue={inStock} min={0}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput> */}
                        </FormControl>


                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} type='submit' onSubmit={e => onSubmit(e)}>
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
