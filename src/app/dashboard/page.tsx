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
import { useEffect, useState } from "react";
import axios from "axios";
export default function Dashboard() {
  const user = useAppSelector(state => state.authReducer.user);
  const [banners, setBanners] = useState<string []>([]);

  const { isOpen, onClose, onOpen } = useDisclosure();
  useEffect(()=>{
    axios.get("/api/banner").then((res)=>{
      setBanners(res.data);
    }).catch(e=>{
      console.log("Error ")
    })
  }, [])

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
    <div className="flex flex-col justify-center m-2">

      <h1 className="font-bold text-7xl text-emerald-800 "> Welcome {user?.displayName}</h1>

      <div className="py-2 px-6 text-white text-[3rem] font-bold rounded-xl transition duration-500"
        onClick={handleClick}
      ><IoIosNotificationsOutline  className="text-3xl rounded-full bg-yellow-500 hover:animate-wiggle duration-150"/></div>
      {isOpen && <MyModal />}
      <h2 className="text-5xl font-bold">Banners</h2>
      <div className="flex gap-4 flex-wrap p-3">
        {
          banners.map((b)=><Image key={b} src={b} height={"200px"} width={"140px"} alt={b}/>)
        }
      </div>
    </div>
  )
}
