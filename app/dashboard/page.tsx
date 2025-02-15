// app/dashboard/page.tsx
import Post from "../components/post"; // Adjust path if needed

// Mock function: In a real app, you'd fetch from a database or API
async function fetchUserPosts() {
  // Suppose these are the posts created by the current user
  return [
    {
      id: 1,
      title: "I created this event",
      description: "My event",
      date: "2025-05-01",
      location: "Main Hall",
      post_tag: "online",
    },
    {
      id: 2,
      title: "I also created this one",
      description: "Description for the second event",
      date: "2025-06-10",
      location: "Room 202",
      post_tag: "discord",
    },
    // Add more if needed
  ];
}

export default async function DashboardPage() {
  // In a real app, you might read user info from a session or token
  // and pass a user ID to fetchUserPosts(userId).
  const userPosts = await fetchUserPosts();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Your Dashboard</h1>
      <p className="mb-4">Here are all the posts you’ve created:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {userPosts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}
