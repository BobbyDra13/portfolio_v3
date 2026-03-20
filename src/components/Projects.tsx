"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { resume } from "@/data/resume";

type Project = (typeof resume.projects)[number];

interface ProjectRowProps {
  project: Project;
  idx: number;
  inView: boolean;
  hovered: number | null;
  setHovered: (idx: number | null) => void;
}

function ProjectRow({ project, idx, inView, hovered, setHovered }: ProjectRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"],
  });

  // Parallax: drifts up as you scroll past it
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const isActive = hovered === idx;

  return (
    // Outer div carries the scroll-driven parallax
    <motion.div ref={rowRef} style={{ y }}>
      {/* Inner div carries the entrance fade animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 + idx * 0.1 }}
        onMouseEnter={() => setHovered(idx)}
        onMouseLeave={() => setHovered(null)}
        className="group border-t border-[#1a1a1a] last:border-b py-7 md:py-10 cursor-default"
      >
        <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12">

          {/* Index */}
          <span
            className={`font-mono text-[11px] tracking-widest shrink-0 transition-colors duration-300 md:pt-1 ${
              isActive ? "text-accent" : "text-[#333]"
            }`}
          >
            {project.index}
          </span>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Title + period */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-3 mb-3">
              <h3
                className={`text-lg md:text-2xl font-bold leading-tight transition-colors duration-300 ${
                  isActive ? "text-[#F0F0F0]" : "text-[#aaa]"
                }`}
              >
                {project.name}
              </h3>
              <span className="text-[10px] font-mono text-[#444] tracking-wider shrink-0 sm:pt-1">
                {project.period}
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className={`text-[10px] tracking-[0.12em] uppercase px-2.5 py-1 border transition-colors duration-300 ${
                    isActive
                      ? "border-accent/40 text-accent"
                      : "border-[#222] text-[#555]"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="text-sm text-[#666] leading-relaxed">{project.description}</p>

            {/* Bullets — always visible on mobile */}
            <div className="md:hidden mt-3 space-y-2">
              {project.bullets.map((b, i) => (
                <p key={i} className="flex items-start gap-2 text-sm text-[#666] leading-relaxed">
                  <span className="text-accent shrink-0 text-xs mt-0.5">→</span>
                  {b}
                </p>
              ))}
            </div>

            {/* Bullets — hover-expand on desktop */}
            <motion.div
              initial={false}
              animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden hidden md:block"
            >
              <ul className="mt-4 space-y-2">
                {project.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#777] leading-relaxed">
                    <span className="text-accent mt-0.5 shrink-0 text-xs">→</span>
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Live / GitHub links */}
            {"liveUrl" in project || "githubUrl" in project ? (
              <div className="flex flex-wrap gap-4 mt-4">
                {"liveUrl" in project && project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link flex items-center gap-1.5 text-[10px] tracking-[0.15em] uppercase text-accent border border-accent/30 rounded-full px-3 py-1.5 hover:bg-accent hover:text-[#0F0F0F] transition-all duration-200"
                  >
                    Live Demo
                    <span className="group-hover/link:translate-x-0.5 transition-transform">→</span>
                  </a>
                )}
                {"githubUrl" in project && project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link flex items-center gap-1.5 text-[10px] tracking-[0.15em] uppercase text-[#555] border border-[#2a2a2a] rounded-full px-3 py-1.5 hover:border-[#444] hover:text-[#F0F0F0] transition-all duration-200"
                  >
                    GitHub
                    <span className="group-hover/link:translate-x-0.5 transition-transform">→</span>
                  </a>
                )}
              </div>
            ) : null}
          </div>

          {/* Arrow indicator — desktop only */}
          <motion.span
            animate={{ x: isActive ? 0 : -4, opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-accent text-lg shrink-0 hidden md:block pt-1"
          >
            →
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="projects" className="relative px-6 md:px-16 lg:px-24 py-20 md:py-28 border-t border-[#1a1a1a]">
      <div ref={ref} className="max-w-5xl mx-auto">

        {/* Section header */}
        <div className="flex items-start gap-8 mb-14 md:mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[10px] font-mono tracking-[0.2em] text-[#444] pt-1 hidden md:block"
          >
            04
          </motion.span>
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[10px] tracking-[0.3em] text-accent uppercase mb-3"
            >
              — Selected Work
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[clamp(2rem,5vw,4rem)] font-black leading-tight tracking-tight text-[#F0F0F0] uppercase"
            >
              Things I&apos;ve
              <br />
              <span style={{ WebkitTextStroke: "1.5px #FF6B00", color: "transparent" }}>
                Built
              </span>
            </motion.h2>
          </div>
        </div>

        {/* Projects list — each row has its own scroll parallax */}
        <div className="space-y-0">
          {resume.projects.map((project, idx) => (
            <ProjectRow
              key={project.index}
              project={project}
              idx={idx}
              inView={inView}
              hovered={hovered}
              setHovered={setHovered}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
