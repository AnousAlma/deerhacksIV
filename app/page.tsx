"use client";
import { Filter } from "lucide-react";
import Post from "./components/post";
import fetchData, { getFeaturedImages } from "./lib/events";
import Pagination from "./components/Pagination";
import { useState } from "react";

import Header from "./components/header";
import Gallery from "./components/gallery";

const POSTS_PER_PAGE = 8;

export default function EventsPage() {
  const events = fetchData();            // All events from your data source
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [tagFilter, setTagFilter] = useState("");
  const [orgFilter, setOrgFilter] = useState("");
  const [dateFilter, setDateFilter] = useState(""); // e.g. "2025-02-01"

  const featuredImages = getFeaturedImages();

  // 1) Filter the events before pagination
  const filteredEvents = events
    // Filter by tag (case-insensitive includes)
    .filter((e) => {
      if (!tagFilter) return true;
      // e.tags might be an array of strings, so adapt as needed
      return e.tags?.some((tag) =>
        tag.toLowerCase().includes(tagFilter.toLowerCase())
      );
    })
    // Filter by organization (case-insensitive substring match)
    .filter((e) => {
      if (!orgFilter) return true;
      return e.organization?.toLowerCase().includes(orgFilter.toLowerCase());
    })
    // Filter by date (only show events on or after the given date)
    .filter((e) => {
      if (!dateFilter) return true;
      return e.date >= dateFilter; // Adjust comparison logic as needed
    });

  // 2) Pagination on the filtered list
  const totalPosts = filteredEvents.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = filteredEvents.slice(startIndex, endIndex);

  // 3) Handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleOrgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrgFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateFilter(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="text-white min-h-screen">
      {/* Header */}
      

      {/* Featured Images */}
      <Gallery images={featuredImages} />

      {/* Main container */}
      <div className="max-w-7xl mx-auto p-4">
        {/* Title + Filter icon */}
        <div className="flex items-center justify-between mb-4 mt-8">
          <p className="text-2xl">Posts</p>
          <button
            onClick={toggleFilters}
            className="p-2 rounded-md hover:bg-gray-200"
          >
            <Filter className="w-6 h-6 text-black" />
          </button>
        </div>

        {/* Filter panel (shown/hidden via showFilters) */}
        {showFilters && (
          <div className="bg-gray-700 p-4 mb-4 rounded">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Tag filter */}
              <div className="flex flex-col">
                <label htmlFor="tagFilter">Tag</label>
                <input
                  id="tagFilter"
                  type="text"
                  className="text-black p-1"
                  placeholder="e.g. music"
                  value={tagFilter}
                  onChange={handleTagChange}
                />
              </div>

              {/* Organization filter */}
              <div className="flex flex-col">
                <label htmlFor="orgFilter">Organization</label>
                <input
                  id="orgFilter"
                  type="text"
                  className="text-black p-1"
                  placeholder="e.g. Computer Science Club"
                  value={orgFilter}
                  onChange={handleOrgChange}
                />
              </div>

              {/* Date filter */}
              <div className="flex flex-col">
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
        )}

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
