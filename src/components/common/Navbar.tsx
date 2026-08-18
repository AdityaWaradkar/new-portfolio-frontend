"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#homeSection" },
  { label: "About", href: "#aboutSection" },
  { label: "Projects", href: "#projectsSection" },
  { label: "Blog", href: "#blogSection" },
  { label: "Contact", href: "#contactSection" },
];

// Get section ID from href
const getSectionId = (href: string) => href.replace("#", "");

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("homeSection");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Use ref for scroll tracking
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Function to update active section based on scroll position
  const updateActiveSection = useCallback(() => {
    const sections = NAV_ITEMS.map(item => getSectionId(item.href));
    let currentSection = "homeSection";
    
    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        const rect = element.getBoundingClientRect();
        // Check if section is in viewport with some offset
        if (rect.top <= 150 && rect.bottom >= 0) {
          currentSection = sectionId;
          break;
        }
      }
    }
    
    if (currentSection !== activeSection) {
      setActiveSection(currentSection);
    }
  }, [activeSection]);

  // Optimized scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeout.current) return;
      
      scrollTimeout.current = setTimeout(() => {
        const scrollY = window.scrollY;
        
        const scrolled = scrollY > 20;
        
        setIsScrolled(scrolled);
        
        // Update active section on scroll
        updateActiveSection();
        
        scrollTimeout.current = null;
      }, 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [updateActiveSection]);

  // Handle escape key and body scroll lock
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    
    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Navigation handler - updates active section immediately
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    const targetId = getSectionId(href);
    const element = document.getElementById(targetId);
    
    if (element) {
      // Immediately set active section
      setActiveSection(targetId);
      
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    
    setIsMenuOpen(false);
  }, []);

  // Memoize nav items rendering
  const renderNavItems = useCallback((mobile: boolean = false) => {
    const baseClasses = mobile
      ? "w-full max-w-xs text-center px-6 py-4 text-lg font-medium rounded-xl transition-all duration-300"
      : "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300";
    
    const activeClasses = mobile
      ? "text-white bg-white/10 border border-white/10"
      : "text-white bg-white/10 border border-white/10";
    
    const inactiveClasses = mobile
      ? "text-white/60 hover:text-white hover:bg-white/5"
      : "text-white/50 hover:text-white hover:bg-white/5";

    return NAV_ITEMS.map((item) => {
      const isActive = activeSection === getSectionId(item.href);
      return (
        <a
          key={item.label}
          href={item.href}
          onClick={(e) => handleNavClick(e, item.href)}
          className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
          {item.label}
        </a>
      );
    });
  }, [activeSection, handleNavClick]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5 shadow-lg"
          : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="#homeSection"
            onClick={(e) => handleNavClick(e as any, "#homeSection")}
            className="text-xl font-bold bg-gradient-to-r from-purple-200 via-white to-blue-200 bg-clip-text text-transparent hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-purple-500/50 rounded-lg px-2"
            aria-label="Go to Home"
          >
            AW
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {renderNavItems(false)}
          </div>

          {/* Mobile Menu Button - Always visible on mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <div className="w-6 flex flex-col items-end gap-1.5">
              <span
                className={`block h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? "w-6 rotate-45 translate-y-2" : "w-6"
                }`}
              />
              <span
                className={`block h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : "w-4"
                }`}
              />
              <span
                className={`block h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? "w-6 -rotate-45 -translate-y-2" : "w-5"
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-0 bg-[#0a0a0f]/95 backdrop-blur-lg transition-all duration-300 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ top: "64px" }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex flex-col items-center justify-start pt-12 gap-4 px-4">
          {renderNavItems(true)}
        </div>
      </div>
    </nav>
  );
}