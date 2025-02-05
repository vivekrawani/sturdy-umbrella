"use client"

import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseCircleSharp } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import logo1 from "../../public/LogoOtr.png";
import logo2 from "../../public/brandmark.png";

type FlipLinkProps = {
  children: string;
  href: string;
};

const Header: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div className="h-20 w-full flex items-center justify-between fixed inset-0 shadow-lg backdrop-filter backdrop-blur-lg lg:px-10 z-50 bg-white">
      {/* Logo */}
      <div className="h-full flex items-center">
        <Image src={logo1} className="w-56 hidden lg:block" alt="Company Logo" />
        <Image src={logo2} className="w-16 mx-5 lg:hidden" alt="Mobile Brand Logo" />
      </div>

      {/* Hamburger Menu Icon */}
      <GiHamburgerMenu
        className="text-orange-600 text-3xl cursor-pointer mr-10"
        onClick={() => setVisible(true)}
      />

      {/* Mobile Menu */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 w-full h-full bg-[#faf3e1] z-50 flex flex-col justify-center items-center"
          >
            {/* Close Button */}
            <div className="absolute top-5 right-5 z-[100] p-2">
              <button
                onClick={() => setVisible(false)}
                className="p-4 mr-10 bg-transparent flex items-center justify-center transform transition-transform duration-300 ease-in-out hover:scale-125"
              >
                <IoCloseCircleSharp className="text-[#ff4900] w-8 h-8 absolute lg:mr-10" />
              </button>
            </div>

            {/* Menu Links */}
            <div className="flex flex-col items-center w-full bg-gray-100 space-y-8 mt-[550px] text-[#ff4900] text-center py-96">
              <FlipLink href="/">Home</FlipLink>
              <FlipLink href="/features">Groceries</FlipLink>
              <FlipLink href="/blog">Stationeries</FlipLink>
              <FlipLink href="/offers">Offers %</FlipLink>
              <button className="bg-[#ff4900] text-[#faf3e1] font-bold px-6 py-2 rounded-full text-2xl transform transition-transform duration-300 ease-in-out hover:scale-105">
                Contact Us
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DURATION = 0.25;
const STAGGER = 0.025;

const FlipLink: React.FC<FlipLinkProps> = ({ children, href }) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      className="relative block overflow-hidden whitespace-nowrap text-4xl font-black uppercase sm:text-7xl md:text-8xl lg:text-9xl"
      style={{ lineHeight: 0.75 }}
    >
      <div>
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};

export default Header;
