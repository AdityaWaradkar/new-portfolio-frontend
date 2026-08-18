"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

// Social link interface
interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  alt: string;
}

// Social links data with react-icons
const SOCIAL_LINKS: SocialLinkProps[] = [
  {
    href: "https://github.com/AdityaWaradkar",
    alt: "GitHub",
    icon: <FaGithub />,
  },
  {
    href: "https://www.linkedin.com/in/aditya-waradkar-9a03b92a5/",
    alt: "LinkedIn",
    icon: <FaLinkedin />,
  },
  {
    href: "https://www.instagram.com/adityaa.draws",
    alt: "Instagram",
    icon: <FaInstagram />,
  },
];

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function HeroSection() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<
    Array<{ top: string; left: string; delay: string; opacity: number }>
  >([]);

  // Generate particles based on screen size
  useEffect(() => {
    const count = window.innerWidth < 768 ? 8 : 24;
    const newParticles = Array.from({ length: count }).map((_, i) => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${i * 0.4}s`,
      opacity: 0.05 + Math.random() * 0.15,
    }));
    setParticles(newParticles);
  }, []);

  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth >= 768 && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMouseOffset({ x: x * 30, y: y * 30 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Fetch visitor count
  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const res = await fetch(`${API_URL}/api/visits`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setVisitorCount(data.visits);
        setError(null);
      } catch {
        setError("Counter temporarily offline");
      }
    };

    fetchVisitorCount();
    const interval = setInterval(fetchVisitorCount, 15000);
    return () => clearInterval(interval);
  }, []);

  // Memoized visitor display
  const visitorDisplay = useMemo(() => {
    if (visitorCount !== null) {
      return (
        <>
          <span className="font-bold text-purple-300/90">
            {visitorCount.toLocaleString()}
          </span>
          {" "}visitors... and you're one.
        </>
      );
    }
    if (error) {
      return <span className="text-white/40">{error}</span>;
    }
    return <span className="text-white/40 animate-pulse">Synchronizing handshake...</span>;
  }, [visitorCount, error]);

  return (
    <section
      id="homeSection"
      ref={containerRef}
      className="relative w-full min-h-[60vh] md:min-h-screen overflow-hidden text-white text-center px-4 sm:px-6 bg-bg-dark flex flex-col justify-center items-center py-8 sm:py-12 md:py-20"
    >
      {/* Background grid - nested grid effect with smaller sizes */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {/* Outer grid - larger boxes with higher opacity */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a2a3a_1px,transparent_1px),linear-gradient(to_bottom,#2a2a3a_1px,transparent_1px)] bg-[size:32px_32px] opacity-25 sm:opacity-35 md:opacity-45" />
        
        {/* Inner grid - smaller boxes with lower opacity (4 boxes per outer box) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a2a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a2a_1px,transparent_1px)] bg-[size:16px_16px] opacity-15 sm:opacity-20 md:opacity-25" />
        
        {/* Even finer grid - for additional depth */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0a1a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a1a_1px,transparent_1px)] bg-[size:8px_8px] opacity-10 sm:opacity-15 md:opacity-20" />
      </div>

      {/* Animated gradient blobs - reduced intensity */}
      <div
        className="absolute top-0 left-0 w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] rounded-full mix-blend-screen opacity-[0.03] sm:opacity-[0.06] md:opacity-[0.08] blur-[40px] sm:blur-[60px] md:blur-[100px] bg-purple-600 transition-transform duration-500 ease-out pointer-events-none"
        style={{
          transform: `translate(${mouseOffset.x}px, ${mouseOffset.y}px)`,
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[180px] h-[180px] sm:w-[300px] sm:h-[300px] md:w-[450px] md:h-[450px] lg:w-[600px] lg:h-[600px] rounded-full mix-blend-screen opacity-[0.03] sm:opacity-[0.06] md:opacity-[0.08] blur-[50px] sm:blur-[80px] md:blur-[120px] bg-blue-600 transition-transform duration-500 ease-out pointer-events-none"
        style={{
          transform: `translate(${-mouseOffset.x}px, ${-mouseOffset.y}px)`,
        }}
      />

      {/* Floating particles - reduced opacity */}
      {particles.length > 0 && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white/10 rounded-full animate-float-particle"
              style={{
                top: particle.top,
                left: particle.left,
                animationDelay: particle.delay,
                opacity: particle.opacity,
              }}
            />
          ))}
        </div>
      )}

      {/* Main content - optimized spacing */}
      <div className="flex flex-col justify-center items-center z-10 max-w-4xl px-2">
        <div className="relative mb-1.5 sm:mb-2 md:mb-4">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 blur-2xl scale-110 pointer-events-none" />
          <h1 className="relative font-bold tracking-tight leading-[1.1] bg-gradient-to-r from-purple-200 via-white to-blue-200 bg-clip-text text-transparent text-xl xs:text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl whitespace-nowrap drop-shadow-[0_0_30px_rgba(128,0,255,0.08)] py-0.5 sm:py-1">
            Hey, I'm Aditya Waradkar
          </h1>
        </div>

        <div className="relative space-y-1 sm:space-y-1.5 md:space-y-2">
          <div className="flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2">
            <div className="h-[1px] w-4 sm:w-6 md:w-10 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
            <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 rotate-45 bg-gradient-to-r from-purple-400 to-blue-400 animate-pulse" />
            <div className="h-[1px] w-4 sm:w-6 md:w-10 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
          </div>
          <p className="font-light bg-gradient-to-r from-purple-300 via-white to-blue-300 bg-clip-text text-transparent tracking-wide text-[10px] xs:text-xs sm:text-sm md:text-base lg:text-lg drop-shadow-[0_0_20px_rgba(128,0,255,0.05)]">
            crafting systems that make a difference
          </p>
        </div>
      </div>

      {/* Footer section - compact on mobile */}
      <div className="w-full max-w-xs sm:max-w-sm flex flex-col items-center gap-1.5 sm:gap-2 md:gap-3 mt-2 sm:mt-3 md:mt-6 z-10">
        <div className="flex justify-center gap-4 sm:gap-5 md:gap-7">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.alt}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit my ${social.alt} profile`}
              className="group relative p-1 sm:p-1.5 md:p-2 bg-white/5 rounded-full border border-white/10 hover:border-purple-500/30 hover:bg-white/10 transition-all duration-300 shadow-lg hover:scale-110 transform"
            >
              <span className="text-white/60 group-hover:text-white transition-colors duration-300 text-xs sm:text-sm md:text-lg lg:text-xl">
                {social.icon}
              </span>
            </a>
          ))}
        </div>

        <div className="relative group w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative backdrop-blur-sm bg-white/5 rounded-full border border-white/5 hover:border-purple-500/20 px-2.5 sm:px-3 md:px-4 py-0.5 sm:py-1 transition-all duration-300">
            <span className="font-medium text-[8px] xs:text-[10px] sm:text-xs md:text-sm text-transparent bg-gradient-to-r from-purple-300 via-white to-blue-300 bg-clip-text tracking-wide italic">
              {visitorDisplay}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}