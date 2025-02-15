// app/events/page.tsx
import Post from "./components/post";

import fetchData from "./lib/events"

export default function EventsPage() {
  const events = fetchData();

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Title + Filter icon row */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Posts</h2>
        <button>
          <img src="/icons/filter.svg" alt="Filter" width={24} height={24} />
        </button>
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
