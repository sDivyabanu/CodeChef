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
          bottom-16 
          left-16 
          z-[9999] 
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
        "
      >
        <div className="flex flex-col items-center gap-2.5">
          <div 
            className="
              w-24 
              h-24 
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
              className="w-14 h-14 object-contain"
            />
          </div>
          <span 
            className="
              text-sm 
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
          bottom-16 
          right-16 
          z-[9999] 
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
        "
      >
        <div className="flex flex-col items-center gap-2.5">
          <div 
            className="
              w-24 
              h-24 
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
              className="w-14 h-14 object-contain"
            />
          </div>
          <span 
            className="
              text-sm 
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
