"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        // Basic password check
        if (password !== confirm) {
            alert("Passwords do not match");
            return;
        }

        // Make a request to your signup API route
        try {
            const res = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                throw new Error("Signup failed");
            }

            // If signup is successful, go to login
            router.push("/login");
        } catch (err) {
            console.error(err);
            alert("Signup failed. Please try again.");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow-md w-full max-w-md"
            >
                <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>

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

                <label className="block mb-2 font-medium">Confirm Password</label>
                <input
                    type="password"
                    className="w-full p-2 mb-4 border rounded"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                    Sign Up
                </button>

                <p className="text-center mt-4">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-600 hover:underline">
                        Login
                    </a>
                </p>
            </form>
        </div>
    );
}
