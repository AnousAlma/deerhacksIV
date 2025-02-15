"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // from Next.js 13's app router
import { signIn } from "next-auth/react";

import { useSession } from "next-auth/react"


export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const { data: session, status } = useSession()

    if (status === "authenticated") {
        router.push("/dashboard");
        return;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (res?.error) {
            setError("Invalid email or password");
        } else {
            router.push("/dashboard");
        }
    };

    const handleOAuthLogin = (provider: string) => {
        signIn(provider, { redirect: false }).then((res) => {
            if (res?.error) {
                setError(`Error with ${provider} login`);
            } else {
                router.push("/dashboard");
            }
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <p>{error}</p>
            <button
                onClick={() => handleOAuthLogin("github")}
                className="w-200 bg-gray-800 text-white p-2 rounded hover:bg-gray-900"
            >
                Login with GitHub
            </button>

            <button
                onClick={() => handleOAuthLogin("google")}
                className="w-200 bg-red-600 text-white p-2 rounded hover:bg-red-700"
            >
                Login with Google
            </button>

{/* 
            <div className="">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded shadow-md w-full max-w-md"
                >
                    <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

                    <label className="block mb-2 font-medium">Email</label>
                    <input
                        type="email"
                        className="w-full p-2 mb-4 border rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label className="block mb-2 font-medium">Password</label>
                    <input
                        type="password"
                        className="w-full p-2 mb-4 border rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                    >
                        Login
                    </button>

                    <p className="text-center mt-4">
                        Don&rsquo;t have an account?{" "}
                        <a href="/signup" className="text-blue-600 hover:underline">
                            Sign up
                        </a>
                    </p>
                </form>
            </div> */}
        </div>
    );
}
