"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";

interface FormDataState {
  name: string;
  email: string;
  message: string;
}

const NAV_LINKS = ["home", "about", "blog", "projects"] as const;
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

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(`${sectionId}Section`);
    if (element) {
      const offset = 70;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const offsetPosition = elementRect - bodyRect - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  const inputClass =
    "w-full px-4 py-3 bg-white/[0.02] border border-white/5 rounded-xl text-white/90 placeholder-white/20 focus:outline-none focus:border-purple-500/30 focus:ring-1 focus:ring-purple-500/30 transition-all duration-300 text-base sm:text-lg";

  return (
    <footer id="contactSection" className="relative w-full bg-bg-dark text-white overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a2a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a2a_1px,transparent_1px)] bg-[size:24px_24px] opacity-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,transparent_30%,#0a0a0f_90%)] opacity-80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-20 sm:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 space-y-10">
            <div>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
                <span className="bg-gradient-to-r from-purple-200 via-white to-blue-200 bg-clip-text text-transparent">
                  Let's Connect
                </span>
              </h2>
              <p className="text-white/40 text-base sm:text-lg">
                Have a project in mind? Let's collaborate and build something awesome together.
              </p>
            </div>

            <div className="space-y-4 font-mono text-sm sm:text-base border-l border-white/5 pl-4">
              <div className="flex items-center gap-3">
                <div className="relative w-2 h-2">
                  <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75" />
                  <div className="relative w-2 h-2 bg-green-400 rounded-full" />
                </div>
                <span className="text-white/60 text-xs uppercase tracking-wider">Status: Online</span>
              </div>
              <div>
                <span className="text-white">Email: </span>
                <a
                  href="mailto:adityawaradkar2004@gmail.com"
                  className="text-white/70 hover:text-purple-300 transition-colors"
                  aria-label="Send email to Aditya Waradkar"
                >
                  adityawaradkar2004@gmail.com
                </a>
              </div>
              <div className="text-white">
                Location: <span className="text-white/70">Mumbai, India (GMT+5:30)</span>
              </div>
            </div>

            <div className="pt-2">
              <nav aria-label="Quick navigation">
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  {NAV_LINKS.map((link) => (
                    <button
                      key={link}
                      onClick={() => scrollToSection(link)}
                      className="text-white/40 hover:text-white/90 text-sm font-mono tracking-wider uppercase transition-colors cursor-pointer"
                      aria-label={`Scroll to ${link} section`}
                    >
                      [{link}]
                    </button>
                  ))}
                </div>
              </nav>
            </div>
          </div>

          <div className="lg:col-span-7 w-full">
            <div className="bg-white/[0.01] backdrop-blur-sm border border-white/5 rounded-2xl p-6 sm:p-10 shadow-2xl relative group">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-purple-500/10 via-blue-500/20 to-transparent group-hover:via-blue-500/40 transition-all duration-700" />

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-white text-sm font-mono uppercase tracking-wider mb-2">
                      // name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={inputClass}
                      placeholder="Enter your first name"
                      disabled={isSubmitting}
                      autoComplete="given-name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white text-sm font-mono uppercase tracking-wider mb-2">
                      // email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={inputClass}
                      placeholder="Enter your email"
                      disabled={isSubmitting}
                      autoComplete="email"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-white text-sm font-mono uppercase tracking-wider mb-2">
                    // message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={inputClass}
                    placeholder="Enter your message details"
                    disabled={isSubmitting}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 bg-white/5 hover:bg-white hover:text-black border border-white/10 rounded-xl text-white font-medium text-base transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                  aria-label={isSubmitting ? "Sending message..." : "Send message"}
                >
                  <span>{isSubmitting ? "Transmitting..." : "Send Message"}</span>
                  {!isSubmitting && (
                    <svg
                      className="w-4 h-4"
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
                    className={`p-4 rounded-xl text-sm font-mono text-center border mt-4 ${
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
        </div>

        <div className="mt-20 sm:mt-28 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-white/30 font-mono">
          <p>© {new Date().getFullYear()} Aditya Waradkar. Crafted with absolute precision.</p>
          <div className="flex items-center gap-2">
            <span className="bg-white/[0.02] px-2.5 py-1 rounded border border-white/5 text-purple-300/50">
              v3.0.0-Next
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}