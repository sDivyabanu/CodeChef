"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const games = [
  {
    id: "flappy-chef",
    title: "Flappy Chef",
    image: "/images/Flappy Chef soaring between pipes 1.png",
    url: "https://flappychef.poseidon0z.com",
  },
  {
    id: "pacman",
    title: "PAC-MAN",
    image: "/images/PAC-MAN maze in a dark city 1.png",
    url: "https://codechef-pacman.vercel.app",
  }
];

// Duplicate items to ensure smooth circular transition with at least 3 cards visible
const carouselItems = [
  { ...games[0], uniqueId: "fc-1" },
  { ...games[1], uniqueId: "pm-1" },
  { ...games[0], uniqueId: "fc-2" },
  { ...games[1], uniqueId: "pm-2" },
];

export default function GamesPage() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % 4);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + 4) % 4);
  };

  const offset = isMobile ? 92 : 240;

  const cardVariants = {
    center: {
      x: 0,
      scale: 1,
      opacity: 1,
      zIndex: 30,
      filter: "brightness(1)",
      pointerEvents: "auto" as const,
    },
    left: {
      x: -offset,
      scale: 0.82,
      opacity: 0.35,
      zIndex: 10,
      filter: "brightness(0.35)",
      pointerEvents: "auto" as const,
    },
    right: {
      x: offset,
      scale: 0.82,
      opacity: 0.35,
      zIndex: 10,
      filter: "brightness(0.35)",
      pointerEvents: "auto" as const,
    },
    hidden: {
      x: 0,
      scale: 0.5,
      opacity: 0,
      zIndex: 0,
      filter: "brightness(0.1)",
      pointerEvents: "none" as const,
    }
  };

  return (
    <main className="w-full min-h-dvh bg-black relative flex flex-col items-center pt-10 md:pt-16 pb-28 md:pb-12 overflow-hidden select-none px-4">
      
      {/* Repeating Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern 
              id="grid-pattern" 
              width="160" 
              height="160" 
              patternUnits="userSpaceOnUse"
              x="50%"
              y="0"
            >
              {/* Vertical Dashed Line */}
              <line 
                x1="80" 
                y1="0" 
                x2="80" 
                y2="160" 
                stroke="#334155" 
                strokeOpacity="0.25" 
                strokeDasharray="4 4" 
                strokeWidth="1.2" 
              />
              {/* Horizontal Dashed Line */}
              <line 
                x1="0" 
                y1="80" 
                x2="160" 
                y2="80" 
                stroke="#334155" 
                strokeOpacity="0.25" 
                strokeDasharray="4 4" 
                strokeWidth="1.2" 
              />
              {/* Intersection Node (Square 10x10 centered at 80,80) */}
              <rect 
                x="75" 
                y="75" 
                width="10" 
                height="10" 
                fill="#475569" 
                fillOpacity="0.6" 
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      {/* Heading Section */}
      <div className="relative flex flex-col items-center mb-6 md:mb-8 z-10">
        <div className="relative">
          {/* Main Title with Cyan Neon Glow */}
          <h1 
            className="
              font-teko 
              text-[clamp(4rem,22vw,10rem)]
              font-extrabold 
              text-white 
              tracking-wider 
              uppercase
              leading-none
            "
            style={{ 
              textShadow: "0 0 8px rgba(6, 182, 212, 0.95), 0 0 20px rgba(6, 182, 212, 0.7)" 
            }}
          >
            Arcade
          </h1>
          
          {/* Subtitle - "by CodeChef" */}
          <span 
            className="
              absolute 
              right-2 
              md:right-4 
              bottom-[-8px] 
              md:bottom-[-10px] 
              font-sans 
              italic 
              font-bold 
              text-xs 
              sm:text-sm 
              md:text-base 
              text-[#22d3ee]
            "
          >
            by CodeChef
          </span>
        </div>
      </div>

      {/* Carousel Wrapper */}
      <div className="relative w-full max-w-[800px] h-[330px] sm:h-[480px] flex items-center justify-center mt-2 z-10">
        {carouselItems.map((item, index) => {
          let role: "center" | "left" | "right" | "hidden" = "hidden";
          
          if (index === activeIndex) {
            role = "center";
          } else if (index === (activeIndex - 1 + 4) % 4) {
            role = "left";
          } else if (index === (activeIndex + 1) % 4) {
            role = "right";
          }

          return (
            <motion.div
              key={item.uniqueId}
              variants={cardVariants}
              animate={role}
              initial="hidden"
              className="absolute w-[200px] h-[280px] min-[360px]:w-[220px] min-[360px]:h-[300px] sm:w-[320px] sm:h-[440px] rounded-[24px] overflow-hidden border-2 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] cursor-pointer"
              onClick={() => {
                if (role === "center") {
                  router.push(`/games/${item.id}`);
                } else if (role === "left") {
                  handlePrev();
                } else if (role === "right") {
                  handleNext();
                }
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  priority
                  sizes="(max-width: 640px) 220px, 320px"
                  className="object-cover rounded-[22px]"
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Buttons (◀ and ▶) */}
      <div className="flex gap-6 z-20 mt-6 md:mt-8">
        <button
          onClick={handlePrev}
          className="
            w-12 
            h-12 
            rounded-full 
            bg-[#262626]/80 
            hover:bg-[#3f3f46]/80 
            active:scale-95 
            flex 
            items-center 
            justify-center 
            transition-all 
            duration-150 
            cursor-pointer
            border
            border-white/10
            shadow-lg
          "
          aria-label="Previous Game"
        >
          <ChevronLeft className="w-6 h-6 text-white/70" />
        </button>
        
        <button
          onClick={handleNext}
          className="
            w-12 
            h-12 
            rounded-full 
            bg-[#262626]/80 
            hover:bg-[#3f3f46]/80 
            active:scale-95 
            flex 
            items-center 
            justify-center 
            transition-all 
            duration-150 
            cursor-pointer
            border
            border-white/10
            shadow-lg
          "
          aria-label="Next Game"
        >
          <ChevronRight className="w-6 h-6 text-white/70" />
        </button>
      </div>

    </main>
  );
}
