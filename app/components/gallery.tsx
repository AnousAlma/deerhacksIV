"use client";
import { useState } from "react";

interface GalleryProps {
    images: string[];
}

export default function Gallery({ images }: GalleryProps) {
    const [current, setCurrent] = useState(0);

    const itemWidth = 800;
    const spacing = -240;
    const containerWidth = (itemWidth + spacing) * 3;
    const centerOffset = containerWidth / 2 - itemWidth / 2;

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + images.length) % images.length);
    };

    function positionX(i: number) {
        let position = i - current;
        if (position < -1) position += images.length;
        if (position > 1) position -= images.length;
        return position * (itemWidth + spacing) + centerOffset;
    }

    if (!images || images.length === 0) return null;

    return (
        <div className="relative w-full flex flex-col items-center py-6">
            <style jsx>{`
                .slide-transition {
                    transition: transform 800ms cubic-bezier(0.34, 1.28, 0.64, 1), 
                                opacity 600ms cubic-bezier(0.4, 0.0, 0.2, 1);
                }
                
                .slide-enter {
                    transition-timing-function: cubic-bezier(0.34, 1.28, 0.64, 1);
                }
                
                .slide-exit {
                    transition-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1);
                }
                
                .image-scale {
                    transition: transform 900ms cubic-bezier(0.34, 1.28, 0.64, 1);
                }
                
                @keyframes smoothSpring {
                    0% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.03);
                    }
                    100% {
                        transform: scale(1.02);
                    }
                }
            `}</style>
            <div
                className="relative mt-[160px]"
                style={{ width: containerWidth, height: '560px' }}
            >
                {images.map((src, i) => {
                    const distance = Math.min(
                        Math.abs(i - current),
                        Math.abs(i - current - images.length),
                        Math.abs(i - current + images.length)
                    );
                    
                    if (distance > 1) return null;
                    
                    const isCurrent = i === current;
                    const opacity = isCurrent ? "opacity-100" : "opacity-50";
                    const translateY = isCurrent ? -160 : 0;

                    return (
                        <div
                            key={`${src}-${i}`}
                            className={`absolute top-0 transform-gpu slide-transition ${opacity}`}
                            style={{
                                width: '800px',
                                height: '480px',
                                transform: `translate3d(${positionX(i)}px, ${translateY}px, 0)`,
                                willChange: 'transform, opacity',
                                zIndex: isCurrent ? 10 : 0
                            }}
                        >
                            <img
                                src={src}
                                alt={`Gallery item ${i}`}
                                className={`w-full h-full object-cover rounded-lg aspect-[16/9] shadow-2xl shadow-gray-800/60 image-scale`}
                                style={{
                                    transform: isCurrent ? 'scale(1.02)' : 'scale(1)',
                                    animation: isCurrent ? 'smoothSpring 900ms forwards' : 'none'
                                }}
                            />
                        </div>
                    );
                })}
            </div>
            <button
                onClick={prevSlide}
                className="absolute left-0 top-80 transform -translate-y-1/2 bg-[#2b3350] hover:bg-[#394063] px-3 py-1 rounded shadow-lg transition-all duration-500 hover:scale-110 slide-transition"
                style={{color: "#fff"}}
            >
                {"<"}
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-0 top-80 transform -translate-y-1/2 bg-[#2b3350] hover:bg-[#394063] px-3 py-1 rounded shadow-lg transition-all duration-500 hover:scale-110 slide-transition"
                style={{color: "#fff"}}
            >
                {">"}
            </button>
        </div>
    );
}