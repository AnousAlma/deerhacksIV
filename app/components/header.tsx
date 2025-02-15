"use client";
import Link from "next/link";
import ThemeToggle from "./themetoggle";

export default function Header() {
  return (
    <header className="p-4 flex justify-between items-center bg-gray-100 dark:bg-gray-800">
      <nav>
        <Link href="/">Home</Link> | <Link href="/events">Events</Link>
      </nav>
      <ThemeToggle />
    </header>
  );
}
