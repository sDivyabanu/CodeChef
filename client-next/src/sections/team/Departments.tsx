"use client";

import { useEffect, useState } from "react";
import { client } from "@/lib/sanityClient";
import { Loader2, X, ExternalLink, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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


interface SanityDepartment {
  _id: string;
  name: string;
  icon?: string;
  description: string;
  members?: number;
}

interface SanityLead {
  _id: string;
  name: string;
  batch?: string;
  imageUrl?: string;
  imageHashCode?: string;
  linkedin?: string;
  position?: string;
}

interface SanityMember {
  name: string;
  linkedin?: string;
}

interface SanityDepartmentMembers {
  _id: string;
  departmentName: string;
  members: SanityMember[];
}

function LeadAvatar({ lead }: { lead: SanityLead }) {
  const [imgError, setImgError] = useState(false);

  return (
    <a
      href={lead.linkedin || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2.5 group cursor-pointer"
      title={`View ${lead.name}'s LinkedIn`}
    >
      {lead.imageUrl && !imgError ? (
        <img
          src={lead.imageUrl}
          alt={lead.name}
          onError={() => setImgError(true)}
          className="w-9 h-9 rounded-full border-2 border-black object-cover group-hover:scale-105 transition-transform shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]"
        />
      ) : (
        <div className="w-9 h-9 rounded-full border-2 border-black bg-neutral-300 flex items-center justify-center text-xs font-bold text-[#113B8D] shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]">
          {lead.name.charAt(0).toUpperCase()}
        </div>
      )}
      <span className="text-xs font-bold group-hover:underline truncate max-w-[120px] text-black">
        {lead.name}
      </span>
    </a>
  );
}

export default function Departments() {
  const [departments, setDepartments] = useState<SanityDepartment[]>([]);
  const [leads, setLeads] = useState<SanityLead[]>([]);
  const [members, setMembers] = useState<SanityDepartmentMembers[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeDept, setActiveDept] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(false);

        const [deptsData, leadsData, membersData] = await Promise.all([
          client.fetch(`*[_type == "departments"]`),
          client.fetch(`*[_type == "clubLeads"]`),
          client.fetch(`*[_type == "departmentMembers"]`),
        ]);

        if (Array.isArray(deptsData) && Array.isArray(leadsData) && Array.isArray(membersData)) {
          setDepartments(deptsData);
          setLeads(leadsData);
          setMembers(membersData);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching departments/members/leads:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const normalizeDepartmentName = (value = "") => {
    const normalized = value.toLowerCase().trim();

    if (normalized.includes("technical") || normalized.includes("competitive programming")) {
      return "technical cp";
    }

    if (
      normalized.includes("projects & web dev") ||
      normalized.includes("projects and web dev") ||
      normalized.includes("web development") ||
      normalized === "projects"
    ) {
      return "projects web dev";
    }

    if (
      normalized.includes("outreach") ||
      normalized.includes("marketing") ||
      normalized.includes("sponsorship")
    ) {
      return "outreach";
    }

    return normalized.replace(/&/g, "and");
  };

  const currentBatchLeads = leads.filter(
    (lead) => lead.batch === "2026" || lead.batch?.startsWith("2026")
  );

  const getDepartmentLeads = (deptName: string) => {
    const normalizedDept = normalizeDepartmentName(deptName);
    return currentBatchLeads.filter((lead) => {
      if (!lead.position) return false;
      const leadPos = normalizeDepartmentName(lead.position);
      return leadPos === normalizedDept;
    });
  };

  const getDepartmentMembersList = (deptName: string) => {
    const normalizedDept = normalizeDepartmentName(deptName);
    const match = members.find(
      (m) => normalizeDepartmentName(m.departmentName) === normalizedDept
    );
    return match?.members || [];
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDept(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section className="relative min-h-screen max-w-[1466px] w-[90%] mx-auto py-12">
      {/* Title */}
      <h1 className="text-center text-white text-7xl font-bold tracking-wider mb-16 uppercase">
        DEPARTMENTS
      </h1>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <Loader2 className="w-12 h-12 text-white animate-spin" />
          <p className="text-xl font-semibold tracking-wider text-white">Loading Departments...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-24 text-white">
          <ShieldAlert className="w-16 h-16 text-red-200 mb-4 animate-pulse" />
          <p className="text-2xl font-bold text-red-100">Failed to load department details.</p>
        </div>
      ) : departments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24">
          <p className="text-2xl font-semibold text-white/80 tracking-wide">
            No departments found.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4">
          {departments.map((dept, index) => {
            const deptLeads = getDepartmentLeads(dept.name);
            const rotation = index % 2 === 0 ? "rotate-[-1deg]" : "rotate-[1deg]";

            return (
              <div
                key={dept._id}
                className={`
                  relative flex flex-col
                  bg-[#F6F4D8] text-[#113B8D]
                  p-6 md:p-8
                  border-4 border-black
                  shadow-[8px_8px_0px_rgba(0,0,0,1)]
                  transition-all duration-300
                  hover:-translate-y-2.5 hover:shadow-[12px_12px_0px_rgba(0,0,0,1)] hover:rotate-0
                  ${rotation}
                `}
              >
                {/* Push Pin Head / Tack */}
                <div className="absolute top-3 right-3 w-4.5 h-4.5 rounded-full bg-red-500 border-2 border-black shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
                </div>
                <div className="flex justify-between items-start gap-4 mb-4">
                  <h3 className="text-3xl font-extrabold tracking-wide uppercase leading-tight text-black">
                    {dept.name}
                  </h3>
                  {dept.icon && (
                    <img
                      src={dept.icon}
                      alt={`${dept.name} icon`}
                      className="w-12 h-12 object-contain flex-shrink-0"
                    />
                  )}
                </div>
                <p className="text-sm font-medium leading-relaxed mb-6 flex-grow text-neutral-800">
                  {dept.description}
                </p>
                {deptLeads.length > 0 && (
                  <div className="mb-6 border-t-2 border-dashed border-black/20 pt-4">
                    <h4 className="text-xs font-black uppercase tracking-widest text-neutral-500 mb-3">
                      Leads
                    </h4>
                    <div className="flex flex-wrap gap-4">
                      {deptLeads.map((lead) => (
                        <LeadAvatar key={lead._id} lead={lead} />
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setActiveDept(dept.name)}
                  className="w-full py-3 bg-[#113B8D] text-white hover:bg-black font-black tracking-widest text-xs uppercase border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all mt-auto"
                >
                  {dept.members ? `${dept.members} Members` : "View Members"}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Popup Modal for Members */}
      <AnimatePresence>
        {activeDept && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveDept(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-xl bg-[#F6F4D8] border-4 border-black text-[#113B8D] p-6 md:p-8 shadow-[12px_12px_0px_rgba(0,0,0,1)] z-10 flex flex-col max-h-[90vh]"
            >
              <button
                onClick={() => setActiveDept(null)}
                className="absolute top-4 right-4 p-1.5 border-2 border-black hover:bg-black hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
              <h2 className="text-3xl font-extrabold uppercase tracking-wide pr-10 mb-6 border-b-2 border-black pb-4">
                {activeDept} Members
              </h2>

              <div className="overflow-y-auto max-h-[50vh] pr-2 no-scrollbar">
                {getDepartmentMembersList(activeDept).length === 0 ? (
                  <p className="text-center font-bold text-lg py-8 opacity-80">
                    No members listed for this department yet.
                  </p>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b-2 border-black/40 text-sm font-black uppercase tracking-wider">
                        <th className="py-2.5 px-3 w-16">#</th>
                        <th className="py-2.5 px-3">Name</th>
                        <th className="py-2.5 px-3 text-right">LinkedIn</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getDepartmentMembersList(activeDept).map((member, index) => (
                        <tr
                          key={index}
                          className="border-b border-black/10 hover:bg-black/5 transition-colors font-semibold"
                        >
                          <td className="py-3 px-3">{index + 1}</td>
                          <td className="py-3 px-3 uppercase">{member.name}</td>
                          <td className="py-3 px-3 text-right">
                            {member.linkedin ? (
                              <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#113B8D] text-white hover:bg-black text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0px_rgba(0,0,0,0.15)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                              >
                                <LinkedinIcon className="w-3.5 h-3.5" />
                                <span>Connect</span>
                                <ExternalLink size={10} className="opacity-80" />
                              </a>
                            ) : (
                              <span className="text-xs font-medium text-[#113B8D]/50 italic">
                                N/A
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}