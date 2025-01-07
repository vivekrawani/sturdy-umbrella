import React from "react";
import Image from 'next/image';

// Importing assets
import logo from "../assets/logwnobg.png";

const Footer: React.FC = () => {
  return (
    <div className="flex flex-col justify-between bg-orange-600 -top-64">
      <hr className="border-gray-300 my-10" />
      <div className="sm:grid grid-cols-[2fr_1fr] gap-16 text-sm mx-10 sm:mx-0 justify-between">
        {/* Description Section */}
        <div className="justify-around lg:mr-48">
          <p className="lg:ml-10 w-full text-xs lg:text-lg lg:pt-5 font-semibold text-white">
            Johar Basket is your one-stop online store for groceries and daily
            essentials. From fresh fruits and vegetables to household and
            personal care items, shopping is quick and easy through our website
            and app. Enjoy fast delivery, competitive pricing, and regular
            discounts, making us an affordable choice for everyday needs. With
            secure payment options like cards, UPI, and cash on delivery, we
            ensure a smooth shopping experience right to your doorstep.
          </p>
        </div>

        {/* Get In Touch Section */}
        <div className="my-6 -right-1 lg:pr-10">
          <h1 className="font-bold text-3xl mb-4 text-white">GET IN TOUCH</h1>
          <p className="text-gray-100 text-[18px] hover:text-gray-300 font-bold py-2">
            Email:
          </p>
          <p className="text-gray-100 text-[18px] hover:text-gray-300 font-semibold py-2">
            support@joharbasket.com
          </p>
          <p className="text-gray-100 text-[18px] hover:text-gray-300 font-semibold py-2">
            businessjoharbasket@gmail.com
          </p>
          <div className="transition-all ease-in-out hover:scale-105">
            <a
              href="https://www.instagram.com/joharbasket?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              className="text-gray-100 text-[30px] font-bold py-2"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Logo */}
      <a href="https://www.joharbasket.com/login">
        <Image
          src={logo}
          className="w-20 lg:w-32 opacity-70 -ml-2 px-2 cursor-pointer"
          alt="Johar Basket Logo"
        />
      </a>
      <hr />

      {/* Footer Text */}
      <div className="text-center text-gray-200 text-[16px] pb-10">
        Copyright © 2024 JoharBasket. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
