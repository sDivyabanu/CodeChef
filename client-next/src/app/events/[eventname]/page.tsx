"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Footer from "@/components/Footer/Footer";
import { client, urlFor } from "@/lib/sanity";
import { Loader2 } from "lucide-react";

const slugify = (title: string) =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

export default function EventDetailPage() {
  const { eventname } = useParams<{ eventname: string }>();

  const [event, setEvent] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!eventname) return;
    const fetchEvent = async () => {
      setLoading(true);
      setError(false);
      try {
        const decodedSlug = decodeURIComponent(eventname as string);
        const data = await client.fetch('*[_type == "events"]');
        const found = data.find((e: any) => slugify(e.title) === decodedSlug);
        if (found) {
          setEvent(found);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching event details:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#4A6FA5] flex flex-col items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-6">
          <Loader2 className="w-16 h-16 text-[#FEFED7] animate-spin" />
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
        {event.subtitle1 && (
          <p
            className="text-2xl md:text-[40px] font-normal leading-normal md:leading-[48px] text-white lowercase font-bebas"
            style={{
              textShadow: "0px 0px 100px #FFFFFF",
            }}
          >
            {event.subtitle1}
          </p>
        )}
      </section>

      {/* 3. Hero Image */}
      <section className="w-full max-w-[1466px] mx-auto px-4 md:px-0">
        <div className="w-full relative overflow-hidden rounded-[10px] md:rounded-[0px]">
          {event.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={urlFor(event.imageUrl)}
              alt={event.title}
              className="w-full object-cover object-center h-[350px] md:h-[699px]"
            />
          ) : (
            <div className="w-full h-[350px] md:h-[699px] bg-gradient-to-r from-[#102741] via-[#4A6FA5] to-[#102741] flex items-center justify-center">
              <span className="font-bebas text-5xl text-[#FEFED7]/30 tracking-widest uppercase">
                {event.title}
              </span>
            </div>
          )}
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
          {event.description1 || event.description}
        </p>
        
        {event.description2 && (
          <p
            className="text-white text-base md:text-2xl leading-relaxed md:leading-[38px] font-normal mt-8"
            style={{
              fontFamily: "var(--font-inter), sans-serif",
            }}
          >
            {event.description2}
          </p>
        )}
      </section>

      {/* 5. Global Footer */}
      <Footer />

    </div>
  );
}
