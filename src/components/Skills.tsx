"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { resume } from "@/data/resume";

interface SkillCardProps {
  category: string;
  skills: string[];
  catIdx: number;
  inView: boolean;
}

function SkillCard({ category, skills, catIdx, inView }: SkillCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Alternate even/odd cards for staggered depth feel
  const yRange = catIdx % 2 === 0 ? [20, -20] : [35, -15];
  const y = useTransform(scrollYProgress, [0, 1], yRange);

  return (
    <motion.div ref={cardRef} style={{ y }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 + catIdx * 0.08 }}
        className="border-t border-l border-[#1a1a1a] p-5 md:p-8 group hover:bg-[#0d0d0d] transition-colors h-full"
      >
        {/* Category label */}
        <div className="flex items-center gap-3 mb-5">
          <span className="text-accent text-xs">▸</span>
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#555] font-medium">{category}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, skillIdx) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.2 + catIdx * 0.08 + skillIdx * 0.03 }}
              className="text-[11px] tracking-wide text-[#888] border border-[#1e1e1e] px-3 py-1.5 hover:border-accent/30 hover:text-[#F0F0F0] transition-colors cursor-default"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const categories = Object.entries(resume.skills);

  return (
    <section id="skills" className="relative px-6 md:px-16 lg:px-24 py-20 md:py-28 border-t border-[#1a1a1a]">
      <div ref={ref} className="max-w-5xl mx-auto">

        {/* Section header */}
        <div className="flex items-start gap-8 mb-14 md:mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[10px] font-mono tracking-[0.2em] text-[#444] pt-1 hidden md:block"
          >
            05
          </motion.span>
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[10px] tracking-[0.3em] text-accent uppercase mb-3"
            >
              — Expertise
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[clamp(2rem,5vw,4rem)] font-black leading-tight tracking-tight text-[#F0F0F0] uppercase"
            >
              Tools &amp;
              <br />
              <span style={{ WebkitTextStroke: "1.5px #FF6B00", color: "transparent" }}>
                Technologies
              </span>
            </motion.h2>
          </div>
        </div>

        {/* Skills grid — each card has its own scroll parallax */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-r border-b border-[#1a1a1a]">
          {categories.map(([category, skills], catIdx) => (
            <SkillCard
              key={category}
              category={category}
              skills={skills}
              catIdx={catIdx}
              inView={inView}
            />
          ))}
        </div>

        {/* Bottom marquee-style tech strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 overflow-hidden border-t border-b border-[#1a1a1a] py-4"
        >
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="flex gap-8 whitespace-nowrap"
          >
            {[...Object.values(resume.skills).flat(), ...Object.values(resume.skills).flat()].map(
              (skill, i) => (
                <span key={i} className="text-[10px] tracking-[0.2em] text-[#2a2a2a] uppercase font-medium">
                  {skill} <span className="text-accent mx-3">·</span>
                </span>
              )
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
