"use client"
import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Post from "@/components/Post";
import { Filter, Plus, Layout } from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";
import { Card, CardContent } from "@mui/material"

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
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!session) return <p>loading</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative h-64 mb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/images/mock_banner.png')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="relative z-10 h-full flex flex-col justify-end p-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {session.user?.name}
          </h1>
          <p className="text-gray-200">Manage your events and posts</p>
        </div>
      </div>

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