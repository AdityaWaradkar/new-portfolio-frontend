"use client";

import React from "react";
import Link from "next/link";

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  gradient: string;
}

// Extracted constants outside component
const BLOG_POSTS: readonly BlogPost[] = [
  {
    slug: "ec2-ssh-key-recovery-volume-swap",
    title: "I accidentally deleted the SSH key to my EC2 instance. Now what?",
    description:
      "I opened my local machine ready to dive back into my work on an EC2 instance where I had some solid progress going. But when I tried to SSH in, I realized I had accidentally deleted the key to the instance. If you've worked with AWS, you know this is usually the point of no return they block you from just generating or dropping a new key pair onto a running server. With my instance blacked out and standard terminal access completely out of the question, I had to figure out a workaround. What followed was a rescue operation to bypass those cloud constraints and get my files back. Here is exactly how I pulled it off.",
    date: "June 29, 2026",
    readTime: "6 min read",
    gradient: "from-purple-500 via-indigo-500 to-blue-500",
  },
];

export default function Blog() {
  return (
    <section
      id="blogSection"
      className="relative min-h-screen w-full flex flex-col items-center py-20 sm:py-28 px-4 sm:px-8 bg-bg-dark overflow-hidden border-t border-white/5"
    >
      {/* Background System */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a2a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a2a_1px,transparent_1px)] bg-[size:24px_24px] opacity-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0a0a0f_80%)] opacity-80" />
      </div>

      <div className="max-w-7xl w-full relative z-10 flex flex-col h-full justify-center">
        
        {/* Left-Aligned Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-3">
              <span className="bg-gradient-to-r from-purple-200 via-white to-blue-200 bg-clip-text text-transparent">
                Under the Hood
              </span>
            </h2>
            <p className="text-white/40 text-base sm:text-lg md:text-xl max-w-none">
              Personal blogs and technical write-ups sharing what I learn along
              the way and the exact processes I used to solve problems faced
              during development phases.
            </p>
          </div>
        </div>

        {/* Cohesive Center-Focused Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="group relative bg-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-500 flex flex-col justify-between overflow-hidden p-6 sm:p-8 md:col-span-2 lg:col-span-8 lg:col-start-1"
            >
              {/* Harmonized Top Ambient Glow on Hover */}
              <div
                className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${post.gradient} opacity-30 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <time className="text-sm text-white/40 font-mono" dateTime={post.date}>
                    {post.date}
                  </time>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-white/90 tracking-tight mb-1">
                  {post.title}
                </h3>

                <p className="text-white/50 text-base sm:text-lg md:text-xl leading-relaxed mb-6">
                  {post.description}
                </p>
              </div>

              {/* Action Toolbar */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-sm text-white/30 font-mono italic">
                  {post.readTime}
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  aria-label={`Read blog: ${post.title}`}
                  className="inline-flex items-center gap-2 text-base font-medium text-white/60 group-hover:text-white transition-all duration-300"
                >
                  <span>Read Blog</span>
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}