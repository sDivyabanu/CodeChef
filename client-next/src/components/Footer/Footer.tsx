"use client";

import Link from "next/link";
import React from "react";

export default function Footer() {
  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/codechef-vit-chennai-chapter",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...props}
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://instagram.com/codechef.vitc",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...props}
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
    {
      name: "Email",
      href: "mailto:codechef.vitcc@gmail.com",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...props}
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
  ];

  const navItems = [
    { name: "HOME", href: "/home" },
    { name: "BLOGS", href: "/blogs" },
    { name: "LEADERBOARDS", href: "/leaderboard" },
    { name: "EVENTS", href: "/events" },
    { name: "OUR TEAM", href: "/team" },
    { name: "GAME ARENA", href: "/games" },
  ];

  return (
    <footer className="w-full bg-[#F5F0D8] select-none">
      {/* Decorative Notched Top Border */}
      <div className="w-full h-12 bg-[#5878AF]">
        <svg
          viewBox="0 0 1920 48"
          className="w-full h-full block"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Black trapezoid notch */}
          <path
            d="M 320,48 L 360,0 L 580,0 L 620,48 Z"
            fill="#000000"
          />
          {/* Dark Blue parallelogram notch */}
          <path
            d="M 620,48 L 580,0 L 730,0 L 770,48 Z"
            fill="#0b1c3d"
          />
          {/* Cream notch (merges with the main footer background) */}
          <path
            d="M 770,48 L 730,0 L 1920,0 L 1920,48 Z"
            fill="#F5F0D8"
          />
        </svg>
      </div>

      {/* Main Content Area */}
      <div className="w-full px-10 py-10 md:py-16">
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-10 md:gap-6">
          
          {/* Left Section: Social Icons */}
          <div className="flex items-center justify-center md:justify-start gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="
                    bg-black 
                    text-[#F5F0D8] 
                    w-12 
                    h-12 
                    flex 
                    items-center 
                    justify-center 
                    rounded-lg 
                    shadow-[0_4px_10px_rgba(0,0,0,0.25)] 
                    transition-all 
                    duration-300 
                    ease-out
                    hover:-translate-y-1 
                    hover:shadow-[0_8px_20px_rgba(0,0,0,0.35)] 
                    hover:bg-[#1a1a1a]
                  "
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>

          {/* Right Section: Navigation Grid */}
          <div className="w-full md:w-auto flex justify-center md:justify-end">
            <div className="grid grid-cols-3 gap-3 md:gap-5">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="
                    bg-black 
                    text-white 
                    font-sans 
                    font-bold 
                    text-[10px] 
                    xs:text-xs 
                    md:text-sm 
                    tracking-widest 
                    py-3 
                    px-3 
                    xs:px-4 
                    md:px-8 
                    text-center 
                    rounded-lg 
                    shadow-[0_4px_10px_rgba(0,0,0,0.25)] 
                    transition-all 
                    duration-300 
                    ease-out
                    hover:-translate-y-1 
                    hover:shadow-[0_8px_20px_rgba(0,0,0,0.35)] 
                    hover:bg-[#1a1a1a] 
                    flex 
                    items-center 
                    justify-center 
                    whitespace-nowrap
                  "
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Brand Section */}
      <div className="bg-[#0b1c3d] pt-8 md:pt-14 pb-4 overflow-hidden border-t border-black/10">
        <div className="max-w-[1600px] mx-auto px-4 relative">
          <div 
            className="
              text-center 
              font-sans 
              font-black 
              text-[4.5rem] 
              xs:text-[6rem] 
              sm:text-[9rem] 
              md:text-[13rem] 
              lg:text-[16rem] 
              leading-none 
              text-[#F5F0D8] 
              tracking-tighter 
              select-none
            "
          >
            CodeChef
          </div>
        </div>
      </div>

      {/* Bottom Blue Strip */}
      <div className="h-2.5 w-full bg-[#1b82cf]" />
    </footer>
  );
}