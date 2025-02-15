"use client"
import { Filter } from "lucide-react"; // Import an additional icon
import Post from "./components/post";
import fetchData from "./lib/events";
import Pagination from "./components/Pagination";
import { useState } from 'react';

const POSTS_PER_PAGE = 8;

export default function EventsPage() {
  const events = fetchData();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPosts = events.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = events.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      {/* Title + Filter & Settings icon row */}
      <div className="flex items-center justify-between mb-4 mt-8">
        <p className="text-2xl ">Posts</p>
        <div className="flex items-center gap-4"> {/* Ensures 16px gap */}
          <button className="p-2 rounded-md hover:bg-gray-200">
            <Filter className="w-6 h-6" />
          </button>
        </div>
      </div>
      {/* 2-column grid (1  col on smaller screens, 2 cols on md and up) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentPosts.map((event) => (
          <Post key={event.id} {...event} />
        ))}
      </div>
      {/* <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      /> */}
    </div>
  );
}
