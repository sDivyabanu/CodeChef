"use client";

import { User } from "lucide-react";

interface LeadCardProps {
  role: string;
  featured?: boolean;
}

export default function LeadCard({
  role,
  featured = false,
}: LeadCardProps) {
  return (
    <div
      className={`
        relative
        w-[170px]
        h-[240px]
        p-4
        shadow-[8px_8px_0px_rgba(0,0,0,0.25)]
        transition-all
        duration-300
        hover:-translate-y-2
        hover:rotate-0
        cursor-pointer

        ${
          featured
            ? "bg-black text-white rotate-[-2deg]"
            : "bg-[#F6F4D8] text-[#113B8D] rotate-[4deg]"
        }
      `}
    >
      {/* Pin */}
      <div
        className={`
          absolute
          top-2
          right-2
          w-3
          h-3
          rounded-full
          border

          ${
            featured
              ? "bg-white border-gray-300"
              : "bg-gray-100 border-gray-500"
          }
        `}
      />

      {/* Profile */}
      <div className="flex justify-center mt-3">
        <div
          className={`
            w-20
            h-20
            rounded-sm
            border-2

            ${
              featured
                ? "bg-neutral-800 border-white"
                : "bg-gray-300 border-gray-500"
            }
          `}
        />
      </div>

      {/* Name */}
      <h3
        className={`
          mt-5
          text-center
          text-2xl
          tracking-wide
        `}
      >
        Name
      </h3>

      {/* Role */}
      <p
        className={`
          text-center
          text-sm
          tracking-wider
          opacity-80
        `}
      >
        {role}
      </p>

      {/* Linkedin */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className={`
            transition-transform
            hover:scale-110
          `}
        >
          <User size={22} />
        </a>
      </div>
    </div>
  );
}