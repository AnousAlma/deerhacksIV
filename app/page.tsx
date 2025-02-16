"use client";
import { Filter, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import fetchData, { getFeaturedImages } from "@/lib/events";
import Pagination from "@/components/Pagination";
import Post from "@/components/Post";
import Gallery from "@/components/Gallery";
import { EventPostOutput } from "@/lib/db/models/post";
import TagSelect from "./components/TagSelect";
import SortSelect from "./components/SortSelect";
import DateSelect from "./components/DateSelect";
import StudentSurveyModal from "./components/PreferenceModal";

const POSTS_PER_PAGE = 8;

export default function EventsPage() {
    const [events, setEvents] = useState<EventPostOutput[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<'newest' | 'popularity'>("newest");
    const [minimumDate, setMinimumDate] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    const [isFilterExpanded, setIsFilterExpanded] = useState(false);

    const refreshPosts = () => {};

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/all_event_posts");
                if (!response.ok) throw new Error("Network response was not ok");
                const result = await response.json();

                if (!('data' in result)) {
                    console.log("Failed to parse result", result);
                }

                let data = result['data'];
                if (!Array.isArray(data)) {
                    throw new Error("Expected an array but got something else");
                }

                if (minimumDate !== "") {
                    data = data.filter((event) => {
                        return new Date(event.startDate) >= new Date(minimumDate);
                    });
                }

                if (sortBy === "newest") {
                    data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                } else if (sortBy === "alphabetical") {
                    data.sort((a, b) => a.title.localeCompare(b.title));
                }

                if (selectedTags.length > 0) {
                    data = data.filter((event) => {
                        return selectedTags.some((tag) => event.tags.split(',').includes(tag));
                    });
                }

                setEvents(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An unknown error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedTags, sortBy, minimumDate]);

    useEffect(() => {
        const userTags = localStorage.getItem('userTags');
        if (!userTags) {
            setModalOpen(true);
        }
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-background">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-background">
                <div className="text-red-500 p-6 bg-white/10 backdrop-blur-md rounded-lg border border-red-500/20">
                    Error: {error}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative pt-24 pb-16 overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 overflow-hidden">
                    <div
                        className="absolute inset-0 bg-gradient-radial from-blue-500/30 to-transparent dark:from-blue-500/10 dark:to-transparent"
                        style={{
                            transform: 'scale(1.8)',
                            filter: 'blur(100px)',
                            opacity: 0.6
                        }}
                    />
                    <div
                        className="absolute inset-0 bg-gradient-to-tr from-blue-400/20 via-transparent to-purple-500/20 dark:from-blue-400/10 dark:to-purple-500/10"
                        style={{
                            filter: 'blur(60px)',
                            opacity: 0.4
                        }}
                    />
                </div>

                {/* Hero Content */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-4 mb-8">
                            <h1 className="text-6xl font-bold relative inline-block">
                                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 blur-2xl opacity-40 rounded-full dark:from-blue-400 dark:to-purple-500" />
                                <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 dark:from-blue-600 dark:to-purple-700">
                                    For you
                                </span>
                            </h1>
                            <div className="animate-bounce">
                                <span className="text-5xl">🫵</span>
                            </div>
                        </div>
                        <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
                            Discover events tailored to your interests at UofT
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Images Gallery */}
            <div className="w-full mb-16">
                <Gallery images={[]} />
            </div>

            {/* Main Content */}
            <div className="px-4 md:px-[16px] py-8 max-w-7xl mx-auto">
                {/* Title Section */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-purple-400 dark:text-purple-600" />
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 dark:from-blue-600 dark:to-purple-700">
                            Latest Posts
                        </h2>
                    </div>

                    <button
                        className={`
                flex items-center gap-2 
                px-4 py-2 rounded-lg 
                bg-white/10 backdrop-blur-md 
                hover:bg-white/20 transition-all duration-300 
                border border-white/20
                dark:bg-gray-800/50 dark:hover:bg-gray-800/70
            `}
                        onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                    >
                        <Filter className="w-4 h-4" />
                        <span>Filters</span>
                    </button>
                </div>

                {/* Filter Panel */}
                <AnimatePresence>
                    {isFilterExpanded && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="backdrop-blur-md bg-white/5 p-6 mb-8 rounded-xl border border-white/10 shadow-lg dark:bg-gray-800/50 dark:border-gray-700/50">
                                <div className="flex flex-col md:flex-row md:items-center gap-4">
                                    <TagSelect
                                        selectedTags={selectedTags}
                                        setSelectedTags={setSelectedTags}
                                        refreshPosts={refreshPosts}
                                    />
                                    <SortSelect
                                        sortBy={sortBy}
                                        setSortBy={setSortBy}
                                        refreshPosts={refreshPosts}
                                    />
                                    <DateSelect
                                        minimumDate={minimumDate}
                                        setMinimumDate={setMinimumDate}
                                        refreshPosts={refreshPosts}
                                    />
                                </div>
                            </div>

                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Posts Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {events.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                            transition={{
                                type: "spring",
                                stiffness: 100,
                                damping: 20,
                                delay: index * 0.05,
                            }}
                            className="relative transform transition-all duration-300 hover:scale-[1.02]"
                        >
                            {/* Gradient overlay for text */}
                            <Post {...event} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <StudentSurveyModal
                            open={isModalOpen}
                            onClose={() => setModalOpen(false)}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
            <style jsx global>{`

                @keyframes bounce {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                }
                .animate-bounce {
                    animation: bounce 2s infinite;
                }
            `}</style>
        </div>
    );
}