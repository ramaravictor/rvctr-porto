"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export const HeroSection = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [textWidth, setTextWidth] = useState(1200); // Inisialisasi default

  useEffect(() => {
    if (textRef.current) {
      setTextWidth(textRef.current.getBoundingClientRect().width);
    }
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      const currentPosition = window.scrollY;
      const delta = currentPosition - scrollPosition;

      // Tentukan arah scroll
      if (delta > 0) {
        // Scroll ke bawah, gerak ke kiri
        setIsScrollingUp(false);
      } else if (delta < 0) {
        // Scroll ke atas, gerak full ke kanan
        setIsScrollingUp(true);
      }

      setScrollPosition(currentPosition);
    };

    const animate = () => {
      // Gerakan awal ke kiri terus-menerus, atau ke kanan jika scroll ke atas
      setTranslateX((prev) => {
        const speed = isScrollingUp ? 2 : -1; // Kecepatan ke kanan jika scroll ke atas, ke kiri jika default
        const newPos = prev + speed;

        if (isScrollingUp) {
          // Gerak ke kanan, loop kembali ke -textWidth dengan offset
          return newPos >= 0 ? -textWidth + textWidth / 6 : newPos; // Offset 1/6 untuk kelancaran
        } else {
          // Gerak ke kiri, loop kembali ke 0 dengan offset
          return newPos <= -textWidth ? textWidth - textWidth / 6 : newPos; // Offset 1/6 untuk kelancaran
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("scroll", handleScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition, textWidth, isScrollingUp]);

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center min-h-screen px-4 overflow-hidden bg-gray-400"
    >
      {/* Background decoration */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <div className="absolute rounded-full -top-40 -right-40 w-80 h-80 bg-emerald-400/5 blur-3xl"></div>
        <div className="absolute rounded-full -bottom-40 -left-40 w-96 h-96 bg-blue-400/5 blur-3xl"></div>
        <div className="absolute w-64 h-64 transform -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 bg-purple-400/3 blur-3xl"></div>
      </div> */}

      {/* --- Gambar background (sekarang di z-[-1]) --- */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/rama.jpg" // <-- 2. UBAH INI menjadi string path
          alt="Lanskap pegunungan dramatis saat senja"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Kiri atas */}
      <div className="absolute text-lg text-white cursor-pointer group top-9 left-12">
        <span
          className="
          absolute inset-0 
          transition-opacity duration-300 ease-in-out 
          group-hover:opacity-0
          whitespace-nowrap /* <-- TAMBAHKAN INI */
        "
        >
          © Code by Rama
        </span>
        <span className="absolute inset-0 transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100 whitespace-nowrap">
          © Rama Soni Ravictor
        </span>
      </div>

      {/* Located - di kiri tengah */}
      <div className="absolute left-0 flex items-center py-4 pl-12 pr-5 -translate-y-1/2 bg-black rounded-r-full top-1/2 gap-14">
        {/* Bagian Teks */}
        <h4 className="text-lg font-light leading-tight text-left text-white">
          Located <br />
          in the <br />
          Indonesia
        </h4>

        {/* Bagian Lingkaran Ikon */}
        {/* DIUBAH: h-21 w-21 -> h-20 w-20 */}
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-slate-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            // DIUBAH: h-15 w-15 -> h-10 w-10
            className="h-14 w-14 text-white animate-[spin_15s_linear_infinite]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
            />
          </svg>
        </div>
      </div>

      {/* Kanan tengah */}
      <div
        className="
        absolute top-1/2 right-8 -translate-y-1/2  /* 1. Posisi blok tetap di KANAN */
        flex flex-col items-start gap-4             /* 2. Item di dalamnya rata KIRI */
      "
      >
        {/* Ikon Panah */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 text-white rotate-90 -translate-y-14"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
          />
        </svg>

        {/* Bagian Teks */}
        <div className="pb-12 pr-32 text-left">
          <h2 className="pb-4 text-4xl text-white">Freelance</h2>
          <h2 className="text-4xl text-white">Software Engineer</h2>
        </div>
      </div>

      {/* Teks besar "Rama Soni Ravictor" dengan animasi berbasis scroll */}
      <div className="absolute w-full overflow-hidden bottom-3">
        <h1
          ref={textRef}
          className="
          text-[15vw] md:text-32xl text-white whitespace-nowrap"
          style={{ transform: `translateX(${translateX}px)` }}
        >
          {" "}
          Rama Soni Ravictor - Rama Soni Ravictor -
        </h1>
      </div>
    </section>
  );
};
