import React from 'react'
import Image from 'next/image';
import bnImg1 from "../../../public/bussiness1.webp"
import bnImg2 from "../../../public/bussiness2.webp"
import bnImg3 from "../../../public/bussiness3.webp"
import bnImg4 from "../../../public/bussiness4.webp"


const page = () => {
  const cards = [
    {
      title: "Expand Your Reach with Us",
      description:
        "Join Johar Basket to showcase your products on a platform that guarantees fast delivery and a wide customer base in Ramgarh.",
      image: bnImg1,
    },
    {
      title: "Fast and Reliable Delivery",
      description:
        "Partnering with us ensures your products reach customers within 15 minutes, enhancing customer satisfaction and loyalty.",
      image: bnImg2,
      link: "#",
    },
    {
      title: "Collaborate for Success",
      description:
        "Leverage our platform to increase your brand visibility and tap into a growing market of eager consumers.",
      image: bnImg3,
    },
    {
      title: "Join Our Innovative Team",
      description:
        "Work with a dynamic team dedicated to innovation and customer-centric solutions, ensuring mutual growth and success.",
      image: bnImg4,
    },
  ];

  return (
    <section className="w-full py-16 px-4 lg:px-12 bg-white mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:mx-32">
        {cards.map((card, index) => (
          <div key={index} className="flex flex-col items-center text-center hover:underline">
            <div className="relative w-full h-[420px] overflow-hidden shadow-lg">
              <Image
                src={card.image}
                alt={card.title}
                layout="fill"
                objectFit="cover"
                className="hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-xl font-bold mt-4">{card.title}</h3>
            {card.link ? (
              <p className="text-gray-700 mt-2">
                <a href={card.link} className="">
                  {card.description}
                </a>
              </p>
            ) : (
              <p className="text-gray-700 mt-2 ">{card.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default page
