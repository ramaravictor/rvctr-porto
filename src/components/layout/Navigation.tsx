// src/components/layout/Navigation.tsx
"use client";

import React, { useState, useEffect } from "react";

const navItems = [
  { href: "#hero", label: "Home" },
  { href: "#projects", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const socialItems = [
  { href: "#", label: "Awwwards" },
  { href: "#", label: "Instagram" },
  { href: "#", label: "Twitter" },
  { href: "#", label: "LinkedIn" },
];

// Komponen Ikon "X" untuk tombol close
const CloseIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 6L6 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 6L18 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Navigation = () => {
  // State untuk melacak apakah halaman sudah di-scroll
  const [isScrolled, setIsScrolled] = useState(false);
  // State untuk melacak apakah menu overlay terbuka
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Efek untuk mendeteksi scroll
  useEffect(() => {
    const handleScroll = () => {
      // Tombol akan muncul setelah scroll sejauh 90% tinggi layar pertama
      setIsScrolled(window.scrollY > window.innerHeight * 0.9);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fungsi untuk membuka/menutup menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      {/* Container untuk Navigasi Awal dan Tombol Float */}
      <nav
        className={`fixed top-8 right-8 z-40 transition-opacity duration-300 ${
          isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="flex space-x-8 text-lg text-white">
          {navItems.slice(1).map(
            (
              item // .slice(1) untuk skip "Home"
            ) => (
              <a
                key={item.label}
                href={item.href}
                className="transition-colors duration-300 hover:text-gray-300"
              >
                {item.label}
              </a>
            )
          )}
        </div>
      </nav>

      {/* Tombol Float yang Muncul Saat Scroll */}
      <button
        onClick={toggleMenu}
        className={`
          fixed top-8 right-8
          h-16 w-16 bg-black rounded-full
          flex items-center justify-center
          z-40 transition-all duration-300
          ${
            isScrolled
              ? "opacity-100 scale-100"
              : "opacity-0 scale-75 pointer-events-none"
          }
        `}
        aria-label="Open menu"
      >
        <div className="flex flex-col items-center justify-center gap-1.5">
          <span className="block h-0.5 w-6 bg-white"></span>
          <span className="block h-0.5 w-6 bg-white"></span>
        </div>
      </button>

      {/* Menu Overlay */}
      <div
        className={`
          fixed top-0 right-0 h-full w-full md:w-[30%]
          bg-black text-white
          p-8 md:p-12
          flex flex-col justify-between
          z-50 transition-transform duration-500 ease-in-out
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Bagian Atas: Tombol Close & Judul */}
        <div>
          <div className="flex items-center justify-between mb-16">
            <span className="text-sm tracking-widest text-gray-400">
              NAVIGATION
            </span>
            <button
              onClick={toggleMenu}
              className="flex items-center justify-center w-16 h-16 text-white transition-colors bg-blue-500 rounded-full hover:bg-blue-600"
              aria-label="Close menu"
            >
              <CloseIcon />
            </button>
          </div>
          {/* Daftar Link Menu */}
          <div className="flex flex-col items-start gap-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={toggleMenu}
                className="text-5xl font-medium transition-colors hover:text-gray-400"
              >
                • {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bagian Bawah: Social Media */}
        <div>
          <span className="block mb-4 text-sm tracking-widest text-gray-400">
            SOCIALS
          </span>
          <div className="flex items-center gap-6">
            {socialItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-lg text-gray-300 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
