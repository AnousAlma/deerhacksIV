"use client";
import Image from "next/image";
import { FaInstagram, FaDiscord, FaClock, FaMapMarkerAlt, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { X } from "lucide-react";

interface PostProps {
    id: number;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    location: string;
    img_src?: string;
    isDashboard?: boolean;
}

const dateFormat = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
});


// Modal Component
const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode; }) => {
    if (!isOpen) return null;
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="relative bg-[#2A3B50] rounded-xl w-[40vw] max-h-[90vh] overflow-y-auto"
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
    startDate,
    endDate,
    location,
    img_src,
    isDashboard,
}: PostProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Convert date strings to Date objects
    const startDateObj = startDateTime ? new Date(startDateTime) : null;
    const endDateObj = endDateTime ? new Date(endDateTime) : null;

    const formattedStartDate = dateFormat.format(new Date(startDate));
    const formattedEndDate = dateFormat.format(new Date(endDate));
    // Conditional formatting variables for card and modal displays
    let dateDisplayCard;
    let dateDisplayModal;

    if (startDateObj && endDateObj) {
        const sameDay =
            startDateObj.getFullYear() === endDateObj.getFullYear() &&
            startDateObj.getMonth() === endDateObj.getMonth() &&
            startDateObj.getDate() === endDateObj.getDate();

        if (sameDay) {
            const datePart = new Intl.DateTimeFormat("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
            }).format(startDateObj);
            const startTime = new Intl.DateTimeFormat("en-US", {
                hour: "numeric",
                minute: "numeric",
            }).format(startDateObj);
            const endTime = new Intl.DateTimeFormat("en-US", {
                hour: "numeric",
                minute: "numeric",
            }).format(endDateObj);

            dateDisplayCard = (
                <p className="text-sm text-gray-300 mb-2">
                    {datePart} - {startTime} to {endTime}
                </p>
            );
            dateDisplayModal = (
                <div className="flex items-center gap-2">
                    <FaClock className="text-gray-300 w-4 h-4" />
                    <span className="text-gray-300">
                        {datePart} - {startTime} to {endTime}
                    </span>
                </div>
            );
        } else {
            const formattedStart = new Intl.DateTimeFormat("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
            }).format(startDateObj);
            const formattedEnd = new Intl.DateTimeFormat("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
            }).format(endDateObj);

            dateDisplayCard = (
                <>
                    <p className="text-sm text-gray-300 mb-2">Start: {formattedStart}</p>
                    <p className="text-sm text-gray-300 mb-2">End: {formattedEnd}</p>
                </>
            );
            dateDisplayModal = (
                <>
                    <div className="flex items-center gap-2">
                        <FaClock className="text-gray-300 w-4 h-4" />
                        <span className="text-gray-300">Start: {formattedStart}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaClock className="text-gray-300 w-4 h-4" />
                        <span className="text-gray-300">End: {formattedEnd}</span>
                    </div>
                </>
            );
        }
    } else {
        dateDisplayCard = (
            <>
                <p className="text-sm text-gray-300 mb-2">Start date not set</p>
                <p className="text-sm text-gray-300 mb-2">End date not set</p>
            </>
        );
        dateDisplayModal = (
            <>
                <div className="flex items-center gap-2">
                    <FaClock className="text-gray-300 w-4 h-4" />
                    <span className="text-gray-300">Start date not set</span>
                </div>
                <div className="flex items-center gap-2">
                    <FaClock className="text-gray-300 w-4 h-4" />
                    <span className="text-gray-300">End date not set</span>
                </div>
            </>
        );
    }

    const handleCardClick = () => {
        setIsModalOpen(true);
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent triggering the card click
        console.log("Delete post with ID:", id); // Add your delete logic here
    };

    return (
        <>
            <div
                onClick={handleCardClick}
                className="flex bg-[#2A3B50] text-white rounded-xl overflow-hidden shadow-lg relative transform transition-transform duration-200 hover:scale-[1.01] cursor-pointer"
            >
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
                    {dateDisplayCard}
                    <p className="text-gray-300 text-sm md:text-base mb-2 pr-4">
                        {description}
                    </p>
                    {location && (
                        <p className="text-sm text-gray-400 mb-3">{location}</p>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {["Club 1", "Nature", "Tech", "Poker"].map((tag, idx) => {
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
                                    className={`${tagColor} px-3 py-1 rounded-full text-xs cursor-pointer`}
                                >
                                    {tag}
                                </span>
                            );
                        })}
                    </div>

                    <div className="absolute top-4 right-2 flex flex-col gap-2">
                        <div className="p-2 bg-gray-700 rounded-md cursor-pointer transition-colors duration-200 hover:bg-white group">
                            <FaInstagram className="w-5 h-5 text-white transition-colors duration-200 group-hover:text-gray-700" />
                        </div>
                        <div className="p-2 bg-gray-700 rounded-md cursor-pointer transition-colors duration-200 hover:bg-white group">
                            <FaDiscord className="w-5 h-5 text-white transition-colors duration-200 group-hover:text-gray-700" />
                        </div>

                        {/* Trash can icon (only for dashboard) */}
                        {isDashboard && (
                            <div
                                className="p-2 bg-red-600 rounded-md cursor-pointer transition-colors duration-200 hover:bg-red-500 group"
                                onClick={handleDelete}
                            >
                                <FaTrash className="w-5 h-5 text-white transition-colors duration-200 group-hover:text-white" />
                            </div>
                        )}
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
                            className="object-cover"
                        />
                    ) : (
                        <Image
                            src="/images/placeholder.png"
                            alt="Placeholder"
                            fill
                            className="object-cover"
                        />
                    )}
                </div>
                <div className="p-6 text-white">
                    <h2 className="text-2xl font-semibold mb-2">{title}</h2>
                    <div className="flex flex-col gap-1 mb-4">
                        {dateDisplayModal}
                        {location && (
                            <div className="flex items-center gap-2">
                                <FaMapMarkerAlt className="text-gray-300 w-4 h-4" />
                                <span className="text-gray-300">{location}</span>
                            </div>
                        )}
                    </div>
                    <p className="text-gray-300 mb-6">{description}</p>
                    <div className="flex flex-wrap gap-2">
                        {["Club 1", "Nature", "Tech", "Poker"].map((tag, idx) => {
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