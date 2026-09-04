"use client";

import React from "react";
import Image from "next/image";
import Footer from "@/components/Footer/Footer";
import { motion } from "framer-motion";

// Inline SVG components for restaurant-themed details and premium decorations.

// Premium Medal Component for the Hall of Fame achievement display
interface MedalProps {
  rank: 1 | 2 | 3;
  name: string;
  stars: number;
  rating: string;
}

const Medal = ({ rank, name, stars, rating }: MedalProps) => {
  const metallicGradients = {
    1: "from-[#FFFDF5] via-[#F6D062] to-[#B38510]", // Premium Gold
    2: "from-[#FAFAFA] via-[#D1D8E0] to-[#8892A0]", // Premium Silver
    3: "from-[#FFF6F0] via-[#CD7F32] to-[#804000]", // Premium Bronze
  };

  const textColors = {
    1: "text-[#735405]",
    2: "text-[#3D4756]",
    3: "text-[#592D08]",
  };

  const borderColors = {
    1: "border-[#FFF0C2]/40",
    2: "border-[#ECEFF4]/40",
    3: "border-[#FFEBE0]/40",
  };

  const shadowClass = "shadow-[0_12px_28px_rgba(0,0,0,0.22),_inset_0_2px_4px_rgba(255,255,255,0.65)]";

  const sizeClass = rank === 1 
    ? "w-[220px] h-[220px] sm:w-[240px] sm:h-[240px] md:w-[280px] md:h-[280px]" 
    : "w-[190px] h-[190px] sm:w-[200px] sm:h-[200px] md:w-[240px] md:h-[240px]";

  const avatarSize = rank === 1 
    ? "w-20 h-20 md:w-24 md:h-24" 
    : "w-16 h-16 md:w-20 md:h-20";

  return (
    <div className={`
      relative flex flex-col items-center select-none transition-all duration-300 hover:-translate-y-1.5 group
      ${rank === 1 ? "order-1 md:order-2 mb-8 md:mb-12" : rank === 2 ? "order-2 md:order-1" : "order-3 md:order-3"}
    `}>
      {/* Ground Shadow underneath the medal */}
      <div className="absolute -bottom-2 md:-bottom-3 left-1/2 -translate-x-1/2 w-[70%] h-3 md:h-4 bg-black/35 blur-[8px] rounded-full -z-10" />

      {/* Overlapping metallic chef hat for all podium ranks */}
      <div 
        className={`
          absolute z-30 pointer-events-none select-none left-1/2
          ${rank === 1 
            ? "w-[72px] h-[42px] md:w-[86px] md:h-[50px] -top-[74px] md:-top-[88px] -translate-x-[64%] rotate-[-6deg]" 
            : rank === 2
              ? "w-[60px] h-[35px] md:w-[72px] md:h-[42px] -top-[68px] md:-top-[80px] -translate-x-[64%] rotate-[-6deg]"
              : "w-[60px] h-[35px] md:w-[72px] md:h-[42px] -top-[68px] md:-top-[80px] -translate-x-[64%] rotate-[-6deg]"
          }
        `}
        style={{
          filter: rank === 1 
            ? "sepia(0.55) saturate(5.5) hue-rotate(15deg) brightness(1.05) contrast(1.05) drop-shadow(0 4px 6px rgba(0,0,0,0.18))"
            : rank === 2
              ? "grayscale(1) brightness(1.12) contrast(1.12) drop-shadow(0 4px 6px rgba(0,0,0,0.15))"
              : "sepia(0.85) saturate(4.2) hue-rotate(-22deg) brightness(0.88) contrast(1.08) drop-shadow(0 4px 6px rgba(0,0,0,0.15))"
        }}
      >
        <Image 
          src="/images/hat.png" 
          alt={`${rank === 1 ? "Gold" : rank === 2 ? "Silver" : "Bronze"} Chef Hat`} 
          width={344} 
          height={203} 
          className="w-full h-full object-contain"
          priority
        />
      </div>

      {/* Overlapping Circular Avatar */}
      <div className={`
        absolute -top-10 md:-top-12 z-20 ${avatarSize} rounded-full border-[4px] border-white bg-[#5D708B] flex items-end justify-center overflow-hidden shadow-md
        transition-transform duration-300 group-hover:scale-105
      `}>
        <svg viewBox="0 0 100 100" className="w-full h-full text-white" fill="currentColor">
          <circle cx="50" cy="38" r="18" />
          <path d="M 15,85 C 15,62 30,55 50,55 C 70,55 85,62 85,85 Z" />
        </svg>
      </div>

      {/* Medal Body */}
      <div 
        className={`
          ${sizeClass} rounded-full border-2 ${borderColors[rank]} bg-gradient-to-b ${metallicGradients[rank]} ${shadowClass}
          flex flex-col items-center justify-center pt-8 md:pt-10 px-4 relative overflow-hidden
        `}
      >
        {/* Subtle metallic shine sweep */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-out" />

        {/* Large Engraved Rank Number */}
        <span className={`font-bebas text-5xl md:text-6xl font-black opacity-[0.25] ${textColors[rank]} leading-none`}>
          {rank}
        </span>

        {/* Member Name Engraved In Bold */}
        <span className={`font-sans font-black text-sm md:text-base tracking-wider uppercase ${textColors[rank]} mt-1.5 md:mt-2.5 text-center truncate w-full`}>
          {name}
        </span>

        {/* 5-Star Rating directly below the name */}
        <div className="flex gap-0.5 mt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg 
              key={i} 
              viewBox="0 0 24 24" 
              fill={i < stars ? "currentColor" : "none"} 
              stroke="currentColor" 
              strokeWidth="1.5" 
              className={`w-3.5 h-3.5 md:w-4 md:h-4 ${i < stars ? textColors[rank] : "opacity-25 " + textColors[rank]}`}
            >
              <path d="M12 .587l3.668 7.431 8.2 1.191-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.209l8.2-1.191L12 .587z" />
            </svg>
          ))}
        </div>

        {/* Current Rating displayed underneath */}
        <span className={`font-mono font-bold text-xs md:text-sm tracking-wide opacity-80 ${textColors[rank]} mt-1.5 md:mt-2`}>
          Rating: {rating}
        </span>
      </div>
    </div>
  );
};


