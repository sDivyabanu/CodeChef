"use client";

import React, { useState, useEffect, useRef } from "react";
import { client, urlFor } from "@/lib/sanityClient";
import { ExternalLink, ChevronLeft, ChevronRight, Code2, Users, Loader2, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const ChefHatIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M6 18h12a2 2 0 0 0 2-2v-3a6 6 0 0 0-12 0v3a2 2 0 0 0 2 2z" />
    <path d="M9 18v3a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-3" />
    <path d="M12 2a4.5 4.5 0 0 0-4 2.5a5.5 5.5 0 0 0-4 5.5c0 1.5.5 2.5 1 3.5M12 2a4.5 4.5 0 0 1 4 2.5a5.5 5.5 0 0 1 4 5.5c0 1.5-.5 2.5-1 3.5" />
  </svg>
);

const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

function parseTeam(teamStr: string) {
  const leads: string[] = [];
  const members: string[] = [];
  
  if (!teamStr) return { leads, members };
  
  let lines: string[] = [];
  if (teamStr.includes("\n")) {
    lines = teamStr.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  } else if (teamStr.includes(",")) {
    lines = teamStr.split(",").map(l => l.trim()).filter(Boolean);
  } else {
    lines = [teamStr.trim()];
  }
  
  const hasLeadsHeader = teamStr.toLowerCase().includes("team lead");
  const hasMembersHeader = teamStr.toLowerCase().includes("team member");
  
  if (hasLeadsHeader || hasMembersHeader) {
    let mode: "leads" | "members" = "leads";
    
    for (const line of lines) {
      const lower = line.toLowerCase();
      if (lower.includes("team lead")) {
        mode = "leads";
        continue;
      } else if (lower.includes("team member")) {
        mode = "members";
        continue;
      }
      
      if (mode === "leads") {
        leads.push(line);
      } else {
        members.push(line);
      }
    }
  } else {
    if (lines.length > 0) {
      leads.push(lines[0]);
      if (lines.length > 1) {
        members.push(...lines.slice(1));
      }
    }
  }
  
  return { leads, members };
}

interface SanityProject {
  _id: string;
  projectName: string;
  description?: string;
  teamMembers?: string;
  repoLink?: string;
  deployedLink?: string;
  techStack?: string[];
  media?: {
    _type: string;
    asset?: {
      _id: string;
      url: string;
      mimeType?: string;
    };
  }[];
}

