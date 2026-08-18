"use client";

import React, { useState, useEffect } from "react";
import { FaMedium, FaCalendarAlt } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  guid: string;
  categories?: string[];
  thumbnail?: string;
}

const MEDIUM_RSS_URL = "https://medium.com/feed/@adityawaradkar.learning";

export default function Blog() {
  const [posts, setPosts] = useState<MediumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMediumPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/medium?url=${encodeURIComponent(MEDIUM_RSS_URL)}`);
        
        if (!response.ok) throw new Error("Failed to fetch posts");
        
        const data = await response.json();
        setPosts(data.items || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching Medium posts:", err);
        setError("Unable to load blog posts");
      } finally {
        setLoading(false);
      }
    };

    fetchMediumPosts();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const cleanTitle = (title: string) => {
    return title
      .replace(/<!\[CDATA\[/g, "")
      .replace(/\]\]>/g, "")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .trim();
  };

  const truncateDescription = (text: string, maxLength: number = 100) => {
    const cleanText = text
      .replace(/<[^>]*>/g, "")
      .replace(/<!\[CDATA\[/g, "")
      .replace(/\]\]>/g, "")
      .trim();
    
    if (cleanText.length <= maxLength) return cleanText;
    return cleanText.substring(0, maxLength) + "...";
  };

  // Extract thumbnail from Medium content
  const extractThumbnail = (post: MediumPost): string | null => {
    // Try to get thumbnail from the description (often contains img tag)
    const imgMatch = post.description.match(/<img[^>]+src="([^">]+)"/);
    if (imgMatch) return imgMatch[1];
    
    // Try to get from content:encoded if available
    if (post.thumbnail) return post.thumbnail;
    
    // Generate a fallback gradient based on post index or title
    return null;
  };

  // Generate a consistent color based on title
  const getGradientColors = (title: string) => {
    const colors = [
      "from-purple-500/20 to-blue-500/20",
      "from-pink-500/20 to-rose-500/20",
      "from-green-500/20 to-teal-500/20",
      "from-orange-500/20 to-red-500/20",
      "from-indigo-500/20 to-purple-500/20",
      "from-cyan-500/20 to-blue-500/20",
    ];
    const index = title.length % colors.length;
    return colors[index];
  };

  return (
    <section
      id="blogSection"
      className="relative min-h-[60vh] md:min-h-screen w-full flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-bg-dark overflow-hidden"
      aria-label="Blog Section"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a2a3a_1px,transparent_1px),linear-gradient(to_bottom,#2a2a3a_1px,transparent_1px)] bg-[size:32px_32px] opacity-25 sm:opacity-35 md:opacity-45" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a2a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a2a_1px,transparent_1px)] bg-[size:16px_16px] opacity-15 sm:opacity-20 md:opacity-25" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0a1a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a1a_1px,transparent_1px)] bg-[size:8px_8px] opacity-10 sm:opacity-15 md:opacity-20" />
      </div>

      {/* Ambient Blurs */}
      <div className="absolute top-20 left-20 w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] md:w-[400px] md:h-[400px] bg-purple-600/5 rounded-full blur-[60px] sm:blur-[80px] md:blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-20 w-[180px] h-[180px] sm:w-[300px] sm:h-[300px] md:w-[450px] md:h-[450px] bg-blue-600/5 rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px] pointer-events-none" />

      <div className="max-w-4xl w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-200 via-white to-blue-200 bg-clip-text text-transparent inline-block drop-shadow-[0_0_30px_rgba(128,0,255,0.08)]">
            Under the Hood
          </h2>
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-2 sm:mt-3">
            <div className="h-[1px] w-6 sm:w-8 md:w-10 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
            <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 rotate-45 bg-gradient-to-r from-purple-400 to-blue-400 animate-pulse" />
            <div className="h-[1px] w-6 sm:w-8 md:w-10 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
          </div>
          <p className="text-[10px] xs:text-xs sm:text-sm md:text-base text-white/40 mt-2 sm:mt-3 max-w-2xl mx-auto">
            Personal blogs and technical write-ups sharing what I learn along the way
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12 sm:py-16">
            <div className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
            <p className="text-white/40 text-[10px] xs:text-xs sm:text-sm mt-4">
              Loading articles...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12 sm:py-16">
            <p className="text-white/60 text-sm sm:text-base">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/60 hover:text-white text-xs sm:text-sm transition-all"
            >
              Retry
            </button>
          </div>
        )}

        {/* Blog Posts Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {posts.map((post, index) => {
              const thumbnail = extractThumbnail(post);
              const gradientColors = getGradientColors(post.title);
              
              return (
                <a
                  key={post.guid || index}
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block relative bg-white/[0.02] backdrop-blur-sm rounded-xl border border-white/5 hover:border-white/15 transition-all duration-300 overflow-hidden hover:bg-white/[0.04]"
                >
                  {/* Thumbnail Image */}
                  <div className="relative w-full h-40 sm:h-44 md:h-48 overflow-hidden bg-white/5">
                    {thumbnail ? (
                      <>
                        <img
                          src={thumbnail}
                          alt={cleanTitle(post.title)}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                          onError={(e) => {
                            // If image fails to load, show fallback
                            const target = e.currentTarget;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.classList.add('bg-gradient-to-r', gradientColors);
                              // Add fallback content
                              const fallback = document.createElement('div');
                              fallback.className = 'w-full h-full flex items-center justify-center';
                              fallback.innerHTML = '<span class="text-4xl sm:text-5xl opacity-10 text-white">📝</span>';
                              parent.appendChild(fallback);
                            }
                          }}
                        />
                        {/* Gradient overlay on image */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-60" />
                      </>
                    ) : (
                      // Fallback gradient if no thumbnail
                      <div className={`w-full h-full bg-gradient-to-r ${gradientColors} flex items-center justify-center`}>
                        <span className="text-4xl sm:text-5xl opacity-10 text-white">📝</span>
                      </div>
                    )}
                    
                    {/* Medium badge on image */}
                    <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1.5 border border-white/10">
                      <FaMedium className="w-3 h-3 text-white/60" />
                      <span className="text-[8px] xs:text-[10px] text-white/60 font-medium">Medium</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5">
                    {/* Date */}
                    <div className="flex items-center gap-1.5 text-[10px] xs:text-xs text-white/30 mb-2">
                      <FaCalendarAlt className="w-3 h-3" />
                      <span>{formatDate(post.pubDate)}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-white group-hover:text-white/90 leading-snug mb-1.5 line-clamp-2">
                      {cleanTitle(post.title)}
                    </h3>

                    {/* Description */}
                    <p className="text-[10px] xs:text-xs sm:text-sm text-white/40 leading-relaxed line-clamp-2">
                      {truncateDescription(post.description)}
                    </p>

                    {/* Read Link */}
                    <div className="flex items-center justify-end pt-3 mt-2 border-t border-white/5">
                      <span className="text-[10px] xs:text-xs text-white/20 group-hover:text-white/40 transition-colors flex items-center gap-1">
                        Read Article
                        <FiExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && posts.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <p className="text-white/60 text-sm sm:text-base">
              No blog posts found. Check back soon!
            </p>
          </div>
        )}

        {/* View All Link */}
        {!loading && !error && posts.length > 0 && (
          <div className="text-center mt-8 sm:mt-10">
            <a
              href="https://medium.com/@adityawaradkar.learning"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[10px] xs:text-xs sm:text-sm text-white/30 hover:text-white/50 transition-colors"
            >
              <span>View all articles on Medium</span>
              <FiExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}