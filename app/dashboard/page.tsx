"use client";
import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Post from "@/components/Post";
import { Filter, Plus, Layout, Sparkles } from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";
import { Card, CardContent, Box, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import TagSelect from "@/components/TagSelect";
import SortSelect from "@/components/SortSelect";
import DateSelect from "@/components/DateSelect";

const DashboardPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(0);
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [minimumDate, setMinimumDate] = useState("");

  const refreshPosts = () => {};

  useEffect(() => {
    if (!session || !session.user) {
      toast.error("Access denied!", { position: "top-center" });
      router.push("/login");
    }
  }, [session, router]);

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user) {
        router.push('/login');
        return;
      }

      try {
        const response = await fetch("/api/all_event_posts");
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();
        let data = result['data'];
        
        // Filter for user's posts
        data = data.filter((event) => event.ownerId === session.user?.email);
        
        // Apply date filter
        if (minimumDate !== "") {
          data = data.filter((event) => {
            return new Date(event.startDate) >= new Date(minimumDate);
          });
        }

        // Apply sorting
        if (sortBy === "newest") {
          data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        } else if (sortBy === "alphabetical") {
          data.sort((a, b) => a.title.localeCompare(b.title));
        }

        // Apply tag filtering
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
  }, [reload, session, router, selectedTags, sortBy, minimumDate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) return <p>loading</p>;

  return (
    <div className="min-h-screen bg-background">
      {/* Banner */}
      <Box
        sx={{
          width: "100%",
          height: "40vh",
          position: "relative",
          marginBottom: "20px",
          justifyContent: "start",
          alignItems: "end",
          background: theme =>
            `linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(31, 41, 55, 0.31) 0%, 
            ${theme.palette.background.default} 40%)`,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            position: "absolute",
            bottom: "24px",
            left: "64px",
            zIndex: 2,
            color: "text.primary",
            fontWeight: 800,
            letterSpacing: "-0.5px",
            textShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          Welcome back, {session.user?.name}!
        </Typography>
        <img
          src="/images/mock_banner.png"
          alt="Banner"
          style={{
            position: "absolute",
            width: "auto",
            height: "100%",
            objectFit: "cover",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1,
          }}
        />
      </Box>

      {/* Main Content */}
      <div className="px-4 md:px-[16px] py-8 max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-400 dark:text-purple-600" />
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 dark:from-blue-600 dark:to-purple-700">
              My Posts
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/dashboard/create">
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-5 h-5 mr-2" />
                New Post
              </button>
            </Link>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 border border-white/20 dark:bg-gray-800/50 dark:hover:bg-gray-800/70"
              onClick={() => setIsFilterExpanded(!isFilterExpanded)}
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
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

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

            {/* Posts Grid */}
            {events.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
                {events.map((event) => (
                  <div key={event.id} className="transform hover:scale-102 transition-transform duration-200">
                    <Post {...event} isDashboard setReload={setReload} />
                  </div>
                ))}
              </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl text-gray-600 dark:text-gray-400">
              No posts yet. Ready to create your first one?
            </h3>
            <Link href="/dashboard/create">
              <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Create Post
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;