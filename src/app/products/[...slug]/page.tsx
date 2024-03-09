"use client"
import UpdateCard from '@/components/UpdateCard';
import Card from '@/components/Card';
import Loading from "@/components/Loading";
import { fetchProductsFrom, getProduct, fetchProductsInitial } from '@/lib/features/products/productSlice';
import { useAppSelector } from '@/lib/hooks';
import { useAppDispatch } from '@/lib/store';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { IoMdAddCircle } from "react-icons/io";
import { useDisclosure } from '@chakra-ui/react';
import AddProductModal from '@/components/AddProductModal';
interface Context {
  params: {
    slug: string[]
  }
}

export default function Products({ params }: Context) {
  const { slug } = params;
  const router = useRouter();
  const user = useAppSelector(state => state.authReducer.user);
  const { single, loading } = useAppSelector(state => state.productReducer)
  const { sub } = useAppSelector(state => state.productReducer)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  useEffect(() => {
    let timeout = setTimeout(()=>{});
    if (slug?.length === 1) {
      dispatch(fetchProductsInitial(slug[0])).then(()=>{
         timeout = setTimeout(()=>{
          dispatch(fetchProductsFrom(slug[0]));
        }, 10000)
        return timeout;
      })
    }
    if (slug?.length === 2) {
      dispatch(getProduct({ id: slug[1], collection: slug[0] }))
    }
   return ()=>{
    clearTimeout(timeout);
   }
  }, [slug,dispatch])
  const isAdmin = user && user!.isAdmin;
  if (!isAdmin) {
    setTimeout(() => {
      router.back()
    }, 5000)

    return (
      <div className='flex flex-col justify-center items-center h-80svh'>
        <h1 className='text-3xl text-blue-400 '>Hey your are not an admin! You cannot view this page</h1>
        <p>Redirecting in 5s</p>
      </div>
    )
  }

  const loadingConditon = (single === null) || loading;
  if (slug?.length === 2) {


    return (
      <div className='flex flex-row justify-center items-center h-80svh'>

        {loadingConditon ? <div className='loader'></div> : <UpdateCard details={single} />}

      </div>
    )
  }
  if (slug?.length === 1) {
    const loadingConditonA = (sub === null) || loading;
    return (
      <React.Fragment>
        {loadingConditonA ? <div className="w-full h-screen">
          <Loading />
        </div> : <div className='grid md:grid-cols-4 place-items-center'>

          {
            sub.map((val: any) => <Card key={val.productId} details={val} category={slug[0]} />)
          }


        </div>

        }
        <div className=' fixed bottom-5 right-5'>

          <IoMdAddCircle className=' text-4xl cursor-pointer'
            onClick={onOpen} />
        </div>
        <> <AddProductModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} sub={slug[0]} /></>


      </React.Fragment>
    )
  }
}

