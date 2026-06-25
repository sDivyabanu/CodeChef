"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Footer from "@/components/Footer/Footer";
import { client, urlFor } from "@/lib/sanityClient";

// ─── Types ────────────────────────────────────────────────────────────────────
interface EventDetail {
  title: string;
  subtitle1?: string;      // Sanity
  date: string;
  imageUrl?: any;          // Sanity
  description1: string;   // Sanity
  subtitle2?: string;      // Sanity
  description2?: string;   // Sanity
  gallery?: any[];         // Sanity
}

const slugify = (title: string) =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

// ─── Dynamic fetch with Sanity ─────────────────────────────────────
async function fetchEventBySlug(slug: string): Promise<EventDetail | null> {
  try {
    const query = `*[_type == "events"]`;
    const events = await client.fetch(query);
    if (Array.isArray(events) && events.length > 0) {
      const found = events.find((e: any) => slugify(e.title) === slug);
      if (found) return found;
    }
  } catch (error) {
    console.error("Error fetching event from Sanity:", error);
  }
  return null;
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
        if (data) {
          setEvent(data);
        } else {
          setError(true);
        }
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [eventname]);

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

  const finalSubtitle = event.subtitle1 || "";
  const finalDescription = event.description1 || "No description provided.";
  const finalImage = event.imageUrl ? urlFor(event.imageUrl).width(1200).auto('format').url() : null;

  // ── Detail page ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#4A6FA5] text-white flex flex-col overflow-x-hidden font-sans">
      
      {/* 2. Event Title & Subtitle */}
      <section className="flex flex-col items-center text-center mt-12 mb-16 px-4">
        <h1
          className="text-5xl md:text-7xl font-normal leading-[1.1] md:leading-[100px] text-white uppercase font-bebas"
          style={{
            textShadow: "0px 0px 100px #FFFFFF",
          }}
        >
          {event.title}
        </h1>
        {finalSubtitle && (
          <p
            className="text-2xl md:text-[40px] font-normal leading-normal md:leading-[48px] text-white lowercase font-bebas"
            style={{
              textShadow: "0px 0px 100px #FFFFFF",
            }}
          >
            {finalSubtitle}
          </p>
        )}
      </section>

      {/* 3. Hero Image */}
      <section className="w-full max-w-[1466px] mx-auto px-4 md:px-0">
        <div className="w-full relative overflow-hidden rounded-[10px] md:rounded-[0px]">
          {finalImage ? (
            <img
              src={finalImage}
              alt={event.title}
              className="w-full object-cover object-center h-[350px] md:h-[699px]"
              onError={(e) => {
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
          ) : (
            <div 
              className="w-full h-[350px] md:h-[699px] flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #102741 0%, #4A6FA5 50%, #102741 100%)",
              }}
            >
              <span className="font-bebas text-5xl text-white/30 tracking-widest uppercase">
                {event.title}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* 4. Description Content */}
      <section className="max-w-[1466px] w-[90%] mx-auto px-6 md:px-0 mt-16 mb-16">
        <p
          className="text-white text-base md:text-2xl leading-relaxed md:leading-[38px] font-normal"
          style={{
            fontFamily: "var(--font-inter), sans-serif",
          }}
        >
          {finalDescription}
        </p>
      </section>

      {/* 4b. Optional subtitle2 & description2 from Sanity */}
      {(event.subtitle2 || event.description2) && (
        <section className="max-w-[1466px] w-[90%] mx-auto px-6 md:px-0 mb-16">
          {event.subtitle2 && (
            <h2 className="text-3xl md:text-5xl font-normal leading-normal text-white uppercase font-bebas mb-6">
              {event.subtitle2}
            </h2>
          )}
          {event.description2 && (
            <p
              className="text-white/80 text-base md:text-xl leading-relaxed md:leading-[32px] font-normal"
              style={{
                fontFamily: "var(--font-inter), sans-serif",
              }}
            >
              {event.description2}
            </p>
          )}
        </section>
      )}

      {/* 4c. Optional Event Image Gallery from Sanity */}
      {event.gallery && Array.isArray(event.gallery) && event.gallery.length > 0 && (
        <section className="max-w-[1466px] w-[90%] mx-auto mb-24">
          <h2 className="text-4xl md:text-6xl font-normal text-white uppercase font-bebas mb-10 text-center tracking-wider">
            Event Gallery
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {event.gallery.map((imgAsset: any, index: number) => {
              const galleryImgUrl = urlFor(imgAsset).width(600).auto('format').url();
              return (
                <div 
                  key={index} 
                  className="bg-[#ECE9C7] p-3 border border-black/10 shadow-[12px_12px_0px_rgba(0,0,0,0.18)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden h-[300px] group"
                >
                  <img
                    src={galleryImgUrl}
                    alt={`Event gallery item ${index + 1}`}
                    className="w-full h-full object-cover filter brightness-95 group-hover:brightness-100 transition-all duration-300"
                  />
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 5. Global Footer */}
      <Footer />

    </div>
  );
}
