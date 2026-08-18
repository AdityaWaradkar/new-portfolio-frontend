"use client";

import React, { useMemo } from "react";

type ProjectStatus = "completed" | "in-progress";

interface ProjectItem {
  id: string;
  name: string;
  status: ProjectStatus;
  description: string;
  longDescription: string;
  githubLink: string;
  tech: string[];
  color: string;
  highlights: string[];
}

// Extracted constants outside component
const PROJECTS: readonly ProjectItem[] = [
  {
    id: "gratia",
    name: "Gratia",
    status: "in-progress",
    description: "Cloud-native food donation platform connecting restaurants with NGOs to reduce food waste.",
    longDescription: "Gratia is a cloud-native platform using Go microservices and React, powered by Docker, Kubernetes (EKS), and Terraform. NGOs can browse food listings from restaurants, filter by location, and claim surplus food through real-time messaging.",
    githubLink: "https://github.com/AdityaWaradkar/Gratia",
    tech: ["Go Lang", "Microservices", "Docker", "Kubernetes", "Terraform", "PostgreSQL", "Git & Github", "AWS"],
    color: "from-purple-500 to-blue-500",
    highlights: ["Microservices Architecture"],
  },
  {
    id: "safe",
    name: "SAFE",
    status: "completed",
    description: "Real-time IoT-based adaptive fire evacuation system using risk-aware dynamic routing algorithm.",
    longDescription: "Designed and implemented the entire software system: Risk-aware path routing, edge computing on Raspberry Pi, live dashboard for real-time hazard visualization, and LED actuation logic. Published at IEEE INDIN 2026.",
    githubLink: "https://github.com/AdityaWaradkar/SAFE",
    tech: ["Python", "Algorithms", "Edge Computing", "MERN", "Raspberry Pi"],
    color: "from-red-500 to-orange-500",
    highlights: ["Major Project SIES GST '26"],
  },
  {
    id: "parksense",
    name: "ParkSense",
    status: "completed",
    description: "IoT-based smart parking system accepted at ICT4SD 2025 international conference.",
    longDescription: "ParkSense uses ultrasonic sensors and Arduino to detect vehicle presence in real-time, with a Node.js backend and React frontend. Users can view available spots, reserve spaces, and receive navigation guidance.",
    githubLink: "https://github.com/AdityaWaradkar/IoT_based_smart_parking_system",
    tech: ["React", "Node.js", "MongoDB", "Data Handling", "IoT", "Arduino", "Ultrasonic Sensors"],
    color: "from-green-500 to-teal-500",
    highlights: ["Accepted at ICT4SD 2025"],
  },
];

export default function ProjectSection() {
  // Memoize projects data
  const projectsList = useMemo(() => PROJECTS, []);

  return (
    <section
      id="projectsSection"
      className="relative min-h-[60vh] md:min-h-screen w-full flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-bg-dark overflow-hidden"
      aria-label="Projects Section"
    >
      {/* Background Grid - matching hero and about sections */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a2a3a_1px,transparent_1px),linear-gradient(to_bottom,#2a2a3a_1px,transparent_1px)] bg-[size:32px_32px] opacity-25 sm:opacity-35 md:opacity-45" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a2a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a2a_1px,transparent_1px)] bg-[size:16px_16px] opacity-15 sm:opacity-20 md:opacity-25" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0a1a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a1a_1px,transparent_1px)] bg-[size:8px_8px] opacity-10 sm:opacity-15 md:opacity-20" />
      </div>

      {/* Ambient Blurs - matching hero section */}
      <div className="absolute top-20 left-20 w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] md:w-[400px] md:h-[400px] bg-purple-600/5 rounded-full blur-[60px] sm:blur-[80px] md:blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-20 w-[180px] h-[180px] sm:w-[300px] sm:h-[300px] md:w-[450px] md:h-[450px] bg-blue-600/5 rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px] pointer-events-none" />

      <div className="max-w-5xl w-full relative z-10">
        {/* Header - centered like About section */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-200 via-white to-blue-200 bg-clip-text text-transparent inline-block drop-shadow-[0_0_30px_rgba(128,0,255,0.08)]">
            Featured Projects
          </h2>
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-2 sm:mt-3">
            <div className="h-[1px] w-6 sm:w-8 md:w-10 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
            <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 rotate-45 bg-gradient-to-r from-purple-400 to-blue-400 animate-pulse" />
            <div className="h-[1px] w-6 sm:w-8 md:w-10 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
          </div>
          <p className="text-[10px] xs:text-xs sm:text-sm md:text-base text-white/40 mt-2 sm:mt-3 max-w-2xl mx-auto">
            A collection of my recent work in cloud-native, IoT, and full-stack development
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {projectsList.map((project) => (
            <div
              key={project.id}
              className="group relative bg-white/[0.02] backdrop-blur-sm rounded-xl border border-white/5 hover:border-white/10 transition-all duration-500 flex flex-col justify-between overflow-hidden p-4 sm:p-5 md:p-6"
            >
              {/* Subtle top ambient glow gradient indicator */}
              <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${project.color} opacity-20 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  {/* Status pill - matching card styles */}
                  <span
                    className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[8px] xs:text-[10px] sm:text-xs font-medium backdrop-blur-md border ${
                      project.status === "completed"
                        ? "bg-green-500/5 text-green-400/80 border-green-500/10"
                        : "bg-yellow-500/5 text-yellow-400/80 border-yellow-500/10"
                    }`}
                  >
                    {project.status === "completed" ? "Completed" : "In Progress"}
                  </span>
                </div>

                <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-white group-hover:text-white/90 tracking-tight mb-1.5 sm:mb-2">
                  {project.name}
                </h3>

                <p className="text-white/50 text-[10px] xs:text-xs sm:text-sm md:text-base leading-relaxed mb-3 sm:mb-4">
                  {project.description}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[8px] xs:text-[10px] sm:text-xs font-mono bg-white/5 text-white/60 rounded border border-white/[0.03]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-3 sm:pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[8px] xs:text-[10px] sm:text-xs text-white/30 italic group-hover:text-white/50 transition-colors">
                  {project.highlights[0]}
                </span>
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View source code for ${project.name} on GitHub`}
                  className="inline-flex items-center gap-1.5 sm:gap-2 text-[10px] xs:text-xs sm:text-sm font-medium text-white/60 group-hover:text-white transition-all duration-300"
                >
                  <span>Source Code</span>
                  <svg
                    className="w-3 h-3 sm:w-3.5 sm:h-3.5 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}