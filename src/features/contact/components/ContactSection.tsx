"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

interface FormDataState {
  name: string;
  email: string;
  message: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function ContactSection() {
  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    email: "",
    message: "",
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const form = e.currentTarget;
    const formElements = form.elements as any;
    const submitData = {
      name: formElements.name?.value || "",
      email: formElements.email?.value || "",
      message: formElements.message?.value || "",
    };
    
    setFormData(submitData);
    setIsSubmitting(true);
    setResponseMessage("");
    setStatus(null);

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch {
        data = { message: responseText || "Unknown response format" };
      }

      if (response.ok) {
        setResponseMessage(data.message || "Message sent successfully!");
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        if (formRef.current) {
          formRef.current.reset();
        }
      } else {
        setResponseMessage(data.message || data.error || `Error ${response.status}: Failed to send message.`);
        setStatus("error");
      }
    } catch {
      setResponseMessage("Error connecting to server. Please try again later.");
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (responseMessage) {
      const timer = setTimeout(() => {
        setResponseMessage("");
        setStatus(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [responseMessage]);

  const inputClass =
    "w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white/[0.02] border border-white/5 rounded-lg text-white/90 placeholder-white/20 focus:outline-none focus:border-purple-500/30 focus:ring-1 focus:ring-purple-500/30 transition-all duration-300 text-[10px] xs:text-xs sm:text-sm";

  return (
    <footer id="contactSection" className="relative w-full bg-bg-dark text-white overflow-hidden">
      {/* Background Grid - matching other sections */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a2a3a_1px,transparent_1px),linear-gradient(to_bottom,#2a2a3a_1px,transparent_1px)] bg-[size:32px_32px] opacity-25 sm:opacity-35 md:opacity-45" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a2a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a2a_1px,transparent_1px)] bg-[size:16px_16px] opacity-15 sm:opacity-20 md:opacity-25" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0a1a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a1a_1px,transparent_1px)] bg-[size:8px_8px] opacity-10 sm:opacity-15 md:opacity-20" />
      </div>

      {/* Ambient Blurs */}
      <div className="absolute top-20 left-20 w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] md:w-[400px] md:h-[400px] bg-purple-600/5 rounded-full blur-[60px] sm:blur-[80px] md:blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-20 w-[180px] h-[180px] sm:w-[300px] sm:h-[300px] md:w-[450px] md:h-[450px] bg-blue-600/5 rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-200 via-white to-blue-200 bg-clip-text text-transparent inline-block drop-shadow-[0_0_30px_rgba(128,0,255,0.08)]">
            Let's Connect
          </h2>
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-2 sm:mt-3">
            <div className="h-[1px] w-6 sm:w-8 md:w-10 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
            <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 rotate-45 bg-gradient-to-r from-purple-400 to-blue-400 animate-pulse" />
            <div className="h-[1px] w-6 sm:w-8 md:w-10 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
          </div>
          <p className="text-[10px] xs:text-xs sm:text-sm md:text-base text-white/40 mt-2 sm:mt-3 max-w-2xl mx-auto">
            Have a project in mind? Let's collaborate and build something awesome together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-start">
          {/* Left Column - Contact Info */}
          <div className="space-y-4 sm:space-y-5">
            {/* Status */}
            <div className="flex items-center gap-2 sm:gap-3 bg-white/[0.02] border border-white/5 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5">
              <div className="relative w-2 h-2">
                <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75" />
                <div className="relative w-2 h-2 bg-green-400 rounded-full" />
              </div>
              <span className="text-[10px] xs:text-xs text-white/60 font-mono tracking-wider">Status: Online</span>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 bg-white/[0.02] border border-white/5 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5">
              <FaEnvelope className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/30" />
              <a
                href="mailto:adityawaradkar2004@gmail.com"
                className="text-[10px] xs:text-xs sm:text-sm text-white/60 hover:text-purple-300 transition-colors"
                aria-label="Send email to Aditya Waradkar"
              >
                adityawaradkar2004@gmail.com
              </a>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 bg-white/[0.02] border border-white/5 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5">
              <FaMapMarkerAlt className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/30" />
              <span className="text-[10px] xs:text-xs sm:text-sm text-white/60">
                Mumbai, India (GMT+5:30)
              </span>
            </div>

            {/* Social Links */}
            <div className="flex gap-2 sm:gap-3 pt-1">
              <a
                href="https://github.com/AdityaWaradkar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2 bg-white/5 rounded-lg border border-white/10 hover:border-purple-500/30 hover:bg-white/10 transition-all duration-300"
              >
                <FaGithub className="w-4 h-4 sm:w-5 sm:h-5 text-white/40 hover:text-white transition-colors" />
              </a>
              <a
                href="https://www.linkedin.com/in/aditya-waradkar-9a03b92a5/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 bg-white/5 rounded-lg border border-white/10 hover:border-purple-500/30 hover:bg-white/10 transition-all duration-300"
              >
                <FaLinkedin className="w-4 h-4 sm:w-5 sm:h-5 text-white/40 hover:text-white transition-colors" />
              </a>
              <a
                href="https://www.instagram.com/adityaa.draws"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 bg-white/5 rounded-lg border border-white/10 hover:border-purple-500/30 hover:bg-white/10 transition-all duration-300"
              >
                <FaInstagram className="w-4 h-4 sm:w-5 sm:h-5 text-white/40 hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-white/[0.02] backdrop-blur-sm border border-white/5 rounded-xl p-4 sm:p-5 md:p-6">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label htmlFor="name" className="block text-[10px] xs:text-xs text-white/40 font-mono uppercase tracking-wider mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    placeholder="Your name"
                    disabled={isSubmitting}
                    autoComplete="given-name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[10px] xs:text-xs text-white/40 font-mono uppercase tracking-wider mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    placeholder="Your email"
                    disabled={isSubmitting}
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-[10px] xs:text-xs text-white/40 font-mono uppercase tracking-wider mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className={inputClass}
                  placeholder="Your message..."
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2.5 sm:py-3 bg-white/5 hover:bg-white hover:text-black border border-white/10 rounded-lg text-white/80 hover:text-black font-medium text-[10px] xs:text-xs sm:text-sm transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                aria-label={isSubmitting ? "Sending message..." : "Send message"}
              >
                <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                {!isSubmitting && (
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                )}
              </button>

              {responseMessage && (
                <div
                  className={`p-3 rounded-lg text-[10px] xs:text-xs font-mono text-center border mt-2 ${
                    status === "success"
                      ? "bg-green-500/5 text-green-400 border-green-500/10"
                      : "bg-red-500/5 text-red-400 border-red-500/10"
                  }`}
                  role="alert"
                  aria-live="polite"
                >
                  {status === "success" ? "✓" : "⚠"} {responseMessage}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 sm:mt-10 md:mt-12 pt-4 sm:pt-5 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3 text-[8px] xs:text-[10px] sm:text-xs text-white/30 font-mono">
          <p>© {new Date().getFullYear()} Aditya Waradkar. Crafted with absolute precision.</p>
          <div className="flex items-center gap-2">
            <span className="bg-white/[0.02] px-2 py-0.5 rounded border border-white/5 text-purple-300/50">
              v3.0.0
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}