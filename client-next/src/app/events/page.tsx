"use client";

import React, { useState, useEffect } from "react";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";
import Image from "next/image";
import { client, urlFor } from "@/lib/sanity";
import { Loader2 } from "lucide-react";

const slugify = (title: string) =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await client.fetch('*[_type == "events"] | order(date desc)');
        setEvents(data || []);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };
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

  const featuredEvent = events[0] || {
    title: "CODECHEF HACKATHON 2026",
    subtitle1: "ALGORITHMS AND DATA STRUCTURES",
    imageUrl: "",
  };

  return (
    <div className="min-h-screen bg-[#4A6FA5] text-white flex flex-col relative overflow-x-hidden">
      {/* 1. Header */}
      <div className="flex flex-col items-center justify-center pt-24 relative select-none z-10">
        <h1 className="text-[120px] md:text-[160px] font-normal leading-none tracking-[0.05em] text-white uppercase" style={{ fontFamily: "var(--font-bebas)" }} >
          CODECHEF
        </h1>
        <span
          className="text-[80px] md:text-[110px] font-normal leading-none text-transparent uppercase"
          style={{
            fontFamily: "var(--font-bebas)",
            WebkitTextStroke: "3px #FFFFFF",
          }}
        >
          EVENTS
        </span>
      </div>

      {/* 2. Fanning Cards Arc */}
      <div className="py-10">
        <div className="alumni-track gap-8 flex py-10">
          {[...eventCards, ...eventCards].map((card, index) => (
            <div
              key={index} 
              className={card.float} 
              style={{ animation: `${card.float} ${ 4 + (index % 4) }s ease-in-out infinite`, }} 
            >
              <div
                className="
                  bg-[#ECE9C7]
                  w-53
                  h-85
                  p-6
                  border border-black/10
                  shadow-[14px_14px_0px_rgba(0,0,0,0.18)]
                  flex flex-col
                "
                style={{
                  transform: `rotate(${card.rotate}deg) translateY(${card.translateY}px)`,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-12 h-12 text-[#ECE9C7] animate-spin" />
          <p className="font-bebas text-[#ECE9C7] text-2xl tracking-widest">LOADING EVENTS...</p>
        </div>
      ) : (
        <>
          {/* 3. Featured Article Banner */}
          <div className="max-w-[1200px] w-[90%] mx-auto mt-8 mb-16 z-10">
            <div
              className="w-full h-[400px] rounded-[45px] relative overflow-hidden border-4 border-black group"
              style={{
                boxShadow: "12px 12px 0px rgba(0, 0, 0, 1)",
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.75)), url('${featuredEvent.imageUrl ? urlFor(featuredEvent.imageUrl) : "/images/featured-bg.jpg"}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: "#102741",
              }}
            >
              <div className="absolute top-8 right-8 bg-[#ECE9C7] border-2 border-black rounded-[70px] px-6 py-3 flex items-center justify-center shadow-lg">
                <span
                  className="text-[#2C2C2C] text-sm md:text-base font-bold uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Featured Event
                </span>
              </div>

              <div className="absolute bottom-8 left-8 md:left-12 max-w-[80%] flex flex-col items-start gap-4">
                <span
                  className="text-white text-lg md:text-xl font-normal tracking-wide uppercase"
                  style={{ fontFamily: "var(--font-bebas)" }}
                >
                  {featuredEvent.subtitle1 || "SPECIAL EVENT"}
                </span>

                <h2
                  className="text-white text-5xl md:text-7xl font-normal uppercase leading-tight tracking-wide"
                  style={{ fontFamily: "var(--font-bebas)" }}
                >
                  {featuredEvent.title}
                </h2>
                <Link
                  href={`/events/${slugify(featuredEvent.title)}`}
                  className="bg-[#ECE9C7] hover:bg-[#ffffe4] text-[#1E1E1E] font-bold border-2 border-black rounded-[70px] px-10 py-3 text-lg md:text-xl transition-all duration-200 active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
                  style={{ fontFamily: "var(--font-roboto)" }}
                >
                  VIEW DETAILS
                </Link>
              </div>
            </div>
          </div>

          {/* 4. Events Grid */}
          <div className="max-w-[1200px] w-[90%] mx-auto mb-24 z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {events.map((event) => (
                <Link
                  key={event._id}
                  href={`/events/${slugify(event.title)}`}
                  className="block no-underline"
                >
                  <div
                    className="bg-[#ECE9C7] border border-black/10 p-6 flex flex-col justify-between relative group hover:-translate-y-2 hover:-translate-x-1 transition-all duration-300 h-[450px] cursor-pointer"
                    style={{
                      boxShadow: "14px 14px 0px rgba(0, 0, 0, 0.18)",
                    }}
                  >
                    <div className="w-full h-[200px] bg-[#D8D6D7] border border-black/10 relative overflow-hidden">
                      {event.imageUrl && (
                        <Image
                          src={urlFor(event.imageUrl)}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
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
                        {event.description1 || event.subtitle1}
                      </p>
                    </div>

                    <div className="flex justify-end mt-4">
                      <span
                        className="bg-[#060606] group-hover:bg-[#202020] text-white font-normal text-sm md:text-base px-6 py-2 transition-all duration-200 active:scale-95 border-2 border-black"
                        style={{ fontFamily: "var(--font-bebas)", boxShadow: "3px 3px 0px rgba(254, 254, 215, 1)" }}
                      >
                        VIEW MORE
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
