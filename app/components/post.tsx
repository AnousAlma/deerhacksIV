interface PostProps {
    id: number;
    title: string;
    description: string;
    date?: string;
    location?: string;
    img_src?: string;
    post_tag?: string;
  }
  
  export default function Post({
    title,
    description,
    date,
    location,
    img_src,
    post_tag,
  }: PostProps) {
    return (
      <div className="border p-4 rounded shadow-sm">
        {/* If img_src is provided, display it */}
        {img_src && (
          <img src={img_src} alt={title} className="w-full h-auto mb-2" />
        )}
        <h2 className="text-xl font-semibold">{title}</h2>
        <p>{description}</p>
        {date && <p className="text-sm">Date: {date}</p>}
        {location && <p className="text-sm">Location: {location}</p>}
        {post_tag && (
          <div className="mt-2">
            {post_tag === "online" ? "Online" : "Discord"}
          </div>
        )}
      </div>
    );
  }
  