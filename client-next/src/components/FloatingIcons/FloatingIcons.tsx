"use client";

import Link from "next/link";
import React from "react";

export default function FloatingIcons() {
  return (
    <>
      {/* LEFT BUTTON — "Projects" */}
      <Link
        href="/projects"
        aria-label="Go to Projects"
        className="
          fixed 
          bottom-20
          left-3
          lg:bottom-12 
          lg:left-2 
          z-40
          lg:z-[9999] 
          transition-transform 
          duration-200 
          ease-out 
          hover:scale-110 
          active:scale-95 
          focus:outline-none 
          focus-visible:ring-2 
          focus-visible:ring-white 
          focus-visible:ring-offset-2 
          focus-visible:ring-offset-black 
          rounded-lg
          w-11
          lg:w-auto
        "
      >
        <div className="flex flex-col items-center gap-2.5">
          <div 
            className="
              w-11
              h-11
              lg:w-16 
              lg:h-16 
              rounded-full 
              bg-black 
              flex 
              items-center 
              justify-center 
              shadow-[0_4px_16px_rgba(0,0,0,0.5)]
            "
          >
            <img
              src="/images/projects.png"
              alt="Projects"
              className="w-6 h-6 lg:w-10 lg:h-10 object-contain"
            />
          </div>
          <span 
            className="
              hidden
              lg:block
              text-[10px]
              lg:text-xs 
              font-bold 
              tracking-[0.1em] 
              text-white 
              uppercase 
              select-none
              font-bebas
            "
          >
            PROJECTS
          </span>
        </div>
      </Link>

      {/* RIGHT BUTTON — "Arena" */}
      <Link
        href="/games"
        aria-label="Go to Arena"
        className="
          fixed 
          bottom-20
          right-3
          lg:bottom-12 
          lg:right-2 
          z-40
          lg:z-[9999] 
          transition-transform 
          duration-200 
          ease-out 
          hover:scale-110 
          active:scale-95 
          focus:outline-none 
          focus-visible:ring-2 
          focus-visible:ring-white 
          focus-visible:ring-offset-2 
          focus-visible:ring-offset-black 
          rounded-lg
          w-11
          lg:w-auto
        "
      >
        <div className="flex flex-col items-center gap-2.5">
          <div 
            className="
              w-11
              h-11
              lg:w-16 
              lg:h-16 
              rounded-full 
              bg-black 
              flex 
              items-center 
              justify-center 
              shadow-[0_4px_16px_rgba(0,0,0,0.5)]
            "
          >
            <img
              src="/images/arena.png"
              alt="Arena"
              className="w-6 h-6 lg:w-10 lg:h-10 object-contain"
            />
          </div>
          <span 
            className="
              hidden
              lg:block
              text-[10px]
              lg:text-xs 
              font-bold 
              tracking-[0.1em] 
              text-white 
              uppercase 
              select-none
              font-bebas
            "
          >
            ARENA
          </span>
        </div>
      </Link>
    </>
  );
}
