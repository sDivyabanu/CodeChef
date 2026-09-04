"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

export default function PacmanPage() {
  return (
    <main className="w-full min-h-screen bg-black relative flex flex-col items-center pt-8 pb-12 px-4 overflow-hidden select-none">
      
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
              <line x1="80" y1="0" x2="80" y2="160" stroke="#334155" strokeOpacity="0.2" strokeDasharray="4 4" strokeWidth="1.2" />
              <line x1="0" y1="80" x2="160" y2="80" stroke="#334155" strokeOpacity="0.2" strokeDasharray="4 4" strokeWidth="1.2" />
              <rect x="75" y="75" width="10" height="10" fill="#475569" fillOpacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      {/* Header bar */}
      <div className="w-full max-w-4xl flex items-center justify-between z-10 mb-8">
        <Link 
          href="/games"
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-150 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Arcade</span>
        </Link>
        <div className="flex items-center gap-4">
          <a 
            href="https://codechef-pacman.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#eab308] hover:text-[#ca8a04] transition-colors duration-150 font-mono text-xs uppercase"
          >
            <span>Play Fullscreen</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <span className="text-white/30 font-mono text-xs">|</span>
          <span className="text-[#eab308] font-mono tracking-widest text-sm uppercase">Cabinet #02</span>
        </div>
      </div>

      {/* Arcade cabinet display */}
      <div className="relative w-full max-w-2xl bg-neutral-900 border-4 border-[#eab308] rounded-3xl p-4 sm:p-6 shadow-[0_0_30px_rgba(234,179,8,0.25)] z-10 flex flex-col items-center">
        
        {/* Glowing game marquee */}
        <div className="w-full bg-black border-2 border-white/10 rounded-xl py-3 px-6 mb-6 flex flex-col items-center">
          <h1 
            className="font-teko text-5xl sm:text-6xl font-extrabold text-white tracking-widest uppercase leading-none"
            style={{ textShadow: "0 0 8px rgba(234, 179, 8, 0.95)" }}
          >
            PAC-MAN
          </h1>
          <span className="text-white/40 font-sans text-xs tracking-widest uppercase mt-1">by CodeChef</span>
        </div>

        {/* Screen Bezel - Optimized aspect to fit both portrait gameplay and landscape leaderboard views */}
        <div className="relative w-full max-w-[576px] h-[480px] sm:h-[600px] bg-neutral-950 rounded-2xl border-4 border-neutral-800 p-2 sm:p-4 flex items-center justify-center overflow-hidden shadow-inner bg-black">
          {/* Scanline Overlay Effect */}
          <div 
            className="absolute inset-0 pointer-events-none z-10 opacity-15"
            style={{
              backgroundImage: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)",
              backgroundSize: "100% 4px",
            }}
          />

          {/* CRT Screen Glow */}
          <div className="absolute inset-0 bg-[#eab308]/5 pointer-events-none z-0" />

          {/* Game Area */}
          <div className="relative w-full h-full rounded-lg overflow-y-auto bg-black z-20">
            <iframe 
              src="/api/proxy-pacman" 
              className="w-full h-[850px] border-none rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Console Control Panel Mock */}
        <div className="w-full mt-6 bg-neutral-950 border border-white/5 rounded-2xl p-4 flex justify-between items-center">
          <div className="flex gap-2">
            <span className="text-white/60 font-mono text-xs uppercase">1 Player Mode</span>
          </div>
          <div className="flex gap-3 items-center">
            <span className="text-white/40 font-mono text-xs uppercase">Joystick 2</span>
            <div className="w-10 h-10 rounded-full bg-neutral-800 border-2 border-neutral-700 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-yellow-500" />
            </div>
          </div>
        </div>

      </div>

    </main>
  );
}
