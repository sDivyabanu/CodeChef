"use client";

import React from "react";
import { User } from "lucide-react";

interface LeadCardProps {
  name: string;
  imageUrl?: string;
  linkedin?: string;
  role: string;
  featured?: boolean;
}

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
);

export default function LeadCard({
  name,
  imageUrl,
  linkedin,
  role,
  featured = false,
}: LeadCardProps) {
  const [imgError, setImgError] = React.useState(false);

  return (
    <div
      className={`
        relative
        w-[210px]
        h-[290px]
        p-5
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
      <div className="flex justify-center mt-2">
        {imageUrl && !imgError ? (
          <img
            src={imageUrl}
            alt={name}
            onError={() => setImgError(true)}
            className={`
              w-32
              h-32
              rounded-sm
              border-2
              object-cover
              ${
                featured ? "border-white" : "border-gray-500"
              }
            `}
          />
        ) : (
          <div
            className={`
              w-32
              h-32
              rounded-sm
              border-2
              flex items-center justify-center
              ${
                featured
                  ? "bg-neutral-800 border-white text-white/40"
                  : "bg-gray-300 border-gray-500 text-gray-500"
              }
            `}
          >
            <User size={52} />
          </div>
        )}
      </div>

      {/* Name */}
      <h3
        className="mt-4 text-center text-xl font-bold tracking-wide truncate"
        title={name}
      >
        {name}
      </h3>

      {/* Role */}
      <p
        className="mt-1 text-center text-sm tracking-wider opacity-85 truncate"
        title={role}
      >
        {role}
      </p>

      {/* Linkedin */}
      {linkedin && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-110 text-inherit"
          >
            <LinkedinIcon className="w-6 h-6" />
          </a>
        </div>
      )}
    </div>
  );
}