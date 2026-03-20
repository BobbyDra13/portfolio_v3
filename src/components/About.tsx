"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const interests = [
  { label: "Modern Web & Animations", icon: "◈" },
  { label: "Design Systems", icon: "◈" },
  { label: "AI-Augmented Development", icon: "◈" },
  { label: "3D Web Experiences", icon: "◈" },
  { label: "Gaming & Game Design", icon: "◈" },
  { label: "Problem Solving", icon: "◈" },
];

const currently = [
  { label: "Deepening", value: "Three.js & WebGL" },
  { label: "Exploring", value: "New AI dev tooling" },
  { label: "Building", value: "3D interactive web" },
  { label: "Reading", value: "Design & engineering blogs" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative px-6 md:px-16 lg:px-24 py-20 md:py-28 border-t border-[#1a1a1a] overflow-hidden">
      {/* Ghost background text */}
      <div
        className="absolute -right-8 top-1/2 -translate-y-1/2 font-black text-[clamp(6rem,18vw,16rem)] leading-none select-none pointer-events-none uppercase hidden lg:block"
        style={{ WebkitTextStroke: "1px #191919", color: "transparent" }}
        aria-hidden
      >
        ME
      </div>

      <div ref={ref} className="max-w-5xl mx-auto relative z-10">

        {/* Section header */}
        <div className="flex items-start gap-8 mb-14 md:mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[10px] font-mono tracking-[0.2em] text-[#444] pt-1 hidden md:block"
          >
            01
          </motion.span>
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[10px] tracking-[0.3em] text-accent uppercase mb-3"
            >
              — About Me
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[clamp(2rem,5vw,4rem)] font-black leading-tight tracking-tight text-[#F0F0F0] uppercase"
            >
              The Person
              <br />
              <span style={{ WebkitTextStroke: "1.5px #FF6B00", color: "transparent" }}>
                Behind The Code
              </span>
            </motion.h2>
          </div>
        </div>

        {/* Bio */}
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-10 md:gap-20 mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#444] mb-4 font-medium">Who I Am</p>
            <p className="text-[#888] text-sm md:text-base leading-[1.85] mb-4">
              I&apos;m a full-stack developer who genuinely loves what I build. Coming from an Industrial Design background, I approach every project with both an engineering mindset and an eye for aesthetics — because good software should look as good as it works.
            </p>
            <p className="text-[#666] text-sm leading-[1.85]">
              I find real joy in crafting modern interfaces with fluid animations, tackling unfamiliar problems, and finding cleaner ways to build things. AI has become a big part of how I work — not as a crutch, but as a tool that sharpens my productivity and lets me focus on what actually matters: building great experiences.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#444] mb-4 font-medium">What I&apos;m Into</p>
            <div className="grid grid-cols-2 gap-2">
              {interests.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.35 + i * 0.06 }}
                  className="flex items-center gap-2.5 py-2.5 border-b border-[#1a1a1a] group"
                >
                  <span className="text-accent text-[8px] group-hover:scale-125 transition-transform">{item.icon}</span>
                  <span className="text-[11px] text-[#777] group-hover:text-[#F0F0F0] transition-colors leading-tight">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Currently strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border border-[#1a1a1a] bg-[#0d0d0d] p-6 md:p-8"
        >
          <p className="text-[10px] tracking-[0.25em] uppercase text-accent mb-6 font-medium flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Currently
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {currently.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.55 + i * 0.07 }}
              >
                <p className="text-[9px] tracking-[0.2em] uppercase text-[#444] mb-1.5 font-medium">{item.label}</p>
                <p className="text-sm font-semibold text-[#F0F0F0] leading-snug">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
