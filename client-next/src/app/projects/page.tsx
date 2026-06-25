"use client";

import React from "react";

export default function ProjectsPage() {
  return (
    <main className="w-full min-h-screen bg-[#F5F0D8] relative flex flex-col items-center pt-10 md:pt-16 overflow-hidden select-none">
      
      {/* Repeating Grid Background across the entire page */}
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
                stroke="#475569" 
                strokeOpacity="0.12" 
                strokeDasharray="4 4" 
                strokeWidth="1.2" 
              />
              {/* Horizontal Dashed Line */}
              <line 
                x1="0" 
                y1="80" 
                x2="160" 
                y2="80" 
                stroke="#475569" 
                strokeOpacity="0.12" 
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
                fillOpacity="0.7" 
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      {/* Title & Subtitle Section */}
      <div className="relative flex flex-col items-center mb-8 md:mb-12 z-10">
        <div className="relative">
          {/* Main Title with Cyan Neon Glow */}
          <h1 
            className="
              font-teko 
              text-7xl 
              sm:text-8xl 
              md:text-9xl 
              lg:text-[10rem] 
              font-extrabold 
              text-black 
              tracking-wider 
              uppercase
              leading-none
            "
            style={{ 
              textShadow: "0 0 5px rgba(6, 182, 212, 0.95), 0 0 10px rgba(6, 182, 212, 0.6)" 
            }}
          >
            PROJECTS
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
              text-black
            "
          >
            by CodeChef
          </span>
        </div>
      </div>

    </main>
  );
}

