"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { Upload, Calendar, MapPin, MessageCircle, Instagram } from "lucide-react";

import { parseEventDetails } from "@/lib/utils/eventToTags";
import { uploadToCloudinary } from "@/lib/utils/cloudinaryUpload";

export default function CreateEventPage() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!session) {
            toast.error("Access denied!", { position: "top-center" });
            router.push("/login");
        }
    }, [session, router]);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        startDate: new Date(),
        endDate: new Date(),
        discordLink: "",
        instagramLink: "",
        previewURL: "",
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewURL, setPreviewURL] = useState<string>("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!session || !session.user) {
            setError("Access denied!");
            setIsSubmitting(false);
            return;
        }
    
        try {
            let cloudinaryLink = null;
    
            // Upload image to Cloudinary if there's an image file
            if (imageFile) {
                cloudinaryLink = await uploadToCloudinary(imageFile); // Use the Cloudinary function
                if (!cloudinaryLink) {
                    setError("Failed to upload image to Cloudinary");
                    return;
                }
            }
    
            const ownerId = session.user.email;
            const datetime = startDate.toLocaleString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            });
    
            console.log(cloudinaryLink); // Log the Cloudinary link for debugging
            const tags = await parseEventDetails(formData.title, formData.description, formData.location, formData.startDate.toISOString());

            const data = {
                title,
                description,
                startDate,
                endDate,
                location,
                ownerId,
                tags,
                // imageUrl: cloudinaryLink, // Add the Cloudinary image link to your data
            };
    
            const response = await fetch("/api/event_post/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
          
            if (!response.ok) {
                throw new Error("Failed with HTTP status code: " + response.status);
            }

            toast.success("Event created successfully!");
            router.push("/dashboard");
        } catch (error) {
            console.error('Error submitting form:', error);
            setError(`Error creating event: ${error}`);
        } finally {
            setIsSubmitting(false);
        }
    };
    

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = async (event) => {
                if (event.target?.result) {
                    setPreviewURL(event.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-background/80 text-foreground">
            <div className="container mx-auto px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-2xl mx-auto bg-card rounded-2xl shadow-xl p-8"
                >
                    <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                        Create Your Event
                    </h1>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mb-6 p-4 bg-destructive/10 text-destructive rounded-lg"
                        >
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <motion.div
                            whileHover={{ scale: 1.01 }}
                            className="group"
                        >
                            <label className="block mb-2 text-sm font-medium text-muted-foreground">
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                className="w-full px-4 py-3 rounded-lg bg-background/50 border border-input transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                                placeholder="Give your event a catchy title"
                            />
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.01 }}
                            className="group"
                        >
                            <label className="block mb-2 text-sm font-medium text-muted-foreground">
                                Description
                            </label>
                            <textarea
                                name="description"
                                className="w-full px-4 py-3 rounded-lg bg-background/50 border border-input min-h-[120px] transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                                placeholder="Describe your event in detail"
                            />
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                className="group"
                            >
                                <label className="block mb-2 text-sm font-medium text-muted-foreground">
                                    <Calendar className="w-4 h-4 inline-block mr-2" />
                                    Start Date & Time
                                </label>
                                <input
                                    type="datetime-local"
                                    name="startDate"
                                    className="w-full px-4 py-3 rounded-lg bg-background/50 border border-input transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                    value={formData.startDate.toISOString().slice(0, 16)}
                                    onChange={handleInputChange}
                                    required
                                />
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                className="group"
                            >
                                <label className="block mb-2 text-sm font-medium text-muted-foreground">
                                    <Calendar className="w-4 h-4 inline-block mr-2" />
                                    End Date & Time
                                </label>
                                <input
                                    type="datetime-local"
                                    name="endDate"
                                    className="w-full px-4 py-3 rounded-lg bg-background/50 border border-input transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                    value={formData.endDate.toISOString().slice(0, 16)}
                                    onChange={handleInputChange}
                                    required
                                />
                            </motion.div>
                        </div>

                        <motion.div
                            whileHover={{ scale: 1.01 }}
                            className="group"
                        >
                            <label className="block mb-2 text-sm font-medium text-muted-foreground">
                                <MapPin className="w-4 h-4 inline-block mr-2" />
                                Location
                            </label>
                            <input
                                type="text"
                                name="location"
                                className="w-full px-4 py-3 rounded-lg bg-background/50 border border-input transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                value={formData.location}
                                onChange={handleInputChange}
                                placeholder="Where is your event taking place?"
                            />
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                className="group"
                            >
                                <label className="block mb-2 text-sm font-medium text-muted-foreground">
                                    <MessageCircle className="w-4 h-4 inline-block mr-2" />
                                    Discord Link
                                </label>
                                <input
                                    type="url"
                                    name="discordLink"
                                    className="w-full px-4 py-3 rounded-lg bg-background/50 border border-input transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                    value={formData.discordLink}
                                    onChange={handleInputChange}
                                    placeholder="https://discord.gg/..."
                                />
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                className="group"
                            >
                                <label className="block mb-2 text-sm font-medium text-muted-foreground">
                                    <Instagram className="w-4 h-4 inline-block mr-2" />
                                    Instagram Link
                                </label>
                                <input
                                    type="url"
                                    name="instagramLink"
                                    className="w-full px-4 py-3 rounded-lg bg-background/50 border border-input transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                    value={formData.instagramLink}
                                    onChange={handleInputChange}
                                    placeholder="https://instagram.com/..."
                                />
                            </motion.div>
                        </div>

                        <motion.div
                            whileHover={{ scale: 1.01 }}
                            className="group"
                        >
                            <label className="block mb-2 text-sm font-medium text-muted-foreground">
                                <Upload className="w-4 h-4 inline-block mr-2" />
                                Event Image
                            </label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-input rounded-lg hover:border-blue-500 transition-colors">
                                <div className="space-y-1 text-center">
                                    <div className="flex text-sm text-muted-foreground">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer rounded-md font-medium text-blue-500 hover:text-blue-400 focus-within:outline-none"
                                        >
                                            <span>Upload a file</span>
                                            <input
                                                id="file-upload"
                                                type="file"
                                                className="sr-only"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        PNG, JPG, GIF up to 10MB
                                    </p>
                                </div>
                            </div>
                            {previewURL && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4"
                                >
                                    <img
                                        src={previewURL}
                                        alt="Preview"
                                        className="w-full h-48 object-cover rounded-lg border border-input"
                                    />
                                </motion.div>
                            )}
                        </motion.div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isSubmitting}
                            type="submit"
                            className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Creating Event..." : "Create Event"}
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}