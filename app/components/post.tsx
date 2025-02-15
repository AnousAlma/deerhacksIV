// components/Post.tsx
"use client";
import { TAG_INFO } from "./tag"; // adjust path

interface PostProps {
  id: number;
  title: string;
  description: string;
  date?: string;
  location?: string;
  post_tag?: string;
}

export default function Post({
  title,
  description,
  date,
  location,
  post_tag,
}: PostProps) {
  // Retrieve the info from the map, or use a default if missing
  const tagInfo = post_tag ? TAG_INFO[post_tag] : undefined;

  return (
    <div className="border p-4 rounded shadow-sm">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p>{description}</p>
      {date && <p className="text-sm">Date: {date}</p>}
      {location && <p className="text-sm">Location: {location}</p>}

      {/* If we found a matching tag in the map, show its label and icon */}
      {tagInfo && (
        <div className="flex items-center gap-2 mt-2">
          <img src={tagInfo.icon} alt={tagInfo.label} width={24} height={24} />
          <span className="text-sm">{tagInfo.label}</span>
        </div>
      )}
    </div>
  );
}
