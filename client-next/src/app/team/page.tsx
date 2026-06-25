"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer/Footer";

// Reusable Corner Brackets component for that handcrafted / blueprint design aesthetic
const CornerBrackets = ({ color = "#000000" }: { color?: string }) => (
  <>
    <div style={{ borderColor: color }} className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-[2.5px] border-l-[2.5px] pointer-events-none" />
    <div style={{ borderColor: color }} className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-[2.5px] border-r-[2.5px] pointer-events-none" />
    <div style={{ borderColor: color }} className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-[2.5px] border-l-[2.5px] pointer-events-none" />
    <div style={{ borderColor: color }} className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-[2.5px] border-r-[2.5px] pointer-events-none" />
  </>
);

// Lucide-like clean SVG Icons for Departments
const CPIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
    <path d="M12 2a4 4 0 0 0-4 4v5a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4Z" />
  </svg>
);

const WebIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
    <path d="m10 8-2 2 2 2" />
    <path d="m14 8 2 2-2 2" />
  </svg>
);

const DesignIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
    <path d="M12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 9.51472 14.4853 7.5 12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5Z" />
    <circle cx="7.5" cy="10.5" r="1" fill="currentColor" />
    <circle cx="11.5" cy="7.5" r="1" fill="currentColor" />
    <circle cx="16.5" cy="10.5" r="1" fill="currentColor" />
  </svg>
);

const ProjectsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
    <path d="M4.5 16.5c-1.5 1.25-2.5 3-2.5 4.5h20c0-1.5-1-3.25-2.5-4.5" />
    <path d="M12 2v10" />
    <path d="m9 5 3-3 3 3" />
    <path d="M12 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
  </svg>
);

const SocialIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const SponsorIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const EventIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <path d="m9 16 2 2 4-4" />
  </svg>
);

