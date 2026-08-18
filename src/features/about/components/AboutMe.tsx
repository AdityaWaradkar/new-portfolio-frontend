"use client";

import React, { useMemo } from "react";

interface Certification {
  name: string;
  link: string;
}

interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  description: string;
}

// Extracted constants outside component
const SKILLS: readonly string[] = [
  "JavaScript",
  "GoLang",
  "React.js",
  "Java",
  "Git",
  "GitHub",
  "Shell Scripting",
  "Linux",
  "Node.js",
  "MongoDB",
  "SQL",
  "Python",
  "Docker",
  "Kubernetes",
  "GitLab CI/CD",
  "Jenkins",
  "AWS",
  "Cloud Computing",
  "DevOps",
  "Fullstack Development",
  "UI / UX",
  "Tailwind CSS",
];

const CERTIFICATIONS: readonly Certification[] = [
  {
    name: "Introduction to DevOps",
    link: "https://drive.google.com/file/d/1mAZX0KcqMOSxH2aZBoIsUNkTCgxJlXle/view?usp=drive_link",
  },
  {
    name: "Introduction to Agile Development and Scrum",
    link: "https://drive.google.com/file/d/1NrhGMQZPxr9P9duEjhtODQnzvIqB3b7y/view?usp=drive_link",
  },
  {
    name: "Introduction to Software Engineering",
    link: "https://drive.google.com/file/d/1yJ6dn0gMWAjD9ui4BTjixvYnnuZ3LZgm/view?usp=drive_link",
  },
  {
    name: "Python for Data Science, AI & Development",
    link: "https://drive.google.com/file/d/1Vu_V03mhFjxAd2Bb1nhIG1qXXlRDaZqX/view?usp=drive_link",
  },
  {
    name: "Application Development using Microservices and Serverless",
    link: "https://drive.google.com/file/d/1ifsSoUd_LkDN2PGAaPDrShEpLJx-PPA-/view?usp=drive_link",
  },
  {
    name: "Introduction to Containers w/ Docker, Kubernetes & OpenShift",
    link: "https://drive.google.com/file/d/1JbV0fKll15QW-BmfLFWduLRo5ZNiSobz/view?usp=drive_link",
  },
  {
    name: "Getting Started with Git and GitHub",
    link: "https://drive.google.com/file/d/1cpebXSV5EcxZer78X7AAY_W-6MK0oe2K/view?usp=drive_link",
  },
  {
    name: "Java Programming",
    link: "https://drive.google.com/file/d/1-tKaPLssdVhix02fBLXa0KtMYARVrB9X/view",
  },
];

const EXPERIENCE: ExperienceItem = {
  role: "Data Analyst Intern",
  company: "Tata Power Renewable Energy Limited",
  duration: "Dec 2024 - Mar 2025",
  description:
    'During this internship, I worked on a project titled: "Energy Loss Analysis due to DC Shortfall at Solar Sites." The goal was to understand how underperformance in DC capacity impacts energy generation at solar plants. I developed a Python-based analysis module to quantify these losses across multiple sites, which helped in identifying inefficiencies and improving operational decisions.',
};

const HOBBIES = ["Pencil Sketching", "Painting", "Photography"] as const;
const HOBBIES_INSTAGRAM = "https://www.instagram.com/adityaa.draws/";

// Helper component for section title - matching hero subtitle style
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-[10px] xs:text-xs sm:text-sm md:text-base lg:text-lg font-bold bg-gradient-to-r from-purple-200 via-white to-blue-200 bg-clip-text text-transparent inline-block tracking-wide">
    {children}
  </h3>
);

