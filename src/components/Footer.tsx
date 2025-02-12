import React from "react";
import Image from 'next/image';
import Link from "next/link";

// Importing assets
import logo from "../assets/logwnobg.png";

const Footer: React.FC = () => {
  return (
    <div className="flex flex-col justify-between bg-gray-100 z-50 mt-20 ">

      <div className=" gap-7 flex items-center justify-between h-full font-Montserrat text-black px-[480px] mt-16">
        <Link href="/about" className="hidden lg:block">
          <p className="h-full flex items-center transition-all ease-in-out text-md hover:text-orange-400">About Us</p>
        </Link>
        <Link href="/Contact-Us" className="hidden lg:block">
          <p className="h-full flex items-center transition-all ease-in-out text-md hover:text-orange-400">Contact Us</p>
        </Link>
        <Link href="/johar-basket-for-partner" className="hidden lg:block">
          <p className="h-full flex items-center transition-all ease-in-out text-md hover:text-orange-400">johar basket for partner</p>
        </Link>
        <Link href="/bussiness-with-johar-basket" className="hidden lg:block">
          <p className="h-full flex items-center transition-all ease-in-out text-md hover:text-orange-400">Business with johar basket</p>
        </Link>
      </div>
        
      <hr className="mx-32 text-black border-black border-1 my-10" />

      {/* Footer Text */}
      <div className="flex justify-center flex-row gap-20 pb-5">
        <div className="text-center text-black text-[16px] ">
          © 2025 JoharBasket. All rights reserved.
        </div>
        <div className="text-center text-black text-[16px]  hover:text-orange-400 cursor-pointer transition-all ease-in-out">
          Terms and conditions
        </div>
        <div className="text-center text-black text-[16px]  hover:text-orange-400 cursor-pointer transition-all ease-in-out">
          Privacy Policy
        </div>
      </div>


      {/* Footer Login Link */}
      <div className="flex">
        <Link href={`joharbasket.com`} className="font-Inconsolata text-black text-4xl font-bold opacity-20 p-5 left-0">
          Johar Basket
        </Link>
      </div>
      
      
    </div>
  );
};

export default Footer;
