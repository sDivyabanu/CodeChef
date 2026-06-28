"use client";

import { useEffect, useState, useRef } from "react";
import LeadCard from "./LeadCard";
import { client } from "@/lib/sanityClient";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface SanityLead {
  _id: string;
  name: string;
  email?: string;
  batch?: string;
  imageUrl?: string;
  imageHashCode?: string;
  linkedin?: string;
  position?: string;
}

const years = ["2023-24", "2024-25", "2025-26", "2026-27"];

export default function Board() {
  const [selectedYear, setSelectedYear] = useState("2026-27");
  const [leads, setLeads] = useState<SanityLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const activeYearRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!loading && activeYearRef.current) {
      const timer = setTimeout(() => {
        activeYearRef.current?.scrollIntoView({
          behavior: "auto",
          block: "center",
        });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  useEffect(() => {
    async function fetchLeads() {
      try {
        setLoading(true);
        setError(false);
        const query = `*[_type == "clubLeads"]`;
        const data = await client.fetch(query);
        if (Array.isArray(data)) {
          setLeads(data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching leads from Sanity:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchLeads();
  }, []);

  const targetBatch = selectedYear.split("-")[0];

  // Filter leads for the selected batch
  const filteredLeads = leads.filter((lead) => {
    if (!lead.batch) return false;
    const batchClean = lead.batch.trim();
    return batchClean === targetBatch || batchClean.startsWith(targetBatch);
  });

  const getLeadsByPosition = (positionNames: string[]) => {
    return filteredLeads.filter((lead) => {
      if (!lead.position) return false;
      const pos = lead.position.toLowerCase().trim();
      return positionNames.some((p) => pos === p.toLowerCase().trim());
    });
  };

  // Top Leadership
  const presidents = getLeadsByPosition(["President"]);
  const vps = getLeadsByPosition(["Vice President"]);
  const genSecs = getLeadsByPosition(["General Secretary"]);
  const coSecs = getLeadsByPosition(["Co-Secretary"]);

  // Departments
  const cpLeads = getLeadsByPosition(["Technical (CP)", "Competitive Programming"]);
  const webLeads = getLeadsByPosition(["Web Development"]);
  const projectsLeads = getLeadsByPosition(["Projects", "Projects & Web Dev"]);
  const designLeads = getLeadsByPosition(["Design"]);
  const socialLeads = getLeadsByPosition(["Social Media & Content", "Social Media"]);
  const outreachLeads = getLeadsByPosition(["Outreach"]);
  const eventLeads = getLeadsByPosition(["Event Management"]);
  const financeLeads = getLeadsByPosition(["Finance"]);
  const marketingLeads = getLeadsByPosition(["Marketing & Sponsorship", "Marketing"]);

  const hasTopLeads = presidents.length > 0 || vps.length > 0 || genSecs.length > 0 || coSecs.length > 0;

  return (
    <section className="relative min-h-screen max-w-[1466px] w-[90%] mx-auto py-12">
      {/* Title */}
      <h1 className="text-center text-white text-7xl sm:text-8xl md:text-9xl font-teko tracking-widest uppercase mb-10">
        LEADS
      </h1>

      {/* Wheel Picker */}
      <WheelYearPicker
        years={years}
        selectedYear={selectedYear}
        onChange={setSelectedYear}
      />

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <Loader2 className="w-12 h-12 text-white animate-spin" />
          <p className="text-xl font-semibold tracking-wider text-white">Loading Leads...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-24">
          <p className="text-2xl font-bold text-red-100">Failed to load leads from the server.</p>
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24">
          <p className="text-2xl font-semibold text-white/80 tracking-wide">
            No leads data found for the selected batch ({selectedYear}).
          </p>
        </div>
      ) : (
        <>
          {/* Top Leadership */}
          {hasTopLeads && (
            <div className="flex flex-wrap justify-center items-start gap-8 mb-20">
              {vps.map((lead) => (
                <LeadCard
                  key={lead._id}
                  name={lead.name}
                  imageUrl={lead.imageUrl}
                  linkedin={lead.linkedin}
                  role="Vice President"
                />
              ))}

              {presidents.map((lead) => (
                <LeadCard
                  key={lead._id}
                  name={lead.name}
                  imageUrl={lead.imageUrl}
                  linkedin={lead.linkedin}
                  role="President"
                  featured
                />
              ))}

              {genSecs.map((lead) => (
                <LeadCard
                  key={lead._id}
                  name={lead.name}
                  imageUrl={lead.imageUrl}
                  linkedin={lead.linkedin}
                  role="General Secretary"
                />
              ))}

              {coSecs.map((lead) => (
                <LeadCard
                  key={lead._id}
                  name={lead.name}
                  imageUrl={lead.imageUrl}
                  linkedin={lead.linkedin}
                  role="Co-Secretary"
                />
              ))}
            </div>
          )}

          {/* CP */}
          {cpLeads.length > 0 && (
            <DepartmentRow title="Technical (CP)">
              {cpLeads.map((lead, idx) => (
                <LeadCard
                  key={lead._id}
                  name={lead.name}
                  imageUrl={lead.imageUrl}
                  linkedin={lead.linkedin}
                  role={lead.position || "Technical (CP)"}
                  featured={idx === 1}
                />
              ))}
            </DepartmentRow>
          )}

          {/* Web Dev & Projects */}
          {webLeads.length > 0 && projectsLeads.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <DepartmentRow title="Web Development">
                {webLeads.map((lead, idx) => (
                  <LeadCard
                    key={lead._id}
                    name={lead.name}
                    imageUrl={lead.imageUrl}
                    linkedin={lead.linkedin}
                    role={lead.position || "Web Development"}
                    featured={idx === 1}
                  />
                ))}
              </DepartmentRow>
              <DepartmentRow title="Projects">
                {projectsLeads.map((lead, idx) => (
                  <LeadCard
                    key={lead._id}
                    name={lead.name}
                    imageUrl={lead.imageUrl}
                    linkedin={lead.linkedin}
                    role={lead.position || "Projects"}
                    featured={idx === 1}
                  />
                ))}
              </DepartmentRow>
            </div>
          ) : (
            <div className="mb-16">
              {webLeads.length > 0 && (
                <DepartmentRow title="Web Development">
                  {webLeads.map((lead, idx) => (
                    <LeadCard
                      key={lead._id}
                      name={lead.name}
                      imageUrl={lead.imageUrl}
                      linkedin={lead.linkedin}
                      role={lead.position || "Web Development"}
                      featured={idx === 1}
                    />
                  ))}
                </DepartmentRow>
              )}
              {projectsLeads.length > 0 && (
                <DepartmentRow title="Projects">
                  {projectsLeads.map((lead, idx) => (
                    <LeadCard
                      key={lead._id}
                      name={lead.name}
                      imageUrl={lead.imageUrl}
                      linkedin={lead.linkedin}
                      role={lead.position || "Projects"}
                      featured={idx === 1}
                    />
                  ))}
                </DepartmentRow>
              )}
            </div>
          )}

          {/* Design & Social Media */}
          {designLeads.length > 0 && socialLeads.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <DepartmentRow title="Design">
                {designLeads.map((lead, idx) => (
                  <LeadCard
                    key={lead._id}
                    name={lead.name}
                    imageUrl={lead.imageUrl}
                    linkedin={lead.linkedin}
                    role={lead.position || "Design"}
                    featured={idx === 1}
                  />
                ))}
              </DepartmentRow>
              <DepartmentRow title="Social Media & Content">
                {socialLeads.map((lead, idx) => (
                  <LeadCard
                    key={lead._id}
                    name={lead.name}
                    imageUrl={lead.imageUrl}
                    linkedin={lead.linkedin}
                    role={lead.position || "Social Media & Content"}
                    featured={idx === 1}
                  />
                ))}
              </DepartmentRow>
            </div>
          ) : (
            <div className="mb-16">
              {designLeads.length > 0 && (
                <DepartmentRow title="Design">
                  {designLeads.map((lead, idx) => (
                    <LeadCard
                      key={lead._id}
                      name={lead.name}
                      imageUrl={lead.imageUrl}
                      linkedin={lead.linkedin}
                      role={lead.position || "Design"}
                      featured={idx === 1}
                    />
                  ))}
                </DepartmentRow>
              )}
              {socialLeads.length > 0 && (
                <DepartmentRow title="Social Media & Content">
                  {socialLeads.map((lead, idx) => (
                    <LeadCard
                      key={lead._id}
                      name={lead.name}
                      imageUrl={lead.imageUrl}
                      linkedin={lead.linkedin}
                      role={lead.position || "Social Media & Content"}
                      featured={idx === 1}
                    />
                  ))}
                </DepartmentRow>
              )}
            </div>
          )}

          {/* Outreach & Event Management */}
          {outreachLeads.length > 0 && eventLeads.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <DepartmentRow title="Outreach">
                {outreachLeads.map((lead, idx) => (
                  <LeadCard
                    key={lead._id}
                    name={lead.name}
                    imageUrl={lead.imageUrl}
                    linkedin={lead.linkedin}
                    role={lead.position || "Outreach"}
                    featured={idx === 1}
                  />
                ))}
              </DepartmentRow>
              <DepartmentRow title="Event Management">
                {eventLeads.map((lead, idx) => (
                  <LeadCard
                    key={lead._id}
                    name={lead.name}
                    imageUrl={lead.imageUrl}
                    linkedin={lead.linkedin}
                    role={lead.position || "Event Management"}
                    featured={idx === 1}
                  />
                ))}
              </DepartmentRow>
            </div>
          ) : (
            <div className="mb-16">
              {outreachLeads.length > 0 && (
                <DepartmentRow title="Outreach">
                  {outreachLeads.map((lead, idx) => (
                    <LeadCard
                      key={lead._id}
                      name={lead.name}
                      imageUrl={lead.imageUrl}
                      linkedin={lead.linkedin}
                      role={lead.position || "Outreach"}
                      featured={idx === 1}
                    />
                  ))}
                </DepartmentRow>
              )}
              {eventLeads.length > 0 && (
                <DepartmentRow title="Event Management">
                  {eventLeads.map((lead, idx) => (
                    <LeadCard
                      key={lead._id}
                      name={lead.name}
                      imageUrl={lead.imageUrl}
                      linkedin={lead.linkedin}
                      role={lead.position || "Event Management"}
                      featured={idx === 1}
                    />
                  ))}
                </DepartmentRow>
              )}
            </div>
          )}

          {/* Finance & Marketing */}
          {financeLeads.length > 0 && marketingLeads.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <DepartmentRow title="Finance">
                {financeLeads.map((lead, idx) => (
                  <LeadCard
                    key={lead._id}
                    name={lead.name}
                    imageUrl={lead.imageUrl}
                    linkedin={lead.linkedin}
                    role={lead.position || "Finance"}
                    featured={idx === 1}
                  />
                ))}
              </DepartmentRow>
              <DepartmentRow title="Marketing & Sponsorship">
                {marketingLeads.map((lead, idx) => (
                  <LeadCard
                    key={lead._id}
                    name={lead.name}
                    imageUrl={lead.imageUrl}
                    linkedin={lead.linkedin}
                    role={lead.position || "Marketing & Sponsorship"}
                    featured={idx === 1}
                  />
                ))}
              </DepartmentRow>
            </div>
          ) : (
            <div className="mb-16">
              {financeLeads.length > 0 && (
                <DepartmentRow title="Finance">
                  {financeLeads.map((lead, idx) => (
                    <LeadCard
                      key={lead._id}
                      name={lead.name}
                      imageUrl={lead.imageUrl}
                      linkedin={lead.linkedin}
                      role={lead.position || "Finance"}
                      featured={idx === 1}
                    />
                  ))}
                </DepartmentRow>
              )}
              {marketingLeads.length > 0 && (
                <DepartmentRow title="Marketing & Sponsorship">
                  {marketingLeads.map((lead, idx) => (
                    <LeadCard
                      key={lead._id}
                      name={lead.name}
                      imageUrl={lead.imageUrl}
                      linkedin={lead.linkedin}
                      role={lead.position || "Marketing & Sponsorship"}
                      featured={idx === 1}
                    />
                  ))}
                </DepartmentRow>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
}

interface DepartmentRowProps {
  title: string;
  children: React.ReactNode;
}

function DepartmentRow({ title, children }: DepartmentRowProps) {
  return (
    <div className="mb-16">
      <h2 className="text-center text-white text-4xl sm:text-5xl font-teko tracking-widest uppercase mb-8">
        {title}
      </h2>

      <div className="flex flex-wrap justify-center gap-8">
        {children}
      </div>
    </div>
  );
}

// Helper Component: Interactive 3D Wheel Year Picker
function WheelYearPicker({
  years,
  selectedYear,
  onChange,
}: {
  years: string[];
  selectedYear: string;
  onChange: (year: string) => void;
}) {
  const activeIdx = years.indexOf(selectedYear);

  return (
    <div className="relative flex flex-row items-center justify-center gap-8 w-full max-w-sm mx-auto mb-14 select-none z-20">
      {/* Dashed vertical track on the left of the drum wheel */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[2px] border-l-2 border-dashed border-white/20 -translate-y-1/2 -z-10" />

      {/* Scroll controls (stacked vertically) */}
      <div className="flex flex-col gap-4 items-center justify-center">
        {/* Scroll Up Button */}
        <button
          onClick={() => {
            if (activeIdx > 0) onChange(years[activeIdx - 1]);
          }}
          disabled={activeIdx === 0}
          className={`w-9 h-9 rounded-full border-[2px] border-black bg-[#F5F0D8] text-black flex items-center justify-center shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] hover:bg-[#eae3c4] active:translate-y-[1px] active:shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer z-40 ${
            activeIdx === 0 ? "opacity-35 cursor-not-allowed" : ""
          }`}
          aria-label="Previous Year"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>

        {/* Scroll Down Button */}
        <button
          onClick={() => {
            if (activeIdx < years.length - 1) onChange(years[activeIdx + 1]);
          }}
          disabled={activeIdx === years.length - 1}
          className={`w-9 h-9 rounded-full border-[2px] border-black bg-[#F5F0D8] text-black flex items-center justify-center shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] hover:bg-[#eae3c4] active:translate-y-[1px] active:shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer z-40 ${
            activeIdx === years.length - 1 ? "opacity-35 cursor-not-allowed" : ""
          }`}
          aria-label="Next Year"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>

      {/* The 3D Vertical Wheel Container */}
      <div 
        className="relative flex flex-col items-center justify-center h-48 w-48 overflow-visible"
        style={{ perspective: "800px" }}
      >
        {years.map((year, idx) => {
          const offset = idx - activeIdx;
          
          // Only render items within a 2-step visibility range to form a clean vertical drum
          if (Math.abs(offset) > 2) return null;

          // Compute dynamic positioning styles for vertical rotation (along X-axis)
          const yTranslation = offset * 46; // vertical offset spacing
          const zDepth = -Math.abs(offset) * 55; // 3D depth
          const rotationX = -offset * 25; // rotation angle along X axis
          const scaleFactor = 1 - Math.abs(offset) * 0.15; // scaling down distant items
          const opacityVal = Math.max(0, 1 - Math.abs(offset) * 0.45); // fading out distant items

          return (
            <motion.div
              key={year}
              animate={{
                y: yTranslation,
                z: zDepth,
                rotateX: rotationX,
                scale: scaleFactor,
                opacity: opacityVal,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 24,
              }}
              onClick={() => {
                if (Math.abs(offset) <= 1) onChange(year);
              }}
              className={`
                absolute cursor-pointer font-bebas text-xl sm:text-2xl tracking-widest uppercase px-5 py-1.5 rounded-md border-[2.5px] border-black text-center transition-colors duration-200 w-36
                ${offset === 0
                  ? "bg-black text-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.4)] z-30 font-bold"
                  : "bg-[#F5F0D8] text-black hover:bg-[#eae3c4] shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] z-10"
                }
                ${Math.abs(offset) > 1 ? "pointer-events-none" : ""}
              `}
              style={{ transformStyle: "preserve-3d" }}
            >
              {year}
            </motion.div>
          );
        })}
      </div>

      {/* Wheel pointer Indicator */}
      <div className="flex flex-row items-center gap-1.5 z-10 border-l border-black/10 pl-4 h-12">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-black rotate-90">
          <path d="M12 3l6 6H6z" />
        </svg>
        <span className="font-sans text-[9px] text-white/50 tracking-wider font-extrabold uppercase mt-0.5">
          Year
        </span>
      </div>
    </div>
  );
}