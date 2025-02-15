"use client";

import { useState } from "react";
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
  ];
}

// Simple Modal container
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-xl max-w-lg w-full p-6">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-700 hover:text-gray-900"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [userPosts, setUserPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form fields for new post
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [postTag, setPostTag] = useState("");

  // On mount, load existing user posts
  useState(() => {
    fetchUserPosts().then((posts) => setUserPosts(posts));
  });

  // Handle create post
  const handleCreatePost = (e) => {
    e.preventDefault();

    // In a real app, you'd POST to an API or DB
    const newPost = {
      id: userPosts.length + 1, // simple ID
      title,
      description,
      date,
      location,
      post_tag: postTag,
    };

    // Add to local state
    setUserPosts([...userPosts, newPost]);

    // Close modal and reset form
    setIsModalOpen(false);
    setTitle("");
    setDescription("");
    setDate("");
    setLocation("");
    setPostTag("");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Your Dashboard</h1>

      {/* Button to open modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Create New Event
      </button>

      <p className="mb-4">Here are all the posts you’ve created:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {userPosts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>

      {/* Create Post Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">Create a New Event</h2>
        <form onSubmit={handleCreatePost} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-2 py-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              className="w-full border border-gray-300 rounded px-2 py-1"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded px-2 py-1"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-2 py-1"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Post Tag
            </label>
            <select
              className="w-full border border-gray-300 rounded px-2 py-1"
              value={postTag}
              onChange={(e) => setPostTag(e.target.value)}
            >
              <option value="">-- Select a Tag --</option>
              <option value="online">Online</option>
              <option value="discord">Discord</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
}
