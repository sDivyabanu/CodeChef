"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer/Footer";
import Board from "@/sections/team/Board";
import Departments from "@/sections/team/Departments";

// Reusable Corner Brackets component for that handcrafted / blueprint design aesthetic
const CornerBrackets = ({ color = "#000000" }: { color?: string }) => (
  <>
    <div style={{ borderColor: color }} className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-[2.5px] border-l-[2.5px] pointer-events-none" />
    <div style={{ borderColor: color }} className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-[2.5px] border-r-[2.5px] pointer-events-none" />
    <div style={{ borderColor: color }} className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-[2.5px] border-l-[2.5px] pointer-events-none" />
    <div style={{ borderColor: color }} className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-[2.5px] border-r-[2.5px] pointer-events-none" />
  </>
);

const PRESIDENTS = [
  {
    name: "—",
    year: "President (2026-27)",
    vision: "Leading CodeChef into a new era of technical innovation, making hackathons more accessible and competitive coding a standard across departments.",
  },
  {
    name: "—",
    year: "President (2025-26)",
    vision: "Leading CodeChef into a new era of technical innovation, making hackathons more accessible and competitive coding a standard across departments.",
  },
  {
    name: "—",
    year: "President (2024-25)",
    vision: "Established peer learning groups and expanded our web projects repository to help junior members build real-world applications.",
  },
  {
    name: "—",
    year: "President (2023-24)",
    vision: "Organized major workshops on React & Python, laying a solid foundation for Vit Chennai's programming culture.",
  },
];

