"use client";

import React from "react";
import Link from "next/link";
import Footer from "@/components/Footer/Footer";
import { motion } from "framer-motion";

// Inline SVG components for absolute pixel control and consistent display without external image loading dependencies.

// 1. ChefHat component representing the black chef hat images for 1st, 2nd, and 3rd place loaded from public/images.
const ChefHat = ({ rank }: { rank: number }) => {
  const src = rank === 1 
    ? "/images/Group 163 (1).png" 
    : rank === 2 
      ? "/images/Group 163.png" 
      : "/images/Group 163 (2).png";
  
  // Target orientation and translation to center above the avatar's head naturally
  const transformClass = rank === 1 
    ? "rotate-0 translate-y-[4px]" 
    : rank === 2 
      ? "rotate-[-12deg] -translate-x-[20px] translate-y-[6px]" 
      : "rotate-[12deg] translate-x-[20px] translate-y-[6px]";
  
  return (
    <img 
      src={src} 
      alt={`Chef hat for Rank #${rank}`} 
      className={`w-28 h-20 object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)] ${transformClass}`}
    />
  );
};

// 2. Avatar component showing a generic head and shoulders placeholder inside a circle with a white outline.
const Avatar = ({ rank }: { rank: number }) => {
  const size = rank === 1 ? "w-24 h-24 sm:w-28 sm:h-28" : "w-20 h-20 sm:w-24 sm:h-24";
  return (
    <div className={`relative ${size} rounded-full border-[5px] border-white bg-[#5D708B] flex items-end justify-center overflow-hidden shadow-lg`}>
      <svg viewBox="0 0 100 100" className="w-full h-full text-white" fill="currentColor">
        {/* Head */}
        <circle cx="50" cy="38" r="18" />
        {/* Shoulders */}
        <path d="M 15,85 C 15,62 30,55 50,55 C 70,55 85,62 85,85 Z" />
      </svg>
    </div>
  );
};

// 3. StarIcon for rendering rating stars.
const StarIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" fill={color} className="w-4 h-4 sm:w-5 sm:h-5">
    <path d="M12 .587l3.668 7.431 8.2 1.191-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.209l8.2-1.191L12 .587z" />
  </svg>
);

// Component 1: LeaderboardHeader containing the top navigation links and the page heading.
function LeaderboardHeader() {
  return (
    <header className="w-full max-w-6xl mx-auto px-6 pt-6 flex flex-col gap-6 md:gap-10 z-10 relative">
      {/* Centered Top Navigation Bar */}
      <div className="flex justify-center items-center w-full">
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-white font-sans font-bold text-xs tracking-widest">
            <Link href="/home" className="hover:opacity-80 transition-opacity">HOME</Link>
            <Link href="/events" className="hover:opacity-80 transition-opacity">EVENTS</Link>
            <Link href="/blogs" className="hover:opacity-80 transition-opacity">BLOGS</Link>
            <Link href="/team" className="hover:opacity-80 transition-opacity">OUR TEAM</Link>
            <Link href="/leaderboard" className="bg-black text-white px-5 py-2.5 rounded-lg border border-white/10 hover:bg-[#1a1a1a] transition-colors">
              LEADERBOARD
            </Link>
          </nav>

          {/* Hamburger Menu Icon */}
          <button className="text-white hover:opacity-80 p-1" aria-label="Menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-8 h-8">
              <line x1="4" y1="6" x2="20" y2="6" strokeLinecap="round" />
              <line x1="4" y1="12" x2="20" y2="12" strokeLinecap="round" />
              <line x1="4" y1="18" x2="20" y2="18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Centered Hero Title */}
      <div className="flex justify-center w-full">
        <h1 
          className="font-teko text-7xl sm:text-8xl md:text-9xl font-extrabold text-white tracking-widest uppercase leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] text-center"
        >
          LEADERBOARD
        </h1>
      </div>
    </header>
  );
}

