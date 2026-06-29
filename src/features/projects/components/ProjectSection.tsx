"use client";

import React from "react";

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
  return (
    <section
      id="projectsSection"
      className="relative min-h-screen w-full flex flex-col items-center py-20 sm:py-28 px-4 sm:px-8 bg-bg-dark overflow-hidden border-t border-white/5"
    >
      {/* Background Matrix */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a2a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a2a_1px,transparent_1px)] bg-[size:24px_24px] opacity-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0a0a0f_80%)] opacity-80" />
      </div>

      <div className="max-w-7xl w-full relative z-10 flex flex-col h-full justify-center">
        
        {/* Clean Minimalist Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-3">
              <span className="bg-gradient-to-r from-purple-200 via-white to-blue-200 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <p className="text-white/40 text-base sm:text-lg">
              A collection of my recent work in cloud-native, IoT, and full-stack development
            </p>
          </div>
        </div>

        {/* The Clean Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 transition-all duration-500">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="group relative bg-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-500 flex flex-col justify-between overflow-hidden p-6 sm:p-8"
            >
              {/* Subtle top ambient glow gradient indicator on card hover */}
              <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${project.color} opacity-30 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div>
                <div className="flex items-center justify-between mb-6">
                  {/* Status pill */}
                  <span
                    className={`px-3.5 py-1.5 rounded-full text-sm font-medium backdrop-blur-md border ${
                      project.status === "completed"
                        ? "bg-green-500/5 text-green-400/80 border-green-500/10"
                        : "bg-yellow-500/5 text-yellow-400/80 border-yellow-500/10"
                    }`}
                  >
                    {project.status === "completed" ? "Completed" : "In Progress"}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-white/90 tracking-tight mb-3">
                  {project.name}
                </h3>

                <p className="text-white/50 text-base sm:text-lg md:text-xl leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-sm font-mono bg-white/5 text-white/60 rounded border border-white/[0.03]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Secure Action Link */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-sm text-white/30 italic group-hover:text-white/50 transition-colors">
                  {project.highlights[0]}
                </span>
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View source code for ${project.name} on GitHub`}
                  className="inline-flex items-center gap-2 text-base font-medium text-white/60 group-hover:text-white transition-all duration-300"
                >
                  <span>Source Code</span>
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
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