// Helper component for card items - matching hero card style
const CardItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'a';
  href?: string;
  onClick?: () => void;
}> = ({ children, className = "", as: Component = 'div', href, onClick }) => {
  const baseClasses = `bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/20 transition-all duration-300 text-white/80 hover:text-white text-[10px] xs:text-xs sm:text-sm ${className}`;
  
  if (Component === 'a') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} block w-full h-full px-2.5 py-1.5 sm:px-3 sm:py-2 hover:bg-white/10 rounded-lg`}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }
  
  return (
    <div className={`${baseClasses} px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg`}>
      {children}
    </div>
  );
};

export default function AboutMe() {
  // Memoize static data
  const skillsList = useMemo(() => SKILLS, []);
  const certificationsList = useMemo(() => CERTIFICATIONS, []);
  const hobbiesList = useMemo(() => HOBBIES, []);

  return (
    <section
      id="aboutSection"
      className="relative min-h-[60vh] md:min-h-screen text-white flex items-center justify-center px-4 sm:px-6 pt-[80px] sm:pt-[100px] md:pt-[120px] pb-12 sm:pb-16 md:pb-20 overflow-hidden bg-bg-dark"
      aria-label="About Me Section"
    >
      {/* Background Grid - matching hero section */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a2a3a_1px,transparent_1px),linear-gradient(to_bottom,#2a2a3a_1px,transparent_1px)] bg-[size:32px_32px] opacity-25 sm:opacity-35 md:opacity-45" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a2a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a2a_1px,transparent_1px)] bg-[size:16px_16px] opacity-15 sm:opacity-20 md:opacity-25" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0a1a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a1a_1px,transparent_1px)] bg-[size:8px_8px] opacity-10 sm:opacity-15 md:opacity-20" />
      </div>

      {/* Ambient Blurs - matching hero section */}
      <div className="absolute top-20 left-20 w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] md:w-[400px] md:h-[400px] bg-purple-600/5 rounded-full blur-[60px] sm:blur-[80px] md:blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-20 w-[180px] h-[180px] sm:w-[300px] sm:h-[300px] md:w-[450px] md:h-[450px] bg-blue-600/5 rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px] pointer-events-none" />

      {/* Centered content container */}
      <div className="max-w-5xl w-full relative z-10">
        {/* About Me Header */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-200 via-white to-blue-200 bg-clip-text text-transparent inline-block drop-shadow-[0_0_30px_rgba(128,0,255,0.08)]">
            About Me
          </h2>
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-2 sm:mt-3">
            <div className="h-[1px] w-6 sm:w-8 md:w-10 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
            <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 rotate-45 bg-gradient-to-r from-purple-400 to-blue-400 animate-pulse" />
            <div className="h-[1px] w-6 sm:w-8 md:w-10 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
          {/* Left Column */}
          <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
            {/* About Me Text */}
            <div>
              <p className="leading-relaxed text-gray-300/90 text-[10px] xs:text-xs sm:text-sm md:text-base lg:text-lg text-center lg:text-left">
                Experienced in architecting robust backend systems utilizing
                DevOps practices and cloud-native frameworks. Primarily
                leverages Go for backend engineering and AWS for building
                scalable cloud environments. Backed by a strong technical
                foundation in Linux systems administration, automated shell
                scripting, advanced version control management, containerization
                and orchestration, and production-ready CI/CD pipelines.
              </p>
            </div>

            {/* Experience Section */}
            <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
              <SectionTitle>Experience</SectionTitle>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/20 transition-all duration-300 rounded-lg p-3 sm:p-4 md:p-5">
                <div className="font-semibold mb-0.5 text-[10px] xs:text-xs sm:text-sm md:text-base text-white/90">
                  {EXPERIENCE.role} - {EXPERIENCE.company}
                  <br />
                  <span className="text-[8px] xs:text-[10px] sm:text-xs md:text-sm text-white/60">
                    {EXPERIENCE.duration}
                  </span>
                </div>
                <p className="text-[8px] xs:text-[10px] sm:text-xs md:text-sm text-white/70 mt-1.5 leading-relaxed">
                  {EXPERIENCE.description}
                </p>
              </div>
            </div>

            {/* Hobbies Section */}
            <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
              <SectionTitle>Hobbies &amp; Interests</SectionTitle>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {hobbiesList.map((hobby) => (
                  <div
                    key={hobby}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/20 transition-all duration-300 rounded-lg p-0"
                  >
                    <CardItem
                      as="a"
                      href={HOBBIES_INSTAGRAM}
                      className="min-w-[80px] sm:min-w-[90px]"
                    >
                      {hobby}
                    </CardItem>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Skills */}
          <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
            <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
              <SectionTitle>Skills</SectionTitle>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {skillsList.map((skill) => (
                  <CardItem
                    key={skill}
                    className="min-w-[60px] sm:min-w-[70px] text-center select-none"
                  >
                    {skill}
                  </CardItem>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Certifications Section */}
        <div className="mt-6 sm:mt-8 md:mt-10 space-y-2 sm:space-y-2.5 md:space-y-3">
          <SectionTitle>Certifications</SectionTitle>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center lg:justify-start">
            {certificationsList.map((cert) => (
              <div
                key={cert.name}
                className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/20 transition-all duration-300 rounded-lg p-0"
              >
                <CardItem
                  as="a"
                  href={cert.link}
                  className="min-w-[100px] sm:min-w-[110px]"
                >
                  {cert.name}
                </CardItem>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}