const MOCK_PROJECTS: SanityProject[] = [
  {
    _id: "mock-1",
    projectName: "CodeChef Portal",
    description: "A comprehensive portal for students to register for events, view leaderboard standings, and participate in coding contests seamlessly.",
    teamMembers: "Shivansh, Divyabanu, Harish",
    repoLink: "https://github.com/Codechef-VITC-Student-Chapter/CodeChef",
    deployedLink: "https://codechefvitc.com",
    techStack: ["Next.js", "Tailwind CSS", "Sanity"],
    media: [
      {
        _type: "image",
        asset: {
          _id: "mock-img-1",
          url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
        }
      }
    ]
  },
  {
    _id: "mock-2",
    projectName: "Flappy Chef Game",
    description: "An interactive, culinary-themed mini-game built inside our platform featuring retro aesthetics, high-score tracking, and live animations.",
    teamMembers: "Aditya, Rohan",
    repoLink: "https://github.com/Codechef-VITC-Student-Chapter/CodeChef",
    deployedLink: "https://codechefvitc.com/games/flappy-chef",
    techStack: ["HTML5 Canvas", "Javascript", "Web Audio API"],
    media: [
      {
        _type: "image",
        asset: {
          _id: "mock-img-2",
          url: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1200&auto=format&fit=crop",
        }
      }
    ]
  },
  {
    _id: "mock-3",
    projectName: "VITC Event Manager",
    description: "A centralized booking and scheduling app designed to manage student chapters, president approvals, and venue allocations.",
    teamMembers: "Sneha, Rahul, Priya",
    repoLink: "https://github.com/Codechef-VITC-Student-Chapter/CodeChef",
    deployedLink: "https://codechefvitc.com/events",
    techStack: ["React.js", "Node.js", "Express"],
    media: [
      {
        _type: "image",
        asset: {
          _id: "mock-img-3",
          url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop",
        }
      }
    ]
  }
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<SanityProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(520);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardWidth(Math.min(520, window.innerWidth - 32));
      } else {
        setCardWidth(520);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const query = `*[_type == "projects"] | order(_createdAt desc) {
          _id,
          projectName,
          description,
          teamMembers,
          repoLink,
          deployedLink,
          media[] {
            _type,
            asset-> {
              _id,
              url,
              mimeType
            }
          }
        }`;
        const data = await client.fetch(query);
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        } else {
          setProjects(MOCK_PROJECTS);
        }
      } catch (err) {
        console.error("Error fetching projects from Sanity, using mock data:", err);
        setProjects(MOCK_PROJECTS);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return;
    const children = containerRef.current.children;
    if (children && children[index]) {
      // Temporarily disable scroll snapping to prevent browser physics conflicts
      containerRef.current.style.scrollSnapType = "none";
      
      children[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
      });
      
      setActiveProjectIndex(index);
      
      // Restore scroll snapping after the smooth scroll completes (~350ms)
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.scrollSnapType = "x mandatory";
        }
      }, 350);
    }
  };

  const handleScroll = () => {
    if (!containerRef.current) return;
    const scrollLeft = containerRef.current.scrollLeft;
    const itemWidth = cardWidth + 24;
    const index = Math.round(scrollLeft / itemWidth);
    if (index !== activeProjectIndex && index >= 0 && index < projects.length) {
      setActiveProjectIndex(index);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (loading || projects.length <= 1) return;
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") return;
      
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        const nextIdx = Math.max(0, activeProjectIndex - 1);
        scrollToIndex(nextIdx);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        const nextIdx = Math.min(projects.length - 1, activeProjectIndex + 1);
        scrollToIndex(nextIdx);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeProjectIndex, projects, loading, cardWidth]);

  // Keep scroll aligned on card width changes (resizing)
  useEffect(() => {
    if (containerRef.current) {
      const itemWidth = cardWidth + 24;
      containerRef.current.scrollLeft = activeProjectIndex * itemWidth;
    }
  }, [cardWidth]);

  return (
    <main className="w-full min-h-dvh lg:h-screen bg-[#F5F0D8] relative flex flex-col justify-between items-center pt-2 pb-24 md:pb-6 md:pt-3 overflow-x-hidden overflow-y-auto lg:overflow-hidden select-none">
      
      {/* Repeating Grid Background fixed behind */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
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
              {/* Intersection Node */}
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

      {/* Radial Mask to fade out the grid dots directly behind the carousel */}
      <div 
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(245, 240, 216, 1) 0%, rgba(245, 240, 216, 0.95) 20%, rgba(245, 240, 216, 0) 70%)",
        }}
      />

      {/* Title & Subtitle Section (Fixed at top) */}
      <div className="relative flex flex-col items-center z-10 shrink-0 -mt-1 md:-mt-4 px-4 text-center">
        <div className="relative">
          {/* Main Title with Cyan Neon Glow */}
          <h1 
            className="
              font-teko 
              text-5xl
              min-[360px]:text-6xl 
              sm:text-7xl 
              md:text-8xl 
              lg:text-[6.5rem] 
              xl:text-[7.5rem] 
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
              bottom-[-8px] 
              font-sans 
              italic 
              font-bold 
              text-xs 
              sm:text-sm 
              text-black
            "
          >
            by CodeChef
          </span>
        </div>
      </div>

      {/* Projects Snapped Viewport Center Section */}
      <div className="w-full max-w-7xl px-4 flex flex-col items-center justify-center gap-4 z-10 flex-grow min-h-0 py-4">
        <div className="relative w-full flex-1 flex items-center justify-center min-h-[560px] sm:min-h-[620px] md:min-h-[680px]">
          
          {/* Scrollable Viewport */}
          <div 
            ref={containerRef}
            onScroll={handleScroll}
            style={{ 
              perspective: "1200px", 
              transformStyle: "preserve-3d",
              paddingLeft: `calc(50vw - ${cardWidth / 2}px)`,
              paddingRight: `calc(50vw - ${cardWidth / 2}px)`,
            }}
            className="flex-1 w-full h-full flex items-center overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-none z-10 py-4 gap-6"
          >
            {loading ? (
              <div
                style={{ width: `${cardWidth}px` }}
                className="shrink-0 snap-center flex items-center justify-center py-4"
              >
                <ProjectCardSkeleton />
              </div>
            ) : (
              projects.map((project, idx) => {
                const isActive = idx === activeProjectIndex;
                const isLeft = idx < activeProjectIndex;
                const isRight = idx > activeProjectIndex;

                let rotateY = 0;
                if (isLeft) rotateY = 8;
                if (isRight) rotateY = -8;

                return (
                  <div
                    key={project._id}
                    style={{ width: `${cardWidth}px`, transformStyle: "preserve-3d" }}
                    className="shrink-0 snap-center flex items-center justify-center py-4"
                  >
                    <motion.div
                      animate={{
                        scale: isActive ? 1.0 : 0.93,
                        rotateY: rotateY,
                        z: isActive ? 20 : -40,
                      }}
                      transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
                      style={{ 
                        width: "100%",
                        transformStyle: "preserve-3d",
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        WebkitMaskImage: "-webkit-radial-gradient(white, black)",
                        borderRadius: "18px",
                        overflow: "hidden",
                      }}
                      className={`relative ${isActive ? "z-20" : "z-10"}`}
                    >
                      <ProjectCard project={project} isActive={isActive} />
                    </motion.div>
                  </div>
                );
              })
            )}
          </div>

          {/* Absolute Edge Navigation Buttons (Desktop/Tablet view) */}
          {!loading && projects.length > 1 && (
            <>
              <button
                onClick={() => scrollToIndex(Math.max(0, activeProjectIndex - 1))}
                disabled={activeProjectIndex === 0}
                className="hidden md:flex absolute left-2 lg:-left-12 xl:-left-20 top-1/2 -translate-y-1/2 z-40 bg-white border-2 border-black p-3.5 rounded-2xl text-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] hover:border-[#06B6D4] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all cursor-pointer disabled:opacity-30 disabled:pointer-events-none shrink-0"
                aria-label="Previous Project"
              >
                <ChevronLeft className="w-6 h-6 stroke-[3]" />
              </button>

              <button
                onClick={() => scrollToIndex(Math.min(projects.length - 1, activeProjectIndex + 1))}
                disabled={activeProjectIndex === projects.length - 1}
                className="hidden md:flex absolute right-2 lg:-right-12 xl:-right-20 top-1/2 -translate-y-1/2 z-40 bg-white border-2 border-black p-3.5 rounded-2xl text-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] hover:border-[#06B6D4] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all cursor-pointer disabled:opacity-30 disabled:pointer-events-none shrink-0"
                aria-label="Next Project"
              >
                <ChevronRight className="w-6 h-6 stroke-[3]" />
              </button>
            </>
          )}
        </div>

        {/* Bottom Centered Navigation Dock - Minimal Capsule counter */}
        {!loading && projects.length > 1 && (
          <div className="flex items-center justify-center bg-black border border-white/10 rounded-full px-6 py-2.5 shadow-[2px_2px_0px_rgba(0,0,0,1)] shrink-0 select-none mt-2 z-20 relative text-white">
            <span className="font-sans font-extrabold text-sm tracking-widest uppercase">
              {activeProjectIndex + 1} / {projects.length}
            </span>
          </div>
        )}
      </div>

      {/* Spacer / Footer area */}
      <div className="shrink-0 z-10" />

      {/* Custom Scrollbar Styles for the Description Area */}
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.4);
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </main>
  );
}

