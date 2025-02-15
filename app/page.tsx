"use client";
import { Filter } from "lucide-react";
import Post from "./components/post";
import fetchData, { getFeaturedImages } from "./lib/events";
import Pagination from "./components/Pagination";
import { useState } from "react";
import Header from "./components/header";
import Gallery from "./components/gallery";
import Select from "react-select";

const POSTS_PER_PAGE = 8;

export default function EventsPage() {
  const events = fetchData(); // All events from your data source
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort states:
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest"); // "newest" or "popularity"
  const [dateFilter, setDateFilter] = useState(""); // e.g. "2025-02-01"

  const featuredImages = getFeaturedImages();

  // CHATGPT generated placeholder tags
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
      return e.date >= dateFilter;
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

  return (
    <div className="text-white min-h-screen">
      {/* Featured Images */}
      <Gallery images={featuredImages} />

      {/* Main container */}
      <div className="max-w-7xl mx-auto p-4">
        {/* Title + Filter icon */}
        <div className="flex items-center justify-between mb-4 mt-8">
          <p className="text-2xl">Posts</p>
          {/* <button onClick={toggleFilters} className="p-2 rounded-md hover:bg-gray-200">
            <Filter className="w-6 h-6 text-black" />
          </button> */}
        </div>

        {/* Filter panel */}
       
          <div className="bg-gray-700 p-4 mb-4 rounded">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Tag filter dropdown using react-select */}
              <div className="flex flex-col w-full md:w-1/3">
                <label htmlFor="tagFilter" className="mb-1">Tags</label>
                <Select
                className="text-black"
                  id="tagFilter"
                  options={tagOptions}
                  isMulti
                  value={tagOptions.filter(option => selectedTags.includes(option.value))}
                  onChange={handleTagSelectChange}
                  placeholder="Select tags..."
                />
              </div>

              {/* Sorting */}
              <div className="flex flex-col w-full md:w-1/3">
                <label htmlFor="sortBy">Sort</label>
                <select
                  id="sortBy"
                  className="text-black p-1"
                  value={sortBy}
                  onChange={handleSortChange}
                >
                  <option value="newest">Newest to Oldest</option>
                  <option value="popularity">Popularity</option>
                </select>
              </div>

              {/* Date filter */}
              <div className="flex flex-col w-full md:w-1/3">
                <label htmlFor="dateFilter">Date</label>
                <input
                  id="dateFilter"
                  type="date"
                  className="text-black p-1"
                  value={dateFilter}
                  onChange={handleDateChange}
                />
              </div>
            </div>
          </div>


        {/* Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentPosts.map((event) => (
            <Post key={event.id} {...event} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
