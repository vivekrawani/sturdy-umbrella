//components/products/tab.tsx

"use client";
import React, { useState } from "react";

export default function Tab({
  subs,
  subcategory,
  setSubcategory,
}: {
  subs: any[];
  subcategory: string;
  setSubcategory: any;
}) {
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  console.log(subcategory, activeIndex);

  return (
    <div className="  my-3 py-3 px-5 flex flex-row gap-1 flex-wrap">
      <div
        className={` flex justify-center items-center p-2 w-40 h-20 bg-gray-400 text-green-700
                    hover:bg-green-600 hover:text-white rounded-3xl hover:rounded-xl 
                    transition-all duration-200 ease-in cursor-pointer
                    ${
                      activeIndex === -1
                        ? "bg-green-600 text-white rounded-xl"
                        : " bg-gray-400 text-green-700 rounded-3xl"
                    }
                    `}
        onClick={(e) => {
          setSubcategory("all");
          setActiveIndex(-1);
        }}
      >
        All
      </div>
      {subs.map((sub, i) => (
        <div
          key={i}
          className={` flex justify-center items-center p-2 w-40 h-20 bg-gray-400 text-green-700
                    hover:bg-green-600 hover:text-white rounded-3xl hover:rounded-xl 
                    transition-all duration-200 ease-in cursor-pointer
                    ${
                      activeIndex !== i
                        ? " bg-gray-400 text-green-700 rounded-3xl"
                        : "bg-green-600 text-white rounded-xl"
                    }
                    `}
          onClick={(e) => {
            setSubcategory(sub.name);
            setActiveIndex(i);
          }}
        >
          {sub.name}
        </div>
      ))}
    </div>
  );
}
