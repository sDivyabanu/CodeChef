"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Footer from "@/components/Footer/Footer";

// ─── Types ────────────────────────────────────────────────────────────────────
interface EventDetail {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  image: string;
  description: string;
}

// ─── Dummy event database (mirrors the mock data on the listing page) ─────────
const DUMMY_EVENTS: EventDetail[] = [
  {
    slug: "rust-for-web-development-why-it-matters",
    title: "Rust for Web Development: Why It Matters",
    subtitle: "Safety, speed and concurrency",
    date: "2026-06-25",
    image: "/images/group_photo.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae sapien non metus convallis bibendum. Integer ut lacus nec elit fermentum tincidunt. Sed euismod, urna eu facilisis gravida, turpis sapien tristique libero, non tincidunt libero velit id nunc. Nulla facilisi. Suspendisse potenti. Aliquam erat volutpat. Cras accumsan, justo a tincidunt varius, lorem lacus facilisis ipsum, nec placerat elit libero non nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec mattis, magna at ultrices feugiat, lacus nunc laoreet justo, non tincidunt erat erat sed arcu. Curabitur blandit, metus at dignissim vulputate, ligula lacus consequat nulla, sed suscipit purus nulla at metus.",
  },
  {
    slug: "docker-kubernetes-architecting-scalability",
    title: "DOCKER & KUBERNETES: ARCHITECTING SCALABILITY",
    subtitle: "Master containerization and orchestration",
    date: "2026-07-12",
    image: "/images/group_photo.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae sapien non metus convallis bibendum. Integer ut lacus nec elit fermentum tincidunt. Sed euismod, urna eu facilisis gravida, turpis sapien tristique libero, non tincidunt libero velit id nunc. Nulla facilisi. Suspendisse potenti. Aliquam erat volutpat. Cras accumsan, justo a tincidunt varius, lorem lacus facilisis ipsum, nec placerat elit libero non nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec mattis, magna at ultrices feugiat, lacus nunc laoreet justo, non tincidunt erat erat sed arcu. Curabitur blandit, metus at dignissim vulputate, ligula lacus consequat nulla, sed suscipit purus nulla at metus.",
  },
  {
    slug: "ai-in-production-agentic-workflows",
    title: "AI IN PRODUCTION: AGENTIC WORKFLOWS",
    subtitle: "Autonomous LLM agents in real-world apps",
    date: "2026-07-28",
    image: "/images/group_photo.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae sapien non metus convallis bibendum. Integer ut lacus nec elit fermentum tincidunt. Sed euismod, urna eu facilisis gravida, turpis sapien tristique libero, non tincidunt libero velit id nunc. Nulla facilisi. Suspendisse potenti. Aliquam erat volutpat. Cras accumsan, justo a tincidunt varius, lorem lacus facilisis ipsum, nec placerat elit libero non nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec mattis, magna at ultrices feugiat, lacus nunc laoreet justo, non tincidunt erat erat sed arcu. Curabitur blandit, metus at dignissim vulputate, ligula lacus consequat nulla, sed suscipit purus nulla at metus.",
  },
  {
    slug: "nextjs-16-react-19-deep-dive",
    title: "NEXT.JS 16 & REACT 19: DEEP DIVE",
    subtitle: "Server components, actions, and modern styling",
    date: "2026-08-05",
    image: "/images/group_photo.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae sapien non metus convallis bibendum. Integer ut lacus nec elit fermentum tincidunt. Sed euismod, urna eu facilisis gravida, turpis sapien tristique libero, non tincidunt libero velit id nunc. Nulla facilisi. Suspendisse potenti. Aliquam erat volutpat. Cras accumsan, justo a tincidunt varius, lorem lacus facilisis ipsum, nec placerat elit libero non nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec mattis, magna at ultrices feugiat, lacus nunc laoreet justo, non tincidunt erat erat sed arcu. Curabitur blandit, metus at dignissim vulputate, ligula lacus consequat nulla, sed suscipit purus nulla at metus.",
  },
  {
    slug: "graphql-compared-apis-in-2026",
    title: "GRAPHQL COMPARED: APIS IN 2026",
    subtitle: "Is GraphQL still relevant?",
    date: "2026-08-18",
    image: "/images/group_photo.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae sapien non metus convallis bibendum. Integer ut lacus nec elit fermentum tincidunt. Sed euismod, urna eu facilisis gravida, turpis sapien tristique libero, non tincidunt libero velit id nunc. Nulla facilisi. Suspendisse potenti. Aliquam erat volutpat. Cras accumsan, justo a tincidunt varius, lorem lacus facilisis ipsum, nec placerat elit libero non nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec mattis, magna at ultrices feugiat, lacus nunc laoreet justo, non tincidunt erat erat sed arcu. Curabitur blandit, metus at dignissim vulputate, ligula lacus consequat nulla, sed suscipit purus nulla at metus.",
  },
  {
    slug: "cybersecurity-essentials-secure-design",
    title: "CYBERSECURITY ESSENTIALS: SECURE DESIGN",
    subtitle: "Build robust defenses into your architecture",
    date: "2026-09-02",
    image: "/images/group_photo.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae sapien non metus convallis bibendum. Integer ut lacus nec elit fermentum tincidunt. Sed euismod, urna eu facilisis gravida, turpis sapien tristique libero, non tincidunt libero velit id nunc. Nulla facilisi. Suspendisse potenti. Aliquam erat volutpat. Cras accumsan, justo a tincidunt varius, lorem lacus facilisis ipsum, nec placerat elit libero non nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec mattis, magna at ultrices feugiat, lacus nunc laoreet justo, non tincidunt erat erat sed arcu. Curabitur blandit, metus at dignissim vulputate, ligula lacus consequat nulla, sed suscipit purus nulla at metus.",
  },
  {
    slug: "codechef-hackathon-2026",
    title: "CODECHEF HACKATHON 2026",
    subtitle: "Algorithms and Data Structures",
    date: "2026-09-20",
    image: "/images/group_photo.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae sapien non metus convallis bibendum. Integer ut lacus nec elit fermentum tincidunt. Sed euismod, urna eu facilisis gravida, turpis sapien tristique libero, non tincidunt libero velit id nunc. Nulla facilisi. Suspendisse potenti. Aliquam erat volutpat. Cras accumsan, justo a tincidunt varius, lorem lacus facilisis ipsum, nec placerat elit libero non nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec mattis, magna at ultrices feugiat, lacus nunc laoreet justo, non tincidunt erat erat sed arcu. Curabitur blandit, metus at dignissim vulputate, ligula lacus consequat nulla, sed suscipit purus nulla at metus.",
  },
];

