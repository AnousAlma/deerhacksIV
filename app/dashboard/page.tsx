// app/dashboard/page.tsx
import { Box, Typography } from "@mui/material";
import Post from "../components/post"; // Adjust path if needed
import post_img from "../../public/images/hero-img.png";
import { Filter, Plus } from "lucide-react";

// Mock function: In a real app, you'd fetch from a database or API
async function fetchUserPosts() {
  // Suppose these are the posts created by the current user
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

export default async function DashboardPage() {
  // In a real app, you might read user info from a session or token
  // and pass a user ID to fetchUserPosts(userId).
  const userPosts = await fetchUserPosts();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        overflow:"hidden"
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
    background: "rgb(2,0,36)",
    background: "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(31,41,55,1) 0%, rgba(255,255,255,1) 40%)"
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
  }}>
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
      px: 10
    }}>
      <div className="flex items-center justify-between mb-4 mt-8">
         <p className="text-2xl">Posts</p>
         <div className="flex items-center gap-4">
           <button className="p-2 rounded-md hover:bg-gray-200">
             <Plus className="w-6 h-6 text-black" />
           </button>
           <button className="p-2 rounded-md hover:bg-gray-200">
             <Filter className="w-6 h-6 text-black" />
           </button>
         </div>
       </div>
       
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {userPosts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
      </Box>
    </Box>
  );
}
