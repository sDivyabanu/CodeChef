"use client";

import {useRouter} from "next/navigation";
export default function Video() {
  const router = useRouter();

  return (
    <section className="relative w-full min-h-dvh overflow-hidden">

      {/* Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="
          absolute
          top-16
          md:top-20
          w-full
          h-full
          object-cover
        "
      >
        <source src="/videos/HomePageVid.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/20 z-10" />

      {/* Black Top Strip */}
      <div className="absolute top-0 left-0 w-full h-16 md:h-20 bg-black z-30" />

      {/* Fade Into Video */}
      <div
        className="
          absolute
          top-16
          md:top-20
          left-0
          w-full
          h-40
          z-20
          bg-gradient-to-b
          from-black
          via-black/60
          to-transparent
        "
      />

      {/* Logo + Text ABOVE EVERYTHING */}
      <div
        className="
          absolute
          top-5
          md:top-8
          left-4
          md:left-6
          z-40
          flex
          items-center
          gap-3
          md:gap-4
        "
      >
        <img
          src="/logos/image.png"
          alt="CodeChef"
          className="h-8 md:h-10 w-auto"
        />

        <span
          className="
            font-bebas
            text-[#ECE9C7]
            text-lg
            md:text-xl
            tracking-[0.22em]
            md:tracking-[0.3em]
            font-light
          "
        >
          CODECHEF
        </span>
      </div>
    {/* Hero Content */}
<div
  className="
    absolute
    left-4
    right-4
    sm:left-8
    sm:right-auto
    md:left-12
    top-1/2
    -translate-y-1/2
    z-30
    max-w-2xl
  "
>
  {/* Small Tag */}
  <p
    className="
      text-white
      font-bebas
      text-xl
      sm:text-2xl
      tracking-[0.2em]
      mb-4
    "
  >
    WE CODE
  </p>

  {/* Main Heading */}
  <h1
    className="
      font-bebas
      text-white
      leading-[0.9]
      text-4xl
      md:text-5xl
      lg:text-5xl
      mb-4
    "
  >
    WE ARE{" "}
    <span className="text-[#ECE9C7]">
      CODECHEF
    </span>
  </h1>

  {/* Sub Text */}
  <p
    className="
      text-white
      text-base
      sm:text-xl
      md:text-2xl
      max-w-xl
      mb-8
    "
  >
    Building developers, solving problems,
    and creating a community that loves code.
  </p>

  {/* Button */}
  <button
    className="
      bg-white
      text-black
      px-5
      py-2
      rounded-xl
      font-semibold
      text-base
      sm:text-lg
      hover:scale-105
      transition-all
      duration-300
    " onClick={() => router.push("/recruitment")}
  >
    Join Us →
  </button>
</div>
    </section>
  );
}
