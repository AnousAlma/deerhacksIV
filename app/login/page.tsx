"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import logo from "../../public/images/mock_banner.png";

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
        <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
            <style jsx>{`
                @keyframes gradientAnimation {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }

                .animated-gradient {
                    background: linear-gradient(
                        -45deg,
                        #00c6ff,
                        #4c38ed,
                        #9d5cff,
                        #0072ff
                    );
                    background-size: 300% 300%;
                    animation: gradientAnimation 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                }

                .glass-card {
                    background: rgba(255, 255, 255, 0.9);
                    backdrop-filter: blur(8px);
                    transition: all 0.3s ease;
                }

                .animated-button {
                    position: relative;
                    overflow: hidden;
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .animated-button::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(
                        120deg,
                        transparent,
                        rgba(255, 255, 255, 0.3),
                        transparent
                    );
                    transition: all 0.7s ease;
                }

                @keyframes slowPulse {
                    0% {
                        box-shadow: 0 0 0 0 rgba(0, 198, 255, 0.4);
                        transform: scale(1);
                    }
                    50% {
                        box-shadow: 0 0 20px 10px rgba(0, 198, 255, 0);
                        transform: scale(1.02);
                    }
                    100% {
                        box-shadow: 0 0 0 0 rgba(0, 198, 255, 0);
                        transform: scale(1);
                    }
                }

                .github-button {
                    background: linear-gradient(45deg, #333, #24292e);
                    animation: slowPulse 3s infinite;
                }

                .google-button {
                    background: linear-gradient(45deg, #fff, #f8f9fa);
                    animation: slowPulse 3s infinite 1.5s;
                }

                .animated-button:hover {
                    transform: translateY(-3px) scale(1.02);
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
                }

                .animated-button:hover::before {
                    left: 100%;
                }

                .animated-button:active {
                    transform: translateY(1px) scale(0.98);
                    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
                }
            `}</style>
            
            <div className="animated-gradient absolute inset-0"></div>
            
            <div className="glass-card w-full max-w-md p-8 space-y-6 rounded-lg shadow-xl relative z-10">
                <div className="flex flex-col items-center space-y-4">
                    <div className="relative w-72 h-72">
                        <Image
                            src={logo}
                            alt="Company Logo"
                            layout="fill"
                            objectFit="contain"
                            priority
                            className="transform hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                {error && (
                    <div className="text-center text-red-600 font-medium">
                        {error}
                    </div>
                )}

                <div className="flex flex-col space-y-5">
                    <button
                        onClick={() => handleOAuthLogin("github")}
                        className="animated-button github-button w-full flex items-center justify-center py-4 px-6 border border-transparent rounded-lg text-base font-medium text-white"
                    >
                        <FaGithub className="mr-3 h-6 w-6" />
                        Sign in with GitHub
                    </button>
                    <button
                        onClick={() => handleOAuthLogin("google")}
                        className="animated-button google-button w-full flex items-center justify-center py-4 px-6 border border-gray-200 rounded-lg text-base font-medium text-gray-700"
                    >
                        <FcGoogle className="mr-3 h-6 w-6" />
                        Sign in with Google
                    </button>
                </div>

                <div className="text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <a href="/signup" className="font-medium text-blue-600 hover:text-blue-500 hover:underline transition-colors duration-300">
                        Sign up
                    </a>
                </div>
            </div>
        </div>
    );
}