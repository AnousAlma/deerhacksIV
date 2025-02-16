"use client"
import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Post from "@/components/Post";
import { Filter, Plus, Layout } from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";
import { Card, CardContent, Box,Typography  } from "@mui/material";

const DashboardPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(0);

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
        const data = result['data'];
        const userEvents = data.filter((event) => event.ownerId === session.user?.email);
        setEvents(userEvents);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [reload, session, router]);

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Layout className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
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
                <button className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <Filter className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {/* Posts Grid */}
            {events.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;