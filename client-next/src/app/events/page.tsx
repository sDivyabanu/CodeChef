"use client";

import React, { useState, useEffect } from "react";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";
import { client, urlFor } from "@/lib/sanityClient";

interface SanityEvent {
  _id: string;
  title: string;
  imageUrl?: any;
  date: string;
  subtitle1?: string;
  description1?: string;
  subtitle2?: string;
  description2?: string;
}

const slugify = (title: string) =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

export default function EventsPage() {
  const [events, setEvents] = useState<SanityEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const query = `*[_type == "events"] | order(date desc)`;
        const data = await client.fetch(query);
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching events from Sanity:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const eventCards = [
    { rotate: -18, translateY: -100, float: "float1" },
    { rotate: -10, translateY: -45, float: "float2" },
    { rotate: -4, translateY: 15, float: "float3" },
    { rotate: 0, translateY: 60, float: "float4" },
    { rotate: 4, translateY: 15, float: "float3" },
    { rotate: 10, translateY: -45, float: "float2" },
    { rotate: 18, translateY: -100, float: "float1" },
  ];

  const featuredEvent = events[0] || null;

  return (
    <div className="min-h-screen bg-[#4A6FA5] text-white flex flex-col relative overflow-x-hidden">
      {/* 1. Header */}
      <div className="flex flex-col items-center justify-center pt-20 md:pt-24 px-4 relative select-none z-10 text-center">
        <h1 className="text-[clamp(4.5rem,24vw,10rem)] font-normal leading-none tracking-[0.05em] text-white uppercase" style={{ fontFamily: "var(--font-bebas)" }} >
          CODECHEF
        </h1>
        <span
          className="text-[clamp(3.5rem,18vw,6.875rem)] font-normal leading-none text-transparent uppercase"
          style={{
            fontFamily: "var(--font-bebas)",
            WebkitTextStroke: "3px #FFFFFF",
          }}
        >
          EVENTS
        </span>
      </div>

      {/* 2. Fanning Cards Arc */}
      <div className="py-8 md:py-10">
        <div className="alumni-track gap-8 flex py-10">
          {[...eventCards, ...eventCards].map((card, index) => {
            const associatedEvent = events.length > 0 ? events[index % events.length] : null;
            const hasImage = associatedEvent?.imageUrl;
            
            return (
              <div
                key={index} 
                className={card.float} 
                style={{ animation: `${card.float} ${ 4 + (index % 4) }s ease-in-out infinite` }} 
              >
                <div
                  className="
                    bg-[#ECE9C7]
                    w-[clamp(8.5rem,42vw,13.25rem)]
                    h-[clamp(13.5rem,66vw,21.25rem)]
                    p-3
                    border border-black/10
                    shadow-[14px_14px_0px_rgba(0,0,0,0.18)]
                    flex flex-col
                    overflow-hidden
                    relative
                  "
                  style={{
                    transform: `rotate(${card.rotate}deg) translateY(${card.translateY}px)`,
                  }}
                >
                  {hasImage ? (
                    <img
                      src={urlFor(associatedEvent.imageUrl).width(300).auto('format').url()}
                      alt=""
                      className="w-full h-full object-cover filter sepia-[0.25]"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#102741]/10 border border-dashed border-black/20 flex items-center justify-center">
                      <span className="font-bebas text-black/30 text-lg uppercase tracking-wider text-center px-2">
                        {associatedEvent?.title || "CodeChef"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-12 h-12 border-4 border-[#ECE9C7] border-t-transparent rounded-full animate-spin" />
          <p className="font-bebas text-2xl tracking-widest text-[#ECE9C7]">LOADING EVENTS...</p>
        </div>
      ) : error || events.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 z-10">
          <p className="font-bebas text-2xl md:text-3xl text-[#ECE9C7] tracking-wider uppercase">
            {error ? "Failed to load events..." : "No events scheduled at the moment"}
          </p>
        </div>
      ) : (
        <>
          {/* 3. Featured Article Banner */}
          {featuredEvent && (
            <div className="max-w-[1466px] w-[90%] mx-auto mt-6 md:mt-8 mb-14 md:mb-16 z-10">
              <div
                className="w-full min-h-[360px] md:h-[400px] rounded-[24px] md:rounded-[45px] relative overflow-hidden border-4 border-black group"
                style={{
                  boxShadow: "12px 12px 0px rgba(0, 0, 0, 1)",
                  backgroundImage: featuredEvent.imageUrl
                    ? `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.75)), url(${urlFor(featuredEvent.imageUrl).width(1200).auto('format').url()})`
                    : "linear-gradient(135deg, #102741 0%, #4A6FA5 100%)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: "#102741",
                }}
              >
                <div className="absolute top-4 right-4 md:top-8 md:right-8 bg-[#ECE9C7] border-2 border-black rounded-[70px] px-4 md:px-6 py-2 md:py-3 flex items-center justify-center shadow-lg">
                  <span
                    className="text-[#2C2C2C] text-sm md:text-base font-bold uppercase tracking-wider"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Featured Event
                  </span>
                </div>

                <div className="absolute bottom-6 md:bottom-8 left-5 md:left-12 right-5 md:right-auto md:max-w-[80%] flex flex-col items-start gap-3 md:gap-4">
                  {featuredEvent.subtitle1 && (
                    <span
                      className="text-white text-lg md:text-xl font-normal tracking-wide uppercase"
                      style={{ fontFamily: "var(--font-bebas)" }}
                    >
                      {featuredEvent.subtitle1}
                    </span>
                  )}

                  <h2
                    className="text-white text-4xl sm:text-5xl md:text-7xl font-normal uppercase leading-tight tracking-wide break-words"
                    style={{ fontFamily: "var(--font-bebas)" }}
                  >
                    {featuredEvent.title}
                  </h2>
                  <Link
                    href={`/events/${slugify(featuredEvent.title)}`}
                    className="bg-[#ECE9C7] hover:bg-[#ffffe4] text-[#1E1E1E] font-bold border-2 border-black rounded-[70px] px-8 md:px-10 py-3 text-base md:text-xl transition-all duration-200 active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
                    style={{ fontFamily: "var(--font-roboto)" }}
                  >
                    READ
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* 4. Events Grid */}
          <div className="max-w-[1466px] w-[90%] mx-auto mb-24 z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {events.map((event) => (
                <Link
                  key={event._id}
                  href={`/events/${slugify(event.title)}`}
                  className="block no-underline"
                >
                  <div
                    className="bg-[#ECE9C7] border border-black/10 p-5 sm:p-6 flex flex-col justify-between relative group hover:-translate-y-2 hover:-translate-x-1 transition-all duration-300 min-h-[430px] cursor-pointer"
                    style={{
                      boxShadow: "14px 14px 0px rgba(0, 0, 0, 0.18)",
                    }}
                  >
                    <div className="w-full aspect-[16/10] bg-[#D8D6D7] border border-black/10 relative overflow-hidden">
                      {event.imageUrl ? (
                        <img
                          src={urlFor(event.imageUrl).width(500).auto('format').url()}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#102741]/5 flex items-center justify-center">
                          <span className="font-bebas text-black/10 text-4xl uppercase tracking-widest">
                            CodeChef
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-3 mt-4 flex-grow">
                      <h3
                        className="text-black text-2xl md:text-3xl font-normal leading-tight line-clamp-2 uppercase"
                        style={{ fontFamily: "var(--font-bebas)" }}
                      >
                        {event.title}
                      </h3>

                      <p
                        className="text-[#6F6F6F] text-sm font-normal leading-snug line-clamp-3"
                        style={{ fontFamily: "var(--font-bebas)" }}
                      >
                        {event.description1 || "No description provided."}
                      </p>
                    </div>

                    <div className="flex justify-end mt-4">
                      <span
                        className="bg-[#060606] group-hover:bg-[#202020] text-white font-normal text-sm md:text-base px-6 py-2 transition-all duration-200 active:scale-95 border-2 border-black"
                        style={{ fontFamily: "var(--font-bebas)", boxShadow: "3px 3px 0px rgba(254, 254, 215, 1)" }}
                      >
                        READ MORE
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}

      {/* 5. Footer Wrapper */}
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
