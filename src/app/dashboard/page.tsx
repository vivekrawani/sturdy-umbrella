"use client";
import { useAppSelector } from "@/lib/hooks"
import { Image, useDisclosure } from "@chakra-ui/react";
import { IoIosNotificationsOutline } from "react-icons/io";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
export default function Dashboard() {
  const user = useAppSelector(state => state.authReducer.user);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const MyModal = () => (<>
    <Modal isOpen={isOpen} onClose={onClose} size={'xl'} scrollBehavior='inside' >
      <ModalOverlay
        bg='blackAlpha.100'
        brightness={100}
        backdropFilter='blur(10px)' />
      <ModalContent>
        <ModalHeader>
          Enter message
        </ModalHeader>

        <ModalCloseButton />
        <ModalBody>
          <div >
            <form className="flex flex-col">
              <label htmlFor="title"> Title</label>
              <input type="text" name="title" id="title"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                required />
              <label htmlFor="body"> Body</label>
              <textarea name="body" id="body" 
                className="w-full px-4 py-3 rounded-lg bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                required/>

            </form>
          </div>
        </ModalBody>


      </ModalContent>
    </Modal>

  </>)

  const handleClick = () => {
    onOpen()
  }
  return (
    <div className="flex flex-col justify-center items-center  mt-5 gap-5">

      <h1 className="font-bold text-3xl text-emerald-800 "> Welcome {user?.displayName}</h1>
      <div className="py-2 px-6  text-sm text-white text-[3rem] font-bold rounded-xl transition duration-500"
        onClick={handleClick}
      ><IoIosNotificationsOutline /></div>
      {isOpen && <MyModal />}
    </div>
  )
}
