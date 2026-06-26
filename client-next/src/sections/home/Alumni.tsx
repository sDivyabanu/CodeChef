"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { client } from "@/lib/sanityClient";

const alumniCards = [
  {
    
    translateY: 10,
    float: "float2",
  },
  {
    
    translateY: -20,
    float: "float1",
  },
  {
    
    translateY: 10,
    float: "float2",
  },
  {
    
    translateY: 35,
    float: "float3",
  },
  {
    
    translateY: 20,
    float: "float4",
  },
  {
    
    translateY: -10,
    float: "float1",
  },
  {
    
    translateY: 15,
    float: "float2",
  },
];

export default function Alumni() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await client.fetch(
          '*[_type == "testimonials"]'
        );

        console.log("Testimonials:", data);
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="bg-[#5878AF] py-24">
        <div className="text-center text-white text-xl">
          Loading testimonials...
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#5878AF] py-24 overflow-hidden">
      <div className="overflow-hidden relative">
        <div
  className="
    
    top-[90px]
    left-0
    right-0
    h-[4px]
    bg-black/25
    z-0
  "
/>
        <div className="alumni-track gap-8 flex py-10">
          {testimonials.map((testimonial, index) => {
            const card =
              alumniCards[index % alumniCards.length];

            return (
              <div
  key={testimonial._id || index}
  className={card.float}
    onMouseEnter={() => {
    document
      .querySelector(".alumni-track")
      ?.classList.add("paused");
  }}
  onMouseLeave={() => {
    document
      .querySelector(".alumni-track")
      ?.classList.remove("paused");
  }}
  style={{

    animation:
      hoveredCard !== null
        ? "none"
        : `${card.float} ${
            3 + (index % 3)
          }s ease-in-out infinite`,
    zIndex: hoveredCard === index ? 50 : 1,
  }}
>
<div
  className="
    relative
    bg-[#ECE9C7]
    w-[320px]
    h-[500px]
    p-6
    border-2 border-black/15
    shadow-[16px_16px_0px_rgba(0,0,0,0.18)]
    flex flex-col
    transition-all
    duration-300
    rounded-sm
      hover:scale-[1.06]
  hover:z-[100]
  "
  style={{
    transform: `
      translateY(${card.translateY}px)
      scale(${hoveredCard === index ? 1.08 : 1})
    `,
  }}
>
  {/* String connector */}
  <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[2px] h-10 bg-black/30" />

  {/* Pin */}
<div
  className="
    absolute
    top-4
    left-1/2
    -translate-x-1/2
    w-5
    h-5
    rounded-full
    bg-black
    shadow-lg
    z-20
  "
/>

  {/* Profile */}
  <div className="flex flex-col items-center mb-5">
    <div className="relative w-28 h-28 rounded-full overflow-hidden border-[3px] border-black shadow-md">
      <Image
        src={
          testimonial.imageUrl ||
          "/images/alumni-placeholder.jpg"
        }
        alt={testimonial.name}
        fill
        className="object-cover"
      />
    </div>

    <h3 className="mt-4 text-2xl font-serif italic text-center text-black">
      {testimonial.name}
    </h3>

    <p className="text-sm text-black/60 text-center mt-1">
      {testimonial.position}
    </p>
  </div>

  {/* Divider */}
  <div className="w-full h-[2px] bg-black/10 mb-4" />

  {/* Scrollable testimonial */}
  <div
    className="
      flex-1
      overflow-y-auto
      pr-2
      text-[14px]
      leading-7
      text-black/85
      scrollbar-thin
      no-scrollbar::-webkit-scrollbar
    "
  >
    <span className="text-4xl leading-none text-black/25">
      "
    </span>

    {testimonial.testimonial}

    <span className="text-4xl leading-none text-black/25">
      "
    </span>
  </div>

  {/* Bottom decoration */}
  <div className="mt-4 flex justify-end">
    <div className="w-16 h-[3px] bg-black/20 rounded-full" />
  </div>
</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}