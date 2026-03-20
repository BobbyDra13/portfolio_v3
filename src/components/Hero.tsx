"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { resume } from "@/data/resume";

function useCountUp(target: number, duration = 1400, decimals = 0) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      // ease out expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(parseFloat((eased * target).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target, duration, decimals]);

  return { value, start: () => setStarted(true) };
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

function StatCounter({ target, suffix, label, decimals = 0 }: { target: number; suffix: string; label: string; decimals?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { value, start } = useCountUp(target, 1400, decimals);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !triggered) { setTriggered(true); start(); } },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [triggered, start]);

  return (
    <div ref={ref}>
      <p className="text-[clamp(1.6rem,3vw,2.4rem)] font-black text-[#F0F0F0] leading-none mb-1">
        {value.toFixed(decimals)}{suffix}
      </p>
      <p className="text-[9px] md:text-[10px] tracking-[0.1em] md:tracking-[0.15em] text-[#555] uppercase">
        {label}
      </p>
    </div>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Each layer drifts at a different rate — depth illusion
  const yManas    = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const yChandra  = useTransform(scrollYProgress, [0, 1], [0, -55]);
  const yTagline  = useTransform(scrollYProgress, [0, 1], [0, -35]);
  const yStats    = useTransform(scrollYProgress, [0, 1], [0, -15]);
  const opacity   = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center dot-grid overflow-hidden px-6 md:px-16 lg:px-24"
    >
      {/* Corner markers */}
      <span className="absolute top-8 left-8 text-[#ffffff10] font-mono text-[10px] tracking-widest select-none">+</span>
      <span className="absolute top-8 right-8 text-[#ffffff10] font-mono text-[10px] tracking-widest select-none">+</span>
      <span className="absolute bottom-8 left-8 text-[#ffffff10] font-mono text-[10px] tracking-widest select-none">+</span>
      <span className="absolute bottom-8 right-8 text-[#ffffff10] font-mono text-[10px] tracking-widest select-none">+</span>

      {/* Binary texture */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-48 text-right font-mono text-[9px] leading-5 text-[#ffffff06] select-none pointer-events-none pr-8 hidden lg:block"
        aria-hidden
      >
        {["01001101", "00110011", "10110101", "01110010", "00101010", "11001100", "01010111", "10001101", "00111010", "11100011"].map((b, i) => (
          <div key={i}>{b}</div>
        ))}
      </div>

      <div className="max-w-5xl w-full pt-32 pb-20">
        {/* Label */}
        <motion.p
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          style={mounted ? { opacity } : {}}
          className="text-[10px] tracking-[0.3em] text-accent uppercase mb-6 font-medium"
        >
          — Full-Stack Developer
        </motion.p>

        {/* Name — giant display type, each line drifts at its own rate */}
        <div className="overflow-visible mb-6">
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            style={mounted ? { y: yManas, opacity } : {}}
            className="text-[clamp(3.2rem,9vw,8rem)] font-black leading-[0.9] tracking-tight text-[#F0F0F0] uppercase"
          >
            MANAS
          </motion.h1>
          <motion.h1
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            style={mounted ? { y: yChandra, opacity, WebkitTextStroke: "1.5px #FF6B00" } : { WebkitTextStroke: "1.5px #FF6B00" }}
            className="text-[clamp(3.2rem,9vw,8rem)] font-black leading-[0.9] tracking-tight text-transparent"
          >
            CHANDRA
          </motion.h1>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={mounted ? { opacity } : {}}
          className="h-px bg-[#222] w-full max-w-lg mb-8"
        />

        {/* Tagline + CTAs */}
        <motion.div
          style={mounted ? { y: yTagline, opacity } : {}}
          className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16"
        >
          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-[#888] text-sm md:text-base leading-relaxed max-w-sm"
          >
            {resume.tagline}
          </motion.p>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
              className="group flex items-center gap-3 text-[11px] tracking-[0.15em] uppercase font-medium text-[#F0F0F0] border border-[#333] rounded-full px-6 py-3 hover:border-accent hover:text-accent transition-all duration-300"
            >
              View Work
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </button>
            <a
              href="/Manas_Chandra_Sreemanthula_Resume.pdf"
              download
              className="group flex items-center gap-3 text-[11px] tracking-[0.15em] uppercase font-medium text-[#0F0F0F] bg-accent rounded-full px-6 py-3 hover:bg-[#ff8533] transition-all duration-300"
            >
              Resume
              <span className="group-hover:translate-x-1 transition-transform duration-200">↓</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          style={mounted ? { y: yStats, opacity } : {}}
          className="mt-12 md:mt-16 grid grid-cols-3 gap-4 md:flex md:gap-16"
        >
          <StatCounter target={1} suffix="+" label="Years Exp." />
          <StatCounter target={4} suffix="+" label="Projects" />
          <StatCounter target={8.24} suffix="" label="GPA" decimals={2} />
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        style={mounted ? { opacity } : {}}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] tracking-[0.25em] text-[#444] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-[#444] to-transparent"
        />
      </motion.div>
    </section>
  );
}