function ProjectCard({ project, isActive }: { project: SanityProject; isActive: boolean }) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [showDescription, setShowDescription] = useState(false);

  const mediaList = project.media || [];
  const hasMedia = mediaList.length > 0;

  // Reset states when switching projects
  useEffect(() => {
    setCurrentMediaIndex(0);
    setShowDescription(false);
  }, [project]);

  const nextMedia = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (mediaList.length > 0) {
      setCurrentMediaIndex((prev) => (prev + 1) % mediaList.length);
    }
  };

  const prevMedia = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (mediaList.length > 0) {
      setCurrentMediaIndex((prev) => (prev - 1 + mediaList.length) % mediaList.length);
    }
  };

  const activeMedia = mediaList[currentMediaIndex];
  const isVideo = activeMedia?.asset?.mimeType?.startsWith("video/") || activeMedia?._type === "file";

  // Parse team leads and team members using our parseTeam helper
  const { leads, members } = parseTeam(project.teamMembers || "");

  return (
    <div 
      style={{ 
        WebkitMaskImage: "-webkit-radial-gradient(white, black)",
        transform: "translate3d(0, 0, 0)",
        WebkitTransform: "translate3d(0, 0, 0)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        willChange: "transform"
      }}
      className={`relative bg-[#0B0B0B] border border-white/8 rounded-[18px] flex flex-col p-4 sm:p-6 w-full gap-4 overflow-hidden group transition-all duration-[250ms] ease-out ${
        isActive 
          ? "shadow-[0_12px_40px_rgba(0,0,0,0.55)] hover:shadow-[0_16px_50px_rgba(0,0,0,0.7)] hover:-translate-y-1" 
          : "shadow-[0_4px_15px_rgba(0,0,0,0.2)]"
      }`}
    >
      
      {/* Content wrapper with opacity shift to keep the background grid completely masked */}
      <div className={`flex flex-col h-full w-full gap-4 transition-opacity duration-300 ${
        isActive ? "opacity-100" : "opacity-40"
      }`}>
        
        {/* Landscape Image Showcase with White Frame & Black Bezel Outline - 16:9 Aspect Ratio */}
        <div className="relative w-full aspect-[16/9] bg-white rounded-2xl p-[4px] border border-black/90 shadow-[4px_4px_12px_rgba(0,0,0,0.55)] hover:shadow-[6px_6px_18px_rgba(0,0,0,0.65)] hover:scale-[1.02] transition-all duration-500 flex items-center justify-center shrink-0 select-none">
          
          {/* Inner container with 1px black stroke */}
          <div className="relative w-full h-full bg-[#0F0F11] border border-black rounded-xl overflow-hidden flex items-center justify-center">
            
            {hasMedia ? (
              <div className="w-full h-full relative">
                {isVideo ? (
                  <video
                    src={activeMedia.asset?.url}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-[250ms] ease-out"
                  />
                ) : (
                  <img
                    src={activeMedia.asset?.url || (activeMedia ? urlFor(activeMedia).url() : "")}
                    alt={project.projectName}
                    style={{ imageRendering: "-webkit-optimize-contrast" }}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-[250ms] ease-out"
                  />
                )}

                {/* Navigation buttons for multiple media items */}
                {mediaList.length > 1 && (
                  <>
                    <button
                      onClick={prevMedia}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/75 border border-white/20 p-1.5 rounded-lg hover:bg-black hover:border-white transition-all z-20 cursor-pointer text-white"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={nextMedia}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/75 border border-white/20 p-1.5 rounded-lg hover:bg-black hover:border-white transition-all z-20 cursor-pointer text-white"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    {/* Dot Indicators */}
                    <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1 z-20">
                      {mediaList.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-1 rounded-full transition-all duration-300 ${
                            idx === currentMediaIndex ? "w-4 bg-[#06B6D4]" : "w-1 bg-white/40"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-black/40 p-4">
                <Code2 className="w-10 h-10 text-[#06B6D4]/40 mb-1" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#06B6D4]/55">No Showcase Media</span>
              </div>
            )}
            
          </div>
        </div>

        {/* Card Content Area - Stacked vertically with spacing */}
        <div className="flex flex-col items-center text-center gap-3 w-full flex-grow">
          
          {/* Project Name Wrapper (Fixed height to keep headers aligned consistently) */}
          <div className="h-[76px] flex items-center justify-center shrink-0 w-full px-2">
            <h2 className="font-teko text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-wider leading-none line-clamp-2 antialiased">
              {project.projectName}
            </h2>
          </div>

          {/* Tech Stack Chips (Optional) */}
          {project.techStack && project.techStack.length > 0 && (
            <div className="flex flex-wrap justify-center gap-1 shrink-0">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-[9px] uppercase font-extrabold tracking-wider px-2 py-0.5 bg-white/5 border border-white/10 rounded-md text-white/40"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Action Buttons Stack */}
          <div className="flex flex-col gap-2.5 w-full mt-auto pt-2 shrink-0">
            
            {/* Row 1: GitHub & Demo Buttons */}
            <div className="flex items-center gap-2 sm:gap-3 w-full">
              {project.repoLink && (
                <a
                  href={project.repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2.5 bg-white border border-black text-black font-bold rounded-[14px] hover:-translate-y-[2px] hover:shadow-[0_0_15px_rgba(6,182,212,0.65)] hover:border-[#06B6D4] active:translate-y-0 transition-all duration-[250ms] ease-out text-xs sm:text-[13px] shadow-[2.5px_2.5px_0px_rgba(0,0,0,1)] select-none cursor-pointer"
                >
                  <GithubIcon className="w-[18px] h-[18px] stroke-[2]" />
                  GitHub
                </a>
              )}
              {project.deployedLink && (
                <a
                  href={project.deployedLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2.5 bg-[#06B6D4] border border-black text-black font-bold rounded-[14px] hover:-translate-y-[2px] hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] active:translate-y-0 transition-all duration-[250ms] ease-out text-xs sm:text-[13px] shadow-[2.5px_2.5px_0px_rgba(0,0,0,1)] select-none cursor-pointer"
                >
                  <ExternalLink className="w-[18px] h-[18px]" />
                  Demo
                </a>
              )}
            </div>

            {/* Row 2: Read Description Full Width Button */}
            <button
              onClick={() => setShowDescription(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-transparent border border-white/40 text-white font-bold rounded-[14px] hover:bg-white/10 transition-all duration-[250ms] ease-out text-[13px] select-none cursor-pointer"
            >
              <Info className="w-[18px] h-[18px] text-[#06B6D4]" />
              Read Description
            </button>
            
          </div>

        </div>

      </div>

      {/* Full Description Drawer Overlay */}
      <AnimatePresence>
        {showDescription && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="absolute inset-0 bg-black/95 z-30 p-4 sm:p-6 flex flex-col justify-between"
          >
            <div className="flex flex-col min-h-0">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 shrink-0">
                <h3 className="font-teko text-2xl font-extrabold text-white uppercase tracking-wider">
                  {project.projectName} - Info
                </h3>
                <button
                  onClick={() => setShowDescription(false)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="overflow-y-auto pr-1 custom-scrollbar text-sm text-white/90 leading-relaxed font-medium">
                <div>{project.description || "No description provided."}</div>
                
                {/* Team Details Relocated Inside Description Drawer */}
                {(leads.length > 0 || members.length > 0) && (
                  <div className="border-t border-white/10 mt-5 pt-4 flex flex-col gap-4 text-left">
                    {/* Team Leads */}
                    {leads.length > 0 && (
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-500/95">
                          Team Leads
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {leads.map((lead, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-950/30 border border-amber-500/40 rounded-full text-xs font-bold text-amber-200"
                            >
                              <ChefHatIcon className="w-3.5 h-3.5 text-amber-400" />
                              {lead}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Team Members */}
                    {members.length > 0 && (
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-400/95">
                          Team Members
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {members.map((member, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-950/20 border border-blue-500/45 rounded-full text-[11px] font-semibold text-white"
                            >
                              <UserIcon className="w-3 h-3 text-blue-400" />
                              {member}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <button
              onClick={() => setShowDescription(false)}
              className="w-full mt-4 py-2.5 bg-white text-black font-extrabold rounded-xl hover:bg-[#06B6D4] hover:text-black transition-all duration-200 text-xs shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer"
            >
              Back to Card
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectCardSkeleton({ width }: { width?: number }) {
  return (
    <div 
      style={{
        width: width ? `${width}px` : undefined,
        WebkitMaskImage: "-webkit-radial-gradient(white, black)",
        transform: "translate3d(0, 0, 0)",
        WebkitTransform: "translate3d(0, 0, 0)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        willChange: "transform"
      }}
      className="bg-[#0B0B0B] border border-white/8 rounded-[24px] shadow-[0_4px_15px_rgba(0,0,0,0.2)] flex flex-col p-6 w-full max-w-[520px] gap-5 overflow-hidden animate-pulse shrink-0"
    >
      <div className="w-full aspect-[16/10] bg-white rounded-2xl p-[4px] border border-black/90 shadow-[4px_4px_12px_rgba(0,0,0,0.55)] flex items-center justify-center">
        <div className="w-full h-full bg-white/5 border border-black rounded-xl" />
      </div>
      <div className="flex flex-col items-center gap-4 w-full">
        <div className="h-7 w-3/4 bg-white/10 rounded-md" />
        <div className="h-4 w-1/2 bg-white/10 rounded-md mt-1" />
        <div className="h-4 w-2/3 bg-white/10 rounded-md" />
        <div className="flex flex-col gap-2.5 w-full mt-2">
          <div className="flex gap-3 w-full">
            <div className="h-10 flex-1 bg-white/10 rounded-xl" />
            <div className="h-10 flex-1 bg-white/10 rounded-xl" />
          </div>
          <div className="h-10 w-full bg-white/10 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
