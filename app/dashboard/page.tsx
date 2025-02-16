"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Box, Typography } from "@mui/material";
import Post from "@/components/Post";
import post_img from "../../public/images/hero-img.png";
import { Filter, Plus } from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { EventPostOutput } from "@/lib/db/models/post";


export default function DashboardPage() {
    const router = useRouter();
    const { data: session, status } = useSession();

    const [events, setEvents] = useState<EventPostOutput[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [reload, setReload] = useState(0);


    useEffect(() => {
        if (!session || !session.user) {
            toast.error("Access denied!", { position: "top-center" });
            router.push("/login");
        }
    }, [session, router]);

    useEffect(() => {
        console.log("reoload #", reload)
        const fetchData = async () => {
            if (!session || !session.user) {
                router.push('/login');
                return;
            }

            try {
                const response = await fetch("/api/all_event_posts");
                if (!response.ok) throw new Error("Network response was not ok");

                const result = await response.json();
                console.log('erecieved r', result);

                if (!('data' in result)) {
                    console.log("Failed to parse result", result);
                }

                const data = result['data'];
                if (!Array.isArray(data)) {
                    console.log("Failed to parse data", data);
                    throw new Error("Expected an array but got something else");
                }

                console.log('ereecieved', data);

                const userEvents = data.filter((event) => event.ownerId === session.user?.email);

                setEvents(userEvents);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [reload]);

    if (loading) {
        return <p>loading...</p>
    }

    if (session) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    overflow: "hidden",
                }}
            >
                {/* Banner */}
                <Box
                    sx={{
                        width: "100%",
                        height: "40vh",
                        position: "relative",
                        marginBottom: "20px",
                        justifyContent: "start",
                        alignItems: "end",
                        background:
                            "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(31,41,55,0.4767156862745098) 0%, rgba(255,255,255,1) 40%)",
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            position: "absolute",
                            bottom: "24px",
                            left: "64px",
                            zIndex: 2,
                            color: "white",
                            fontWeight: "bold",
                        }}
                    >
                        Welcome back {session.user?.name}!
                    </Typography>
                    <img
                        src="/images/mock_banner.png"
                        alt="Banner"
                        style={{
                            position: "absolute",
                            width: "auto",
                            height: "100%",
                            objectFit: "cover",
                            left: "50%",
                            transform: "translateX(-50%)",
                            zIndex: 1,
                        }}
                    />
                </Box>

                <Box
                    sx={{
                        width: "100vw",
                        height: "100vh",
                        px: 10,
                    }}
                >
                    <div className="flex items-center justify-between mb-4 mt-8">
                        <p className="text-2xl">My Posts</p>
                        <div className="flex items-center gap-4">
                            <Link href="/dashboard/create">
                                <button className="p-2 rounded-md hover:bg-gray-200">
                                    <Plus className="w-6 h-6 text-orange" />
                                </button>
                            </Link>
                            <button className="p-2 rounded-md hover:bg-gray-200">
                                <Filter className="w-6 h-6 text-orange" />
                            </button>
                        </div>
                    </div>

                    <p>{error}</p>
                    {events.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {events.map((event) => (
                                <Post key={event.id} {...event} isDashboard setReload={setReload} /> // Add isDashboard prop
                            ))}
                        </div>
                    ) : (<h3>Nothing yet, why don't you make one?</h3>)
                    }
                </Box>
            </Box>
        );
    } else {
        return <p>loading</p>;
    }
}