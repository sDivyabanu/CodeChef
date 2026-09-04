"use client";

import { motion } from "framer-motion";

export default function Companies() {
  const companies = [
    {
      name: "Google",
      logo: "/logos/google.png",
    },
    {
      name: "UBS",
      logo: "/logos/ubs.png",
    },
    {
      name: "JPMorgan",
      logo: "/logos/jpmorgan.png",
    },
    {
      name: "Nutanix",
      logo: "/logos/nutanix.png",
    },
    {
      name: "Futures First",
      logo: "/logos/futuresfirst.png",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = (rotationAngle: number) => ({
    hidden: { opacity: 0, y: 50, rotate: rotationAngle },
    visible: {
      opacity: 1,
      y: 0,
      rotate: rotationAngle,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 14,
      },
    },
  });

  return (
    <section className="relative py-20 md:py-28 px-4 sm:px-8 overflow-hidden bg-[#5878AF]">

      {/* Background Text */}
      <h1
        className="
          absolute
          inset-0
          flex
          items-center
          justify-center
          font-bebas
          text-[clamp(8rem,28vw,20rem)]
          text-white/[0.03]
          pointer-events-none
          select-none
        "
      >
        CODECHEF
      </h1>

      {/* Heading */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="font-teko text-4xl sm:text-6xl text-[#ECE9C7] tracking-widest uppercase mb-4">
          OUR ALUMNI WORK AT
        </h2>
      </div>

      {/* Logos Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="
          relative
          z-10
          max-w-7xl
          mx-auto
          grid
          grid-cols-2
          md:grid-cols-3
          lg:grid-cols-5
          gap-8
          lg:gap-10
          px-0
          sm:px-4
        "
      >
        {companies.map((company, index) => {
          // Alternate rotation angles for that casual pin-board look
          const rotationAngle = [-2.5, 2, -1.5, 3, -2][index % 5];

          // Alternate pin colors for playfulness
          const pinColors = [
            "bg-red-500",
            "bg-blue-500",
            "bg-green-500",
            "bg-yellow-500",
            "bg-purple-500",
          ];
          const pinColor = pinColors[index % pinColors.length];

          // Deterministic sway parameters to prevent hydration mismatches
          const duration = 4.5 + (index % 3) * 0.7; // 4.5s, 5.2s, 5.9s
          const delay = (index % 4) * 0.3; // 0s, 0.3s, 0.6s, 0.9s
          const swayAngle = 0.8;

          return (
            <motion.div
              key={company.name}
              variants={cardVariants(rotationAngle)}
              className="w-full flex justify-center items-center"
            >
              <motion.div
                animate={{
                  rotate: [rotationAngle - swayAngle, rotationAngle + swayAngle, rotationAngle - swayAngle],
                  y: [0, -3, 0],
                }}
                transition={{
                  rotate: {
                    duration,
                    delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  y: {
                    duration: duration * 0.9,
                    delay: delay * 1.1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                }}
                whileHover={{
                  rotate: 0,
                  y: -10,
                  scale: 1.03,
                  boxShadow: "10px 10px 0px rgba(0,0,0,1)",
                  transition: { type: "spring" as const, stiffness: 450, damping: 15 }
                }}
                style={{ transformOrigin: "top center" }}
                className="
                  group
                  relative
                  w-full
                  h-32
                  sm:h-36
                  bg-[#F6F4D8]
                  border-4 border-black
                  shadow-[6px_6px_0px_rgba(0,0,0,1)]
                  flex
                  items-center
                  justify-center
                  p-6
                  cursor-pointer
                "
              >
                {/* Push Pin Head / Tack in the center-top */}
                <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full ${pinColor} border-2 border-black shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] flex items-center justify-center`}>
                  <div className="w-1/2 h-1/2 rounded-full bg-white/70" />
                </div>

                <img
                  src={company.logo}
                  alt={company.name}
                  className="
                    h-14
                    w-full
                    object-contain
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  "
                />
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
