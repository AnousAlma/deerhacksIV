"use client";
import { Filter } from "lucide-react";
import fetchData, { getFeaturedImages } from "@/lib/events";
import { use, useEffect, useState } from "react";


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
    // load events from the database
    const [events, setEvents] = useState<EventPostOutput[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<'newest' | 'popularity'>("newest");
    const [minimumDate, setMinimumDate] = useState("");

    const [isModalOpen, setModalOpen] = useState(false);

    
    const refreshPosts = () => {
    }
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/all_event_posts");
                if (!response.ok) throw new Error("Network response was not ok");

                const result = await response.json();
                console.log('recieved r', result);

                if (!('data' in result)) {
                    console.log("Failed to parse result", result);
                }

                const data = result['data'];
                if (!Array.isArray(data)) {
                    console.log("Failed to parse data", data);
                    throw new Error("Expected an array but got something else");
                }

                console.log('recieved', data);

                setEvents(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    console.log("events", events)
    
    useEffect(() => {
      const userTags = localStorage.getItem('userTags');
      if (!userTags) {
        setModalOpen(true);
      }
    }, []);
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;


    // succesfully loaded events:
    // const [currentPage, setCurrentPage] = useState(1);

    // // Filter and sort states:



    // 1) Filter the events before pagination
    // const filteredEvents = events
    //     // Filter by selected tags (if any)
    //     .filter((e) => {
    //         if (selectedTags.length === 0) return true;
    //         const eventTags = e.tags?.map((tag: string) => tag.toLowerCase()) || [];
    //         const lowerCaseSelected = selectedTags.map((tag) => tag.toLowerCase());
    //         return eventTags.some((tag) => lowerCaseSelected.includes(tag));
    //     })
    //     // Filter by date (only show events on or after the given date)
    //     .filter((e) => {
    //         if (!dateFilter) return true;
    //         return new Date(e.startDateTime) >= new Date(dateFilter);
    //     });

    // const filteredEvents = filterEventPostsBy(events, selectedTags, dateFilter);

    // // 2) Sort the filtered events
    // const sortedEvents = [...filteredEvents].sort((a, b) => {
    //     if (sortBy === "newest") {
    //         return new Date(b.date).getTime() - new Date(a.date).getTime();
    //     } else if (sortBy === "popularity") {
    //         return (b.popularity || 0) - (a.popularity || 0);
    //     }
    //     return 0;
    // });

    // // 3) Pagination on the sorted list
    // const totalPosts = sortedEvents.length;
    // const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
    // const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    // const endIndex = startIndex + POSTS_PER_PAGE;
    // const currentPosts = sortedEvents.slice(startIndex, endIndex);

    // // Handlers
    // const handlePageChange = (page: number) => {
    //     setCurrentPage(page);
    // };

    // const toggleFilters = () => {
    //     setShowFilters((prev) => !prev);
    // };
    
    // // Handler for react-select multi-select dropdown.
    

    return (
        <div style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
            {/* For you heading */}
            <div className="flex justify-center my-8">
                <h1 className="text-[40px]" style={{ color: 'var(--foreground)' }}>
                    For you 🫵
                </h1>
            </div>

            {/* Featured Images */}
            <Gallery images={[]} />

            {/* Main container */}
            <div className="mx-auto px-16 py-8">
                {/* Title + Filter icon */}
                <div className="flex items-center justify-between mb-4 mt-8">
                    <p className="text-2xl" style={{ color: 'var(--foreground)' }}>Posts</p>
                </div>

                {/* Filter panel */}
                <div className="bg-gray-700 p-4 mb-4 rounded">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <TagSelect selectedTags={selectedTags} setSelectedTags={setSelectedTags} refreshPosts={refreshPosts} />
                        <SortSelect sortBy={sortBy} setSortBy={setSortBy} refreshPosts={refreshPosts} />
                        <DateSelect minimumDate={minimumDate} setMinimumDate={setMinimumDate} refreshPosts={refreshPosts} />
                    </div>
                </div>

                {/* Posts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {events.map((event: EventPostOutput) => (
                        <Post key={event.id} {...event} />
                    ))}
                </div>
            </div>
            {/* <StudentSurveyModal open={isModalOpen} onClose={() => setModalOpen(false)} /> */}
        </div>
    );
}