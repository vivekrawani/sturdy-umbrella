import React from "react";
import { FaTwitter, FaLinkedin } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { IoMdPerson } from "react-icons/io";



const Team = () => {

    const teamMembers = [
        {
          name: "Siddharth Nayak",
          role: "Founder & Director",
          description:
            "Siddharth Nayak is the driving force behind Johar Basket. He focuses on procuring high-quality products at the best prices, efficiently managing inventory, and overseeing overall operations to ensure smooth business growth.",
          twitter: "",
          linkedin: "https://www.linkedin.com/in/siddharth-nayak-190895332/",
        },
        {
          name: "Aman Kumar",
          role: "Founder & CEO",
          description:
            "Aman Kumar leads Johar Basket as the CEO, overseeing the technical development and ensuring smooth operations across all departments.",
          twitter: "",
          linkedin: "https://www.linkedin.com/in/aman-kumar-b7a651319/",
        },
        {
          name: "Anushka Pathak",
          role: "Chief Marketing Officer (CMO)",
          description:
            "Anushka Pathak is the creative mind behind Johar Basket’s marketing strategies. She designs innovative campaigns and works on acquiring new customers.",
          twitter: "https://x.com/anushkaa_pathak",
          linkedin: "https://www.linkedin.com/in/anushka-pathak-17643b297/",
        },
        {
          name: "Rachit Goyal",
          role: "App Developer",
          description:
            "Rachit Goyal is the backbone of Johar Basket’s app development, ensuring a seamless and user-friendly experience for customers.",
          twitter: "",
          linkedin: "https://www.linkedin.com/in/rachit-goyal-640b89247",
        },
        {
          name: "Hridyansh Awasthi",
          role: "Web Developer",
          description:
            "Hridyansh Awasthi is responsible for building and maintaining Johar Basket’s website, ensuring a smooth experience for users.",
          twitter: "https://x.com/hridayansh018",
          linkedin: "https://www.linkedin.com/in/hridayansh-awasthi-0095a12b6/",
        },
        {
          name: "Arun Sahu",
          role: "Operations & Field Incharge",
          description:
            "Arun Sahu ensures the smooth execution of Johar Basket’s field operations, overseeing the delivery staff and ensuring timely deliveries.",
          twitter: "",
          linkedin: "",
        },
      ];

  return (
    <section className="py-10 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
        <p className="text-gray-600 mb-8">
          Discover the passionate individuals driving Johar Basket’s success.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <IoMdPerson className="text-gray-400 text-6xl mx-auto mb-4" />
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-gray-500 text-sm mb-2">{member.role}</p>
              <p className="text-gray-600 text-sm mb-4">{member.description}</p>
              <div className="flex justify-center space-x-4">
                <a
                  href={member.twitter || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-black"
                >
                  <BsTwitterX size={20} />
                </a>
                <a
                  href={member.linkedin || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-black"
                >
                  <FaLinkedin size={20} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
