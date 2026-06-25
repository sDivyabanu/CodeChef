"use client";

import { useState } from "react";
import LeadCard from "./LeadCard";

const years = ["2023-24", "2024-25", "2025-26", "2026-27"];

export default function Board() {
  const [selectedYear, setSelectedYear] = useState("2025-26");

  return (
    <section className="relative min-h-screen px-6 md:px-12 py-12">
      {/* Title */}
      <h1 className="text-center text-white text-7xl tracking-wider mb-10">
        LEADS
      </h1>

      {/* Wheel Picker */}
      <div className="flex justify-center mb-16 no-scrollbar">
        <div className="h-[220px] overflow-y-auto snap-y snap-mandatory no-scrollbar text-center ">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`
                 h-[70px]
        flex
        items-center
        justify-center
        snap-center
        cursor-pointer
        transition-all
        duration-300
        
                ${
                  selectedYear === year
                    ? "text-white text-5xl scale-110"
                    : "text-white/50 text-3xl"
                }
              `}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* Top Leadership */}
      <div className="flex flex-wrap justify-center items-start gap-8 mb-20">
        <LeadCard role="Vice President" />

        <LeadCard role="President" featured />

        <LeadCard role="General Secretary" />

        <LeadCard role="Co-Secretary" />
      </div>

      {/* CP */}
      <DepartmentRow title="Technical (CP)">
        <LeadCard role="Technical (CP)" />
        <LeadCard role="Technical (CP)" featured />
        <LeadCard role="Technical (CP)" />
      </DepartmentRow>

     <div className="grid md:grid-cols-2 gap-8 mb-16">
  <DepartmentRow title="Web Development">
    <LeadCard role="Web Development" />
    <LeadCard role="Web Development" featured />
  </DepartmentRow>

  <DepartmentRow title="Projects">
    <LeadCard role="Projects" />
  </DepartmentRow>
</div>
<div className="grid md:grid-cols-2 gap-8 mb-16">
      {/* Design */}
      <DepartmentRow title="Design">
        <LeadCard role="Design" />
        <LeadCard role="Design" featured />
      </DepartmentRow>

      {/* Social */}
      <DepartmentRow title="Social Media & Content">
        <LeadCard role="Social Media" />
        <LeadCard role="Social Media" featured />
      </DepartmentRow>
</div>
<div className="grid md:grid-cols-2 gap-8 mb-16">
      {/* Outreach */}
      <DepartmentRow title="Outreach">
        <LeadCard role="Outreach" />
        <LeadCard role="Outreach" featured />
      </DepartmentRow>

      {/* Event */}
      <DepartmentRow title="Event Management">
        <LeadCard role="Event Management" />
        <LeadCard role="Event Management" featured />
      </DepartmentRow>
      </div>
    </section>
  );
}


interface DepartmentRowProps {
  title: string;
  children: React.ReactNode;
}

function DepartmentRow({
  title,
  children,
}: DepartmentRowProps) {
  return (
    <div className="mb-16">
      <h2 className="text-center text-white text-5xl tracking-wide mb-8">
        {title}
      </h2>

      <div className="flex flex-wrap justify-center gap-8">
        {children}
      </div>
    </div>
  );
}