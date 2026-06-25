"use client";

import React from "react";
import Link from "next/link";
import Footer from "@/components/Footer/Footer";

// Inline SVG components for absolute pixel control and consistent display without external image loading dependencies.

// 1. ChefHat component representing the black chef hat images for 1st, 2nd, and 3rd place loaded from public/images.
const ChefHat = ({ rank }: { rank: number }) => {
  const src = rank === 1 
    ? "/images/Group 163 (1).png" 
    : rank === 2 
      ? "/images/Group 163.png" 
      : "/images/Group 163 (2).png";
  
  return (
    <img 
      src={src} 
      alt={`Chef hat for Rank #${rank}`} 
      className="w-28 h-20 object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]"
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
  return (
    <div className={`
      relative flex flex-col items-center z-10
      ${isCenter ? 'order-1 md:order-2 scale-105 md:scale-110 mb-6' : rank === 2 ? 'order-2 md:order-1' : 'order-3 md:order-3'}
    `}>
      {/* Background Glow */}
      <div className={`absolute w-40 h-40 rounded-full blur-3xl opacity-50 -z-10 ${glowClass}`} />

      {/* Chef Hat floating above the avatar */}
      <div className="mb-2 transition-transform duration-300 hover:-translate-y-1">
        <ChefHat rank={rank} />
      </div>

      {/* Circular Avatar Placeholder */}
      <div className="relative mb-3 z-10">
        <Avatar rank={rank} />
      </div>

      {/* Black Podium Base formed by base2.png (lid) and base1.png (cylinder body) */}
      <div className={`
        relative flex flex-col items-center -mt-4 z-20
        ${isCenter ? 'w-56' : 'w-48'}
      `}>
        {/* base2: Top Lid */}
        <img 
          src="/images/base2.png" 
          alt="Podium Top" 
          className="w-full object-contain relative z-30"
        />
        
        {/* base1: Cylinder Body */}
        <div className="w-full relative -mt-[9%] z-20">
          <img 
            src="/images/base1.png" 
            alt="Podium Base" 
            className="w-full object-contain"
          />
          
          {/* Overlay Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pb-2 pt-4">
            {/* NAME */}
            <span className="font-bebas text-lg sm:text-xl tracking-widest text-white uppercase leading-none">
              {name}
            </span>
            
            {/* Five stars */}
            <div className="flex gap-0.5 mt-2">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} color={starColor} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Component 3: PodiumSection organizing the top 3 players horizontally.
function PodiumSection() {
  return (
    <section className="w-full max-w-4xl mx-auto px-6 mt-8 mb-16 flex flex-col md:flex-row items-center md:items-end justify-center gap-10 md:gap-12 lg:gap-16">
      {/* Rank #2 (Left Card: Neutral glow, silver/white stars) */}
      <PodiumCard 
        rank={2} 
        name="Gowreesh VT" 
        glowClass="bg-blue-300/40" 
        starColor="#E2E8F0" 
      />

      {/* Rank #1 (Center Card: Yellow glow, yellow stars) */}
      <PodiumCard 
        rank={1} 
        name="Shivansh Kumar" 
        glowClass="bg-yellow-400/50" 
        starColor="#EAB308" 
        isCenter={true} 
      />

      {/* Rank #3 (Right Card: Bronze glow, bronze/copper stars) */}
      <PodiumCard 
        rank={3} 
        name="Divyabanu S" 
        glowClass="bg-rose-400/30" 
        starColor="#92400E" 
      />
    </section>
  );
}

// Component 4: LeaderboardRow rendering a single table entry with alternating dark/gray colors.
function LeaderboardRow({ 
  name, 
  star, 
  rating, 
  isTopThree 
}: { 
  name: string; 
  star: string; 
  rating: string; 
  isTopThree: boolean; 
}) {
  const bgClass = isTopThree ? 'bg-black text-white hover:bg-neutral-950' : 'bg-[#4B6584] text-white hover:bg-[#3d526b]';
  
  return (
    <div className={`
      flex justify-between items-center w-full rounded-full border-[2.5px] border-black px-6 py-3 my-1.5 font-sans font-bold text-xs sm:text-sm shadow-md transition-transform hover:scale-[1.01] duration-200 cursor-default
      ${bgClass}
    `}>
      <span className="w-1/3 text-left tracking-wide">{name}</span>
      <span className="w-1/3 text-center tracking-wide">{star}</span>
      <span className="w-1/3 text-right tracking-wide">{rating}</span>
    </div>
  );
}

// Component 5: LeaderboardTable placing the large cream-colored panel and rendering placeholder rows.
function LeaderboardTable() {
  const rows = [
    { name: "Shivansh Kumar", star: "5 ★", rating: "2840", isTopThree: true },
    { name: "Gowreesh VT", star: "5 ★", rating: "2720", isTopThree: true },
    { name: "Divyabanu S", star: "5 ★", rating: "2690", isTopThree: true },
    { name: "Aryan Gupta", star: "4 ★", rating: "2480", isTopThree: false },
    { name: "Anmay Dev", star: "4 ★", rating: "2410", isTopThree: false },
    { name: "Shashank Sharma", star: "4 ★", rating: "2390", isTopThree: false },
    { name: "Aaditya Prabhu", star: "3 ★", rating: "1980", isTopThree: false },
    { name: "Vishal Kumar Yadav", star: "3 ★", rating: "1870", isTopThree: false },
    { name: "Sairam Sundar", star: "3 ★", rating: "1850", isTopThree: false },
    { name: "Rahul Singh", star: "2 ★", rating: "1540", isTopThree: false },
  ];

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

        {/* Table Rows */}
        <div className="flex flex-col gap-1">
          {rows.map((row, index) => (
            <LeaderboardRow 
              key={index} 
              name={row.name} 
              star={row.star} 
              rating={row.rating} 
              isTopThree={row.isTopThree} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Main Page Component
export default function LeaderboardPage() {
  return (
    <main className="w-full min-h-screen bg-[#5878AF] relative flex flex-col items-center pt-4 overflow-hidden select-none">
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
