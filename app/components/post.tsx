"use client";
import Image from "next/image";
import { TAG_INFO } from "./tag"; // Adjust path if you’re using a tag info map

interface PostProps {
  id: number;
  title: string;
  description: string;
  date?: string;
  location?: string;
  post_tag?: string;
  img_src?: string; // Optional image path
}

export default function Post({
  title,
  description,
  date,
  location,
  post_tag,
  img_src,
}: PostProps) {
  // Optional: retrieve icon/label from a tag map
  const tagInfo = post_tag ? TAG_INFO[post_tag] : null;

  // Example "dummy" tags to match the screenshot's row of tags
  // (Replace with real data if you have multiple tags)
  const tags = ["Club1", "Nature", "Tech", "Poker"];

  return (
    <div className="flex bg-[#23273F] text-white rounded-lg p-4 relative shadow-md">
      {/* Left Image (fixed width) */}
      <div className="w-48 h-32 md:w-72 md:h-44 flex-shrink-0 relative rounded-md overflow-hidden">
        {/* Use Next.js <Image> or a standard <img> */}
        {img_src ? (
          <Image
            src={img_src}
            alt="Event Image"
            fill
            className="object-cover"
          />
        ) : (
          <Image
            src="/images/placeholder.png" // Fallback
            alt="Placeholder"
            fill
            className="object-cover"
          />
        )}
      </div>

      {/* Right Content */}
      <div className="flex-1 ml-4">
        {/* Date + Icon in top-right corner */}
        <div className="absolute top-2 right-4 flex items-center gap-2 text-sm text-gray-300">
          {date && <p>{date}</p>}
          {/* If we have a post_tag icon (like Discord), show it */}
          {/* {tagInfo?.icon && (
            <img
              src={tagInfo.icon}
              alt={tagInfo.label || "Tag Icon"}
              className="w-5 h-5"
            />
          )} */}
        </div>

        {/* Title */}
        <h2 className="text-lg md:text-xl font-semibold mb-2">{title}</h2>

        {/* Description */}
        <p className="text-sm md:text-base text-gray-200 mb-2">
          {description}
        </p>

        {/* Location */}
        {location && (
          <p className="text-xs md:text-sm text-gray-400 mb-2">{location}</p>
        )}

        {/* Tag row (pills) */}
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-[#2F3446] px-3 py-1 rounded-full text-xs md:text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
