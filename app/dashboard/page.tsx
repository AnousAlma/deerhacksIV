"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Box, Typography } from "@mui/material";
import Post from "@/components/Post";
import post_img from "../../public/images/hero-img.png";
import { Filter, Plus } from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

function fetchUserPosts() {
  return [
    {
      id: 1,
      title: "I created this event",
      description: "My event",
      date: "2025-05-01",
      post_tag: "online",
      img_src: post_img,
    },
    {
      id: 2,
      title: "I also created this one",
      description: "Description for the second event",
      date: "2025-06-10",
      location: "Room 202",
      post_tag: "discord",
      img_src: post_img,
    },
  ];
}

export default function DashboardPage() {
  const router = useRouter();
  const userPosts = fetchUserPosts();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session) {
      toast.error("Access denied!", { position: "top-center" });
      router.push("/login");
    }
  }, [session, router]);

  if (session) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Banner */}
        <Box
          sx={{
            width: "100%",
            height: "40vh",
            position: "relative",
            marginBottom: "20px",
            justifyContent: "start",
            alignItems: "end",
            background:
              "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(31,41,55,0.4767156862745098) 0%, rgba(255,255,255,1) 40%)",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              position: "absolute",
              bottom: "24px",
              left: "64px",
              zIndex: 2,
              color: "white",
              fontWeight: "bold",
            }}
          >
            Welcome back club1
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

        <Box
          sx={{
            width: "100vw",
            height: "100vh",
            px: 10,
          }}
        >
          <div className="flex items-center justify-between mb-4 mt-8">
            <p className="text-2xl">Posts</p>
            <div className="flex items-center gap-4">
              <Link href="/dashboard/create">
                <button className="p-2 rounded-md hover:bg-gray-200">
                  <Plus className="w-6 h-6 text-orange" />
                </button>
              </Link>
              <button className="p-2 rounded-md hover:bg-gray-200">
                <Filter className="w-6 h-6 text-orange" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userPosts.map((post) => (
              <Post key={post.id} {...post} isDashboard /> // Add isDashboard prop
            ))}
          </div>
        </Box>
      </Box>
    );
  } else {
    return <p>loading</p>;
  }
}