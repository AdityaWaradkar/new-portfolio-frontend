import type { Metadata, Viewport } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";

// Optimize Google Fonts natively inside Next.js
const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
  weight: ["100", "300", "400", "500", "600", "700", "900"],
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

// Production-Grade Enterprise Metadata Configuration
export const metadata: Metadata = {
  title: {
    default: "Aditya Waradkar | Full-Stack Systems Engineer & Artist",
    template: "%s | Aditya Waradkar",
  },
  description:
    "Portfolio of Aditya Waradkar. Crafting scalable full-stack architectures in Go and MERN alongside realistic sketch artistry.",
  keywords: [
    "Aditya Waradkar",
    "Go Developer",
    "Software Engineer Mumbai",
    "Kubernetes",
    "Full Stack Developer",
    "Cloud Native",
    "DevOps Engineer",
    "React Developer",
  ],
  authors: [{ name: "Aditya Waradkar" }],
  creator: "Aditya Waradkar",
  publisher: "Aditya Waradkar",
  // metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Aditya Waradkar | Full-Stack Systems Engineer & Artist",
    description: "Crafting robust backend systems and cloud-native microservices with precision.",
    siteName: "Aditya Waradkar Portfolio",
    images: [
      {
        url: "https://ik.imagekit.io/cs3et6gu9/profile_photo.png",
        width: 1200,
        height: 630,
        alt: "Aditya Waradkar - Full-Stack Systems Engineer & Artist",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Waradkar | Full-Stack Systems Engineer & Artist",
    description: "Crafting robust backend systems and cloud-native microservices with precision.",
    images: ["https://ik.imagekit.io/cs3et6gu9/profile_photo.png"],
    creator: "@adityawaradkar",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

// Strict Responsive Viewport Security Configuration
export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${raleway.variable} scroll-smooth`}>
      <body className="bg-bg-dark text-white/90 antialiased selection:bg-purple-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}