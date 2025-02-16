"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { parseEventDetails } from "@/lib/utils/eventToTags";
import { uploadToImgur } from "@/lib/utils/imgurUpload";


export default function CreateEventPage() {
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (!session) {
            toast.error("Access denied!", { position: "top-center" });
            router.push("/login");
        }
    }, [session, router]);


    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewURL, setPreviewURL] = useState<string>("");

    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: upload image file 
        try {
            const datetime = startDate.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
            // const eventTags = await parseEventDetails(title, description, location, datetime);
            const data = {
                title,
                description,
                startDate,
                endDate,
                location
            }

            const response = await fetch("/api/event_post/", {
                method: "POST",
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                setError("Failed with HTTP status code: " + response.status);
                return;
            } else {
                router.push("/dashboard");
            }
        } catch (error) {
            console.error('Error parsing user answers:', error);
            setError(`Error creating event: ${error}`);
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);

            const reader = new FileReader();
            reader.onload = async (event) => {
                if (event.target?.result) {
                    setPreviewURL(event.target.result as string);

                    const imgurLink = await uploadToImgur(file);
                    if (imgurLink) {
                        console.log("Uploaded to Imgur:", imgurLink);
                    } else {
                        console.error("Error uploading to Imgur");
                    }
                }
            };
        };

        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();

            // TODO: upload image file 
            try {
                const datetime = startDate.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
                // const eventTags = await parseEventDetails(title, description, location, datetime);

                const data = {
                    title,
                    description,
                    startDate,
                    endDate,
                    location
                }

                const response = await fetch("/api/event_post/", {
                    method: "POST",
                    body: JSON.stringify(data)
                });
                if (!response.ok) {
                    setError("Failed with HTTP status code: " + response.status);
                    return;
                } else {
                    router.push("/dashboard");
                }
            } catch (error) {
                console.error('Error parsing user answers:', error);
                setError(`Error creating event: ${error}`);
            }

        };

        return (
            <div className="min-h-screen text-white flex items-center justify-center">
                <div className="p-6 w-full max-w-lg">
                    <p>{error}</p>
                    <h1 className="text-3xl font-bold mb-6 text-center text-[var(--foreground)]">
                        Create a New Event
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title */}
                        <div>
                            <label className="block mb-2 text-lg font-medium text-[var(--foreground)]">
                                Title
                            </label>
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
                            <label className="block mb-2 text-lg font-medium text-[var(--foreground)]">
                                Description
                            </label>
                            <textarea
                                className="w-full h-32 px-4 py-2 text-lg rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>

                        {/* Start Date and Time */}
                        <div>
                            <label className="block mb-2 text-lg font-medium text-[var(--foreground)]">
                                Start Date
                            </label>
                            <input
                                type="datetime-local"
                                className="w-full h-12 px-4 text-lg rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={startDate ? startDate.toISOString().slice(0, 16) : ""}
                                onChange={(e) => setStartDate(new Date(e.target.value))}
                                required
                            />
                        </div>

                        {/* End Date and Time */}
                        <div>
                            <label className="block mb-2 text-lg font-medium text-[var(--foreground)]">
                                End Date
                            </label>
                            <input
                                type="datetime-local"
                                className="w-full h-12 px-4 text-lg rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={endDate ? endDate.toISOString().slice(0, 16) : ""}
                                onChange={(e) => setEndDate(new Date(e.target.value))}
                                required
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block mb-2 text-lg font-medium text-[var(--foreground)]">
                                Location
                            </label>
                            <input
                                type="text"
                                className="w-full h-12 px-4 text-lg rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block mb-2 text-lg font-medium text-[var(--foreground)]">
                                Event Image
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="text-white focus:outline-none"
                            />
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

    return (
        <div className="min-h-screen text-white flex items-center justify-center">
            <div className="p-6 w-full max-w-lg">
                <p>{error}</p>
                <h1 className="text-3xl font-bold mb-6 text-center text-[var(--foreground)]">
                    Create a New Event
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block mb-2 text-lg font-medium text-[var(--foreground)]">
                            Title
                        </label>
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
                        <label className="block mb-2 text-lg font-medium text-[var(--foreground)]">
                            Description
                        </label>
                        <textarea
                            className="w-full h-32 px-4 py-2 text-lg rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    {/* Start Date and Time */}
                    <div>
                        <label className="block mb-2 text-lg font-medium text-[var(--foreground)]">
                            Start Date
                        </label>
                        <input
                            type="datetime-local"
                            className="w-full h-12 px-4 text-lg rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={startDate ? startDate.toISOString().slice(0, 16) : ""}
                            onChange={(e) => setStartDate(new Date(e.target.value))}
                            required
                        />
                    </div>
                    {/* End Date and Time */}
                    <div>
                        <label className="block mb-2 text-lg font-medium text-[var(--foreground)]">
                            End Date
                        </label>
                        <input
                            type="datetime-local"
                            className="w-full h-12 px-4 text-lg rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={endDate ? endDate.toISOString().slice(0, 16) : ""}
                            onChange={(e) => setEndDate(new Date(e.target.value))}
                            required
                        />
                    </div>
                    {/* Location */}
                    <div>
                        <label className="block mb-2 text-lg font-medium text-[var(--foreground)]">
                            Location
                        </label>
                        <input
                            type="text"
                            className="w-full h-12 px-4 text-lg rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                    {/* Image Upload */}
                    <div>
                        <label className="block mb-2 text-lg font-medium text-[var(--foreground)]">
                            Event Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="text-white focus:outline-none"
                        />
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