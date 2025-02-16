"use client";
import { Filter } from "lucide-react";
import fetchData, { getFeaturedImages } from "@/lib/events";
import { use, useEffect, useState } from "react";

import Select from "react-select";
import Pagination from "@/components/Pagination";
import Post from "@/components/Post";
import Gallery from "@/components/Gallery";

import { EventPostOutput } from "@/lib/db/models/post";


const POSTS_PER_PAGE = 8;

export default function EventsPage() {
    // load events from the database
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    
    console.log("events", events)

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);

    // Filter and sort states:
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState("newest"); // "newest" or "popularity"
    const [dateFilter, setDateFilter] = useState(""); // e.g. "2025-02-01"

    const featuredImages = getFeaturedImages();


    // Placeholder tags – adjust with your actual 50+ tags as needed.
    const availableTags = [
        "nature", "coding", "music", "sports", "art", "travel", "food", "tech",
        "education", "health", "science", "history", "literature", "fashion", "politics",
        "finance", "gaming", "entertainment", "lifestyle", "design", "architecture",
        "photography", "culture", "business", "innovation", "environment", "animals",
        "outdoors", "fitness", "movies", "theater", "dance", "comedy", "news", "blogging",
        "marketing", "social", "community", "religion", "philosophy", "psychology", "spirituality",
        "diy", "crafts", "automotive", "traveling", "investing", "startups", "parenting", "relationships"
    ];

    // Map availableTags to options for react-select.
    const tagOptions = availableTags.map((tag) => ({ value: tag, label: tag }));

    // 1) Filter the events before pagination
    const filteredEvents = events
        // Filter by selected tags (if any)
        .filter((e) => {
            if (selectedTags.length === 0) return true;
            const eventTags = e.tags?.map((tag: string) => tag.toLowerCase()) || [];
            const lowerCaseSelected = selectedTags.map((tag) => tag.toLowerCase());
            return eventTags.some((tag) => lowerCaseSelected.includes(tag));
        })
        // Filter by date (only show events on or after the given date)
        .filter((e) => {
            if (!dateFilter) return true;
            return new Date(e.startDateTime) >= new Date(dateFilter);
        });

    // 2) Sort the filtered events
    const sortedEvents = [...filteredEvents].sort((a, b) => {
        if (sortBy === "newest") {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        } else if (sortBy === "popularity") {
            return (b.popularity || 0) - (a.popularity || 0);
        }
        return 0;
    });

    // 3) Pagination on the sorted list
    const totalPosts = sortedEvents.length;
    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const currentPosts = sortedEvents.slice(startIndex, endIndex);

    // Handlers
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const toggleFilters = () => {
        setShowFilters((prev) => !prev);
    };

    // Handler for react-select multi-select dropdown.
    const handleTagSelectChange = (selectedOptions: any) => {
        setSelectedTags(
            selectedOptions ? selectedOptions.map((option: any) => option.value) : []
        );
        setCurrentPage(1);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value);
        setCurrentPage(1);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDateFilter(e.target.value);
        setCurrentPage(1);
    };

    useEffect(() => {
        const userTags = localStorage.getItem('userTags');
        if (!userTags) {
            alert('Please complete the survey first!');
        }
        else {
            alert('User tags loaded!');
        }
    }, []);

    return (
        <div style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
            {/* For you heading */}
            <div className="flex justify-center my-8">
                <h1 className="text-[40px]" style={{ color: 'var(--foreground)' }}>
                    For you 🫵
                </h1>
            </div>

            {/* Featured Images */}
            <Gallery images={featuredImages} />

            {/* Main container */}
            <div className="mx-auto px-16 py-8">
                {/* Title + Filter icon */}
                <div className="flex items-center justify-between mb-4 mt-8">
                    <p className="text-2xl" style={{ color: 'var(--foreground)' }}>Posts</p>
                </div>

                {/* Filter panel */}
                <div className="bg-gray-700 p-4 mb-4 rounded">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        {/* Tag filter dropdown using react-select */}
                        <div className="flex flex-col w-full md:w-1/3">
                            <label htmlFor="tagFilter" className="mb-1" style={{ color: 'white' }}>Tags</label>
                            <Select
                                id="tagFilter"
                                options={tagOptions}
                                isMulti
                                isSearchable={true}
                                value={tagOptions.filter(option => selectedTags.includes(option.value))}
                                onChange={handleTagSelectChange}
                                placeholder="Select tags..."
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        backgroundColor: 'var(--background)',
                                        color: 'var(--foreground)',
                                        minHeight: '40px',
                                        height: '40px',
                                        borderRadius: '0.375rem',
                                        border: '1px solid var(--foreground)',
                                    }),
                                    input: (base) => ({
                                        ...base,
                                        color: 'white', // Ensures typed text is white
                                    }),
                                    singleValue: (base) => ({
                                        ...base,
                                        color: 'var(--foreground)'
                                    }),
                                    menu: (base) => ({
                                        ...base,
                                        backgroundColor: 'var(--background)',
                                        color: 'var(--foreground)'
                                    }),
                                    option: (base) => ({
                                        ...base,
                                        backgroundColor: 'var(--background)',
                                        color: 'var(--foreground)',
                                        '&:hover': {
                                            backgroundColor: 'var(--foreground)',
                                            color: 'var(--background)'
                                        }
                                    })
                                }}

                            />
                        </div>

                        {/* Sorting */}
                        <div className="flex flex-col w-full md:w-1/3">
                            <label htmlFor="sortBy" style={{ color: 'white' }}>Sort</label>
                            <select
                                id="sortBy"
                                className="px-2 rounded h-[40px] w-full"
                                style={{
                                    backgroundColor: 'var(--background)',
                                    color: 'var(--foreground)',
                                    border: '1px solid var(--foreground)'
                                }}
                                value={sortBy}
                                onChange={handleSortChange}
                            >
                                <option value="newest">Newest to Oldest</option>
                                <option value="popularity">Popularity</option>
                            </select>
                        </div>

                        {/* Date filter */}
                        <div className="flex flex-col w-full md:w-1/3">
                            <label htmlFor="dateFilter" style={{ color: 'white' }}>Date</label>
                            <input
                                id="dateFilter"
                                type="date"
                                className="px-2 rounded h-[40px] w-full"
                                style={{
                                    backgroundColor: 'var(--background)',
                                    color: 'var(--foreground)',
                                    border: '1px solid var(--foreground)'
                                }}
                                value={dateFilter}
                                onChange={handleDateChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Posts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {events.map((event: EventPostOutput) => (
                            <Post key={event.id} {...event} />
                        ))}
                    </div>
            </div>
        </div>
    );
}