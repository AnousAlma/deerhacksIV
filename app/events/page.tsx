// app/events/page.tsx
import Post from "../components/Post";

export default async function EventsPage() {
  // 1. Fetch data from your API route (server component)
  const res = await fetch("http://localhost:3000/api/events", {
    // Required if you’re calling Next.js API routes in a server component:
    cache: "no-store",
  });
  const events = await res.json();

  // 2. Render the events with the Post component
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {events.map((event: any) => (
        <Post key={event.id} {...event} />
      ))}
    </div>
  );
}