// ─── Simulated async API call ─────────────────────────────────────────────────
async function fetchEventBySlug(slug: string): Promise<EventDetail | null> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return DUMMY_EVENTS.find((e) => e.slug === slug) ?? null;
}

// ─── Page component ───────────────────────────────────────────────────────────
export default function EventDetailPage() {
  const { eventname } = useParams<{ eventname: string }>();

  const [event, setEvent] = useState<EventDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!eventname) return;
    setLoading(true);
    setError(false);

    fetchEventBySlug(decodeURIComponent(eventname as string))
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [eventname]);

  // ── Loading state ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-[#4A6FA5] flex flex-col items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 border-4 border-[#FEFED7] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#FEFED7] text-3xl tracking-widest uppercase font-bebas">
            Loading event…
          </p>
        </div>
      </div>
    );
  }

  // ── Error / Not found state ────────────────────────────────────────────────
  if (error || !event) {
    return (
      <div className="min-h-screen bg-[#4A6FA5] flex flex-col items-center justify-center gap-8 px-6 font-sans">
        <h1 className="text-[#FEFED7] text-6xl md:text-8xl uppercase font-bebas">
          Event Not Found
        </h1>
        <p className="text-white/70 text-lg font-inter">
          The event you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/events"
          className="mt-4 px-8 py-3 bg-[#102741] text-[#FEFED7] border-2 border-[#FEFED7] uppercase tracking-widest text-lg transition-all duration-200 hover:bg-[#FEFED7] hover:text-[#102741] font-bebas"
        >
          ← Back to Events
        </Link>
      </div>
    );
  }

  // ── Detail page ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#4A6FA5] text-white flex flex-col overflow-x-hidden font-sans">
      
      {/* 2. Event Title & Subtitle */}
      <section className="flex flex-col items-center text-center mt-12 mb-16 px-4">
        <h1
          className="text-6xl md:text-6xl font-normal leading-[1.1] md:leading-[100px] text-white uppercase font-bebas"
          style={{
            textShadow: "0px 0px 100px #FFFFFF",
          }}
        >
          {event.title}
        </h1>
        <p
          className="text-2xl md:text-[40px] font-normal leading-normal md:leading-[48px] text-white lowercase font-bebas"
          style={{
            textShadow: "0px 0px 100px #FFFFFF",
          }}
        >
          {event.subtitle}
        </p>
      </section>

      {/* 3. Hero Image */}
      <section className="w-full max-w-[1466px] mx-auto px-4 md:px-0">
        <div className="w-full relative overflow-hidden rounded-[10px] md:rounded-[0px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={event.image}
            alt={event.title}
            className="w-full object-cover object-center h-[350px] md:h-[699px]"
            onError={(e) => {
              // Fallback placeholder
              const target = e.currentTarget as HTMLImageElement;
              target.style.display = "none";
              const parent = target.parentElement!;
              parent.style.background =
                "linear-gradient(135deg, #102741 0%, #4A6FA5 50%, #102741 100%)";
              parent.style.display = "flex";
              parent.style.alignItems = "center";
              parent.style.justifyContent = "center";
              const placeholder = document.createElement("span");
              placeholder.style.cssText =
                "font-family:var(--font-bebas);font-size:48px;color:rgba(254,254,215,0.3);letter-spacing:0.15em;text-transform:uppercase;";
              placeholder.textContent = event.title;
              parent.appendChild(placeholder);
            }}
          />
        </div>
      </section>

      {/* 4. Description Content */}
      <section className="max-w-[884px] w-full mx-auto px-6 md:px-0 mt-16 mb-32">
        <p
          className="text-white text-base md:text-2xl leading-relaxed md:leading-[38px] font-normal"
          style={{
            fontFamily: "var(--font-inter), sans-serif",
          }}
        >
          {event.description}
        </p>
      </section>

      {/* 5. Global Footer */}
      <Footer />

    </div>
  );
}
