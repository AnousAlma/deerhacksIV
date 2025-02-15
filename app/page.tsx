import Header from "./components/header";
import Gallery from "./components/gallery";
import fetchData, { getFeaturedImages } from "./lib/events";
import Post from "./components/post";
import { Filter } from "lucide-react";

export default function EventsPage() {
  const events = fetchData();
  const featuredImages = getFeaturedImages();

  return (
    // 1) Full-page container with the dark background
    <div className="bg-[#1a1f3d] text-white min-h-screen">
      {/* 2) Header at the top */}
   

      {/* 3) The Gallery right below the header, same background */}
      <Gallery images={featuredImages} />

      {/* 4) Now we switch to a narrower container for the posts */}
      <div className="max-w-7xl mx-auto p-4">
        {/* Title + Filter icon row */}
        <div className="flex items-center justify-between mb-4 mt-8">
          <p className="text-2xl">Posts</p>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-md hover:bg-gray-200">
              <Filter className="w-6 h-6 text-black" />
            </button>
          </div>
        </div>

        {/* 2-column grid for the posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((event) => (
            <Post key={event.id} {...event} />
          ))}
        </div>
      </div>
    </div>
  );
}
