// app/events/page.tsx
import Post from "../components/post";

function fetchData() {
  // Hardcode your mock data (or any logic you want)
  return [
    {
      id: 1,
      title: "Robotics Club Meeting",
      description: "Eat Pizza until you drop",
      date: "2025-03-15",
      location: "Auditorium",
      post_tag: "online",
    },
    {
      id: 2,
      title: "Bus waiting",
      description: "Wait for the bus that was supposedly going to arrive in 10 minutes",
      date: "2025-04-10",
      location: "outside in the cold",
      post_tag: "discord",
    },
    // Add more if needed
  ];
}

export default function EventsPage() {
  const events = fetchData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {events.map((event) => (
        <Post key={event.id} {...event} />
      ))}
    </div>
  );
}
