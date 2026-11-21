"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { CONTACT_EMAIL, FOOTER_COLUMNS } from "@/data/navigation";
import { gsap, prefersReducedMotion } from "@/lib/gsap";


// Fixed star positions (x%, y%, size px, opacity) so SSR and client match.
const STARS = Array.from({ length: 70 }, (_, i) => {
  const r = (n: number) => ((Math.sin(i * 127.1 + n * 311.7) * 43758.5453) % 1 + 1) % 1;
  // Rounded to fixed strings so server and client render identical attributes.
  return {
    left: `${(r(1) * 100).toFixed(2)}%`,
    top: `${(r(2) * 70).toFixed(2)}%`,
    size: r(3) > 0.85 ? "2px" : "1px",
    opacity: (0.25 + r(4) * 0.55).toFixed(2),
  };
});

function RollLabel({ text }: { text: string }) {
  return (
    <span className="relative z-20 block h-[1.3em] overflow-hidden leading-[1.3]">
      {Array.from(text).map((char, i) => (
        <span key={i} className="roll-letter" style={{ transitionDelay: `${i * 0.02}s` }}>
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  );
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);

  // Content rises into place and the wordmark lifts as the footer scrolls in.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const st = { trigger: footerRef.current, start: "top bottom", end: "bottom bottom", scrub: true };
      gsap.fromTo(contentRef.current, { yPercent: 15, opacity: 0.4 }, { yPercent: 0, opacity: 1, ease: "power1.out", scrollTrigger: st });
      gsap.fromTo(wordRef.current, { yPercent: 35, opacity: 0 }, { yPercent: 0, opacity: 1, ease: "power2.out", scrollTrigger: { ...st } });
    });
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="footer"
      className="relative overflow-hidden text-white"
      style={{
        background:
          "radial-gradient(90% 60% at 50% 100%, rgb(8 57 40) 0%, rgb(4 39 34 / 0.6) 45%, rgb(7 7 7 / 0) 80%), linear-gradient(180deg, #070707 0%, rgb(2 22 18) 55%, rgb(4 39 34) 100%)",
      }}
    >
      {/* Stars */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        {STARS.map((s, i) => (
          <span
            key={i}
            className="absolute bg-white rounded-full"
            style={{ left: s.left, top: s.top, width: s.size, height: s.size, opacity: s.opacity }}
          />
        ))}
      </div>

      <div
        ref={contentRef}
        className="relative z-10 flex justify-between gap-[6vw] px-[4vw] pt-[10vw] max-[1025px]:flex-col max-[1025px]:px-[5vw] max-md:pt-[22vw]"
      >
        {/* CTA */}
        <div>
          <h2 className="font-sans text-[4.4vw] font-normal leading-[1.08] tracking-tight max-[1025px]:text-[7vw] max-md:text-[10vw]">
            Ready to build
            <br />
            the next one?
          </h2>
          <div className="mt-[2.5vw] flex flex-wrap gap-3 max-md:mt-8">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="roll-btn group gap-[0.9vw] bg-white px-[2vw] py-3 text-[1.1vw] font-medium text-[#111111] max-[1025px]:gap-2 max-[1025px]:px-6 max-[1025px]:text-base"
            >
              <span className="relative z-10 size-2 shrink-0 rounded-full bg-[#070707] transition-transform duration-300 group-hover:scale-125" />
              <RollLabel text="Let's connect" />
            </a>
            <Link
              href="/#portfolio"
              className="roll-btn border border-white/20 bg-white/5 px-[2vw] py-3 text-[1.1vw] font-medium text-white backdrop-blur-md transition-colors hover:bg-white/10 max-[1025px]:px-6 max-[1025px]:text-base"
            >
              <RollLabel text="See my work" />
            </Link>
          </div>
        </div>

        {/* Link columns */}
        <nav aria-label="Footer" className="flex gap-[5vw] max-md:grid max-md:grid-cols-2 max-md:gap-10">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="mb-[1.2vw] text-[1vw] text-white/45 max-[1025px]:mb-4 max-[1025px]:text-sm">{col.title}</p>
              <ul className="space-y-[0.6vw] text-[1.1vw] max-[1025px]:space-y-0 max-[1025px]:text-base">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="inline-block transition-colors hover:text-brand max-[1025px]:py-2.5"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Giant wordmark */}
      <div ref={wordRef} aria-hidden="true" className="pointer-events-none relative z-0 mt-[4vw] select-none text-center">
        <span
          className="block whitespace-nowrap font-sans text-[25vw] font-medium leading-[0.85] tracking-[-0.06em]"
          style={{
            backgroundImage: "linear-gradient(180deg, rgb(45 159 94 / 0.55) 0%, rgb(45 159 94 / 0.12) 70%, rgb(45 159 94 / 0) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            textShadow: "0 0 80px rgb(45 159 94 / 0.25)",
          }}
        >
          Ravictor.
        </span>
      </div>

      {/* Caption + legal */}
      <div className="relative z-10 mt-[5vw] flex flex-col items-center gap-2 px-[4vw] pb-8 text-center max-md:mt-6">
        <p className="text-[1.1vw] text-white/70 max-[1025px]:text-base">Thanks for scrolling. Let&apos;s talk soon.</p>
        <p className="text-xs text-white/40">
          &copy; {new Date().getFullYear()} {SITE_CONFIG.name} · Built with Next.js, Tailwind CSS &amp; GSAP
        </p>
      </div>
    </footer>
  );
}
