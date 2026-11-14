import type { Metadata } from "next";
import { JetBrains_Mono, Oswald, Plus_Jakarta_Sans } from "next/font/google";
import { SITE_CONFIG } from "@/lib/constants";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Cursor } from "@/components/ui/Cursor";
import "lenis/dist/lenis.css";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

// Condensed display face for the hero name.
const display = Oswald({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} — ${SITE_CONFIG.title}`,
  description: SITE_CONFIG.description,
};

// Hides the header and hero text before paint on a fresh home page load, so the
// hero intro can bring them in (see Hero.tsx). Skipped for reduced motion and #hash links.
const introScript = `(function(){try{if(location.pathname==="/"&&!location.hash&&!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("intro")}catch(e){}})()`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${mono.variable} ${display.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="label sr-only z-[110] bg-accent px-4 py-3 text-[#141414] focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <Cursor />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
