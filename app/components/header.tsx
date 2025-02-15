"use client";
import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "./themetoggle";
import { getFeaturedImages } from "../lib/events";

export default function Header() {
  const featuredImages = getFeaturedImages(); // e.g. ["/images/hero1.png", "/images/hero2.png", ...]
  const [current, setCurrent] = useState(0);

  // Each image bounding box
  const itemWidth = 300; 
  // Spacing between the center of each bounding box
  const spacing = 40;  
  // We show 3 images side by side => total "viewport" width
  const containerWidth = (itemWidth + spacing) * 3;
  // Center offset ensures the "current" image is exactly in the middle
  const centerOffset = containerWidth / 2 - itemWidth / 2;

  // No wrap-around: only move if not at boundaries
  const nextSlide = () => {
    if (current < featuredImages.length - 1) {
      setCurrent(current + 1);
    }
  };
  const prevSlide = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  // positionX(i) => how far to shift the i-th image horizontally
  function positionX(i: number) {
    return (i - current) * (itemWidth + spacing) + centerOffset;
  }

  return (
    <div className="min-h-screen bg-[#1a1f3d] text-white">
      {/* Top Navbar with smaller height (h-12) */}
      <nav className="h-12 flex items-center justify-between px-6 bg-[#1a1f3d] shadow">
        {/* Left side: brand/logo */}
        <div className="flex items-center gap-2">
          <img
            src="/images/crest-small.png"
            alt="UofT Crest"
            className="w-6 h-6"
          />
          <span className="text-base font-bold">Discover UofT</span>
        </div>

        {/* Right side: Dashboard, Login, Theme Toggle */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <Link href="/login" className="hover:underline">
            Login
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center mt-8 px-4 text-center">
        {/* Example large crest/logo */}
        <img
          src="/images/logo.png"
          alt="Large Crest"
          className="w-60 h-60 mb-4"
        />

        <h1 className="text-3xl font-bold mb-1">Discover UofT</h1>
        <p className="text-gray-300 mb-2">Never Miss a Moment on Campus</p>
        <h2 className="text-xl font-semibold mb-8">For you</h2>

        {/* 3-image hero layout */}
        {featuredImages.length > 0 && (
          <div
            className="relative mx-auto"
            style={{ width: containerWidth, height: itemWidth }}
          >
            <div className="relative w-full h-full">
              {featuredImages.map((src, i) => {
                // Hide images not in [current-1, current, current+1]
                if (i < current - 1 || i > current + 1) {
                  return null;
                }

                // If i === current => scale(1), else => scale(0.7)
                const isCurrent = i === current;
                const scale = isCurrent ? 1 : 0.7;
                const opacity = isCurrent ? "opacity-100" : "opacity-50";

                return (
                  <div
                    key={i}
                    className={`absolute top-0 transition-all duration-700 ease-in-out ${opacity}`}
                    style={{
                      width: itemWidth,
                      height: itemWidth,
                      transform: `translateX(${positionX(i)}px) scale(${scale})`,
                      transformOrigin: "center",
                    }}
                  >
                    <img
                      src={src}
                      alt={`Event ${i}`}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                );
              })}
            </div>

            {/* Prev / Next buttons */}
            <button
              onClick={prevSlide}
              disabled={current === 0}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-[#2b3350] hover:bg-[#394063] px-3 py-1 rounded shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {"<"}
            </button>
            <button
              onClick={nextSlide}
              disabled={current === featuredImages.length - 1}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-[#2b3350] hover:bg-[#394063] px-3 py-1 rounded shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {">"}
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
