"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE = "a, button, [role='button'], [data-cursor]";

export default function Cursor() {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Ring trails with spring physics
  const ringX = useSpring(mouseX, { stiffness: 180, damping: 18 });
  const ringY = useSpring(mouseY, { stiffness: 180, damping: 18 });

  useEffect(() => {
    setMounted(true);

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    // mouseover/mouseout bubble — reliable for detecting interactive element entry
    const onOver = (e: MouseEvent) => {
      const target = e.target;
      if (target instanceof Element && target.closest(INTERACTIVE)) {
        setHovered(true);
      }
    };

    const onOut = (e: MouseEvent) => {
      const related = e.relatedTarget;
      // Only clear hover if we're leaving to a non-interactive element
      if (!(related instanceof Element && related.closest(INTERACTIVE))) {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [mouseX, mouseY]);

  // Don't render until client-side — avoids hydration mismatch and off-screen flash
  if (!mounted) return null;

  return (
    <>
      {/* Dot — snaps exactly to cursor */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[99999] hidden md:block"
        style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovered ? 6 : 4,
          height: hovered ? 6 : 4,
          backgroundColor: hovered ? "#FF6B00" : "#F0F0F0",
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Ring — spring-lagged, expands on hover */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-[99998] hidden md:block"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovered ? 44 : 28,
          height: hovered ? 44 : 28,
          borderColor: hovered ? "rgba(255,107,0,0.5)" : "rgba(255,255,255,0.12)",
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