// Component 2: PodiumCard rendering a single player on the podium.
function PodiumCard({ 
  rank, 
  name, 
  glowClass, 
  starColor, 
  isCenter = false 
}: { 
  rank: 1 | 2 | 3; 
  name: string; 
  glowClass: string; 
  starColor: string; 
  isCenter?: boolean; 
}) {
  const bobDuration = 3 + rank * 0.4;
  const bobDelay = rank * 0.25;

  return (
    <div className={`
      relative flex flex-col items-center z-10
      ${isCenter ? 'order-1 md:order-2 scale-105 md:scale-110 mb-6' : rank === 2 ? 'order-2 md:order-1' : 'order-3 md:order-3'}
    `}>
      {/* Background Glow */}
      <div className={`absolute w-40 h-40 rounded-full blur-3xl opacity-50 -z-10 ${glowClass}`} />

      {/* Chef Hat floating above the avatar */}
      <motion.div
        animate={{
          y: [0, -5, 0],
          rotate: rank === 1 ? [0, 1.5, -1.5, 0] : rank === 2 ? [-12, -10, -14, -12] : [12, 14, 10, 12],
        }}
        transition={{
          duration: bobDuration,
          delay: bobDelay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative mb-1.5 z-30 transition-transform duration-300 hover:scale-105"
      >
        <ChefHat rank={rank} />
      </motion.div>

      {/* Circular Avatar Placeholder */}
      <motion.div
        animate={{
          y: [0, -3.5, 0],
        }}
        transition={{
          duration: bobDuration,
          delay: bobDelay + 0.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative -mb-4.5 z-20"
      >
        <Avatar rank={rank} />
      </motion.div>

      {/* Stepped Pedestal Box (2D Hand-drawn aesthetic) */}
      <div className={`
        relative flex flex-col items-center justify-center
        bg-[#F6F4D8] border-4 border-black
        shadow-[6px_6px_0px_rgba(0,0,0,1)]
        z-10
        ${isCenter ? 'h-36 w-36 sm:w-40' : rank === 2 ? 'h-24 w-32 sm:w-36' : 'h-16 w-32 sm:w-36'}
      `}>
        {/* Subtle Corner brackets inside the pedestal for retro look */}
        <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-black/40 pointer-events-none" />
        <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-black/40 pointer-events-none" />
        <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-black/40 pointer-events-none" />
        <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-black/40 pointer-events-none" />

        <div className="flex flex-col items-center justify-center h-full">
          {/* Rank Number */}
          <span className={`font-teko text-5xl sm:text-6xl leading-none font-bold ${rank === 1 ? 'text-[#EAB308]' : rank === 2 ? 'text-neutral-500' : 'text-amber-700'}`}>
            {rank}
          </span>
          {/* Name Placeholder */}
          <span className="font-bebas text-sm sm:text-base tracking-widest text-black/60 uppercase leading-none mt-1">
            {name}
          </span>
          {/* Rating Placeholder */}
          <span className="font-sans text-[10px] tracking-wider text-black/40 font-black mt-0.5">
            —
          </span>
        </div>
      </div>
    </div>
  );
}

// Component 3: PodiumSection organizing the top 3 players horizontally.
function PodiumSection() {
  return (
    <section className="w-full max-w-4xl mx-auto px-6 mt-8 mb-16 flex flex-col md:flex-row items-center md:items-end justify-center gap-10 md:gap-12 lg:gap-16">
      {/* Rank #2 (Left Card: Silver glow, silver/white stars) */}
      <PodiumCard 
        rank={2} 
        name="—" 
        glowClass="bg-slate-300/40" 
        starColor="#E2E8F0" 
      />

      {/* Rank #1 (Center Card: Yellow glow, yellow stars) */}
      <PodiumCard 
        rank={1} 
        name="—" 
        glowClass="bg-yellow-400/50" 
        starColor="#EAB308" 
        isCenter={true} 
      />

      {/* Rank #3 (Right Card: Bronze glow, bronze/copper stars) */}
      <PodiumCard 
        rank={3} 
        name="—" 
        glowClass="bg-orange-600/35" 
        starColor="#92400E" 
      />
    </section>
  );
}

// Component 4: LeaderboardRow rendering a single table entry with retro styling.
function LeaderboardRow({ 
  rank,
  name, 
  star, 
  rating, 
  isTopThree 
}: { 
  rank: number;
  name: string; 
  star: string; 
  rating: string; 
  isTopThree: boolean; 
}) {
  const cardBg = isTopThree ? 'bg-black text-white hover:bg-neutral-950' : 'bg-[#F6F4D8] text-black hover:bg-[#eae3c4]';
  const baseShadow = isTopThree ? 'shadow-[4px_4px_0px_rgba(255,255,255,0.2)]' : 'shadow-[4px_4px_0px_rgba(0,0,0,1)]';
  const hoverShadow = isTopThree ? 'hover:shadow-[6px_6px_0px_rgba(255,255,255,0.3)]' : 'hover:shadow-[6px_6px_0px_rgba(0,0,0,1)]';

  // Star badge colors based on CodeChef star rating levels
  const starColors = [
    "bg-red-500 text-white",     // 1-2 Star
    "bg-orange-500 text-white",  // 3 Star
    "bg-yellow-400 text-black",  // 4 Star
    "bg-emerald-500 text-white", // 5 Star
    "bg-blue-500 text-white",    // 6 Star
    "bg-purple-500 text-white"   // 7 Star
  ];
  const starCount = parseInt(star);
  const starBadgeStyle = !isNaN(starCount)
    ? starColors[Math.min(starCount - 1, starColors.length - 1)]
    : "bg-neutral-300 text-neutral-500";

  const ratingBg = rating === "—"
    ? "bg-neutral-300 text-neutral-500"
    : "bg-[#113B8D] text-white";

  return (
    <div className={`
      flex justify-between items-center w-full rounded-lg border-[3px] border-black px-4 sm:px-6 py-3 my-2.5 font-sans font-bold text-xs sm:text-sm transition-all duration-200 cursor-default hover:-translate-y-0.5
      ${cardBg} ${baseShadow} ${hoverShadow}
    `}>
      {/* Left: Rank & Name */}
      <div className="flex items-center gap-3 sm:gap-4 w-1/3 text-left">
        <div className={`
          w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-black border-2 border-black
          ${isTopThree ? 'bg-[#EAB308] text-black border-white/20' : 'bg-black text-white'}
        `}>
          {rank}
        </div>
        <span className="tracking-wide uppercase truncate max-w-[100px] sm:max-w-[180px]">{name}</span>
      </div>

      {/* Center: Stars Badge */}
      <div className="w-1/3 flex justify-center">
        <div className={`
          flex items-center gap-1 px-3 py-1 rounded border-2 border-black text-xs font-extrabold uppercase shadow-[2px_2px_0px_rgba(0,0,0,1)]
          ${starBadgeStyle}
        `}>
          <span>{star}</span>
        </div>
      </div>

      {/* Right: Rating Badge */}
      <div className="w-1/3 flex justify-end">
        <div className={`px-3.5 py-1 rounded-md border-2 border-black font-mono shadow-[2.5px_2.5px_0px_rgba(0,0,0,1)] text-xs sm:text-sm ${ratingBg}`}>
          {rating}
        </div>
      </div>
    </div>
  );
}

// Component 5: LeaderboardTable placing the large cream-colored panel and rendering player rows.
function LeaderboardTable() {
  const rows = [
    { name: "—", star: "—", rating: "—", isTopThree: true },
    { name: "—", star: "—", rating: "—", isTopThree: true },
    { name: "—", star: "—", rating: "—", isTopThree: true },
    { name: "—", star: "—", rating: "—", isTopThree: false },
    { name: "—", star: "—", rating: "—", isTopThree: false },
    { name: "—", star: "—", rating: "—", isTopThree: false },
    { name: "—", star: "—", rating: "—", isTopThree: false },
    { name: "—", star: "—", rating: "—", isTopThree: false },
    { name: "—", star: "—", rating: "—", isTopThree: false },
    { name: "—", star: "—", rating: "—", isTopThree: false },
  ];

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
    <section className="w-full max-w-4xl mx-auto px-6 mb-24 relative z-10">
      {/* Cream Card Panel Container */}
      <div className="relative bg-[#F5F0D8] border-4 border-black p-4 sm:p-8 rounded-[4px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        
        {/* Retro Crosshair Corner Brackets */}
        {/* Top-Left */}
        <div className="absolute -top-1 -left-2.5 w-8 h-[2px] bg-black pointer-events-none" />
        <div className="absolute -top-2.5 -left-1 w-[2px] h-8 bg-black pointer-events-none" />
        
        {/* Top-Right */}
        <div className="absolute -top-1 -right-2.5 w-8 h-[2px] bg-black pointer-events-none" />
        <div className="absolute -top-2.5 -right-1 w-[2px] h-8 bg-black pointer-events-none" />
        
        {/* Bottom-Left */}
        <div className="absolute -bottom-1 -left-2.5 w-8 h-[2px] bg-black pointer-events-none" />
        <div className="absolute -bottom-2.5 -left-1 w-[2px] h-8 bg-black pointer-events-none" />
        
        {/* Bottom-Right */}
        <div className="absolute -bottom-1 -right-2.5 w-8 h-[2px] bg-black pointer-events-none" />
        <div className="absolute -bottom-2.5 -right-1 w-[2px] h-8 bg-black pointer-events-none" />

        {/* Table Header Row */}
        <div className="flex justify-between items-center w-full bg-white border-2 border-black rounded-full px-6 py-3 mb-6 font-sans font-bold text-xs sm:text-sm text-black shadow-sm">
          <span className="w-1/3 text-left tracking-wider">NAME</span>
          <span className="w-1/3 text-center tracking-wider">STAR</span>
          <span className="w-1/3 text-right tracking-wider">CURRENT RATING</span>
        </div>

        {/* Table Rows with Stagger Animation */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="flex flex-col gap-1"
        >
          {rows.map((row, index) => (
            <motion.div key={index} variants={rowVariants}>
              <LeaderboardRow 
                rank={index + 1}
                name={row.name} 
                star={row.star} 
                rating={row.rating} 
                isTopThree={row.isTopThree} 
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

  return (
    <main className="w-full min-h-screen bg-[#5878AF] relative flex flex-col items-center pt-4 overflow-hidden select-none">
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

      {/* Top 3 Podium Section */}
      <PodiumSection />

      {/* Leaderboard Table Grid Panel */}
      <LeaderboardTable />

      {/* Page Footer */}
      <Footer />
    </main>
  );
}
