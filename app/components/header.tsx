"use client";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"

import logo from "../../public/images/logo-white (2).png"
export default function Header() {
    const { data: session, status } = useSession()

    return (
        <header>
            <nav className="flex flex-wrap items-center justify-between px-6 shadow"
            style={{ backgroundColor: '#000' }}>
                <Link href="/">
                    <div className="flex items-center gap-2">
                        <img
                            src="/images/logo-white (2).png"
                            alt="UofT Crest"
                            className="w-16 h-16"
                        />
                        <span className="text-base font-bold text-white">Discover UofT</span>
                    </div>
                </Link>
                <div className="flex items-center gap-4">
                    { session ? (
                    <Link href="/dashboard" className="hover:underline text-white">
                        Dashboard
                    </Link>) : (
                            <p className="text-slate-500 cursor-default">
                                Dashboard
                            </p>
                    )}
                    
                    {!session ? (
                    <Link href="/login" className="hover:underline text-white">
                        Login
                    </Link>
                    ) : (<button className="hover:underline text-white" onClick={() => signOut()}>Sign Out</button>)}
                    <ThemeToggle />
                </div>
            </nav>

        </header>
    );
}

