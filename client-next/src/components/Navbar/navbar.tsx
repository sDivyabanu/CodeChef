"use client";

import Link from "next/link";
import {
  House,
  CalendarDays,
  Newspaper,
  Users,
  Trophy,
} from "lucide-react";

export default function Navbar() {
  const navItems = [
    { name: "Home", href: "/home", icon: House },
    { name: "Events", href: "/events", icon: CalendarDays },
    { name: "Blogs", href: "/blogs", icon: Newspaper },
    { name: "Team", href: "/team", icon: Users },
    { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
  ];

  return (
    <div
      className="
        fixed
        bottom-3
        left-1/2
        -translate-x-1/2
        lg:left-auto
        lg:bottom-auto
        lg:right-6
        lg:top-1/2
        lg:translate-x-0
        lg:-translate-y-1/2
        z-50
      "
    >
      <nav
        className="
          bg-black/95
          backdrop-blur-md
          rounded-[22px]
          lg:rounded-[28px]
          px-3
          lg:px-2
          py-2
          lg:py-8
          border
          border-white/10
          shadow-2xl
          max-w-[calc(100vw-1.5rem)]
          overflow-hidden
        "
      >
        <div className="flex flex-row lg:flex-col items-center gap-3 sm:gap-5">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className="
                  flex
                  flex-col
                  items-center
                  gap-1
                  text-[#ECE9C7]
                  hover:scale-110
                  transition-all
                  duration-300
                "
              >
                <Icon size={18} />

                <span
                  className="
                    font-bebas
                    text-[10px]
                    sm:text-xs
                    tracking-wide
                    sm:tracking-wider
                    text-center
                    leading-none
                  "
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
