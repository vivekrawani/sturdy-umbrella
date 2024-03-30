"use client"
import Card from '@/components/Card';
import Loading from "@/components/Loading";
import { fetchProductsFrom, getProduct, fetchProductsInitial } from '@/lib/features/products/productSlice';
import { useAppSelector } from '@/lib/hooks';
import { useAppDispatch } from '@/lib/store';
import React, {  useEffect, useState } from 'react'
import { IoMdAddCircle } from "react-icons/io";
import { useDisclosure } from '@chakra-ui/react';
import AddProductModal from '@/components/AddProductModal';
import { notFound } from 'next/navigation';
import { getSubcategories } from '@/lib/features/subcategories';
import { Product } from '@/lib/types';
type Category = "pooja" | "cosmetics" | "grocery" | "stationary";
export default function Products({ category }: { category: Category }) {
  const user = useAppSelector(state => state.authReducer.user);
  const { loading, sub } = useAppSelector(state => state.productReducer)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const loadingConditonA = (sub.length === 0);

  const [subcategory, setSubcategory] = useState<string>('all');
  const subs = useAppSelector(state=>state.subcategoriesReducers[category]);

  useEffect(() => {
    let timeout: any = null;
    const fetchProducts = async () => {
      await dispatch(fetchProductsInitial(category));
      const timeout = setTimeout(() => {
        dispatch(fetchProductsFrom(category));
      }, 10000);
      return timeout;
    }
    fetchProducts().then(res => {
      timeout = res;
    })
    dispatch(getSubcategories(category));
    return () => {
      clearTimeout(timeout);
    }
  }, [category, dispatch])

  // if (!(user?.isAdmin)) {
  //   return notFound();
  // }
  const [filtered, setFiltered] = useState<Product[]>([]);
  useEffect(()=>{
    const res = sub.filter(s=>{
      if(subcategory === 'all'){
        return true;
      }
      if(s.category === subcategory){
        return true;
      }
    })
    setFiltered(res);
 
  }, [subcategory, sub])
  return (
    <>
      {loadingConditonA ? <div className="w-full h-screen">
        <Loading />
      </div> :
        <>
        <div className='w-full mx-12'>
          
        <select name="subcategory" id="time-range" className='rounded-lg outline-none w-10 min-w-max px-2 py-1' value={subcategory} onChange={e => {
          setSubcategory(e.target.value)
        }}>
          <option value="all">All</option>
          {
            subs.map((s, i)=><option key={i} value={s.name}>{s.name}</option>)
          }
        </select>
        </div>
          <div className='grid md:grid-cols-4 place-items-center'>

            {
              filtered.map((val: any) => <Card key={val.productId} details={val} category={category} />)
            }
          </div>
        </>
      }
      <div className=' fixed bottom-5 right-5'>
        <IoMdAddCircle className=' text-4xl cursor-pointer'
          onClick={onOpen} />
      </div>
      <> <AddProductModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} sub={category} /></>
    </>
  )
}

