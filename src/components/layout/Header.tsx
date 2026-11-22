"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_CONFIG } from "@/lib/constants";
import { NAV_LINKS } from "@/data/navigation";


const city = SITE_CONFIG.location.split(",")[0];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  // Slides up out of view while scrolling down, comes back on any scroll up.
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      if (y <= 150) setHidden(false);
      else if (delta > 6) setHidden(true);
      else if (delta < -6) setHidden(false);
      if (Math.abs(delta) > 6 || y <= 150) lastY = y;
      setScrolled(y > 150);
      if (pathname !== "/") {
        setActive(pathname.startsWith("/work") ? "portfolio" : null);
        return;
      }
      // Active = the section crossing a line 40% down the viewport.
      const line = window.innerHeight * 0.4;
      let current: string | null = null;
      for (const l of NAV_LINKS) {
        const r = document.getElementById(l.section)?.getBoundingClientRect();
        if (r && r.top <= line && r.bottom > line) current = l.section;
      }
      // The footer is short; mark Contact once the page bottom is reached.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = "footer";
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return (
    <header
      id="header"
      // Keyboard users tabbing into the hidden bar bring it back.
      onFocusCapture={() => setHidden(false)}
      className={`fixed inset-x-0 top-0 z-50 grid grid-cols-3 items-center px-[4vw] py-[1.6vw] text-white transition-[background-color,border-color,backdrop-filter,transform] duration-500 ease-out ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } max-[1025px]:px-[5vw] max-[1025px]:py-[3vw] max-md:flex max-md:justify-between max-md:gap-3 max-md:py-4 ${
        scrolled ? "border-b border-white/10 bg-black/40 backdrop-blur-md" : "border-b border-transparent bg-transparent"
      }`}
    >
      {/* Left: brand (same on every section) */}
      <Link
        href="/#hero"
        aria-label={SITE_CONFIG.name}
        className="block justify-self-start"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logo-rsr.png"
          alt=""
          width={164}
          height={240}
          className="h-[2.6vw] w-auto max-[1025px]:h-9 max-md:h-8"
        />
      </Link>

      {/* Centre: role, city */}
      <p className="justify-self-center text-[1.1vw] text-white/75 max-[1025px]:text-sm max-md:hidden">
        {SITE_CONFIG.title}, {city}
      </p>

      {/* Right: section links with underline on the active one */}
      <nav aria-label="Main" className="justify-self-end">
        <ul className="flex gap-[2.6vw] text-[1.15vw] max-[1025px]:gap-6 max-[1025px]:text-base max-md:gap-3.5 max-md:text-[13px]">
          {NAV_LINKS.map((l) => {
            const isActive = active === l.section;
            return (
              <li key={l.label}>
                <Link
                  href={l.href}
                  aria-current={isActive ? "true" : undefined}
                  className="group relative inline-block py-1"
                >
                  {l.label}
                  <span
                    className={`absolute inset-x-0 bottom-0 h-px origin-left bg-current transition-transform duration-500 ease-out ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
