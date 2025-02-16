"use client";
import { useState } from "react";

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

export default function CreateEventPage() {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [tag, setTag] = useState("");
    const [error, setError] = useState("");

    const { data: session, status } = useSession()
    
    useEffect(() => {
        if (!session) {
            toast.error("Access denied!", { position: "top-center" });
            router.push("/login");
        }
    }, [session, router]);

    // New states for image file and preview URL
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewURL, setPreviewURL] = useState<string>("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);

            // Generate a preview URL using FileReader
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setPreviewURL(event.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // TODO: upload image file 

        console.log({
            title,
            description,
            date,
            location,
            tag,
            imageFile,
        });
        alert(`Event Created: ${title}`);

        router.push("/dashboard");
    };

    return (
        <div className="min-h-screen  text-white flex items-center justify-center">
            <div className=" p-6 w-full max-w-lg">
                <h1 className="text-3xl font-bold mb-6 text-center text-[var(--foreground)]">Create a New Event</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                        <label
                            className="block mb-2 text-lg font-medium text-[var(--foreground)]"
                        > Title</label>
                        <input
                            type="text"
                            className="w-full h-12 px-4 text-lg rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block mb-2 text-lg font-medium text-[var(--foreground)]">Description</label>
                        <textarea
                            className="w-full h-32 px-4 py-2 text-lg rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block mb-2 text-lg font-medium text-[var(--foreground)]"
                        >Date</label>
                        <input
                            type="date"
                            className="w-full h-12 px-4 text-lg rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block mb-2 text-lg font-medium text-[var(--foreground)]"
                        >Location</label>
                        <input
                            type="text"
                            className="w-full h-12 px-4 text-lg rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>

                    {/* Tag */}
                    <div>
                        <label className="block mb-2 text-lg font-medium text-[var(--foreground)]"
                        >Tag</label>
                        <select
                            className="w-full h-12 px-4 text-lg rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                        >
                            <option value="">-- Select a Tag --</option>
                            <option value="online">Online</option>
                            <option value="discord">Discord</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block mb-2 text-lg font-medium text-[var(--foreground)]"
                        >Event Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="text-white focus:outline-none"
                        />

                        {/* Preview */}
                        {previewURL && (
                            <div className="mt-4">
                                <p className="text-sm text-gray-300 mb-2">Preview:</p>
                                <img
                                    src={previewURL}
                                    alt="Preview"
                                    className="w-full h-auto rounded border border-gray-500"
                                />
                            </div>
                        )}
                    </div>


                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-lg font-semibold rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
