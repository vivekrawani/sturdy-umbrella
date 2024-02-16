import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    useDisclosure,
    ModalCloseButton,
    useToast,
} from '@chakra-ui/react'
import axios from 'axios';
import { useRef, useState } from 'react'
import DateTimePicker from './DateTimePicker';
const Dialog = ({ isOpen, onOpen, onClose, actionType, orderId }: { isOpen: boolean, onOpen: () => void, onClose: () => void, actionType: string, orderId: string }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [date, setDate] = useState<Date>(new Date())

    const toast = useToast()
    const InputRef = useRef<HTMLInputElement>(null)
    const MyModalBody = () => {

        if (actionType === 'Accept Order')
            return (
                <div className='flex flex-col gap-2 justify-center items-center'>
                    <div className=''>Select Expected Delivery Date</div>
                    <DateTimePicker date={date} setDate={setDate} />
                </div>
            )
        else if(actionType==='Delete') {
            return (
                <div>
                    Delete
                </div>
            )
        }
        return (
            <div className='flex flex-col gap-2 justify-center items-center'>
                <label htmlFor='otp'
                    className='text-lg font-semibold'
                >Enter OTP</label>
                <input ref={InputRef} type='text' id='otp'
                    className='bg-gray-200 rounded-full p-3 outline-none' />
            </div>
        )
    }
    const handleAction = async () => {
        setIsLoading(true);
        const otp = InputRef.current?.value;
        
        let title = 'Confirm Order' ? 'Order Confirmed' : 'Order Accepted';
        try {
            const response = await axios.patch(`/api/orders/update`, {
                updateType: actionType,
                orderId,
                additionalInfo: actionType === 'Confirm Order' ? otp : date,
            })
            const res = response.data.res;


            const status = res.error ? 'error' : 'success';
            if (res.error) {
                title = res.message;
            }

            toast({
                title,
                status,
                duration: 5000,
                isClosable: true,
            },)

        } catch (error) {
            console.log(error);
        }
        setIsLoading(false)
        onClose()

    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay
                    bg='blackAlpha.100'
                    backdropFilter='blur(10px)' />
                <ModalContent>
                    <ModalHeader>
                        <h2 className='text-xl text-center font-bold'>{actionType}</h2>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <MyModalBody />
                    </ModalBody>
                    <ModalFooter>

                        <Button colorScheme='blue' mr={3} onClick={handleAction} isLoading={isLoading}>{actionType}</Button>

                        <Button variant='ghost' onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
export default Dialog;