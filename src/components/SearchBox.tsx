import { useAppSelector } from '@/lib/hooks'
import React from 'react'
import type { Product } from '@/lib/types';
import { useState } from 'react';
import { searchRegEx } from '@/lib/utils';
import SmallProductCard from './SmallProductCard';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

export default function SearchBox({ isOpen, onClose, onOpen }: { isOpen: boolean, onClose: () => void, onOpen: () => void }) {
  const sub = useAppSelector(state => state.productReducer.sub)
  const [inputVal, setInputVal] = useState<string>('');
  const [filteredProduct, setFilteredProduct] = useState<Product[]>([]);
  const handleChange = (e: any) => {
    setInputVal(e.target.value)
    if (inputVal.length >= 3) {
      const filteredProduct = searchRegEx(inputVal, sub)
      setFilteredProduct(filteredProduct)
    }
  }

  return (

    <>
      <Modal isOpen={isOpen} onClose={onClose} size={'xl'} scrollBehavior='inside' >
        <ModalOverlay
          bg='blackAlpha.100'
          brightness={100}
          backdropFilter='blur(10px)' />
        <ModalContent>
          <ModalHeader>
            <input className='p-2 rounded-full outline-none w-full my-2'
              placeholder='enter atleast 3 letters'
              value={inputVal}
              onChange={e => handleChange(e)}
            />
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody>
            <div className=''>

              <hr />
              {
                filteredProduct.length > 0 && <div className='flex flex-col h-max-screen overflow-scroll'>
                  {
                    filteredProduct.map(product => <SmallProductCard key={product.productId} details={product} />)
                  }
                </div>
              }

            </div>
          </ModalBody>


        </ModalContent>
      </Modal>

    </>
  )
}
