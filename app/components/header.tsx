"use client";
import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "./themetoggle";
import { getFeaturedImages } from "../lib/events";

export default function Header() {
  const featuredImages = getFeaturedImages(); 
  const [current, setCurrent] = useState(0);

  // We’ll display 3 images at once (prev/current/next) inside a "viewport."
  // Increase itemWidth for a bigger center image; side images will scale down.
  const itemWidth = 320; // px for each item's bounding box
  // Increase spacing between images
  const spacing = 60; // px
  // The total container width for 3 items plus 2 gaps
  const containerWidth = (itemWidth + spacing) * 3;
  // This offset ensures the "current" image is centered
  const centerOffset = containerWidth / 2 - itemWidth / 2; 

  // Move forward/back without wrapping:
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

  // Position function: for the i-th image, we shift by (i - current) * (itemWidth + spacing)
  // then add centerOffset so the "current" image ends up in the middle.
  function positionX(i: number) {
    return (i - current) * (itemWidth + spacing) + centerOffset;
  }

  return (
    <div
    style={{
      height: "100vh",
      backgroundColor: "#1F2937"

    }}>
      {/* Top Header with centered title & nav on the right */}
      <header className="relative bg-white dark:bg-gray-800 shadow h-16 flex items-center justify-center">
        {/* Centered Title */}
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Discover UofT
        </h1>

        {/* Nav + Theme Toggle in the top-right */}
        <div className="absolute right-4 flex items-center gap-4">
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <Link href="/login" className="hover:underline">
            Login
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Only show the carousel if we have images */}
      {featuredImages.length > 0 && (
        <section className="py-8 text-center bg-white dark:bg-gray-800">
          <div
            className="relative mx-auto"
            // The "viewport" size for 3 images (including spacing)
            style={{ width: containerWidth, height: itemWidth }}
          >
            {/* Sliding track (relative) */}
            <div className="relative w-full h-full overflow-hidden">
              {featuredImages.map((src, i) => {
                // If i === current => full opacity & scale(1)
                // Else => side image => partial opacity & scale(0.7)
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
                      // Combine translateX + scale in one transform
                      transform: `translateX(${positionX(i)}px) scale(${scale})`,
                      transformOrigin: "center",
                    }}
                  >
                    <img
                      src={src}
                      alt={`Event ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <button
              onClick={prevSlide}
              disabled={current === 0}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white dark:bg-gray-700 dark:text-white px-3 py-1 rounded shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {"<"}
            </button>
            <button
              onClick={nextSlide}
              disabled={current === featuredImages.length - 1}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white dark:bg-gray-700 dark:text-white px-3 py-1 rounded shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {">"}
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
