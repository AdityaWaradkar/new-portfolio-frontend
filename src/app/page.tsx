import Navbar from "@/components/common/Navbar";
import HeroSection from "@/features/hero/components/HeroSection";
import AboutMe from "@/features/about/components/AboutMe";
import ProjectSection from "@/features/projects/components/ProjectSection";
import Blog from "@/features/blog/components/Blog";
import ContactSection from "@/features/contact/components/ContactSection";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-bg-dark overflow-hidden">
      <Navbar />

      <main>
        <HeroSection />
        <AboutMe />
        <ProjectSection />
        <Blog />
        <ContactSection />
      </main>
    </div>
  );
}