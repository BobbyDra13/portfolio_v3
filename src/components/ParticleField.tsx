"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Detect mobile for particle count tuning
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

// Scroll progress: 0 at top, 1 at bottom
function useScrollProgress() {
  const progress = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.current = max > 0 ? window.scrollY / max : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

interface ParticlesProps {
  count: number;
  scrollProgress: React.MutableRefObject<number>;
}

function Particles({ count, scrollProgress }: ParticlesProps) {
  const meshRef = useRef<THREE.Points>(null!);

  // Generate random particle positions
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const accentColor = new THREE.Color("#FF6B00");
    const dimColor = new THREE.Color("#2a2a2a");
    const midColor = new THREE.Color("#1e1e1e");

    for (let i = 0; i < count; i++) {
      // Spread across a wide volume
      positions[i * 3] = (Math.random() - 0.5) * 20;      // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;  // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;  // z (shallow depth)

      // 6% accent, rest dim
      const rand = Math.random();
      const c = rand < 0.06 ? accentColor : rand < 0.3 ? midColor : dimColor;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count]);

  // Smooth scroll target for interpolation
  const smoothScroll = useRef(0);
  const rotationBase = useRef({ x: 0, y: 0 });

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    // Smooth scroll interpolation
    smoothScroll.current += (scrollProgress.current - smoothScroll.current) * 0.05;

    const s = smoothScroll.current;

    // Gentle base rotation (always on)
    rotationBase.current.x += delta * 0.015;
    rotationBase.current.y += delta * 0.008;

    // Scroll-driven tilt and drift
    meshRef.current.rotation.x = rotationBase.current.x + s * 0.6;
    meshRef.current.rotation.y = rotationBase.current.y + s * 0.4;

    // Subtle z-drift as you scroll (parallax feel)
    meshRef.current.position.z = s * -1.5;
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
    });
  }, []);

  return <points ref={meshRef} geometry={geometry} material={material} />;
}

export default function ParticleField() {
  const isMobile = useIsMobile();
  const scrollProgress = useScrollProgress();
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
  }, []);

  if (prefersReduced) return null;

  const particleCount = isMobile ? 800 : 2000;

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 75 }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Particles count={particleCount} scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
