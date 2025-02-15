// components/Post.tsx
"use client"; 
// If you plan to use any React state/hooks in this component, keep "use client" at the top

interface PostProps {
  id: number;
  title: string;
  description: string;
  date?: string;
  location?: string;
  post_tag?: string;  // e.g., "online" or "discord"
}

export default function Post({
  title,
  description,
  date,
  location,
  post_tag,
}: PostProps) {
  return (
    <div className="border p-4 rounded shadow-sm">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p>{description}</p>
      {date && <p className="text-sm">Date: {date}</p>}
      {location && <p className="text-sm">Location: {location}</p>}
      {post_tag && (
        <p className="text-sm">
          Tag: {post_tag === "online" ? "Online" : "Discord"}
        </p>
      )}
    </div>
  );
}
