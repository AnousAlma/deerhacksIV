import { Filter } from "lucide-react"; // Import an additional icon
import Post from "./components/post";
import fetchData from "./lib/events";

export default function EventsPage() {
  const events = fetchData();

  return (
    <div className="max-w-7xl mx-auto p-1">
      {/* Title + Filter & Settings icon row */}
      <div className="flex items-center justify-between mb-4 mt-8">
        <p className="text-2xl ">Posts</p>
        <div className="flex items-center gap-4"> {/* Ensures 16px gap */}
          <button className="p-2 rounded-md hover:bg-gray-200">
            <Filter className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* 2-column grid (1 col on smaller screens, 2 cols on md and up) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((event) => (
          <Post key={event.id} {...event} />
        ))}
      </div>
    </div>
  );
}
