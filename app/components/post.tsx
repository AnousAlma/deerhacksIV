"use client";
import Image from "next/image";
import { FaInstagram, FaDiscord, FaClock, FaMapMarkerAlt, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { Router, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface PostProps {
    id: number;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    location: string;
    img_src?: string;
    instagramUrl?: string;
    discordUrl?: string;
    isDashboard?: boolean;
    tags?: string;
    setReload?: (value: React.SetStateAction<number>) => void;
    previewUrl?: string;
}

const dateFormat = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
});

const timeFormat = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
});

const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode; }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="relative bg-[#2A3B50] rounded-xl w-[40vw] max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute right-4 top-4 text-white hover:text-gray-300 z-10">
                    <X className="w-6 h-6" />
                </button>
                {children}
            </div>
        </div>
    );
};

export default function Post({ id, title, description, startDate, endDate, location, img_src, isDashboard, setReload, instagramUrl, discordUrl, tags='', previewUrl }: PostProps) {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: session, status } = useSession();

    const formattedStartDate = `${dateFormat.format(new Date(startDate))} at ${timeFormat.format(new Date(startDate))}`;
    const formattedEndDate = `${dateFormat.format(new Date(endDate))} at ${timeFormat.format(new Date(endDate))}`;

    // Limit tags to first 5
    const displayTags = tags.slice(0, 5);
    const remainingTags = tags.length > 5 ? tags.length - 5 : 0;

    const handleCardClick = () => setIsModalOpen(true);
    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        console.log("Delete post with ID:", id);

        if (!session || !session.user) {
            console.error("User not logged in");
            router.push('/login')
            return;
        }

        const data = { targetId: id }

        fetch("/api/remove_post/", {
            method: "POST",
            body: JSON.stringify(data)
        })
        .then(response => {
            console.log("setting reload")
            setReload && setReload((prev) => prev + 1);
            if (!response.ok) {
                console.error("Failed with HTTP status code: " + response.status);
                return;
            }
        })
        .catch(error => {
            console.error("Error deleting post:", error);
        });
    };

    return (
        <>
            <div onClick={handleCardClick} className="flex bg-[#37475F] text-white rounded-xl overflow-hidden shadow-lg relative transform transition-transform duration-200 hover:scale-[1.01] cursor-pointer h-64">
                <div className="w-56 md:w-72 flex-shrink-0 relative">
                    <Image src={previewUrl || "/images/placeholder.png"} alt="Event Image" fill className="object-cover" />
                </div>
                <div className="flex-1 p-6 pr-10 relative flex flex-col">
                    <div className="flex-grow">
                        <h2 className="text-xl font-semibold mb-1">{title}</h2>

                        {/* Date and Time Display */}
                        <div className="flex items-center gap-2 text-gray-300 text-sm mb-2">
                            <FaClock className="w-4 h-4" />
                            <span>{formattedStartDate} - {formattedEndDate}</span>
                        </div>

                        <p className="text-gray-300 text-sm md:text-base mb-2 pr-4 line-clamp-2">{description}</p>
                        {location && (
                            <p className="text-sm text-gray-400 mb-3">{location}</p>
                        )}
                    </div>

                    {/* Tags Section */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                        {tags.split(",").map((tag, index) => (
                            <span 
                                key={index} 
                                className="px-2 py-1 bg-[#2A3B50] text-xs rounded-full text-gray-300"
                            >
                                {tag}
                            </span>
                        ))}
                        {remainingTags > 0 && (
                            <span className="px-2 py-1 bg-[#2A3B50] text-xs rounded-full text-gray-300">
                                +{remainingTags} more
                            </span>
                        )}
                    </div>

                    <div className="absolute top-4 right-2 flex flex-col gap-2">
                        { instagramUrl && (
                        <div className="p-2 bg-gray-700 rounded-md cursor-pointer transition-colors duration-200 hover:bg-white group">
                            <Link href="https://google.com"><FaInstagram className="w-5 h-5 text-white transition-colors duration-200 group-hover:text-gray-700" /></Link>
                        </div>)}
                        { discordUrl && (
                        <div className="p-2 bg-gray-700 rounded-md cursor-pointer transition-colors duration-200 hover:bg-white group">
                            <Link href="https://google.com"><FaDiscord className="w-5 h-5 text-white transition-colors duration-200 group-hover:text-gray-700" /></Link>
                        </div>)}

                        {isDashboard && (
                            <div className="p-2 bg-red-600 rounded-md cursor-pointer transition-colors duration-200 hover:bg-red-500 group" onClick={handleDelete}>
                                <FaTrash className="w-5 h-5 text-white transition-colors duration-200 group-hover:text-white" />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="relative w-full aspect-[4/3]">
                    <Image src={img_src || "/images/placeholder.png"} alt="Event Image" fill className="object-cover" />
                </div>
                <div className="p-6 text-white">
                    <h2 className="text-2xl font-semibold mb-2">{title}</h2>

                    {/* Date and Time Display in Modal */}
                    <div className="flex items-center gap-2 text-gray-300 text-sm mb-2">
                        <FaClock className="w-4 h-4" />
                        <span>{formattedStartDate} - {formattedEndDate}</span>
                    </div>

                    {location && (
                        <div className="flex items-center gap-2 mb-4">
                            <FaMapMarkerAlt className="text-gray-300 w-4 h-4" />
                            <span className="text-gray-300">{location}</span>
                        </div>
                    )}

                    <p className="text-gray-300 mb-6">{description}</p>

                    {/* All Tags in Modal */}
                    <div className="flex flex-wrap gap-2">
                        {tags.split(",").map((tag, index) => (
                            <span 
                                key={index} 
                                className="px-2 py-1 bg-[#2A3B50] text-xs rounded-full text-gray-300"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </Modal>
        </>
    );
}