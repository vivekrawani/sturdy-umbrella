"use client";
import React, { useEffect, useRef, useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react'
import axios from 'axios';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { useAppSelector } from '@/lib/hooks';



function Card({ notification }: any) {
    return (
        <div>
           test
        </div>
    )
}

export default function Notifications() {
    const user = useAppSelector(state => state.authReducer.user);
   const notifications = useAppSelector(state=>state.notificationReducers.notifications);
    const author = {
        name: user?.displayName,
        email: user?.email,
    }
    const { isOpen, onClose, onOpen } = useDisclosure();
   
   

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (formRef.current) {
            const formData = new FormData(formRef.current);
            const title = formData.get("title");
            const body = formData.get("body");
            const api = process.env.NEXT_PUBLIC_FIREBASE_funapi;
            axios.post(`${api}/v1/notification`, {
                title,
                body,
                author,
            })
            onClose();
        }
    }

    const formRef = useRef<HTMLFormElement>(null);
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
                        <form className="flex flex-col" onSubmit={handleSubmit} ref={formRef}>
                            <label htmlFor="title"> Title</label>
                            <input type="text" name="title" id="title"
                                className="w-full px-4 py-3 rounded-lg bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                                required />
                            <label htmlFor="body"> Body</label>
                            <textarea name="body" id="body"
                                className="w-full px-4 py-3 rounded-lg bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                                required />
                            <button type="submit" className="rounded-lg bg-blue-500 text-white py-1 px-3 max-w-max mt-8">Send</button>
                        </form>
                    </div>
                </ModalBody>


            </ModalContent>
        </Modal>

    </>)

    const handleClick = () => {
        if (user?.isAdmin) {
            onOpen()
        }
    }
    console.log(notifications);
    return (
        <div className="bg-white rounded-md shadow-md shadow-slate-900 p-4 divide-y-8 divide-white">
            <h2 className="text-5xl font-bold">Notifications</h2>
            <div className='flex items-center gap-3'>
                <span className='text-xl'>Send a notification</span>
                <div className="py-2 text-white text-[3rem] font-bold rounded-xl transition duration-500"
                    onClick={handleClick}
                ><IoIosNotificationsOutline className="text-3xl rounded-full bg-yellow-500 hover:animate-wiggle duration-150" /></div>

            </div>
            <div>
                <span className='text-xl'>Past Notifications</span>
                <div>
                    {
                        notifications?.length > 0 && <>
                            {
                                notifications?.map((notification: any) => {
                                    <Card notification={notification} />
                                })
                            }
                        </>
                    }


                </div>
            </div>
            {isOpen && <MyModal />}
        </div>
    )
}
