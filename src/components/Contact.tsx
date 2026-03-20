"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { resume } from "@/data/resume";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const links = [
    { label: "Email", display: resume.contact.email, href: `mailto:${resume.contact.email}` },
    { label: "LinkedIn", display: resume.contact.linkedin, href: resume.contact.linkedinUrl },
    { label: "GitHub", display: resume.contact.github, href: resume.contact.githubUrl },
  ];

  return (
    <section
      id="contact"
      className="relative px-6 md:px-16 lg:px-24 py-20 md:py-28 border-t border-[#1a1a1a] overflow-hidden"
    >
      {/* Big ghost text */}
      <div
        className="absolute bottom-0 left-0 right-0 text-center font-black text-[clamp(4rem,14vw,12rem)] leading-none select-none pointer-events-none uppercase"
        style={{ WebkitTextStroke: "1px #1a1a1a", color: "transparent" }}
        aria-hidden
      >
        Contact
      </div>

      <div ref={ref} className="max-w-5xl mx-auto relative z-10">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-[10px] tracking-[0.3em] text-accent uppercase mb-6"
        >
          — Get In Touch
        </motion.p>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-24">

          {/* Left — heading + body */}
          <div className="flex-1">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-[clamp(2.4rem,7vw,6rem)] font-black leading-[0.9] tracking-tight text-[#F0F0F0] uppercase mb-6"
            >
              Let&apos;s Build
              <br />
              <span style={{ WebkitTextStroke: "1.5px #FF6B00", color: "transparent" }}>
                Something
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#666] text-sm md:text-base leading-relaxed max-w-sm mb-10"
            >
              I&apos;m open to full-time roles, freelance projects, and interesting
              collaborations. Drop me a line and I&apos;ll get back to you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <a
                href={`mailto:${resume.contact.email}`}
                className="group inline-flex items-center gap-3 text-[11px] tracking-[0.15em] uppercase font-medium text-[#0F0F0F] bg-accent rounded-full px-8 py-4 hover:bg-[#ff8533] transition-all duration-300"
              >
                Send a Message
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </a>
            </motion.div>
          </div>

          {/* Right — contact info card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-14 lg:mt-2 lg:w-80 border border-[#1a1a1a] rounded-sm divide-y divide-[#1a1a1a]"
          >
            {links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="group flex flex-col gap-1 px-6 py-5 hover:bg-[#141414] transition-colors duration-200"
              >
                <span className="text-[9px] tracking-[0.25em] text-accent uppercase font-medium">
                  {link.label}
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-[#888] text-xs group-hover:text-[#F0F0F0] transition-colors duration-200 truncate">
                    {link.display}
                  </span>
                  <span className="text-[#444] group-hover:text-accent group-hover:translate-x-1 transition-all duration-200 ml-3 flex-shrink-0">
                    →
                  </span>
                </div>
              </a>
            ))}
          </motion.div>
        </div>

        {/* Divider */}
        <div className="mt-20 pt-8 border-t border-[#1a1a1a] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-[10px] font-mono tracking-[0.15em] text-[#333]"
          >
            © 2026 Manas Chandra. All rights reserved.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="text-[10px] font-mono tracking-[0.15em] text-[#333]"
          >
            Designed &amp; Built with ♥
          </motion.p>
        </div>
      </div>
    </section>
  );
}
