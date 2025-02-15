"use client";
import Image from "next/image";
import { FaInstagram, FaDiscord, FaClock, FaMapMarkerAlt } from "react-icons/fa"; // Added new icons
import { useState } from "react";
import { X } from "lucide-react";
import { TAG_INFO } from "./tag";


interface PostProps {
    id: number;
    title: string;
    description: string;
    date?: string;
    location?: string;
    post_tag?: string;
    img_src?: string;
}




// Modal Component
const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
        // 1) Clicking this outer div will close the modal
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* 2) Prevent clicks inside the modal from closing it */}
            <div
                className="relative bg-[#2A3B50] rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-white hover:text-gray-300 z-10"
                >
                    <X className="w-6 h-6" />
                </button>
                {children}
            </div>
        </div>
    );
};
export default function Post({
    title,
    description,
    date,
    location,
    post_tag,
    img_src,
}: PostProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const tags = ["Club 1", "Nature", "Tech", "Poker"];


    const formattedDate = date
        ? new Intl.DateTimeFormat("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        }).format(new Date(date))
        : "February 15, 2025";


    const handleCardClick = () => {
        setIsModalOpen(true);
    };


    return (
        <>
            <div
                onClick={handleCardClick}
                className="flex bg-[#2A3B50] text-white rounded-xl overflow-hidden shadow-lg relative transform transition-transform duration-200 hover:scale-[1.01] cursor-pointer"
            >
                <style jsx>{`
         @keyframes shake {
           0% { transform: rotate(0deg); }
           20% { transform: rotate(-3deg); }
           40% { transform: rotate(3deg); }
           60% { transform: rotate(-3deg); }
           80% { transform: rotate(3deg); }
           100% { transform: rotate(0deg); }
         }
         .tag-shake:hover {
           animation: shake 0.4s ease-in-out;
         }
       `}</style>


                <div className="w-56 md:w-72 flex-shrink-0 relative">
                    {img_src ? (
                        <Image src={img_src} alt="Event Image" fill className="object-cover" />
                    ) : (
                        <Image
                            src="/images/placeholder.png"
                            alt="Placeholder"
                            fill
                            className="object-cover"
                        />
                    )}
                </div>


                <div className="flex-1 p-6 relative">
                    <h2 className="text-xl font-semibold mb-1">{title}</h2>
                    <p className="text-sm text-gray-300 mb-2">{formattedDate}</p>
                    <p className="text-gray-300 text-sm md:text-base mb-2 pr-4">
                        {description}
                    </p>
                    {location && (
                        <p className="text-sm text-gray-400 mb-3">{location}</p>
                    )}


                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag, idx) => {
                            const tagColor =
                                tag.toLowerCase().includes("club")
                                    ? "bg-[#D4FFD7] text-black"
                                    : tag === "Nature"
                                        ? "bg-purple-300 text-black"
                                        : tag === "Tech"
                                            ? "bg-purple-400 text-black"
                                            : tag === "Poker"
                                                ? "bg-purple-500 text-black"
                                                : "bg-gray-700 text-gray-200";


                            return (
                                <span
                                    key={idx}
                                    className={`${tagColor} px-3 py-1 rounded-full text-xs tag-shake cursor-pointer`}
                                >
                                    {tag}
                                </span>
                            );
                        })}
                    </div>


                    <div className="absolute top-4 right-2 flex flex-col gap-2">
                        <div className="p-2 bg-gray-700 rounded-md cursor-pointer tag-shake transition-colors duration-200 hover:bg-white group">
                            <FaInstagram className="w-5 h-5 text-white transition-colors duration-200 group-hover:text-gray-700" />
                        </div>
                        <div className="p-2 bg-gray-700 rounded-md cursor-pointer tag-shake transition-colors duration-200 hover:bg-white group">
                            <FaDiscord className="w-5 h-5 text-white transition-colors duration-200 group-hover:text-gray-700" />
                        </div>
                    </div>
                </div>
            </div>


            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="relative w-full aspect-[4/3]">
                    {img_src ? (
                        <Image
                            src={img_src}
                            alt="Event Image"
                            fill
                            className="object-cover" // Removed rounded-t-xl
                        />
                    ) : (
                        <Image
                            src="/images/placeholder.png"
                            alt="Placeholder"
                            fill
                            className="object-cover" // Removed rounded-t-xl
                        />
                    )}
                </div>
                <div className="p-6 text-white ">
                    <h2 className="text-2xl font-semibold mb-2">{title}</h2>
                    <div className="flex items-center gap-6 mb-4">
                        <div className="flex items-center gap-2">
                            <FaClock className="text-gray-300 w-4 h-4" />
                            <span className="text-gray-300">
                                {formattedDate}
                            </span>
                        </div>
                        {location && (
                            <div className="flex items-center gap-2">
                                <FaMapMarkerAlt className="text-gray-300 w-4 h-4" />
                                <span className="text-gray-300">{location}</span>
                            </div>
                        )}
                    </div>
                    <p className="text-gray-300 mb-6">{description}</p>

                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag, idx) => {
                            const tagColor =
                                tag.toLowerCase().includes("club")
                                    ? "bg-[#D4FFD7] text-black"
                                    : tag === "Nature"
                                        ? "bg-purple-300 text-black"
                                        : tag === "Tech"
                                            ? "bg-purple-400 text-black"
                                            : tag === "Poker"
                                                ? "bg-purple-500 text-black"
                                                : "bg-gray-700 text-gray-200";


                            return (
                                <span
                                    key={idx}
                                    className={`${tagColor} px-3 py-1 rounded-full text-xs`}
                                >
                                    {tag}
                                </span>
                            );
                        })}
                    </div>
                </div>
            </Modal>
        </>
    );
}

