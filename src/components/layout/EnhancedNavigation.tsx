"use client";

import { useState, useEffect } from "react";
import { useScrollSpy } from "../../hooks/useScrollSpy";
import { NAVIGATION_ITEMS } from "../../lib/constants";

export default function Clock() {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-sm font-medium text-gray-600 font-mono">{time}</div>
  );
}

export const EnhancedNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const activeSection = useScrollSpy(["hero", "projects", "contact"]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [currentTime, setCurrentTime] = useState(""); // Inisialisasi kosong

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 1000);

    // Set waktu awal saat komponen dimount
    setCurrentTime(
      new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    );

    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`
      fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300
      ${isScrolled ? "top-2" : "top-4"}
    `}
    >
      <div
        className={`
        bg-white/80 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-gray-200/50
        transition-all duration-300
        ${isScrolled ? "bg-white/90 shadow-xl" : ""}
      `}
      >
        <div className="flex items-center space-x-6">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("projects");
            }}
            className={`p-2 rounded-full transition-colors ${
              activeSection === "hero"
                ? "bg-emerald-100 text-emerald-600"
                : "hover:bg-gray-100"
            }`}
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </a>

          <button
            onClick={() => scrollToSection("about")}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>

          <button
            onClick={() => scrollToSection("projects")}
            className={`p-2 rounded-full transition-colors ${
              activeSection === "projects"
                ? "bg-emerald-100 text-emerald-600"
                : "hover:bg-gray-100"
            }`}
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"
              />
            </svg>
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className={`p-2 rounded-full transition-colors ${
              activeSection === "contact"
                ? "bg-emerald-100 text-emerald-600"
                : "hover:bg-gray-100"
            }`}
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </button>

          <div className="text-sm font-medium text-gray-600 font-mono">
            {currentTime}
          </div>
        </div>
      </div>
    </nav>
  );
};
