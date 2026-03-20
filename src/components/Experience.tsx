"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { resume } from "@/data/resume";

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;  // -0.5 to 0.5
    const y = (e.clientY - top) / height - 0.5;
    setTilt({ x: y * -8, y: x * 8 }); // rotateX flips y axis
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ perspective: 1000 }}>
      <motion.div
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={className}
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="relative px-6 md:px-16 lg:px-24 py-20 md:py-28 border-t border-[#1a1a1a]">
      <div ref={ref} className="max-w-5xl mx-auto">

        {/* Section header */}
        <div className="flex items-start gap-8 mb-14 md:mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[10px] font-mono tracking-[0.2em] text-[#444] pt-1 hidden md:block"
          >
            03
          </motion.span>
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[10px] tracking-[0.3em] text-accent uppercase mb-3"
            >
              — Experience
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[clamp(2rem,5vw,4rem)] font-black leading-tight tracking-tight text-[#F0F0F0] uppercase"
            >
              Where I&apos;ve
              <br />
              <span style={{ WebkitTextStroke: "1.5px #FF6B00", color: "transparent" }}>
                Been Working
              </span>
            </motion.h2>
          </div>
        </div>

        {/* Work experience */}
        {resume.experience.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 + idx * 0.1 }}
            className="mb-6"
          >
            <TiltCard className="p-6 md:p-8 border border-[#1e1e1e] bg-[#0d0d0d] relative overflow-hidden group hover:border-[#2e2e2e] transition-colors">
              <div className="absolute top-0 left-0 w-px h-full bg-accent/20 group-hover:bg-accent/60 transition-colors" />

              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <p className="text-[10px] tracking-[0.2em] text-accent uppercase font-medium">{exp.type}</p>
                    <span className="w-1 h-1 rounded-full bg-[#333]" />
                    <p className="text-[10px] tracking-[0.15em] text-[#555] uppercase">{exp.location}</p>
                  </div>
                  <h3 className="text-xl font-bold text-[#F0F0F0] mb-1">{exp.role}</h3>
                  <p className="text-sm text-[#666]">{exp.company}</p>
                </div>
                <div className="shrink-0">
                  <p className="text-[11px] font-mono tracking-wider text-[#555]">{exp.period}</p>
                </div>
              </div>

              {/* Bullets */}
              <ul className="space-y-3">
                {exp.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#888] leading-relaxed">
                    <span className="text-accent mt-1 shrink-0">→</span>
                    {b}
                  </li>
                ))}
              </ul>
            </TiltCard>
          </motion.div>
        ))}

        {/* Education card — secondary, shown below work */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="p-6 md:p-8 border border-[#1a1a1a] bg-[#0d0d0d] relative overflow-hidden group hover:border-[#2e2e2e] transition-colors"
        >
          <div className="absolute top-0 left-0 w-px h-full bg-[#333] group-hover:bg-accent/30 transition-colors" />
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <p className="text-[10px] tracking-[0.2em] text-[#555] uppercase mb-2 font-medium">Education</p>
              <h3 className="text-lg font-bold text-[#888] mb-1">{resume.education[0].institution}</h3>
              <p className="text-sm text-[#555]">{resume.education[0].degree}</p>
            </div>
            <div className="md:text-right shrink-0">
              <p className="text-[11px] font-mono tracking-wider text-[#444] mb-1">{resume.education[0].period}</p>
              <p className="text-sm font-bold text-[#666]">GPA {resume.education[0].gpa}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
