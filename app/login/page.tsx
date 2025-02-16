"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const { data: session, status } = useSession()

    useEffect(() => {
        if (session) {
            router.push("/dashboard");
        }
    }, [session, router]);

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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 px-4" >
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md" >
                <h2 className="text-center text-3xl font-extrabold text-gray-900" >
                    Sign in to your account
                </h2>

                {
                    error && (
                        <div className="text-center text-red-600 font-medium" > {error} </div>
                    )
                }

                <div className="flex flex-col space-y-4" >
                    <button
                        onClick={() => handleOAuthLogin("github")}
                        className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 transition"
                    >
                        <FaGithub className="mr-2 h-5 w-5" />
                        Sign in with GitHub
                    </button>
                    < button
                        onClick={() => handleOAuthLogin("google")
                        }
                        className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-blue-500 transition"
                    >
                        <FcGoogle className="mr-2 h-5 w-5" />
                        Sign in with Google
                    </button>
                </div>

                < div className="text-center text-sm text-gray-600" >
                    Don’t have an account ? {" "}
                    < a href="/signup" className="font-medium text-blue-600 hover:underline" >
                        Sign up
                    </a>
                </div>
            </div>
        </div>
    );
}