function LeadershipBoard() {
  const [presIndex, setPresIndex] = useState(0);

  const prevPres = () => {
    setPresIndex((prev) => (prev === 0 ? PRESIDENTS.length - 1 : prev - 1));
  };

  const nextPres = () => {
    setPresIndex((prev) => (prev === PRESIDENTS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 mb-24 relative z-10">
      {/* Title */}
      <div className="flex justify-center mb-8">
        <h2 className="font-teko text-4xl sm:text-6xl font-extrabold text-white tracking-wider sm:tracking-widest uppercase leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] text-center">
          LEADERSHIP BOARD
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Faculty Coordinator Card */}
        <div className="flex flex-col">
          <h3 className="font-bebas text-2xl tracking-widest text-white uppercase font-bold mb-3 pl-2">
            Faculty Coordinator
          </h3>
          <div className="relative bg-[#F5F0D8] border-4 border-black p-6 rounded-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col sm:flex-row gap-6 items-center sm:items-start min-h-[220px]">
            <CornerBrackets color="#000000" />
            
            {/* Quote and Vision text */}
            <div className="flex-1 flex flex-col justify-between">
              <div className="relative pt-4 pl-4">
                {/* Quote Icon */}
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-neutral-400 absolute top-0 left-0">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="font-sans text-[11px] sm:text-xs font-semibold text-neutral-700 leading-relaxed italic">
                  The CodeChef Student Chapter at VIT Chennai has rapidly expanded, enhancing programming and competitive coding skills through contests, workshops, and peer learning.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-black/10">
                <h4 className="font-bebas text-xl font-bold uppercase tracking-wider text-black">
                  —
                </h4>
                <p className="font-sans text-[10px] text-neutral-500 font-bold uppercase">
                  Faculty Coordinator
                </p>
              </div>
            </div>

            {/* Avatar Photo */}
            <div className="w-24 h-24 rounded-lg border-2 border-black bg-neutral-300 flex-shrink-0 flex items-end overflow-hidden">
              <svg viewBox="0 0 100 100" className="w-full h-full text-white" fill="currentColor">
                <circle cx="50" cy="38" r="18" />
                <path d="M 15,85 C 15,62 30,55 50,55 C 70,55 85,62 85,85 Z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Presidents Council Carousel Card */}
        <div className="flex flex-col">
          <h3 className="font-bebas text-2xl tracking-widest text-white uppercase font-bold mb-3 pl-2">
            President Council
          </h3>
          <div className="relative bg-[#F5F0D8] border-4 border-black p-6 rounded-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col min-h-[220px] justify-between">
            <CornerBrackets color="#000000" />
            
            {/* Carousel Item with simple animation key */}
            <motion.div 
              key={presIndex}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex flex-col sm:flex-row gap-6 items-center sm:items-start"
            >
              {/* Photo Avatar */}
              <div className="w-24 h-24 rounded-lg border-2 border-black bg-neutral-300 flex-shrink-0 flex items-end overflow-hidden">
                <svg viewBox="0 0 100 100" className="w-full h-full text-white" fill="currentColor">
                  <circle cx="50" cy="38" r="18" />
                  <path d="M 15,85 C 15,62 30,55 50,55 C 70,55 85,62 85,85 Z" />
                </svg>
              </div>

              {/* Vision and Quote */}
              <div className="flex-1">
                <div className="relative pt-4 pl-4">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-neutral-400 absolute top-0 left-0">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="font-sans text-[11px] sm:text-xs font-semibold text-neutral-700 leading-relaxed italic">
                    {PRESIDENTS[presIndex].vision}
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-black/10">
                  <h4 className="font-bebas text-xl font-bold uppercase tracking-wider text-black">
                    {PRESIDENTS[presIndex].name}
                  </h4>
                  <p className="font-sans text-[10px] text-neutral-500 font-bold uppercase">
                    {PRESIDENTS[presIndex].year}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Slider Navigation Arrows */}
            <div className="flex gap-4 mt-4 justify-end">
              <button 
                onClick={prevPres}
                className="w-8 h-8 rounded border-2 border-black bg-white flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] active:translate-y-[1px] transition-transform cursor-pointer"
                aria-label="Previous President"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
              </button>
              <button 
                onClick={nextPres}
                className="w-8 h-8 rounded border-2 border-black bg-white flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] active:translate-y-[1px] transition-transform cursor-pointer"
                aria-label="Next President"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main Page Component
export default function TeamPage() {
  const [activeTab, setActiveTab] = useState<"board" | "departments">("board");

  // Generate 25 wavy background paths dynamically to cover the entire page scroll height
  const backgroundPaths = Array.from({ length: 25 }, (_, i) => {
    const yBase = i * 400 + 100;
    const isEven = i % 2 === 0;
    return isEven
      ? `M -100,${yBase} Q 300,${yBase - 50} 800,${yBase + 20} T 1900,${yBase - 20}`
      : `M -100,${yBase} Q 400,${yBase + 100} 900,${yBase - 50} T 2100,${yBase + 50}`;
  });

  return (
    <main className="w-full min-h-screen bg-[#5878AF] relative flex flex-col items-center pt-8 overflow-x-hidden select-none">
      
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

      {/* Tab Switcher Panel */}
      <div className="flex justify-center items-center gap-3 sm:gap-12 mt-4 mb-10 z-10 relative px-3 w-full flex-wrap">
        <button 
          onClick={() => setActiveTab("board")}
          className={`px-5 sm:px-8 py-2.5 font-teko text-3xl sm:text-4xl tracking-widest uppercase rounded-lg border-2 border-black transition-all duration-300 cursor-pointer ${
            activeTab === "board" 
              ? "bg-black text-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.4)] scale-105" 
              : "text-white border-transparent hover:border-white/10"
          }`}
        >
          BOARD
        </button>
        <button 
          onClick={() => setActiveTab("departments")}
          className={`px-5 sm:px-8 py-2.5 font-teko text-3xl sm:text-4xl tracking-widest uppercase rounded-lg border-2 border-black transition-all duration-300 cursor-pointer ${
            activeTab === "departments" 
              ? "bg-black text-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.4)] scale-105" 
              : "text-white border-transparent hover:border-white/10"
          }`}
        >
          DEPARTMENTS
        </button>
      </div>

      {/* Main Content Area */}
      <div className="w-full relative z-20 min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeTab === "board" ? (
            <motion.div 
              key="board"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <Board />
            </motion.div>
          ) : (
            <motion.div 
              key="departments"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <Departments />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Leadership board quote section (always visible below) */}
      <LeadershipBoard />

      {/* Global Footer */}
      <Footer />
    </main>
  );
}
