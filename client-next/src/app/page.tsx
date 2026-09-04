"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HookPage() {
  const router = useRouter();

  const [showCode, setShowCode] = useState(false);
  const [showChef, setShowChef] = useState(false);
  const [showHat, setShowHat] = useState(false);
  const [chefMoved, setChefMoved] = useState(false);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowCode(true), 2000);
    const t2 = setTimeout(() => setShowChef(true), 2600);
    const t3 = setTimeout(() => setShowHat(true), 3400);
    const tShift = setTimeout(() => setChefMoved(true), 3800); // Triggers right as the hat lands
    const t4 = setTimeout(() => setFlash(true), 4500);
    const t5 = setTimeout(() => router.push("/home"), 5200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(tShift);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [router]);

  const codeLetters = [
    { letter: "C", x: -500, y: -300 },
    { letter: "O", x: 500, y: -250 },
    { letter: "D", x: -450, y: 300 },
    { letter: "E", x: 450, y: 250 },
  ];

  const chefLetters = ["C", "H", "E", "F"];

// Symmetrical layout spacing configurations
const codeShift = "clamp(-4rem, -6vw, -5rem)";
const chefShift = "clamp(2rem, 4vw, 3rem)";

  return (
    <main className="relative min-h-dvh overflow-hidden bg-black flex items-center justify-center px-4">

      {/* CODE LETTERS & CHEF */}
      <div className="flex relative z-20 max-w-[92vw] items-center justify-center flex-nowrap">

        {/* CODE */}
        <motion.div
          animate={{
            x: chefMoved ? codeShift : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 160,
            damping: 8,
          }}
          className="flex"
        >
          {codeLetters.map((item, index) => (
            <motion.span
              key={item.letter}
              initial={{
                opacity: 0,
                x: -400,
                filter: "blur(12px)",
              }}
              animate={{
                opacity: 1,
                x: 0,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 0.7,
                delay: index * 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileInView={{
                x: [0, -5, 5, -3, 0],
              }}
              className="
                text-[clamp(2.2rem,11vw,13.5rem)]
                font-extralight
                tracking-[-0.08em]
                sm:tracking-[-0.1em]
                text-white
                select-none
              "
            >
              {item.letter}
            </motion.span>
          ))}
        </motion.div>

        {/* CHEF */}
        <AnimatePresence>
          {showChef && (
            <motion.div
              animate={{
                x: chefMoved ? chefShift : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 160,
                damping: 8,
              }}
              className="flex"
            >
              {chefLetters.map((letter, index) => {
                const animations = [
                  {
                    x: 1000,
                    y: 0,
                    rotate: 0,
                  },
                  {
                    x: 0,
                    y: -600,
                    rotate: 0,
                  },
                  {
                    x: 0,
                    y: 600,
                    rotate: 0,
                  },
                  {
                    x: 800,
                    y: 0,
                    rotate: 180,
                  },
                ];

                return (
                  <motion.span
                    key={letter}
                    initial={{
                      opacity: 0,
                      ...animations[index],
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      y: 0,
                      rotate: 0,
                    }}
                    transition={{
                      duration: 0.9,
                      delay: index * 0.15,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="
                      text-[clamp(2.2rem,11vw,13.5rem)]
                      font-extralight
                      tracking-[-0.08em]
                      sm:tracking-[-0.1em]
                      text-white
                      select-none
                    "
                  >
                    {letter}
                  </motion.span>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CHEF HAT */}
      <AnimatePresence>
        {showHat && (
          <motion.div
            initial={{
              y: "-100dvh", // Falls straight down from off-screen
              x: 0, // Symmetrical center line is always 0
              opacity: 0,
              rotate: -15,
            }}
            animate={{
              y: "clamp(-1.2rem, -2vw, -0.5rem)", // Lands nested exactly in between them
              x: 0, // Remains centered as letters slide away
              opacity: 1,
              rotate: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 160,
              damping: 8,
            }}
            className="absolute z-30 w-[clamp(4.2rem,19vw,12rem)]" // Scaled proportionally
          >
            <Image
              src="/images/mas.svg"
              alt="Chef Hat"
              width={180}
              height={180}
              className="w-full h-auto"
              priority
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLASH */}
      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 bg-white z-50"
          />
        )}
      </AnimatePresence>
    </main>
  );
}