// Generic Social SVGs
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 hover:text-[#5878AF] transition-colors">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 hover:text-[#5878AF] transition-colors">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

// Types and Data Structures
interface BoardMember {
  name: string;
  designation: string;
  isBlack?: boolean;
}

interface DeptLead {
  name: string;
  dept: string;
  role: string;
}

interface YearData {
  board: BoardMember[];
  leads: DeptLead[];
}

interface LeadDetail {
  name: string;
  role: string;
  github?: string;
  linkedin: string;
}

interface MemberDetail {
  name: string;
  linkedin?: string;
}

interface Department {
  id: string;
  name: string;
  leadsCount: number;
  membersCount: number;
  icon: React.ReactNode;
  description: string;
  leads: LeadDetail[];
  members: MemberDetail[];
}

// Storing actual name listings for different academic years
const YEAR_DATA: Record<string, YearData> = {
  "2025-26": {
    board: [
      { name: "Gowreesh VT", designation: "Vice Chairperson" },
      { name: "Shivansh Kumar", designation: "Chairperson", isBlack: true },
      { name: "Divyabanu S", designation: "Secretary" },
      { name: "Sairam Sundar", designation: "Co-Secretary" },
      { name: "Aaditya Prabhu", designation: "Treasurer", isBlack: true },
      { name: "Vishal Kumar Yadav", designation: "Co-Treasurer" },
    ],
    leads: [
      { name: "Shashank Sharma", role: "CP Lead", dept: "Competitive Programming" },
      { name: "Kavya Nair", role: "Web Dev Lead", dept: "Web Development" },
      { name: "Rohan Verma", role: "Design Lead", dept: "Design" },
      { name: "Devansh Gupta", role: "Projects Lead", dept: "Projects" },
      { name: "Meera Deshmukh", role: "Social Media Lead", dept: "Social Media" },
      { name: "Aditya Prasad", role: "Sponsorship & PR Lead", dept: "Sponsorship & Marketing" },
      { name: "Arjun Kapoor", role: "Event Management Lead", dept: "Event Management" },
    ],
  },
  "2024-25": {
    board: [
      { name: "Anmay Dev", designation: "Vice Chairperson" },
      { name: "Aryan Gupta", designation: "Chairperson", isBlack: true },
      { name: "Shashank Sharma", designation: "Secretary" },
      { name: "Siddharth Jain", designation: "Co-Secretary" },
      { name: "Kavya Nair", designation: "Treasurer", isBlack: true },
      { name: "Rohan Verma", designation: "Co-Treasurer" },
    ],
    leads: [
      { name: "Amit Bansal", role: "CP Lead", dept: "Competitive Programming" },
      { name: "Priyanka Arora", role: "Web Dev Lead", dept: "Web Development" },
      { name: "Shalini Kumari", role: "Design Lead", dept: "Design" },
      { name: "Jatin Khanna", role: "Projects Lead", dept: "Projects" },
      { name: "Rithvik Sen", role: "Social Media Lead", dept: "Social Media" },
      { name: "Naman Singh", role: "Sponsorship & PR Lead", dept: "Sponsorship & Marketing" },
      { name: "Neha Choudhary", role: "Event Management Lead", dept: "Event Management" },
    ],
  },
};

const DEPARTMENTS: Department[] = [
  {
    id: "cp",
    name: "Competitive Programming",
    leadsCount: 2,
    membersCount: 12,
    icon: <CPIcon />,
    description: "Solving algorithmic puzzles and writing highly-optimized code for contests.",
    leads: [
      { name: "Shashank Sharma", role: "CP Lead", github: "https://github.com", linkedin: "https://linkedin.com" },
      { name: "Ananya Iyer", role: "CP Co-Lead", linkedin: "https://linkedin.com" },
    ],
    members: [
      { name: "Rahul Singh", linkedin: "https://linkedin.com" },
      { name: "Priya Murthy", linkedin: "https://linkedin.com" },
      { name: "Vikram Reddy" },
      { name: "Sneha Kapoor", linkedin: "https://linkedin.com" },
      { name: "Karan Bhasin" },
      { name: "Rohan Varma", linkedin: "https://linkedin.com" },
      { name: "Meera Datt" },
      { name: "Aditya Pant", linkedin: "https://linkedin.com" },
      { name: "Neha Chandra" },
      { name: "Arjun Kunder", linkedin: "https://linkedin.com" },
      { name: "Ishaan Trivedi" },
      { name: "Tanvi Shetty", linkedin: "https://linkedin.com" },
    ],
  },
  {
    id: "webdev",
    name: "Web Development",
    leadsCount: 2,
    membersCount: 15,
    icon: <WebIcon />,
    description: "Architecting high-performance websites and user interfaces using React, Next.js, and modern tools.",
    leads: [
      { name: "Kavya Nair", role: "Web Dev Lead", github: "https://github.com", linkedin: "https://linkedin.com" },
      { name: "Devansh Gupta", role: "Web Dev Co-Lead", github: "https://github.com", linkedin: "https://linkedin.com" },
    ],
    members: [
      { name: "Siddharth Jain", linkedin: "https://linkedin.com" },
      { name: "Nisha Patel", linkedin: "https://linkedin.com" },
      { name: "Gowreesh VT", github: "https://github.com", linkedin: "https://linkedin.com" },
      { name: "Divyabanu S", linkedin: "https://linkedin.com" },
      { name: "Rohan Khanna" },
      { name: "Priyanka Arora", linkedin: "https://linkedin.com" },
      { name: "Karthik Raja" },
      { name: "Shreya Taneja", linkedin: "https://linkedin.com" },
      { name: "Amit Bansal" },
      { name: "Harish Sundar" },
      { name: "Sneha Latha", linkedin: "https://linkedin.com" },
      { name: "Varun Dev" },
      { name: "Vijay Prasad" },
      { name: "Divya Nambiar", linkedin: "https://linkedin.com" },
      { name: "Manish Rao" },
    ],
  },
  {
    id: "design",
    name: "Design",
    leadsCount: 2,
    membersCount: 10,
    icon: <DesignIcon />,
    description: "Designing assets, poster layouts, user experiences, and brand guidelines for all club publications.",
    leads: [
      { name: "Rohan Verma", role: "Design Lead", linkedin: "https://linkedin.com" },
      { name: "Shalini Kumari", role: "Design Co-Lead", linkedin: "https://linkedin.com" },
    ],
    members: [
      { name: "Shalini K", linkedin: "https://linkedin.com" },
      { name: "Abhishek Sen" },
      { name: "Megha Rao", linkedin: "https://linkedin.com" },
      { name: "Pranav Mishra" },
      { name: "Kiran Patel", linkedin: "https://linkedin.com" },
      { name: "Deepak Saini" },
      { name: "Aarti Negi", linkedin: "https://linkedin.com" },
      { name: "Vivek Goyal" },
      { name: "Suresh Chandra" },
      { name: "Swathi Devi", linkedin: "https://linkedin.com" },
    ],
  },
  {
    id: "projects",
    name: "Projects",
    leadsCount: 2,
    membersCount: 14,
    icon: <ProjectsIcon />,
    description: "Developing full-scale products, mobile applications, AI prototypes, and contributing to open-source software.",
    leads: [
      { name: "Devansh Gupta", role: "Projects Lead", github: "https://github.com", linkedin: "https://linkedin.com" },
      { name: "Jatin Khanna", role: "Projects Co-Lead", github: "https://github.com", linkedin: "https://linkedin.com" },
    ],
    members: [
      { name: "Jatin K", linkedin: "https://linkedin.com" },
      { name: "Ashwin Srinivasan", github: "https://github.com" } as any,
      { name: "Rhea Mehta", linkedin: "https://linkedin.com" },
      { name: "Tanmay Chaturvedi" },
      { name: "Varsha Rajan", linkedin: "https://linkedin.com" },
      { name: "Nikhil Tandon" },
      { name: "Sakshi Goel", linkedin: "https://linkedin.com" },
      { name: "Tarun Kumar" },
      { name: "Uday Sankar" },
      { name: "Vaishnavi Kulkarni", linkedin: "https://linkedin.com" },
      { name: "Abhinav Dutt" },
      { name: "Bala Ram" },
      { name: "Chitra Sundaram", linkedin: "https://linkedin.com" },
      { name: "Dinesh Kumar" },
    ],
  },
  {
    id: "social",
    name: "Social Media",
    leadsCount: 1,
    membersCount: 8,
    icon: <SocialIcon />,
    description: "Managing club community engagement and content distribution channels.",
    leads: [
      { name: "Meera Deshmukh", role: "Social Media Lead", linkedin: "https://linkedin.com" },
    ],
    members: [
      { name: "Rithvik Sen", linkedin: "https://linkedin.com" },
      { name: "Riya Patel", linkedin: "https://linkedin.com" },
      { name: "Arpit Dev" },
      { name: "Saniya Mirza", linkedin: "https://linkedin.com" },
      { name: "Sameer Varma" },
      { name: "Prisha Kapoor", linkedin: "https://linkedin.com" },
      { name: "Yash Sharma" },
      { name: "Zoya Rahman", linkedin: "https://linkedin.com" },
    ],
  },
  {
    id: "sponsorship",
    name: "Sponsorship & Marketing",
    leadsCount: 1,
    membersCount: 10,
    icon: <SponsorIcon />,
    description: "Establishing industry collaborations, sponsorship decks, and managing public relations outreach.",
    leads: [
      { name: "Aditya Prasad", role: "Sponsorship Lead", linkedin: "https://linkedin.com" },
    ],
    members: [
      { name: "Naman Singh", linkedin: "https://linkedin.com" },
      { name: "Nupur Kulkarni", linkedin: "https://linkedin.com" },
      { name: "Omkar Verma" },
      { name: "Payal Goel", linkedin: "https://linkedin.com" },
      { name: "Raghav Chawla" },
      { name: "Rajesh Sharma" },
      { name: "Rekha Murthy", linkedin: "https://linkedin.com" },
      { name: "Rohan Dutt" },
      { name: "Sajal Roy" },
      { name: "Sonia Gupta", linkedin: "https://linkedin.com" },
    ],
  },
  {
    id: "events",
    name: "Event Management",
    leadsCount: 2,
    membersCount: 12,
    icon: <EventIcon />,
    description: "Coordinating logistics, schedules, operations, and venue management for tech events.",
    leads: [
      { name: "Arjun Kapoor", role: "Events Lead", linkedin: "https://linkedin.com" },
      { name: "Neha Choudhary", role: "Events Co-Lead", linkedin: "https://linkedin.com" },
    ],
    members: [
      { name: "Tarun Kumar", linkedin: "https://linkedin.com" },
      { name: "Uma Rajan", linkedin: "https://linkedin.com" },
      { name: "Vasudev Shastri" },
      { name: "Vidya Gowri", linkedin: "https://linkedin.com" },
      { name: "Vinay Chandran" },
      { name: "Yusuf Khan" },
      { name: "Abhay Sharma" },
      { name: "Anil Rawat" },
      { name: "Bhuvana Devi", linkedin: "https://linkedin.com" },
      { name: "Chetan Kulkarni" },
      { name: "Deepa Nair", linkedin: "https://linkedin.com" },
      { name: "Girish Rao" },
    ],
  },
];

const PRESIDENTS = [
  {
    name: "Aryan Gupta",
    year: "President (2025-26)",
    vision: "Leading CodeChef into a new era of technical innovation, making hackathons more accessible and competitive coding a standard across departments.",
  },
  {
    name: "Divyabanu S",
    year: "President (2024-25)",
    vision: "Established peer learning groups and expanded our web projects repository to help junior members build real-world applications.",
  },
  {
    name: "Anmay Dev",
    year: "President (2023-24)",
    vision: "Initiated key corporate sponsor relations and established our presence as a premier technical student chapter in the Chennai region.",
  }
];

// Helper Component: Board Member Card with custom bracket framing
function BoardCard({ name, designation, isBlack = false, index }: BoardMember & { index: number }) {
  const rotationClass = index % 3 === 0 ? "-rotate-2" : index % 3 === 1 ? "rotate-0" : "rotate-2";
  const bgClass = isBlack ? "bg-black text-white" : "bg-[#F5F0D8] text-black";
  const bracketColor = isBlack ? "#ffffff" : "#000000";

  return (
    <motion.div
      className={`
        relative ${bgClass} border-[3px] border-black rounded-[8px] p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] 
        flex flex-col items-center justify-center text-center select-none ${rotationClass} 
        w-full min-h-[180px] sm:min-h-[200px] transition-all duration-300
      `}
      whileHover={{ y: -8, rotate: 0 }}
    >
      <CornerBrackets color={bracketColor} />
      
      {/* LinkedIn link top right */}
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="absolute top-4 right-4 opacity-75 hover:opacity-100 transition-opacity">
        <LinkedInIcon />
      </a>

      {/* Profile Avatar Placeholder */}
      <div className={`w-14 h-14 rounded-full border-2 ${isBlack ? 'border-white bg-neutral-800' : 'border-black bg-[#5878AF]/25'} flex items-end justify-center overflow-hidden mb-3`}>
        <svg viewBox="0 0 100 100" className={`w-12 h-12 ${isBlack ? 'text-neutral-500' : 'text-[#5878AF]'}`} fill="currentColor">
          <circle cx="50" cy="38" r="18" />
          <path d="M 15,85 C 15,62 30,55 50,55 C 70,55 85,62 85,85 Z" />
        </svg>
      </div>

      <h3 className="font-bebas text-2xl tracking-wider uppercase font-bold leading-tight">{name}</h3>
      <p className={`font-sans text-xs font-bold mt-1 ${isBlack ? 'text-neutral-400' : 'text-neutral-600'}`}>{designation}</p>
    </motion.div>
  );
}

// Helper Component: Clickable Department Card
function DepartmentCard({ 
  name, 
  leadsCount, 
  membersCount, 
  icon, 
  onClick, 
  index 
}: { 
  name: string; 
  leadsCount: number; 
  membersCount: number; 
  icon: React.ReactNode; 
  onClick: () => void; 
  index: number; 
}) {
  const rotationClass = index % 3 === 0 ? "-rotate-2" : index % 3 === 1 ? "rotate-2" : "-rotate-3";

  return (
    <motion.div
      onClick={onClick}
      className={`
        relative bg-[#F5F0D8] border-[3px] border-black rounded-[8px] p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] 
        flex flex-col justify-between items-center text-center cursor-pointer select-none 
        ${rotationClass} w-full min-h-[230px] transition-all duration-300
      `}
      whileHover={{ y: -8, rotate: 0 }}
      whileTap={{ scale: 0.98 }}
    >
      <CornerBrackets color="#000000" />
      
      {/* Visual illustration / icon */}
      <div className="text-black mb-3 select-none pointer-events-none">
        {icon}
      </div>

      <h3 className="font-bebas text-2xl tracking-wider text-black font-extrabold uppercase leading-tight">
        {name}
      </h3>

      <div className="font-sans text-xs text-neutral-600 font-bold mb-4">
        {leadsCount} Leads &bull; {membersCount} Members
      </div>

      <button className="bg-[#5878AF] text-white border-2 border-black rounded-lg px-6 py-1.5 font-bebas text-sm tracking-widest uppercase transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#486390] cursor-pointer">
        View Team
      </button>
    </motion.div>
  );
}

// Modal component opening detailed list of Leads and Members
function DepartmentModal({ 
  dept, 
  onClose 
}: { 
  dept: Department; 
  onClose: () => void; 
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-hidden"
    >
      <motion.div 
        initial={{ scale: 0.95, y: 15 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 15 }}
        transition={{ type: "spring", duration: 0.4 }}
        className="relative w-full max-w-2xl bg-[#F5F0D8] border-4 border-black rounded-lg p-5 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-h-[85vh] overflow-y-auto"
      >
        <CornerBrackets color="#000000" />

        {/* Back navigation */}
        <button 
          onClick={onClose}
          className="flex items-center gap-1.5 font-bebas text-lg tracking-widest uppercase text-black hover:opacity-75 transition-opacity mb-4 cursor-pointer"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back
        </button>

        {/* Header */}
        <h2 className="font-bebas text-4xl sm:text-5xl font-black text-[#5878AF] tracking-wider uppercase mb-1">
          {dept.name}
        </h2>
        <p className="font-sans text-xs sm:text-sm font-semibold text-neutral-600 mb-6 leading-relaxed">
          {dept.description}
        </p>

        <hr className="border-black/10 mb-6" />

        {/* Leads Section */}
        <div className="mb-8">
          <h3 className="font-bebas text-2xl tracking-widest uppercase text-black font-bold mb-4">
            Department Leads
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {dept.leads.map((lead, idx) => (
              <div 
                key={idx}
                className="relative bg-black text-white border-[3px] border-black rounded-lg p-5 flex flex-col justify-between min-h-[140px] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.25)]"
              >
                <CornerBrackets color="#ffffff" />
                <div>
                  <h4 className="font-bebas text-2xl tracking-wider uppercase leading-none mb-1">
                    {lead.name}
                  </h4>
                  <p className="font-sans text-xs text-neutral-400 font-bold">
                    {lead.role}
                  </p>
                </div>
                <div className="flex gap-3 mt-4">
                  <a href={lead.linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#5878AF]">
                    <LinkedInIcon />
                  </a>
                  {lead.github && (
                    <a href={lead.github} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#5878AF]">
                      <GitHubIcon />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Members Section */}
        <div>
          <h3 className="font-bebas text-2xl tracking-widest uppercase text-black font-bold mb-4">
            Current Members
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {dept.members.map((member, idx) => (
              <div 
                key={idx}
                className="flex items-center justify-between bg-white border-2 border-black rounded-full px-4 py-2 shadow-sm"
              >
                <span className="font-sans text-xs font-bold text-neutral-800 truncate mr-2">
                  {member.name}
                </span>
                <a href={member.linkedin || "https://linkedin.com"} target="_blank" rel="noopener noreferrer" className="text-black shrink-0">
                  <LinkedInIcon />
                </a>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Leadership Board Section (Faculty Coordinator quote and Presidents Council carousel)
function LeadershipBoard() {
  const [presIndex, setPresIndex] = useState(0);

  const prevPres = () => {
    setPresIndex((prev) => (prev === 0 ? PRESIDENTS.length - 1 : prev - 1));
  };

  const nextPres = () => {
    setPresIndex((prev) => (prev === PRESIDENTS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full max-w-5xl mx-auto px-6 mb-24 relative z-10">
      {/* Title */}
      <div className="flex justify-center mb-8">
        <h2 className="font-teko text-5xl sm:text-6xl font-extrabold text-white tracking-widest uppercase leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
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
                  Dr. Shridevi S
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
  const [selectedYear, setSelectedYear] = useState<string>("2025-26");
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);

  // Retrieve board members and department leads based on selected year
  const activeYearData = YEAR_DATA[selectedYear] || YEAR_DATA["2025-26"];

  return (
    <main className="w-full min-h-screen bg-[#5878AF] relative flex flex-col items-center pt-8 overflow-hidden select-none">
      
      {/* Dashed curved paths in the background */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M -100,100 Q 300,50 800,120 T 1900,80" 
          fill="none" 
          stroke="white" 
          strokeWidth="4" 
          strokeDasharray="12 12" 
          strokeOpacity="0.3"
        />
        <path 
          d="M -100,500 Q 400,600 900,450 T 2100,550" 
          fill="none" 
          stroke="white" 
          strokeWidth="4" 
          strokeDasharray="12 12" 
          strokeOpacity="0.3"
        />
      </svg>

      {/* Tab Switcher Panel */}
      <div className="flex justify-center items-center gap-6 sm:gap-12 mt-4 mb-10 z-10 relative">
        <button 
          onClick={() => setActiveTab("board")}
          className={`px-8 py-2.5 font-teko text-3xl sm:text-4xl tracking-widest uppercase rounded-lg border-2 border-black transition-all duration-300 cursor-pointer ${
            activeTab === "board" 
              ? "bg-black text-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.4)] scale-105" 
              : "text-white border-transparent hover:border-white/10"
          }`}
        >
          BOARD
        </button>
        <button 
          onClick={() => setActiveTab("departments")}
          className={`px-8 py-2.5 font-teko text-3xl sm:text-4xl tracking-widest uppercase rounded-lg border-2 border-black transition-all duration-300 cursor-pointer ${
            activeTab === "departments" 
              ? "bg-black text-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.4)] scale-105" 
              : "text-white border-transparent hover:border-white/10"
          }`}
        >
          DEPARTMENTS
        </button>
      </div>

      {/* Main Staggered Content Area */}
      <div className="w-full max-w-5xl mx-auto px-6 mb-20 relative z-10 min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeTab === "board" ? (
            // BOARD VIEW WITH YEAR SWITCHER
            <motion.div 
              key="board"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center w-full"
            >
              {/* Year Selector row */}
              <div className="flex justify-center gap-4 mb-12">
                {Object.keys(YEAR_DATA).map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-6 py-2.5 font-bebas text-lg tracking-widest uppercase rounded-lg border-2 border-black transition-all duration-300 cursor-pointer ${
                      selectedYear === year
                        ? "bg-black text-white shadow-[3px_3px_0px_0px_rgba(255,255,255,0.4)] scale-105"
                        : "bg-white text-black hover:bg-neutral-100 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>

              {/* Executive Board segment */}
              <h3 className="font-bebas text-3xl tracking-widest text-white uppercase font-bold mb-6 text-center">
                Executive Board
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 justify-items-center w-full mb-16">
                {activeYearData.board.map((member, index) => (
                  <BoardCard 
                    key={index}
                    name={member.name}
                    designation={member.designation}
                    isBlack={member.isBlack}
                    index={index}
                  />
                ))}
              </div>

              {/* Department Leads segment */}
              <h3 className="font-bebas text-3xl tracking-widest text-white uppercase font-bold mb-6 text-center">
                Department Leads
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 justify-items-center w-full">
                {activeYearData.leads.map((lead, index) => (
                  <BoardCard 
                    key={index}
                    name={lead.name}
                    designation={`${lead.dept} Lead`}
                    isBlack={false}
                    index={index + 3} // offset index for staggered tilt rotations
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            // DEPARTMENTS VIEW
            <motion.div 
              key="departments"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 justify-items-center"
            >
              {DEPARTMENTS.map((dept, index) => (
                <DepartmentCard 
                  key={dept.id}
                  name={dept.name}
                  leadsCount={dept.leadsCount}
                  membersCount={dept.membersCount}
                  icon={dept.icon}
                  index={index}
                  onClick={() => setSelectedDept(dept)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Detailed Modal Overlay */}
      <AnimatePresence>
        {selectedDept && (
          <DepartmentModal 
            dept={selectedDept}
            onClose={() => setSelectedDept(null)}
          />
        )}
      </AnimatePresence>

      {/* Leadership board quote section (always visible below) */}
      <LeadershipBoard />

      {/* Global Footer */}
      <Footer />
    </main>
  );
}
