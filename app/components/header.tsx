"use client";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
    return (
        <header>
            <nav className="flex flex-wrap items-center justify-between px-6 bg-[#1a1f3d] shadow">
                <Link href="/">
                    <div className="flex items-center gap-2">
                        <img
                            src="/images/logo.png"
                            alt="UofT Crest"
                            className="w-16 h-16"
                        />
                        <span className="text-base font-bold text-white">Discover UofT</span>
                    </div>
                </Link>
                <div className="flex items-center gap-4">
                    <Link href="/create" className="hover:underline text-white">
                        Create Event
                    </Link>
                    <Link href="/dashboard" className="hover:underline text-white">
                        Dashboard
                    </Link>
                    <Link href="/login" className="hover:underline text-white">
                        Login
                    </Link>
                    <ThemeToggle />
                </div>
            </nav>

        </header>
    );
}
