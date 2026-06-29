"use client";

import React from "react";

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

export default function AboutMe() {
  return (
    <section
      id="aboutSection"
      className="relative min-h-screen text-white flex items-center justify-center px-4 sm:px-8 pt-[100px] sm:pt-[125px] pb-[50px] sm:pb-[75px] overflow-hidden bg-bg-dark"
    >
      {/* Background Mesh System */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a2a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a2a_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a2a3a_1px,transparent_1px),linear-gradient(to_bottom,#2a2a3a_1px,transparent_1px)] bg-[size:48px_48px] opacity-10" />
      </div>

      {/* Ambient Blurs */}
      <div className="absolute top-20 left-20 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-20 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column */}
          <div className="flex flex-col gap-6 sm:gap-8">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-200 via-white to-blue-200 bg-clip-text text-transparent inline-block">
                About Me
              </h2>
              <p className="leading-relaxed text-gray-300/90 text-lg sm:text-xl md:text-2xl">
                Experienced in architecting robust backend systems utilizing
                DevOps practices and cloud-native frameworks. Primarily
                leverages Go for backend engineering and AWS for building
                scalable cloud environments. Backed by a strong technical
                foundation in Linux systems administration, automated shell
                scripting, advanced version control management, containerization
                and orchestration, and production-ready CI/CD pipelines.
              </p>
            </div>

            {/* Experience Card Block */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-white/90">
                Experience
              </h3>
              <div className="card-base-class text-lg group w-full">
                <div className="font-semibold mb-1 group-hover:text-black">
                  {EXPERIENCE.role} - {EXPERIENCE.company}
                  <br />
                  <span className="text-base sm:text-lg text-white/60 group-hover:text-black/70">
                    {EXPERIENCE.duration}
                  </span>
                </div>
                <p className="text-base sm:text-lg text-white/70 mt-2 group-hover:text-black/80 leading-relaxed">
                  {EXPERIENCE.description}
                </p>
              </div>
            </div>

            {/* Hobbies Card Block */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-white/90">
                Hobbies & Interests
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-4">
                {HOBBIES.map((hobby) => (
                  <div
                    key={hobby}
                    className="card-base-class text-lg min-w-[120px] sm:min-w-[140px] p-0"
                  >
                    <a
                      href={HOBBIES_INSTAGRAM}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${hobby} on Instagram`}
                      className="px-5 py-3.5 hover:text-black transition-colors duration-300 block w-full h-full"
                    >
                      {hobby}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (Skills Grid) */}
          <div className="flex flex-col gap-6 sm:gap-8">
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-white/90">
                Skills
              </h3>
              <div className="flex flex-wrap gap-2.5 sm:gap-3.5">
                {SKILLS.map((skill) => (
                  <div
                    key={skill}
                    className="card-base-class text-lg min-w-[90px] sm:min-w-[110px] text-center select-none py-2 px-4"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Certifications (Full Width Footer Block) */}
        <div className="mt-12 sm:mt-16 space-y-3 sm:space-y-4">
          <h3 className="text-2xl sm:text-3xl font-bold text-white/90 text-left">
            Certifications
          </h3>
          <div className="flex flex-wrap gap-2.5 sm:gap-4 justify-start">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.name}
                className="card-base-class min-w-[140px] sm:min-w-[160px] p-0"
              >
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${cert.name} certification`}
                  className="px-5 py-3.5 hover:text-black transition-colors duration-300 block w-full h-full text-base sm:text-lg"
                >
                  {cert.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
