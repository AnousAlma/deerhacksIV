"use client";
import { useState } from "react";

interface GalleryProps {
  images: string[];
}

export default function Gallery({ images }: GalleryProps) {
  const [current, setCurrent] = useState(0);

  const itemWidth = 600;
  const spacing = 40;
  const containerWidth = (itemWidth + spacing) * 3;
  const centerOffset = containerWidth / 2 - itemWidth / 2;

  const nextSlide = () => {
    if (current < images.length - 1) {
      setCurrent(current + 1);
    }
  };
  const prevSlide = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  function positionX(i: number) {
    return (i - current) * (itemWidth + spacing) + centerOffset;
  }

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full flex flex-col items-center py-6">
      <div
        className="relative"
        style={{ width: containerWidth, height: itemWidth }}
      >
        {images.map((src, i) => {
          if (i < current - 1 || i > current + 1) return null;
          const isCurrent = i === current;
          const scale = isCurrent ? 1 : 0.7;
          const opacity = isCurrent ? "opacity-100" : "opacity-50";

          return (
            <div
              key={`${src}-${i}`}
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
                alt={`Gallery item ${i}`}
                className="w-full h-full object-cover rounded"
              />
            </div>
          );
        })}
      </div>
      {/* Buttons */}
      <button
        onClick={prevSlide}
        disabled={current === 0}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#2b3350] hover:bg-[#394063] px-3 py-1 rounded shadow disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {"<"}
      </button>
      <button
        onClick={nextSlide}
        disabled={current === images.length - 1}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#2b3350] hover:bg-[#394063] px-3 py-1 rounded shadow disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {">"}
      </button>
    </div>
  );
}