// Beam Dust particles component for realistic spotlight beam ambiance
const BeamDust = ({ count }: { count: number }) => {
  const particles = Array.from({ length: count }).map((_, i) => {
    const left = `${15 + (i * 15) % 60}%`;
    const top = `${10 + (i * 18) % 70}%`;
    const size = `${1.5 + (i % 2) * 1.5}px`;
    const delay = `${i * 0.8}s`;
    const duration = `${5 + (i % 3) * 2}s`;
    return { left, top, size, delay, duration };
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white/40 blur-[0.3px]"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animation: `beam-dust-drift ${p.duration} ease-in-out infinite`,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
};


// Component 1: LeaderboardHeader containing the top navigation links and the page heading.
function LeaderboardHeader() {
  return (
    <header className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-10 md:pt-14 flex flex-col gap-4 md:gap-5 z-10 relative">

      {/* Centered Hero Title with Premium Accent */}
      <div className="flex flex-col items-center justify-center w-full">
        {/* Premium Achievement Star Accent at the top */}
        <div className="flex items-center gap-3 text-[#ECE9C7] mb-1.5 opacity-95">
          <span className="text-xl sm:text-2xl font-bold tracking-widest">\\\</span>
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-[#F6D062] drop-shadow-[0_0_8px_rgba(246,208,98,0.5)]">
            <path d="M12 .587l3.668 7.431 8.2 1.191-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.209l8.2-1.191L12 .587z" />
          </svg>
          <span className="text-xl sm:text-2xl font-bold tracking-widest">{"///"}</span>
        </div>

        <h1 
          className="font-teko text-[clamp(3.25rem,15vw,8rem)] font-extrabold text-white tracking-wide sm:tracking-widest uppercase leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] text-center"
        >
          LEADERBOARD
        </h1>

        {/* Small uppercase text under title */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 w-full max-w-xl mx-auto mt-1 select-none">
          <div className="h-[2px] bg-white/20 flex-1" />
          <span className="text-yellow-400 text-sm">★</span>
          <span className="text-white text-[10px] sm:text-sm font-bold tracking-[0.12em] sm:tracking-[0.25em] uppercase text-center">
            Top Performers of CodeChef VIT Chennai
          </span>
          <span className="text-yellow-400 text-sm">★</span>
          <div className="h-[2px] bg-white/20 flex-1" />
        </div>
      </div>
    </header>
  );
}

// Component 2: PodiumSection organizing the top 3 players inside premium medals.
function PodiumSection({ topThree }: { topThree: Array<{ name: string; star: string; rating: string; maxRating: number }> }) {
  const p1 = topThree[0] || { name: "Name", star: "5", rating: "Current Rating", maxRating: 2150 };
  const p2 = topThree[1] || { name: "Name", star: "4", rating: "Current Rating", maxRating: 1980 };
  const p3 = topThree[2] || { name: "Name", star: "3", rating: "Current Rating", maxRating: 1810 };

  const getRating = (p: typeof p1) => {
    return p.rating === "Current Rating" ? String(p.maxRating) : p.rating;
  };

  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 mt-14 md:mt-16 mb-16 flex flex-col md:flex-row items-center md:items-end justify-center gap-10 md:gap-14 lg:gap-16 relative z-10">
      {/* Rank #2 (Silver Medal) */}
      <Medal 
        rank={2} 
        name={p2.name} 
        stars={parseInt(p2.star) || 4} 
        rating={getRating(p2)}
      />

      {/* Rank #1 (Gold Medal) */}
      <Medal 
        rank={1} 
        name={p1.name} 
        stars={parseInt(p1.star) || 5} 
        rating={getRating(p1)}
      />

      {/* Rank #3 (Bronze Medal) */}
      <Medal 
        rank={3} 
        name={p3.name} 
        stars={parseInt(p3.star) || 3} 
        rating={getRating(p3)}
      />
    </section>
  );
}

// Component 4: LeaderboardRow rendering a single table entry (without STARS).
function LeaderboardRow({ 
  rank,
  name, 
  rating, 
  problems,
  maxRating,
}: { 
  rank: number;
  name: string; 
  rating: string; 
  problems: number;
  maxRating: number;
}) {
  const rankColors = rank === 4 ? "bg-[#1E3A8A]" : rank === 5 ? "bg-[#334155]" : "bg-[#1E293B]";

  return (
    <div className="
      grid grid-cols-[auto_1fr_auto] sm:flex sm:justify-between items-center w-full rounded-lg border-2 border-black/85 px-3 sm:px-6 py-3 my-2.5 font-sans font-bold text-xs sm:text-sm transition-all duration-200 cursor-default hover:-translate-y-0.5 hover:scale-[1.002]
      bg-white text-black hover:bg-[#FAF8E8] shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]
    ">
      {/* Rank column */}
      <div className="w-auto sm:w-[10%] text-left flex items-center">
        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-black border-2 border-black text-white ${rankColors}`}>
          {rank}
        </div>
      </div>

      {/* Chef column */}
      <div className="min-w-0 w-full sm:w-[35%] text-left flex items-center gap-2 sm:gap-3">
        <div className="hidden sm:flex w-8 h-8 rounded-full border-2 border-black bg-[#5D708B] items-end justify-center overflow-hidden shadow-sm">
          <svg viewBox="0 0 100 100" className="w-full h-full text-white" fill="currentColor">
            <circle cx="50" cy="38" r="18" />
            <path d="M 15,85 C 15,62 30,55 50,55 C 70,55 85,62 85,85 Z" />
          </svg>
        </div>
        <span className="tracking-wide uppercase truncate max-w-[130px] sm:max-w-[180px]">{name}</span>
      </div>

      {/* Current Rating column */}
      <div className="w-auto sm:w-[20%] flex justify-end sm:justify-center items-center gap-1.5 font-mono text-xs sm:text-sm uppercase tracking-wide">
        <span>{rating}</span>
        <span className="text-red-500 animate-pulse hidden sm:inline">🔥</span>
      </div>

      {/* Problems Solved column */}
      <div className="col-start-2 mt-2 sm:mt-0 w-auto sm:w-[15%] flex justify-start sm:justify-center items-center gap-1.5 font-mono text-xs sm:text-sm tracking-wide text-neutral-700">
        <span className="text-blue-700 font-bold font-sans">{"{}"}</span>
        <span>{problems}</span>
      </div>

      {/* Max Rating column */}
      <div className="mt-2 sm:mt-0 w-auto sm:w-[10%] flex justify-end sm:justify-center font-mono text-xs sm:text-sm">
        {maxRating}
      </div>

      {/* Action / View Profile column */}
      <div className="col-span-3 sm:col-span-1 mt-3 sm:mt-0 w-full sm:w-[10%] flex justify-end">
        <button className="w-full sm:w-auto px-3.5 py-1.5 sm:py-1 rounded border-2 border-black font-sans font-bold shadow-[2px_2px_0px_rgba(0,0,0,1)] text-xs bg-[#1E3A8A] text-white hover:bg-blue-800 transition-colors">
          View
        </button>
      </div>
    </div>
  );
}

// Component 5: LeaderboardTable placing the large cream-colored panel and rendering player rows (without STARS).
function LeaderboardTable({ rows }: { rows: Array<{ name: string; star: string; rating: string; isTopThree: boolean; problems: number; maxRating: number }> }) {
  const tableRows = rows.slice(3);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 mb-24 relative z-10">
      
      {/* 3D-styled Plaque Banner: LEADERBOARD STANDINGS */}
      <div className="
        absolute -top-6 left-1/2 -translate-x-1/2 
        bg-gradient-to-b from-[#1E40AF] via-[#1E3A8A] to-[#172554] 
        text-[#F8FAFC] border-[3px] border-black rounded px-4 sm:px-8 py-2.5 
        font-bebas text-base sm:text-xl tracking-wider sm:tracking-widest 
        shadow-[6px_6px_0px_rgba(0,0,0,1),_inset_0_2px_0px_rgba(255,255,255,0.4),_inset_0_-2px_0px_rgba(0,0,0,0.4)]
        flex items-center justify-center gap-2 sm:gap-3.5 z-30 select-none whitespace-nowrap
        border-t-[#3B82F6] border-b-[#0F172A]
      ">
        {/* Left gold rivet screw */}
        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#FFE07D] to-[#8A6F1C] border border-black shadow-[1px_1px_0px_rgba(0,0,0,0.5)] -ml-4 mr-2" />

        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#FFE07D] drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.4)]">
          <path d="M12 .587l3.668 7.431 8.2 1.191-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.209l8.2-1.191L12 .587z" />
        </svg>
        <span className="drop-shadow-[0_2px_3px_rgba(0,0,0,0.6)] font-extrabold">LEADERBOARD STANDINGS</span>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#FFE07D] drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.4)]">
          <path d="M12 .587l3.668 7.431 8.2 1.191-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.209l8.2-1.191L12 .587z" />
        </svg>

        {/* Right gold rivet screw */}
        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#FFE07D] to-[#8A6F1C] border border-black shadow-[1px_1px_0px_rgba(0,0,0,0.5)] -mr-4 ml-2" />
      </div>

      {/* Cream Card Panel Container with enhanced 3D shadow */}
      <div className="relative bg-[#F7F0DC] border-[3px] border-black p-3 sm:p-8 rounded-lg shadow-[8px_8px_0px_rgba(0,0,0,1)] sm:shadow-[12px_12px_0px_rgba(0,0,0,1)] pt-10 border-t-white/20 border-l-white/20">
        
        {/* Metal L-Shaped Corner Brackets */}
        {/* Top-Left */}
        <div className="absolute -top-3.5 -left-3.5 w-12 h-12 pointer-events-none z-30 select-none">
          <svg viewBox="0 0 40 40" fill="none" className="w-full h-full drop-shadow-[2px_2px_4px_rgba(0,0,0,0.6)]">
            <path d="M0 0 H40 V12 H12 V40 H0 Z" fill="#2E3A4E" stroke="#000000" strokeWidth="2.5" />
            <circle cx="6" cy="6" r="3" fill="#94A3B8" stroke="#000000" strokeWidth="1.5" />
            <circle cx="26" cy="6" r="3" fill="#94A3B8" stroke="#000000" strokeWidth="1.5" />
            <circle cx="6" cy="26" r="3" fill="#94A3B8" stroke="#000000" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Top-Right */}
        <div className="absolute -top-3.5 -right-3.5 w-12 h-12 pointer-events-none z-30 select-none">
          <svg viewBox="0 0 40 40" fill="none" className="w-full h-full drop-shadow-[2px_2px_4px_rgba(0,0,0,0.6)]">
            <path d="M40 0 H0 V12 H28 V40 H40 Z" fill="#2E3A4E" stroke="#000000" strokeWidth="2.5" />
            <circle cx="34" cy="6" r="3" fill="#94A3B8" stroke="#000000" strokeWidth="1.5" />
            <circle cx="14" cy="6" r="3" fill="#94A3B8" stroke="#000000" strokeWidth="1.5" />
            <circle cx="34" cy="26" r="3" fill="#94A3B8" stroke="#000000" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Bottom-Left */}
        <div className="absolute -bottom-3.5 -left-3.5 w-12 h-12 pointer-events-none z-30 select-none">
          <svg viewBox="0 0 40 40" fill="none" className="w-full h-full drop-shadow-[2px_2px_4px_rgba(0,0,0,0.6)]">
            <path d="M0 40 H40 V28 H12 V0 H0 Z" fill="#2E3A4E" stroke="#000000" strokeWidth="2.5" />
            <circle cx="6" cy="34" r="3" fill="#94A3B8" stroke="#000000" strokeWidth="1.5" />
            <circle cx="26" cy="34" r="3" fill="#94A3B8" stroke="#000000" strokeWidth="1.5" />
            <circle cx="6" cy="14" r="3" fill="#94A3B8" stroke="#000000" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Bottom-Right */}
        <div className="absolute -bottom-3.5 -right-3.5 w-12 h-12 pointer-events-none z-30 select-none">
          <svg viewBox="0 0 40 40" fill="none" className="w-full h-full drop-shadow-[2px_2px_4px_rgba(0,0,0,0.6)]">
            <path d="M40 40 H0 V28 H28 V0 H40 Z" fill="#2E3A4E" stroke="#000000" strokeWidth="2.5" />
            <circle cx="34" cy="34" r="3" fill="#94A3B8" stroke="#000000" strokeWidth="1.5" />
            <circle cx="14" cy="34" r="3" fill="#94A3B8" stroke="#000000" strokeWidth="1.5" />
            <circle cx="34" cy="14" r="3" fill="#94A3B8" stroke="#000000" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Table Header Row */}
        <div className="hidden sm:flex justify-between items-center w-full bg-white border-2 border-black rounded-lg px-6 py-2.5 mb-4 font-sans font-bold text-xs sm:text-sm text-neutral-600 shadow-sm uppercase tracking-wider select-none">
          <span className="w-[10%] text-left">RANK</span>
          <span className="w-[35%] text-left">MEMBER</span>
          <span className="w-[20%] text-center">CURRENT RATING</span>
          <span className="w-[15%] text-center">PROBLEMS SOLVED</span>
          <span className="w-[10%] text-center">MAX RATING</span>
          <span className="w-[10%] text-right">PROFILE</span>
        </div>

        {/* Table Rows with Stagger Animation */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="flex flex-col gap-1"
        >
          {tableRows.map((row, index) => (
            <motion.div key={index} variants={rowVariants}>
              <LeaderboardRow 
                rank={index + 4}
                name={row.name} 
                rating={row.rating} 
                problems={row.problems}
                maxRating={row.maxRating}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Main Page Component
export default function LeaderboardPage() {
  // Generate 15 wavy background paths dynamically to cover the entire page scroll height
  const backgroundPaths = Array.from({ length: 15 }, (_, i) => {
    const yBase = i * 420 + 80;
    const isEven = i % 2 === 0;
    return isEven
      ? `M -100,${yBase} Q 300,${yBase - 50} 800,${yBase + 20} T 1900,${yBase - 20}`
      : `M -100,${yBase} Q 400,${yBase + 100} 900,${yBase - 50} T 2100,${yBase + 50}`;
  });

  const rows = [
    { name: "Name", star: "5", rating: "Current Rating", isTopThree: true, problems: 954, maxRating: 2150 },
    { name: "Name", star: "4", rating: "Current Rating", isTopThree: true, problems: 885, maxRating: 1980 },
    { name: "Name", star: "3", rating: "Current Rating", isTopThree: true, problems: 742, maxRating: 1810 },
    { name: "Name", star: "4", rating: "1876", isTopThree: false, problems: 845, maxRating: 2013 },
    { name: "Name", star: "4", rating: "1823", isTopThree: false, problems: 742, maxRating: 1950 },
    { name: "Name", star: "3", rating: "1689", isTopThree: false, problems: 615, maxRating: 1760 },
    { name: "Name", star: "3", rating: "1587", isTopThree: false, problems: 590, maxRating: 1690 },
    { name: "Name", star: "3", rating: "1542", isTopThree: false, problems: 533, maxRating: 1623 },
    { name: "Name", star: "3", rating: "1480", isTopThree: false, problems: 495, maxRating: 1540 },
    { name: "Name", star: "3", rating: "1420", isTopThree: false, problems: 410, maxRating: 1480 },
  ];

  const [curtainsOpened, setCurtainsOpened] = React.useState(false);
  const [showLights, setShowLights] = React.useState(false);

  React.useEffect(() => {
    // Start curtain opening after a brief delay
    const curtainTimer = setTimeout(() => {
      setCurtainsOpened(true);
    }, 300);

    // Turn on spotlights after 1.2s
    const lightsTimer = setTimeout(() => {
      setShowLights(true);
    }, 1200);

    return () => {
      clearTimeout(curtainTimer);
      clearTimeout(lightsTimer);
    };
  }, []);

  return (
    <main className="w-full min-h-screen bg-[#5878AF] relative flex flex-col items-center pt-4 overflow-hidden select-none">
      
      {/* Left Curtain drapes open */}
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: curtainsOpened ? "-100%" : "0%" }}
        transition={{ duration: 2.2, ease: [0.25, 1, 0.5, 1] }}
        className="fixed inset-y-0 left-0 w-[50vw] z-50 pointer-events-none border-r-[6px] border-yellow-500 shadow-[10px_0_30px_rgba(0,0,0,0.6)]"
        style={{
          background: "repeating-linear-gradient(90deg, #500 0px, #700 30px, #900 60px, #700 90px, #500 120px)",
        }}
      >
        {/* Gold tassel cord */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-32 bg-[#D4AF37] border-2 border-black rounded shadow" />
      </motion.div>

      {/* Right Curtain drapes open */}
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: curtainsOpened ? "100%" : "0%" }}
        transition={{ duration: 2.2, ease: [0.25, 1, 0.5, 1] }}
        className="fixed inset-y-0 right-0 w-[50vw] z-50 pointer-events-none border-l-[6px] border-yellow-500 shadow-[-10px_0_30px_rgba(0,0,0,0.6)]"
        style={{
          background: "repeating-linear-gradient(90deg, #500 0px, #700 30px, #900 60px, #700 90px, #500 120px)",
        }}
      >
        {/* Gold tassel cord */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-32 bg-[#D4AF37] border-2 border-black rounded shadow" />
      </motion.div>

      {/* Top Left Spotlight Fixture & Beam */}
      <div className="absolute top-0 left-0 z-40 pointer-events-none">
        <svg 
          viewBox="0 0 100 100" 
          className="w-24 h-24 text-[#111111] drop-shadow-2xl m-4"
          style={{ transform: "rotate(-45deg)", transformOrigin: "50% 15%" }}
        >
          {/* Spotlight mounting yoke */}
          <path d="M15 15 H85 V22 H15 Z" fill="#222222" stroke="#000" strokeWidth="1.5" />
          <path d="M30 22 V45 C30 55 70 55 70 45 V22" fill="none" stroke="#222222" strokeWidth="4" />
          {/* Matte black cylindrical body */}
          <rect x="35" y="25" width="30" height="46" rx="4" fill="#1A1A1A" stroke="#000" strokeWidth="2" />
          {/* Rear cooling fin cap */}
          <rect x="38" y="20" width="24" height="6" rx="1.5" fill="#0D0D0D" stroke="#000" strokeWidth="1.5" />
          {/* Warm white lens */}
          <ellipse cx="50" cy="70" rx="12" ry="4" fill="#FFF8E6" />
        </svg>
        {/* Soft, semi-transparent warm white light beam with feathered edges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showLights ? 1 : 0 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="absolute top-[68px] left-[-174px] md:left-[-274px] w-[550px] md:w-[750px] h-[950px] md:h-[1250px] bg-gradient-to-b from-[#FFF8E6]/24 via-[#FFF8E6]/4.5 to-transparent blur-[22px] -z-10"
          style={{ transform: "rotate(-45deg)", transformOrigin: "50% 0%", clipPath: "polygon(48% 0%, 52% 0%, 100% 100%, 0% 100%)" }}
        >
          {/* Dust particles inside the beam path */}
          <BeamDust count={6} />
        </motion.div>
      </div>

      {/* Top Right Spotlight Fixture & Beam */}
      <div className="absolute top-0 right-0 z-40 pointer-events-none">
        <svg 
          viewBox="0 0 100 100" 
          className="w-24 h-24 text-[#111111] drop-shadow-2xl m-4"
          style={{ transform: "rotate(45deg)", transformOrigin: "50% 15%" }}
        >
          {/* Spotlight mounting yoke */}
          <path d="M15 15 H85 V22 H15 Z" fill="#222222" stroke="#000" strokeWidth="1.5" />
          <path d="M30 22 V45 C30 55 70 55 70 45 V22" fill="none" stroke="#222222" strokeWidth="4" />
          {/* Matte black cylindrical body */}
          <rect x="35" y="25" width="30" height="46" rx="4" fill="#1A1A1A" stroke="#000" strokeWidth="2" />
          {/* Rear cooling fin cap */}
          <rect x="38" y="20" width="24" height="6" rx="1.5" fill="#0D0D0D" stroke="#000" strokeWidth="1.5" />
          {/* Warm white lens */}
          <ellipse cx="50" cy="70" rx="12" ry="4" fill="#FFF8E6" />
        </svg>
        {/* Soft, semi-transparent warm white light beam with feathered edges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showLights ? 1 : 0 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="absolute top-[68px] right-[-174px] md:right-[-274px] w-[550px] md:w-[750px] h-[950px] md:h-[1250px] bg-gradient-to-b from-[#FFF8E6]/24 via-[#FFF8E6]/4.5 to-transparent blur-[22px] -z-10"
          style={{ transform: "rotate(45deg)", transformOrigin: "50% 0%", clipPath: "polygon(48% 0%, 52% 0%, 100% 100%, 0% 100%)" }}
        >
          {/* Dust particles inside the beam path */}
          <BeamDust count={6} />
        </motion.div>
      </div>

      {/* Dynamic Keyframe Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes beam-dust-drift {
          0% { transform: translateY(0px) translateX(0px); opacity: 0; }
          25% { opacity: 0.6; }
          75% { opacity: 0.6; }
          100% { transform: translateY(120px) translateX(15px); opacity: 0; }
        }
      `}} />

      {/* Dashed curved paths in the background */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
        {backgroundPaths.map((d, idx) => (
          <path 
            key={idx}
            d={d} 
            fill="none" 
            stroke="white" 
            strokeWidth="4" 
            strokeDasharray="12 12" 
            strokeOpacity="0.3"
          />
        ))}
      </svg>

      {/* Header bar and large title */}
      <LeaderboardHeader />

      {/* Premium Achievement Medals Section */}
      <div className="relative w-full max-w-5xl mx-auto z-10 select-none mt-12 mb-16">
        <PodiumSection topThree={rows.slice(0, 3)} />
      </div>

      {/* Leaderboard Table Grid Panel */}
      <div className="relative w-full z-10 -mt-2">
        <LeaderboardTable rows={rows} />
      </div>

      {/* Page Footer */}
      <Footer />
    </main>
  );
}
