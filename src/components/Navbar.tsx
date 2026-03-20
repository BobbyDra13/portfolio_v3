"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

const navLinks = [
  { label: "ABOUT", href: "#about" },
  { label: "WORK", href: "#experience" },
  { label: "PROJECTS", href: "#projects" },
  { label: "SKILLS", href: "#skills" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX, transformOrigin: "left" }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-accent z-[9999] pointer-events-none"
      />

      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-6 z-50 transition-all duration-300 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 ${
          scrolled ? "md:w-[min(680px,90vw)]" : "md:w-[min(760px,92vw)]"
        }`}
      >
        <div
          className="flex items-center justify-between px-6 py-3 rounded-full border border-[#2a2a2a] bg-[#0F0F0F]/80 backdrop-blur-xl"
          style={{ boxShadow: "0 0 0 1px #ffffff08, 0 8px 32px #00000060" }}
        >
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-[11px] font-mono tracking-[0.22em] text-[#F0F0F0] uppercase hover:text-accent transition-colors"
          >
            MC<span className="text-accent">.</span>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                className="text-[10px] tracking-[0.2em] text-[#888] hover:text-[#F0F0F0] transition-colors duration-200 font-medium"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <a
            href="mailto:manaschandra07@gmail.com"
            className="hidden md:flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase font-medium text-accent border border-accent/30 rounded-full px-4 py-1.5 hover:bg-accent hover:text-[#0F0F0F] transition-all duration-200"
          >
            Hire Me <span className="text-xs">→</span>
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center gap-[5px] p-2 -mr-1"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-[#F0F0F0] rounded-full transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block w-5 h-0.5 bg-[#F0F0F0] rounded-full transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-[#F0F0F0] rounded-full transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-24 left-4 right-4 z-40 bg-[#111]/95 backdrop-blur-xl border border-[#2a2a2a] rounded-2xl p-6 flex flex-col gap-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-[min(340px,88vw)]"
          >
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                className="text-left text-[11px] tracking-[0.2em] text-[#888] hover:text-[#F0F0F0] transition-colors py-2 border-b border-[#1e1e1e] last:border-0"
              >
                {link.label}
              </button>
            ))}
            <a
              href="mailto:manaschandra07@gmail.com"
              className="mt-2 text-center text-[10px] tracking-[0.15em] uppercase text-accent border border-accent/30 rounded-full py-2 hover:bg-accent hover:text-[#0F0F0F] transition-all"
            >
              Hire Me →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
