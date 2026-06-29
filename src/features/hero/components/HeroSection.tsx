"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";

interface SocialLinkProps {
  href: string;
  iconSvg: React.ReactNode;
  alt: string;
}

const SOCIAL_LINKS: SocialLinkProps[] = [
  {
    href: "https://github.com/AdityaWaradkar",
    alt: "GitHub",
    iconSvg: (
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    ),
  },
  {
    href: "https://www.linkedin.com/in/aditya-waradkar-9a03b92a5/",
    alt: "LinkedIn",
    iconSvg: (
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    ),
  },
  {
    href: "https://www.instagram.com/adityaa.draws",
    alt: "Instagram",
    iconSvg: (
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    ),
  },
];

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function HeroSection() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Array<{ top: string; left: string; delay: string; opacity: number }>>([]);

  useEffect(() => {
    const count = window.innerWidth < 768 ? 12 : 24;
    const newParticles = Array.from({ length: count }).map((_, i) => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${i * 0.4}s`,
      opacity: 0.1 + Math.random() * 0.3,
    }));
    setParticles(newParticles);
  }, []);

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
      className="relative w-full h-screen overflow-hidden text-white text-center px-4 bg-bg-dark flex flex-col justify-between items-center"
    >
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a2a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a2a_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a2a3a_1px,transparent_1px),linear-gradient(to_bottom,#2a2a3a_1px,transparent_1px)] bg-[size:48px_48px] opacity-10" />
      </div>

      <div
        className="absolute top-0 left-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full mix-blend-screen opacity-20 blur-[100px] bg-purple-600 transition-transform duration-500 ease-out pointer-events-none"
        style={{
          transform: `translate(${mouseOffset.x}px, ${mouseOffset.y}px)`,
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[350px] h-[350px] md:w-[700px] md:h-[700px] rounded-full mix-blend-screen opacity-20 blur-[120px] bg-blue-600 transition-transform duration-500 ease-out pointer-events-none"
        style={{
          transform: `translate(${-mouseOffset.x}px, ${-mouseOffset.y}px)`,
        }}
      />

      {particles.length > 0 && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-[float-particle_12s_infinite_ease-in-out]"
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

      <div className="flex flex-col justify-center items-center flex-grow z-10 max-w-4xl mt-16">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 blur-3xl scale-125 pointer-events-none" />
          <h1 className="relative font-bold tracking-tight leading-tight bg-gradient-to-r from-purple-200 via-white to-blue-200 bg-clip-text text-transparent text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl md:whitespace-nowrap p-2 drop-shadow-[0_0_30px_rgba(128,0,255,0.15)]">
            Hey, I'm Aditya Waradkar
          </h1>
        </div>

        <div className="relative space-y-3">
          <div className="flex items-center justify-center gap-2">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gradient-to-r from-purple-400 to-blue-400 animate-pulse" />
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
          </div>
          <p className="font-light bg-gradient-to-r from-purple-300 via-white to-blue-300 bg-clip-text text-transparent tracking-wide text-base sm:text-lg md:text-2xl drop-shadow-[0_0_20px_rgba(128,0,255,0.1)]">
            crafting systems that make a difference
          </p>
        </div>
      </div>

      <div className="w-full max-w-xs flex flex-col items-center gap-6 pb-12 z-10">
        <div className="flex justify-center gap-8">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.alt}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit my ${social.alt} profile`}
              className="group relative p-2 bg-white/5 rounded-full border border-white/10 hover:border-purple-500/30 hover:bg-white/10 transition-all duration-300 shadow-lg"
            >
              <svg
                className="w-6 h-6 fill-white/60 group-hover:fill-white transition-colors duration-300"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {social.iconSvg}
              </svg>
            </a>
          ))}
        </div>

        <div className="relative group w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative backdrop-blur-sm bg-white/5 rounded-full border border-white/5 hover:border-purple-500/20 px-6 py-2 transition-all duration-300">
            <span className="font-medium text-xs sm:text-sm text-transparent bg-gradient-to-r from-purple-300 via-white to-blue-300 bg-clip-text tracking-wide italic">
              {visitorDisplay}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}