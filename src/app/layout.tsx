import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google"; // 1. Ganti impor font
import "./globals.css";

// 2. Konfigurasi font Plus Jakarta Sans dengan CSS Variable
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Rama Soni Ravictor - Fullstack Developer",
  description: "Code with purpose. Design with empathy. Deliver with impact.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 3. Terapkan variable ke tag <html>
    <html lang="en" className={jakarta.variable}>
      <body>{children}</body>
    </html>
  );
}
